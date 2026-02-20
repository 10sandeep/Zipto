import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../api/client';

interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
  is_verified: boolean;
  is_active: boolean;
  language_preference: string;
  created_at: string;
  updated_at: string;
  email: string | null;
}

interface CustomerProfile {
  id: string;
  user_id: string;
  address: string | null;
  saved_locations: any[];
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  profile: CustomerProfile | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (phone: string) => Promise<any>;
  verifyOtp: (phone: string, otp: string) => Promise<any>;
  fetchProfile: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (phone: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.registerCustomer(phone);
          set({ isLoading: false });
          return response;
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Failed to send OTP'
          });
          throw error;
        }
      },

      verifyOtp: async (phone: string, otp: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.verifyOtp(phone, otp);

          if (response.success && response.data) {
            const { user, access_token, refresh_token } = response.data;

            // Save tokens to AsyncStorage for axios interceptor
            await AsyncStorage.setItem('auth_token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);

            // Log the bearer token
            console.log('✅ Authentication successful! Bearer Token:', access_token);

            set({
              user,
              token: access_token,
              refreshToken: refresh_token,
              isAuthenticated: true,
              isLoading: false,
            });
            return response.data;
          } else {
            throw new Error('Verification failed');
          }
        } catch (error: any) {
          console.error('Verify OTP Error:', error);
          set({
            isLoading: false,
            error: error.response?.data?.message || 'Invalid OTP'
          });
          throw error;
        }
      },

      fetchProfile: async () => {
        console.log('🔄 fetchProfile called');
        try {
          const response = await authApi.getCustomerProfile();
          console.log('✅ fetchProfile response:', JSON.stringify(response, null, 2));

          // Safe check for response existance
          if (response?.success && response?.data) {
            const { user, ...profileData } = response.data;

            set({
              user,
              profile: profileData,
            });
          } else {
            console.log('⚠️ Fetch profile returned invalid response:', response);
          }
        } catch (error: any) {
          console.error('❌ Fetch profile error CAUGHT:', error);
          console.log('🔍 Error structure:', JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
          console.log('🔍 Error response data:', JSON.stringify(error.response?.data, null, 2));
          
          console.log('🔒 Error details:', {
            status: error.response?.status,
            dataStatus: error.response?.data?.statusCode,
            message: error.message
          });
          
          // Check for various forms of 401 Unauthorized
          const isUnauthorized = 
            error.response?.status === 401 || 
            error.response?.data?.statusCode === 401 ||
            (error.message && error.message.includes('401'));
          
          console.log('🕵️ isUnauthorized check result:', isUnauthorized);

          if (isUnauthorized) {
            console.log('🔒 401 Unauthorized detected in fetchProfile, logging out...');
            await AsyncStorage.removeItem('auth_token');
            await AsyncStorage.removeItem('refresh_token');
            set({
              user: null,
              profile: null,
              token: null,
              refreshToken: null,
              isAuthenticated: false,
            });
            console.log('👋 Logout complete, state reset.');
          }
        }
      },

      refreshAccessToken: async () => {
        try {
          const currentRefreshToken = get().refreshToken;
          
          if (!currentRefreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await authApi.refreshToken(currentRefreshToken);

          if (response.success && response.data) {
            const { access_token, refresh_token } = response.data;

            // Update AsyncStorage
            await AsyncStorage.setItem('auth_token', access_token);
            await AsyncStorage.setItem('refresh_token', refresh_token);

            // Log the refreshed bearer token
            console.log('🔄 Token refreshed! New Bearer Token:', access_token);

            // Update state
            set({
              token: access_token,
              refreshToken: refresh_token,
            });
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (error: any) {
          console.error('Refresh token error:', error);
          // If refresh fails, logout the user
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('refresh_token');
          set({
            user: null,
            profile: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          // Call logout API to invalidate token on server
          await authApi.logout();
        } catch (error: any) {
          console.error('Logout API error:', error);
          // Continue with local logout even if API fails
        } finally {
          // Always clear local state
          await AsyncStorage.removeItem('auth_token');
          set({
            user: null,
            profile: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Register the independent logout function to avoid circular dependencies
// This allows axios interceptors to trigger store logout even though client.ts doesn't import useAuthStore
import { setLogoutCallback, setTokenUpdateCallback } from '../api/client';

setLogoutCallback(() => {
  useAuthStore.getState().logout().catch(console.error);
});

setTokenUpdateCallback((token, refreshToken) => {
  console.log('🔄 Sychronizing refreshed token to Zustand store');
  useAuthStore.setState({ 
    token, 
    refreshToken 
  });
});

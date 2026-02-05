import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

const RootNavigator = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [shouldVerifyToken, setShouldVerifyToken] = useState(false);
    const { isAuthenticated, fetchProfile, token } = useAuthStore();

    useEffect(() => {
        // Wait for Zustand to rehydrate from AsyncStorage
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setIsHydrated(true);
            // Only verify token if user was already authenticated from storage
            // This means app was reopened, not a fresh login
            const state = useAuthStore.getState();
            if (state.isAuthenticated && state.token) {
                setShouldVerifyToken(true);
            }
        });

        // Check if already hydrated
        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
            const state = useAuthStore.getState();
            if (state.isAuthenticated && state.token) {
                setShouldVerifyToken(true);
            }
        }

        return () => {
            unsubscribe();
        };
    }, []);

    // Verify token only on app rehydration (not after fresh login)
    useEffect(() => {
        const verifyAndFetchProfile = async () => {
            if (shouldVerifyToken) {
                setIsVerifying(true);
                await fetchProfile();
                setIsVerifying(false);
                setShouldVerifyToken(false);
            }
        };

        verifyAndFetchProfile();
    }, [shouldVerifyToken]);

    // Show loading only while hydrating or verifying token on app start
    if (!isHydrated || isVerifying) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default RootNavigator;

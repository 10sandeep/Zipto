import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Settings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  
  // Notification Settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  
  // Privacy Settings
  const [locationServices, setLocationServices] = useState(true);
  const [shareDataForAnalytics, setShareDataForAnalytics] = useState(false);
  
  // App Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [autoPlayVideos, setAutoPlayVideos] = useState(true);

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear app cache? This will free up storage space.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => Alert.alert('Success', 'Cache cleared successfully!')
        },
      ]
    );
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => console.log('Account deletion initiated')
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="notifications" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>Push Notifications</Text>
                  </View>
                  <Text style={styles.settingDesc}>Receive order updates and alerts</Text>
                </View>
                <Switch 
                  value={pushNotifications} 
                  onValueChange={setPushNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={pushNotifications ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="email" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>Email Notifications</Text>
                  </View>
                  <Text style={styles.settingDesc}>Promotional emails and updates</Text>
                </View>
                <Switch 
                  value={emailNotifications} 
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={emailNotifications ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="sms" size={20} color="#F59E0B" />
                    <Text style={styles.settingTitle}>SMS Notifications</Text>
                  </View>
                  <Text style={styles.settingDesc}>Important order alerts via SMS</Text>
                </View>
                <Switch 
                  value={smsNotifications} 
                  onValueChange={setSmsNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={smsNotifications ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
            </View>
          </View>

          {/* Privacy & Security Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="location-on" size={20} color="#EF4444" />
                    <Text style={styles.settingTitle}>Location Services</Text>
                  </View>
                  <Text style={styles.settingDesc}>Required for accurate delivery</Text>
                </View>
                <Switch 
                  value={locationServices} 
                  onValueChange={setLocationServices}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={locationServices ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="analytics" size={20} color="#8B5CF6" />
                    <Text style={styles.settingTitle}>Share Analytics Data</Text>
                  </View>
                  <Text style={styles.settingDesc}>Help us improve the app</Text>
                </View>
                <Switch 
                  value={shareDataForAnalytics} 
                  onValueChange={setShareDataForAnalytics}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={shareDataForAnalytics ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
            </View>
          </View>

          {/* App Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App Preferences</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="dark-mode" size={20} color="#64748B" />
                    <Text style={styles.settingTitle}>Dark Mode</Text>
                  </View>
                  <Text style={styles.settingDesc}>Switch to dark theme</Text>
                </View>
                <Switch 
                  value={darkMode} 
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={darkMode ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="play-circle-outline" size={20} color="#EC4899" />
                    <Text style={styles.settingTitle}>Auto-play Videos</Text>
                  </View>
                  <Text style={styles.settingDesc}>Auto-play promotional videos</Text>
                </View>
                <Switch 
                  value={autoPlayVideos} 
                  onValueChange={setAutoPlayVideos}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={autoPlayVideos ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="language" size={20} color="#0EA5E9" />
                    <Text style={styles.settingTitle}>Language</Text>
                  </View>
                  <Text style={styles.settingDesc}>English (US)</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.settingsCard}>
              <TouchableOpacity 
                style={styles.settingItem} 
                onPress={handleChangePassword}
                activeOpacity={0.7}
              >
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="lock-outline" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>Change Password</Text>
                  </View>
                  <Text style={styles.settingDesc}>Update your password</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>
              
              <View style={styles.settingDivider} />
              
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={handleClearCache}
                activeOpacity={0.7}
              >
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="cleaning-services" size={20} color="#F59E0B" />
                    <Text style={styles.settingTitle}>Clear Cache</Text>
                  </View>
                  <Text style={styles.settingDesc}>Free up storage space</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>
              
              <View style={styles.settingDivider} />
              
              <TouchableOpacity 
                style={styles.settingItem}
                onPress={handleDeleteAccount}
                activeOpacity={0.7}
              >
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="delete-forever" size={20} color="#EF4444" />
                    <Text style={[styles.settingTitle, { color: '#EF4444' }]}>Delete Account</Text>
                  </View>
                  <Text style={styles.settingDesc}>Permanently delete your account</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfoCard}>
            <MaterialIcons name="info-outline" size={20} color="#64748B" />
            <View style={styles.appInfoText}>
              <Text style={styles.appInfoTitle}>App Version</Text>
              <Text style={styles.appInfoVersion}>Zipto v1.0.0 (Build 100)</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 12,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  settingDesc: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginLeft: 28,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 16,
  },
  appInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  appInfoText: {
    flex: 1,
  },
  appInfoTitle: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 2,
  },
  appInfoVersion: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
});

export default Settings;
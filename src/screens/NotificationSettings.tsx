import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const NotificationSettings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  
  // Notification Types
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [orderPickedUp, setOrderPickedUp] = useState(true);
  const [orderDelivered, setOrderDelivered] = useState(true);
  const [orderCancelled, setOrderCancelled] = useState(true);
  
  // Promotional
  const [promotions, setPromotions] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [newFeatures, setNewFeatures] = useState(false);
  
  // Wallet & Payments
  const [walletUpdates, setWalletUpdates] = useState(true);
  const [paymentSuccessful, setPaymentSuccessful] = useState(true);
  const [paymentFailed, setPaymentFailed] = useState(true);
  const [cashbackReceived, setCashbackReceived] = useState(true);
  
  // Alert Preferences
  const [sound, setSound] = useState(true);
  const [vibration, setVibration] = useState(true);
  const [ledLight, setLedLight] = useState(false);
  
  // Communication
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(false);

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
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header Info */}
          <View style={styles.infoCard}>
            <MaterialIcons name="notifications-active" size={24} color="#3B82F6" />
            <Text style={styles.infoText}>
              Customize your notification preferences to stay updated on what matters most to you.
            </Text>
          </View>

          {/* Order Notifications Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Notifications</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="shopping-bag" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>All Order Updates</Text>
                  </View>
                  <Text style={styles.settingDesc}>Status changes and updates</Text>
                </View>
                <Switch 
                  value={orderUpdates} 
                  onValueChange={setOrderUpdates}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={orderUpdates ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="local-shipping" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>Order Picked Up</Text>
                  </View>
                  <Text style={styles.settingDesc}>When delivery agent picks up</Text>
                </View>
                <Switch 
                  value={orderPickedUp} 
                  onValueChange={setOrderPickedUp}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={orderPickedUp ? '#3B82F6' : '#CBD5E1'}
                  disabled={!orderUpdates}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="check-circle" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>Order Delivered</Text>
                  </View>
                  <Text style={styles.settingDesc}>When order is delivered</Text>
                </View>
                <Switch 
                  value={orderDelivered} 
                  onValueChange={setOrderDelivered}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={orderDelivered ? '#3B82F6' : '#CBD5E1'}
                  disabled={!orderUpdates}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="cancel" size={20} color="#EF4444" />
                    <Text style={styles.settingTitle}>Order Cancelled</Text>
                  </View>
                  <Text style={styles.settingDesc}>Cancellation confirmations</Text>
                </View>
                <Switch 
                  value={orderCancelled} 
                  onValueChange={setOrderCancelled}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={orderCancelled ? '#3B82F6' : '#CBD5E1'}
                  disabled={!orderUpdates}
                />
              </View>
            </View>
          </View>

          {/* Promotional Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Promotions & Offers</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="local-offer" size={20} color="#F59E0B" />
                    <Text style={styles.settingTitle}>Promotions</Text>
                  </View>
                  <Text style={styles.settingDesc}>Deals and discounts</Text>
                </View>
                <Switch 
                  value={promotions} 
                  onValueChange={setPromotions}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={promotions ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="card-giftcard" size={20} color="#EC4899" />
                    <Text style={styles.settingTitle}>Special Offers</Text>
                  </View>
                  <Text style={styles.settingDesc}>Limited time offers</Text>
                </View>
                <Switch 
                  value={specialOffers} 
                  onValueChange={setSpecialOffers}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={specialOffers ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="new-releases" size={20} color="#8B5CF6" />
                    <Text style={styles.settingTitle}>New Features</Text>
                  </View>
                  <Text style={styles.settingDesc}>App updates and features</Text>
                </View>
                <Switch 
                  value={newFeatures} 
                  onValueChange={setNewFeatures}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={newFeatures ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
            </View>
          </View>

          {/* Wallet & Payments Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Wallet & Payments</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="account-balance-wallet" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>Wallet Updates</Text>
                  </View>
                  <Text style={styles.settingDesc}>Money added or deducted</Text>
                </View>
                <Switch 
                  value={walletUpdates} 
                  onValueChange={setWalletUpdates}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={walletUpdates ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="check-circle" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>Payment Successful</Text>
                  </View>
                  <Text style={styles.settingDesc}>Payment confirmations</Text>
                </View>
                <Switch 
                  value={paymentSuccessful} 
                  onValueChange={setPaymentSuccessful}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={paymentSuccessful ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="error" size={20} color="#EF4444" />
                    <Text style={styles.settingTitle}>Payment Failed</Text>
                  </View>
                  <Text style={styles.settingDesc}>Failed payment alerts</Text>
                </View>
                <Switch 
                  value={paymentFailed} 
                  onValueChange={setPaymentFailed}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={paymentFailed ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="stars" size={20} color="#F59E0B" />
                    <Text style={styles.settingTitle}>Cashback Received</Text>
                  </View>
                  <Text style={styles.settingDesc}>Cashback credit notifications</Text>
                </View>
                <Switch 
                  value={cashbackReceived} 
                  onValueChange={setCashbackReceived}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={cashbackReceived ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
            </View>
          </View>

          {/* Alert Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Alert Preferences</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="volume-up" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>Sound</Text>
                  </View>
                  <Text style={styles.settingDesc}>Play notification sound</Text>
                </View>
                <Switch 
                  value={sound} 
                  onValueChange={setSound}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={sound ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="vibration" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>Vibration</Text>
                  </View>
                  <Text style={styles.settingDesc}>Vibrate on notifications</Text>
                </View>
                <Switch 
                  value={vibration} 
                  onValueChange={setVibration}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={vibration ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="lightbulb-outline" size={20} color="#F59E0B" />
                    <Text style={styles.settingTitle}>LED Light</Text>
                  </View>
                  <Text style={styles.settingDesc}>Blink LED for notifications</Text>
                </View>
                <Switch 
                  value={ledLight} 
                  onValueChange={setLedLight}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={ledLight ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
            </View>
          </View>

          {/* Communication Channels Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Communication Channels</Text>
            <View style={styles.settingsCard}>
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="email" size={20} color="#3B82F6" />
                    <Text style={styles.settingTitle}>Email</Text>
                  </View>
                  <Text style={styles.settingDesc}>Receive updates via email</Text>
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
                    <MaterialIcons name="sms" size={20} color="#10B981" />
                    <Text style={styles.settingTitle}>SMS</Text>
                  </View>
                  <Text style={styles.settingDesc}>Receive SMS alerts</Text>
                </View>
                <Switch 
                  value={smsNotifications} 
                  onValueChange={setSmsNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={smsNotifications ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
              
              <View style={styles.settingDivider} />
              
              <View style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <View style={styles.settingHeader}>
                    <MaterialIcons name="whatsapp" size={20} color="#16A34A" />
                    <Text style={styles.settingTitle}>WhatsApp</Text>
                  </View>
                  <Text style={styles.settingDesc}>Updates on WhatsApp</Text>
                </View>
                <Switch 
                  value={whatsappNotifications} 
                  onValueChange={setWhatsappNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
                  thumbColor={whatsappNotifications ? '#3B82F6' : '#CBD5E1'}
                />
              </View>
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#1E40AF',
    lineHeight: 20,
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
});

export default NotificationSettings;
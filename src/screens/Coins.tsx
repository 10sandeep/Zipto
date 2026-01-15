import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomTabBar from './BottomTabBar';

const Coins = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [availableCoins] = useState(850);

  const useCoinsOptions = [
    {
      id: 1,
      title: 'Transfer to Wallet',
      description: 'Convert coins to wallet balance',
      icon: 'account-balance-wallet',
      color: '#3B82F6',
      gradient: ['#3B82F6', '#2563EB'],
      badge: null,
      onPress: () => {
        // Navigate to transfer screen or show modal
        console.log('Transfer to Wallet');
      },
    },
    {
      id: 2,
      title: 'Get Discount',
      description: 'Use coins for delivery discount',
      icon: 'local-offer',
      color: '#10B981',
      gradient: ['#10B981', '#059669'],
      badge: 'POPULAR',
      onPress: () => {
        console.log('Get Discount');
      },
    },
    {
      id: 3,
      title: 'Redeem Vouchers',
      description: 'Exchange for brand vouchers',
      icon: 'card-giftcard',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      badge: 'NEW',
      onPress: () => {
        console.log('Redeem Vouchers');
      },
    },
  ];

  const learnMoreOptions = [
    {
      id: 1,
      title: 'How to Earn Coins?',
      description: 'Complete orders and refer friends',
      icon: 'add-circle',
      color: '#8B5CF6',
      onPress: () => {
        console.log('Learn earn coins');
      },
    },
    {
      id: 2,
      title: 'How to Use Coins?',
      description: 'Redeem for rewards and discounts',
      icon: 'help-outline',
      color: '#EC4899',
      onPress: () => {
        console.log('Learn use coins');
      },
    },
    {
      id: 3,
      title: 'Coins Expiry',
      description: 'Valid for 12 months from earning',
      icon: 'schedule',
      color: '#EF4444',
      onPress: () => {
        console.log('Coins expiry info');
      },
    },
  ];

  const earnCoinsWays = [
    { icon: 'local-shipping', text: 'Complete deliveries', coins: '+10' },
    { icon: 'share', text: 'Refer friends', coins: '+50' },
    { icon: 'star', text: 'Write reviews', coins: '+5' },
    { icon: 'celebration', text: 'Special events', coins: '+100' },
  ];

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
          <Text style={styles.headerTitle}>My Coins</Text>
          <TouchableOpacity
            onPress={() => console.log('Transaction History')}
            style={styles.historyButton}
          >
            <MaterialIcons name="history" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Coins Balance Card */}
          <View style={styles.balanceCardContainer}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6', '#A855F7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.coinsIconContainer}>
                <MaterialIcons name="stars" size={60} color="#FCD34D" />
              </View>

              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Available Coins</Text>
                <Text style={styles.balanceAmount}>{availableCoins}</Text>
                <Text style={styles.balanceSubtext}>
                  ≈ ₹{Math.floor(availableCoins / 10)}
                </Text>
              </View>

              {/* Decorative circles */}
              <View style={[styles.decorCircle, styles.decorCircle1]} />
              <View style={[styles.decorCircle, styles.decorCircle2]} />
              <View style={[styles.decorCircle, styles.decorCircle3]} />
            </LinearGradient>

            {/* Quick Transaction Button */}
            <TouchableOpacity
              style={styles.transactionHistoryButton}
              onPress={() => console.log('View all transactions')}
            >
              <MaterialIcons name="receipt-long" size={20} color="#6366F1" />
              <Text style={styles.transactionHistoryText}>
                Transaction History
              </Text>
              <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Use Coins Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Use Coins</Text>
            <View style={styles.optionsGrid}>
              {useCoinsOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionCard}
                  onPress={option.onPress}
                  activeOpacity={0.8}
                >
                  {option.badge && (
                    <View
                      style={[
                        styles.badge,
                        option.badge === 'NEW' && styles.badgeNew,
                      ]}
                    >
                      <Text style={styles.badgeText}>{option.badge}</Text>
                    </View>
                  )}

                  <LinearGradient
                    colors={option.gradient}
                    style={styles.optionIconContainer}
                  >
                    <MaterialIcons
                      name={option.icon}
                      size={32}
                      color="#FFFFFF"
                    />
                  </LinearGradient>

                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>
                    {option.description}
                  </Text>

                  <View style={styles.optionArrow}>
                    <MaterialIcons
                      name="arrow-forward"
                      size={20}
                      color="#3B82F6"
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Earn More Coins Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earn More Coins</Text>
            <View style={styles.earnCard}>
              {earnCoinsWays.map((way, index) => (
                <React.Fragment key={index}>
                  <View style={styles.earnItem}>
                    <View style={styles.earnIconContainer}>
                      <MaterialIcons
                        name={way.icon}
                        size={24}
                        color="#6366F1"
                      />
                    </View>
                    <Text style={styles.earnText}>{way.text}</Text>
                    <View style={styles.earnCoinsTag}>
                      <Text style={styles.earnCoinsText}>{way.coins}</Text>
                    </View>
                  </View>
                  {index < earnCoinsWays.length - 1 && (
                    <View style={styles.earnDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Learn More Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learn More</Text>
            <View style={styles.learnCard}>
              {learnMoreOptions.map((option, index) => (
                <React.Fragment key={option.id}>
                  <TouchableOpacity
                    style={styles.learnItem}
                    onPress={option.onPress}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.learnIconContainer,
                        { backgroundColor: `${option.color}15` },
                      ]}
                    >
                      <MaterialIcons
                        name={option.icon}
                        size={24}
                        color={option.color}
                      />
                    </View>
                    <View style={styles.learnTextContainer}>
                      <Text style={styles.learnTitle}>{option.title}</Text>
                      <Text style={styles.learnDescription}>
                        {option.description}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                  {index < learnMoreOptions.length - 1 && (
                    <View style={styles.learnDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#3B82F6" />
            <Text style={styles.infoBannerText}>
              10 coins = ₹1. Use your coins for discounts on your next delivery!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation Bar */}
      <BottomTabBar />
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
  historyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom navigation
  },
  balanceCardContainer: {
    padding: 16,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 180,
    elevation: 8,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  coinsIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.3,
  },
  balanceInfo: {
    zIndex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#E0E7FF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#E0E7FF',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorCircle1: {
    width: 120,
    height: 120,
    right: -30,
    bottom: -30,
  },
  decorCircle2: {
    width: 80,
    height: 80,
    right: 100,
    top: -20,
  },
  decorCircle3: {
    width: 60,
    height: 60,
    left: -20,
    bottom: 40,
  },
  transactionHistoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionHistoryText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 16,
  },
  optionsGrid: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeNew: {
    backgroundColor: '#F59E0B',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  optionIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: 12,
  },
  optionArrow: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  earnCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  earnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  earnIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    fontWeight: '500',
  },
  earnCoinsTag: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  earnCoinsText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#16A34A',
  },
  earnDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  learnCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  learnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  learnIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  learnTextContainer: {
    flex: 1,
  },
  learnTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 4,
  },
  learnDescription: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  learnDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 76,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginBottom: 20,
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    color: '#1E40AF',
    marginLeft: 12,
    lineHeight: 18,
  },
});

export default Coins;

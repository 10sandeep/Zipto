import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import BottomTabBar from './BottomTabBar';
import { vehicleApi, CoinTransaction } from '../api/vehicle';

const Coins = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [coins, setCoins] = useState(0);
  const [rupeeValue, setRupeeValue] = useState(0);
  const [rate, setRate] = useState('');
  const [transactions, setTransactions] = useState<CoinTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [balanceError, setBalanceError] = useState(false);

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      setBalanceError(false);

      const [balanceRes, historyRes] = await Promise.all([
        vehicleApi.getCoinsBalance().catch(() => null),
        vehicleApi.getCoinsHistory().catch(() => null),
      ]);

      if (balanceRes) {
        setCoins(balanceRes.coins ?? 0);
        setRupeeValue(balanceRes.rupee_value ?? 0);
        setRate(balanceRes.rate ?? '');
      } else {
        setBalanceError(true);
      }

      if (historyRes?.transactions) {
        setTransactions(historyRes.transactions);
      }
    } catch (err) {
      console.error('Failed to fetch coins data:', err);
      setBalanceError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData(true);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const day = date.getDate().toString().padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      let hours = date.getHours();
      const mins = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${day} ${month} • ${hours}:${mins} ${ampm}`;
    } catch {
      return dateStr;
    }
  };

  const getTransactionIcon = (type: string) => {
    if (type === 'earned') return 'add-circle';
    if (type === 'redeemed' || type === 'spent') return 'remove-circle';
    if (type === 'transferred') return 'swap-horiz';
    return 'stars';
  };

  const getTransactionColor = (type: string) => {
    if (type === 'earned') return '#10B981';
    if (type === 'redeemed' || type === 'spent') return '#EF4444';
    if (type === 'transferred') return '#F59E0B';
    return '#6366F1';
  };

  const useCoinsOptions = [
    {
      id: 1,
      title: 'Transfer to Wallet',
      description: 'Convert coins to wallet balance',
      icon: 'account-balance-wallet',
      gradient: ['#3B82F6', '#2563EB'],
      badge: null,
      onPress: () => navigation.navigate('TransferToWallet'),
    },
  ];

  const earnCoinsWays = [
    {
      icon: 'local-shipping',
      text: 'Complete deliveries',
      coins: 'Per order',
      onPress: () => navigation.navigate('Home'),
    },
    {
      icon: 'share',
      text: 'Refer friends',
      coins: '+50',
      onPress: () => {
        // Share referral link
        const { Share } = require('react-native');
        Share.share({
          message: 'Join Zipto and get 50 bonus coins! Download now: https://zipto.app/refer',
          title: 'Refer Zipto',
        });
      },
    },
    {
      icon: 'star',
      text: 'Write reviews',
      coins: '+5',
      onPress: () => navigation.navigate('MyOrders'),
    },
    {
      icon: 'receipt-long',
      text: 'View transaction history',
      coins: 'All',
      onPress: () => navigation.navigate('TransactionHistory'),
    },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Coins</Text>
            <View style={styles.historyButton} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366F1" />
            <Text style={styles.loadingText}>Loading coins...</Text>
          </View>
        </SafeAreaView>
        <BottomTabBar />
      </View>
    );
  }

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
            onPress={() => navigation.navigate('TransactionHistory')}
            style={styles.historyButton}
          >
            <MaterialIcons name="history" size={24} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#6366F1']} />
          }
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
                {balanceError ? (
                  <Text style={styles.balanceAmount}>--</Text>
                ) : (
                  <>
                    <Text style={styles.balanceAmount}>{coins}</Text>
                    <Text style={styles.balanceSubtext}>
                      ≈ ₹{rupeeValue.toFixed(2)}
                    </Text>
                  </>
                )}
              </View>

              {rate ? (
                <View style={styles.rateTag}>
                  <MaterialIcons name="info-outline" size={14} color="#E0E7FF" />
                  <Text style={styles.rateText}>{rate}</Text>
                </View>
              ) : null}

              {/* Decorative circles */}
              <View style={[styles.decorCircle, styles.decorCircle1]} />
              <View style={[styles.decorCircle, styles.decorCircle2]} />
              <View style={[styles.decorCircle, styles.decorCircle3]} />
            </LinearGradient>

            {/* Quick Transaction Button */}
            <TouchableOpacity
              style={styles.transactionHistoryButton}
              onPress={() => navigation.navigate('TransactionHistory')}
            >
              <MaterialIcons name="receipt-long" size={20} color="#6366F1" />
              <Text style={styles.transactionHistoryText}>
                Transaction History
              </Text>
              <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Recent Transactions */}
          {transactions.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.transactionsCard}>
                {transactions.slice(0, 5).map((tx, index) => {
                  const color = getTransactionColor(tx.type);
                  const isEarned = tx.type === 'earned';
                  return (
                    <React.Fragment key={tx.id}>
                      <View style={styles.transactionItem}>
                        <View style={[styles.txIconContainer, { backgroundColor: color + '15' }]}>
                          <MaterialIcons
                            name={getTransactionIcon(tx.type)}
                            size={22}
                            color={color}
                          />
                        </View>
                        <View style={styles.txInfo}>
                          <Text style={styles.txDescription} numberOfLines={1}>
                            {tx.description}
                          </Text>
                          <View style={styles.txMeta}>
                            <Text style={styles.txDate}>{formatDate(tx.created_at)}</Text>
                            {tx.multiplier > 1 && (
                              <View style={styles.multiplierTag}>
                                <Text style={styles.multiplierText}>{tx.multiplier.toFixed(1)}x</Text>
                              </View>
                            )}
                          </View>
                        </View>
                        <Text style={[styles.txCoins, { color }]}>
                          {isEarned ? '+' : '-'}{tx.coins}
                        </Text>
                      </View>
                      {index < Math.min(transactions.length, 5) - 1 && (
                        <View style={styles.txDivider} />
                      )}
                    </React.Fragment>
                  );
                })}
              </View>
            </View>
          )}

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
                  <TouchableOpacity
                    style={styles.earnItem}
                    onPress={way.onPress}
                    activeOpacity={0.7}
                  >
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
                    <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                  {index < earnCoinsWays.length - 1 && (
                    <View style={styles.earnDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#3B82F6" />
            <Text style={styles.infoBannerText}>
              {rate || '100 coins = ₹2'}. Use your coins for discounts on your next delivery!
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#64748B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
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
    color: '#E0E7FF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 16,
    color: '#E0E7FF',
  },
  rateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 12,
    gap: 4,
    zIndex: 1,
  },
  rateText: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '500',
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
    color: '#0F172A',
    marginLeft: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366F1',
    marginBottom: 16,
  },
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  txIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  txInfo: {
    flex: 1,
  },
  txDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 4,
  },
  txMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  txDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  multiplierTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  multiplierText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#D97706',
  },
  txCoins: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  txDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 66,
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
    color: '#0F172A',
    marginBottom: 6,
  },
  optionDescription: {
    fontSize: 13,
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
    color: '#16A34A',
  },
  earnDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
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

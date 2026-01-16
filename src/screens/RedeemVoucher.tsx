import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const RedeemVouchersScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const availableCoins = 850;

  const vouchers = [
    {
      id: 1,
      brand: 'Amazon',
      value: '₹500',
      coins: 5000,
      color: '#FF9900',
      icon: 'shopping-bag',
    },
    {
      id: 2,
      brand: 'Flipkart',
      value: '₹500',
      coins: 5000,
      color: '#2874F0',
      icon: 'shopping-cart',
    },
    {
      id: 3,
      brand: 'Swiggy',
      value: '₹200',
      coins: 2000,
      color: '#FC8019',
      icon: 'restaurant',
    },
    {
      id: 4,
      brand: 'Zomato',
      value: '₹200',
      coins: 2000,
      color: '#E23744',
      icon: 'fastfood',
    },
    {
      id: 5,
      brand: 'BookMyShow',
      value: '₹300',
      coins: 3000,
      color: '#C4242B',
      icon: 'local-movies',
    },
    {
      id: 6,
      brand: 'MakeMyTrip',
      value: '₹1000',
      coins: 10000,
      color: '#ED1C24',
      icon: 'flight',
    },
  ];

  const handleRedeem = (voucher: typeof vouchers[0]) => {
    if (availableCoins >= voucher.coins) {
      console.log('Redeeming voucher:', voucher);
      // Add your redeem logic here
    }
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
          <Text style={styles.headerTitle}>Redeem Vouchers</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Balance Card */}
          <View style={styles.balanceCardContainer}>
            <LinearGradient
              colors={['#F59E0B', '#D97706', '#B45309']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Your Coins</Text>
                <Text style={styles.balanceAmount}>{availableCoins}</Text>
              </View>

              <View style={styles.coinsIconContainer}>
                <MaterialIcons
                  name="card-giftcard"
                  size={60}
                  color="#FCD34D"
                />
              </View>
            </LinearGradient>
          </View>

          {/* Vouchers Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Vouchers</Text>
            <View style={styles.vouchersGrid}>
              {vouchers.map(voucher => {
                const canRedeem = availableCoins >= voucher.coins;
                return (
                  <View
                    key={voucher.id}
                    style={[
                      styles.voucherCard,
                      !canRedeem && styles.disabledCard,
                    ]}
                  >
                    <View
                      style={[
                        styles.voucherIcon,
                        { backgroundColor: voucher.color },
                      ]}
                    >
                      <MaterialIcons
                        name={voucher.icon}
                        size={32}
                        color="#FFFFFF"
                      />
                    </View>

                    <Text style={styles.voucherBrand}>{voucher.brand}</Text>
                    <Text style={styles.voucherValue}>{voucher.value}</Text>

                    <View style={styles.voucherCoinsContainer}>
                      <MaterialIcons name="stars" size={16} color="#F59E0B" />
                      <Text style={styles.voucherCoins}>
                        {voucher.coins} coins
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.voucherButton,
                        !canRedeem && styles.disabledButton,
                      ]}
                      disabled={!canRedeem}
                      onPress={() => handleRedeem(voucher)}
                    >
                      <Text style={styles.voucherButtonText}>
                        {canRedeem ? 'Redeem' : 'Locked'}
                      </Text>
                      {!canRedeem && (
                        <MaterialIcons name="lock" size={16} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#F59E0B" />
            <Text style={styles.infoBannerText}>
              Voucher codes will be sent to your registered email within 24
              hours of redemption.
            </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  balanceCardContainer: {
    padding: 16,
  },
  balanceCard: {
    borderRadius: 20,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 140,
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceInfo: {
    zIndex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#FEF3C7',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
  },
  coinsIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.2,
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 16,
  },
  vouchersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  voucherCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  disabledCard: {
    opacity: 0.5,
  },
  voucherIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  voucherBrand: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 4,
    textAlign: 'center',
  },
  voucherValue: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#F59E0B',
    marginBottom: 8,
  },
  voucherCoinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  voucherCoins: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  voucherButton: {
    flexDirection: 'row',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
    width: '100%',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#94A3B8',
  },
  voucherButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  infoBannerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#78350F',
    marginLeft: 12,
    lineHeight: 18,
  },
});

export default RedeemVouchersScreen;
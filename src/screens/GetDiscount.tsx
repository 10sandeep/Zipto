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

const GetDiscountScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const availableCoins = 850;

  const discounts = [
    {
      id: 1,
      title: '₹50 Off',
      coins: 500,
      description: 'On orders above ₹500',
      gradient: ['#10B981', '#059669'],
      icon: 'local-offer',
    },
    {
      id: 2,
      title: '₹100 Off',
      coins: 1000,
      description: 'On orders above ₹1000',
      gradient: ['#F59E0B', '#D97706'],
      icon: 'discount',
    },
    {
      id: 3,
      title: '₹200 Off',
      coins: 2000,
      description: 'On orders above ₹2000',
      gradient: ['#EF4444', '#DC2626'],
      icon: 'sell',
    },
    {
      id: 4,
      title: 'Free Delivery',
      coins: 300,
      description: 'On any order',
      gradient: ['#3B82F6', '#2563EB'],
      icon: 'delivery-dining',
    },
    {
      id: 5,
      title: '₹500 Off',
      coins: 5000,
      description: 'On orders above ₹5000',
      gradient: ['#8B5CF6', '#7C3AED'],
      icon: 'card-giftcard',
    },
  ];

  const handleRedeem = (discount: typeof discounts[0]) => {
    if (availableCoins >= discount.coins) {
      console.log('Redeeming discount:', discount);
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
          <Text style={styles.headerTitle}>Get Discount</Text>
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
              colors={['#10B981', '#059669', '#047857']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Your Coins</Text>
                <Text style={styles.balanceAmount}>{availableCoins}</Text>
              </View>

              <View style={styles.coinsIconContainer}>
                <MaterialIcons name="local-offer" size={60} color="#FCD34D" />
              </View>
            </LinearGradient>
          </View>

          {/* Discounts List */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Available Discounts</Text>
            {discounts.map(discount => {
              const canRedeem = availableCoins >= discount.coins;
              return (
                <View
                  key={discount.id}
                  style={[
                    styles.discountCard,
                    !canRedeem && styles.disabledCard,
                  ]}
                >
                  <LinearGradient
                    colors={
                      canRedeem
                        ? discount.gradient
                        : ['#94A3B8', '#64748B']
                    }
                    style={styles.discountHeader}
                  >
                    <View style={styles.discountIconContainer}>
                      <MaterialIcons
                        name={discount.icon}
                        size={32}
                        color="#FFFFFF"
                      />
                    </View>
                    <View style={styles.discountTitleContainer}>
                      <Text style={styles.discountTitle}>{discount.title}</Text>
                      <Text style={styles.discountDescription}>
                        {discount.description}
                      </Text>
                    </View>
                  </LinearGradient>

                  <View style={styles.discountFooter}>
                    <View style={styles.coinsRequired}>
                      <MaterialIcons name="stars" size={18} color="#F59E0B" />
                      <Text style={styles.coinsRequiredText}>
                        {discount.coins} coins
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.redeemButton,
                        !canRedeem && styles.disabledButton,
                      ]}
                      disabled={!canRedeem}
                      onPress={() => handleRedeem(discount)}
                    >
                      <Text style={styles.redeemButtonText}>
                        {canRedeem ? 'Redeem' : 'Locked'}
                      </Text>
                      <MaterialIcons
                        name={canRedeem ? 'arrow-forward' : 'lock'}
                        size={18}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#10B981" />
            <Text style={styles.infoBannerText}>
              Redeemed discounts will be automatically applied on your next
              eligible order!
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
    shadowColor: '#10B981',
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
    color: '#D1FAE5',
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
  discountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  disabledCard: {
    opacity: 0.6,
  },
  discountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  discountIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
},
discountTitleContainer: {
flex: 1,
},
discountTitle: {
fontSize: 20,
fontWeight: 'bold',
fontFamily: 'Poppins-Regular',
color: '#FFFFFF',
marginBottom: 4,
},
discountDescription: {
fontSize: 14,
fontFamily: 'Poppins-Regular',
color: '#FFFFFF',
opacity: 0.9,
},
discountFooter: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 16,
backgroundColor: '#F8FAFC',
},
coinsRequired: {
flexDirection: 'row',
alignItems: 'center',
gap: 6,
},
coinsRequiredText: {
fontSize: 15,
fontWeight: '600',
fontFamily: 'Poppins-Regular',
color: '#0F172A',
},
redeemButton: {
flexDirection: 'row',
backgroundColor: '#10B981',
paddingHorizontal: 20,
paddingVertical: 10,
borderRadius: 8,
alignItems: 'center',
gap: 6,
},
disabledButton: {
backgroundColor: '#94A3B8',
},
redeemButtonText: {
color: '#FFFFFF',
fontSize: 15,
fontWeight: 'bold',
fontFamily: 'Poppins-Regular',
},
infoBanner: {
flexDirection: 'row',
backgroundColor: '#D1FAE5',
padding: 16,
borderRadius: 12,
marginHorizontal: 16,
marginTop: 8,
alignItems: 'center',
borderWidth: 1,
borderColor: '#A7F3D0',
},
infoBannerText: {
flex: 1,
fontSize: 13,
fontFamily: 'Poppins-Regular',
color: '#065F46',
marginLeft: 12,
lineHeight: 18,
},
});
export default GetDiscountScreen;
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const TransferToWalletScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute();
  const availableCoins = 850; // You can get this from route.params if passed

  const [transferAmount, setTransferAmount] = useState('');
  const [showBankForm, setShowBankForm] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
    accountHolderName: '',
  });

  const maxTransferAmount = Math.floor(availableCoins / 10);

  const handleQuickAmount = (amount: number) => {
    if (amount <= maxTransferAmount) {
      setTransferAmount(amount.toString());
    }
  };

  const handleTransfer = () => {
    // Implement transfer logic
    console.log('Transfer initiated:', {
      amount: transferAmount,
      coins: parseInt(transferAmount) * 10,
      ...bankDetails,
    });
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
          <Text style={styles.headerTitle}>Transfer to Wallet</Text>
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
              colors={['#3B82F6', '#2563EB', '#1D4ED8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceLabel}>Available Coins</Text>
                <Text style={styles.balanceAmount}>{availableCoins}</Text>
                <Text style={styles.balanceSubtext}>
                  ≈ ₹{maxTransferAmount}
                </Text>
              </View>

              <View style={styles.coinsIconContainer}>
                <MaterialIcons name="stars" size={60} color="#FCD34D" />
              </View>
            </LinearGradient>
          </View>

          {/* Transfer Amount Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enter Transfer Amount</Text>
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Amount (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={transferAmount}
                onChangeText={setTransferAmount}
              />
              <Text style={styles.inputHint}>
                Maximum: ₹{maxTransferAmount} • 10 coins = ₹1
              </Text>

              {/* Quick Amount Buttons */}
              <View style={styles.quickAmountContainer}>
                {[50, 100, 200].map(amount => (
                  <TouchableOpacity
                    key={amount}
                    style={[
                      styles.quickAmountBtn,
                      transferAmount === amount.toString() &&
                        styles.quickAmountBtnActive,
                    ]}
                    onPress={() => handleQuickAmount(amount)}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        transferAmount === amount.toString() &&
                          styles.quickAmountTextActive,
                      ]}
                    >
                      ₹{amount}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Bank Details Form */}
          {!showBankForm ? (
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => setShowBankForm(true)}
            >
              <MaterialIcons
                name="account-balance"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.primaryButtonText}>Add Bank Details</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Bank Account Details</Text>
              <View style={styles.inputCard}>
                <Text style={styles.inputLabel}>Account Holder Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter account holder name"
                  placeholderTextColor="#94A3B8"
                  value={bankDetails.accountHolderName}
                  onChangeText={val =>
                    setBankDetails({ ...bankDetails, accountHolderName: val })
                  }
                />

                <Text style={styles.inputLabel}>Account Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter account number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={bankDetails.accountNumber}
                  onChangeText={val =>
                    setBankDetails({ ...bankDetails, accountNumber: val })
                  }
                />

                <Text style={styles.inputLabel}>Confirm Account Number</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Re-enter account number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={bankDetails.confirmAccountNumber}
                  onChangeText={val =>
                    setBankDetails({
                      ...bankDetails,
                      confirmAccountNumber: val,
                    })
                  }
                />

                <Text style={styles.inputLabel}>IFSC Code</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter IFSC code"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="characters"
                  value={bankDetails.ifsc}
                  onChangeText={val =>
                    setBankDetails({ ...bankDetails, ifsc: val })
                  }
                />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleTransfer}
                >
                  <MaterialIcons
                    name="account-balance-wallet"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={styles.primaryButtonText}>
                    Transfer ₹{transferAmount || '0'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#3B82F6" />
            <View style={styles.infoBannerContent}>
              <Text style={styles.infoBannerText}>
                • Transfers usually take 2-3 business days
              </Text>
              <Text style={styles.infoBannerText}>
                • Minimum transfer amount: ₹50
              </Text>
              <Text style={styles.infoBannerText}>
                • No transaction fees applied
              </Text>
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
    minHeight: 160,
    elevation: 8,
    shadowColor: '#3B82F6',
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
    color: '#DBEAFE',
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
    color: '#DBEAFE',
  },
  coinsIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    opacity: 0.2,
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
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
  inputHint: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginTop: 6,
  },
  quickAmountContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  quickAmountBtn: {
    flex: 1,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  quickAmountBtnActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  quickAmountText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  quickAmountTextActive: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    gap: 8,
    elevation: 4,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  infoBannerContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoBannerText: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#1E40AF',
    lineHeight: 20,
    marginBottom: 4,
  },
});

export default TransferToWalletScreen;
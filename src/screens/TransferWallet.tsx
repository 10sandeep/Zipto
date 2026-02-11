import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { vehicleApi } from '../api/vehicle';

const TransferToWalletScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [availableCoins, setAvailableCoins] = useState(0);
  const [rupeeValue, setRupeeValue] = useState(0);
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);
  const [coinsToTransfer, setCoinsToTransfer] = useState('');
  const [successModal, setSuccessModal] = useState<{
    coins: number;
    rupees: number;
    remaining: number;
  } | null>(null);

  // Parse rate to get coins per rupee (e.g. "100 coins = ₹2" → 50 coins per rupee)
  const coinsPerRupee = rate
    ? (() => {
        const match = rate.match(/(\d+)\s*coins?\s*=\s*₹(\d+)/i);
        if (match) return parseInt(match[1]) / parseInt(match[2]);
        return 50; // fallback
      })()
    : 50;

  const coinsNum = parseInt(coinsToTransfer) || 0;
  const rupeeEquivalent = coinsNum / coinsPerRupee;

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      const res = await vehicleApi.getCoinsBalance();
      setAvailableCoins(res.coins ?? 0);
      setRupeeValue(res.rupee_value ?? 0);
      setRate(res.rate ?? '');
    } catch (err) {
      console.error('Failed to fetch balance:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const handleQuickCoins = (amount: number) => {
    if (amount <= availableCoins) {
      setCoinsToTransfer(amount.toString());
    }
  };

  const handleTransfer = async () => {
    if (coinsNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid number of coins.');
      return;
    }
    if (coinsNum > availableCoins) {
      Alert.alert('Insufficient Coins', `You only have ${availableCoins} coins available.`);
      return;
    }
    const minCoins = coinsPerRupee; // minimum 1 rupee worth
    if (coinsNum < minCoins) {
      Alert.alert('Minimum Transfer', `Minimum transfer is ${minCoins} coins (₹1).`);
      return;
    }

    try {
      setTransferring(true);
      const res = await vehicleApi.transferToWallet({ coins: coinsNum });
      if (res.success) {
        setSuccessModal({
          coins: res.data?.coins_deducted ?? coinsNum,
          rupees: res.data?.rupee_value ?? rupeeEquivalent,
          remaining: res.data?.remaining_coins ?? (availableCoins - coinsNum),
        });
        setAvailableCoins(res.data?.remaining_coins ?? (availableCoins - coinsNum));
        setCoinsToTransfer('');
      } else {
        Alert.alert('Transfer Failed', res.message || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      Alert.alert(
        'Transfer Failed',
        err.response?.data?.message || err.message || 'Something went wrong. Please try again.',
      );
    } finally {
      setTransferring(false);
    }
  };

  const quickAmounts = [
    { label: '100', value: 100 },
    { label: '250', value: 250 },
    { label: '500', value: 500 },
    { label: 'All', value: availableCoins },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Transfer to Wallet</Text>
            <View style={{ width: 40 }} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading balance...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
                  ≈ ₹{(availableCoins / coinsPerRupee).toFixed(2)}
                </Text>
              </View>
              <View style={styles.coinsIconContainer}>
                <MaterialIcons name="stars" size={60} color="#FCD34D" />
              </View>
            </LinearGradient>
          </View>

          {/* Transfer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How many coins to transfer?</Text>
            <View style={styles.inputCard}>
              <View style={styles.inputRow}>
                <MaterialIcons name="stars" size={24} color="#F59E0B" />
                <TextInput
                  style={styles.input}
                  placeholder="Enter coins"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                  value={coinsToTransfer}
                  onChangeText={setCoinsToTransfer}
                />
              </View>

              {coinsNum > 0 && (
                <View style={styles.conversionRow}>
                  <MaterialIcons name="swap-vert" size={18} color="#6366F1" />
                  <Text style={styles.conversionText}>
                    {coinsNum} coins = ₹{rupeeEquivalent.toFixed(2)}
                  </Text>
                </View>
              )}

              {coinsNum > availableCoins && (
                <Text style={styles.errorText}>Exceeds available coins</Text>
              )}

              {/* Quick Amount Buttons */}
              <View style={styles.quickAmountContainer}>
                {quickAmounts.map(item => (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.quickAmountBtn,
                      coinsToTransfer === item.value.toString() && styles.quickAmountBtnActive,
                      item.value > availableCoins && styles.quickAmountBtnDisabled,
                    ]}
                    onPress={() => handleQuickCoins(item.value)}
                    disabled={item.value > availableCoins}
                  >
                    <Text
                      style={[
                        styles.quickAmountText,
                        coinsToTransfer === item.value.toString() && styles.quickAmountTextActive,
                        item.value > availableCoins && styles.quickAmountTextDisabled,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Transfer Summary */}
          {coinsNum > 0 && coinsNum <= availableCoins && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Transfer Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Coins to transfer</Text>
                  <Text style={styles.summaryValue}>{coinsNum}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Wallet credit</Text>
                  <Text style={[styles.summaryValue, { color: '#10B981' }]}>₹{rupeeEquivalent.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Remaining coins</Text>
                  <Text style={styles.summaryValue}>{availableCoins - coinsNum}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Transfer Button */}
          <TouchableOpacity
            style={[
              styles.transferButton,
              (coinsNum <= 0 || coinsNum > availableCoins || transferring) && styles.transferButtonDisabled,
            ]}
            onPress={handleTransfer}
            disabled={coinsNum <= 0 || coinsNum > availableCoins || transferring}
            activeOpacity={0.8}
          >
            {transferring ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <MaterialIcons name="account-balance-wallet" size={22} color="#FFFFFF" />
                <Text style={styles.transferButtonText}>
                  Transfer{coinsNum > 0 ? ` ₹${rupeeEquivalent.toFixed(2)}` : ''} to Wallet
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Info Banner */}
          <View style={styles.infoBanner}>
            <MaterialIcons name="info" size={20} color="#3B82F6" />
            <View style={styles.infoBannerContent}>
              <Text style={styles.infoBannerText}>
                • {rate || '50 coins = ₹1'}
              </Text>
              <Text style={styles.infoBannerText}>
                • Transferred amount is added to your Zipto wallet instantly
              </Text>
              <Text style={styles.infoBannerText}>
                • Wallet balance can be used for future bookings
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Success Modal */}
      <Modal visible={!!successModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <MaterialIcons name="check-circle" size={64} color="#10B981" />
            </View>
            <Text style={styles.modalTitle}>Transfer Successful!</Text>
            <Text style={styles.modalSubtitle}>
              {successModal?.coins} coins converted to ₹{successModal?.rupees.toFixed(2)}
            </Text>
            <View style={styles.modalInfoRow}>
              <Text style={styles.modalInfoLabel}>Remaining Coins</Text>
              <Text style={styles.modalInfoValue}>{successModal?.remaining}</Text>
            </View>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setSuccessModal(null);
                navigation.goBack();
              }}
            >
              <Text style={styles.modalButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    minHeight: 150,
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
    color: '#DBEAFE',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 16,
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    paddingVertical: 14,
    marginLeft: 10,
  },
  conversionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  conversionText: {
    fontSize: 14,
    color: '#6366F1',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 13,
    color: '#EF4444',
    marginTop: 6,
    fontWeight: '500',
  },
  quickAmountContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  quickAmountBtn: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  quickAmountBtnActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
  },
  quickAmountBtnDisabled: {
    backgroundColor: '#F1F5F9',
    opacity: 0.5,
  },
  quickAmountText: {
    color: '#3B82F6',
    fontWeight: '600',
    fontSize: 14,
  },
  quickAmountTextActive: {
    color: '#1D4ED8',
    fontWeight: 'bold',
  },
  quickAmountTextDisabled: {
    color: '#94A3B8',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  transferButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 10,
    elevation: 4,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  transferButtonDisabled: {
    backgroundColor: '#94A3B8',
    elevation: 0,
    shadowOpacity: 0,
  },
  transferButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    color: '#1E40AF',
    lineHeight: 20,
    marginBottom: 2,
  },
  // Success Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    alignItems: 'center',
  },
  modalIcon: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalInfoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  modalInfoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  modalButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransferToWalletScreen;

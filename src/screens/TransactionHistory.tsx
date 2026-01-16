import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TransactionHistoryScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const transactions = [
    {
      id: '1',
      type: 'earned',
      description: 'Order completed #1234',
      amount: 10,
      date: '2 hours ago',
      icon: 'local-shipping',
    },
    {
      id: '2',
      type: 'spent',
      description: 'Delivery discount applied',
      amount: -50,
      date: 'Yesterday',
      icon: 'local-offer',
    },
    {
      id: '3',
      type: 'earned',
      description: 'Friend referral bonus',
      amount: 50,
      date: '2 days ago',
      icon: 'share',
    },
    {
      id: '4',
      type: 'earned',
      description: 'Review written',
      amount: 5,
      date: '3 days ago',
      icon: 'star',
    },
    {
      id: '5',
      type: 'spent',
      description: 'Voucher redeemed - Amazon',
      amount: -100,
      date: '5 days ago',
      icon: 'card-giftcard',
    },
    {
      id: '6',
      type: 'earned',
      description: 'Special event bonus',
      amount: 100,
      date: '1 week ago',
      icon: 'celebration',
    },
    {
      id: '7',
      type: 'spent',
      description: 'Transfer to wallet',
      amount: -200,
      date: '1 week ago',
      icon: 'account-balance-wallet',
    },
  ];

  const renderTransaction = ({ item }: { item: typeof transactions[0] }) => (
    <View style={styles.transactionCard}>
      <View
        style={[
          styles.transactionIcon,
          item.type === 'earned'
            ? styles.earnedIconBg
            : styles.spentIconBg,
        ]}
      >
        <MaterialIcons
          name={item.icon}
          size={24}
          color={item.type === 'earned' ? '#16A34A' : '#DC2626'}
        />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          item.type === 'earned'
            ? styles.earnedAmount
            : styles.spentAmount,
        ]}
      >
        {item.amount > 0 ? '+' : ''}
        {item.amount}
      </Text>
    </View>
  );

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
          <Text style={styles.headerTitle}>Transaction History</Text>
          <View style={{ width: 40 }} />
        </View>

        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  listContent: {
    padding: 16,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedIconBg: {
    backgroundColor: '#DCFCE7',
  },
  spentIconBg: {
    backgroundColor: '#FEE2E2',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  earnedAmount: {
    color: '#16A34A',
  },
  spentAmount: {
    color: '#DC2626',
  },
});

export default TransactionHistoryScreen;
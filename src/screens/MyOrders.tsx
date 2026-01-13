import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomTabBar from './BottomTabBar';

interface Order {
  id: string;
  type: string;
  pickup: string;
  dropoff: string;
  status: string;
  date: string;
  time: string;
  amount: string;
  icon: string;
  color: string;
  estimatedTime?: string;
  deliveryTime?: string;
}

const { width } = Dimensions.get('window');

// Sample data for orders
const activeOrdersData = [
  {
    id: 'ORD001',
    type: 'Send Packages',
    pickup: 'Saheed Nagar, Bhubaneswar',
    dropoff: 'Patia, Bhubaneswar',
    status: 'In Transit',
    date: '2026-01-09',
    time: '10:30 AM',
    amount: '₹150',
    icon: 'local-shipping',
    color: '#3B82F6',
    estimatedTime: '15 mins',
  },
  {
    id: 'ORD002',
    type: 'Food Delivery',
    pickup: 'Paradise Restaurant',
    dropoff: 'Khandagiri, Bhubaneswar',
    status: 'Preparing',
    date: '2026-01-09',
    time: '11:45 AM',
    amount: '₹320',
    icon: 'restaurant',
    color: '#F59E0B',
    estimatedTime: '25 mins',
  },
  {
    id: 'ORD003',
    type: 'Medicine',
    pickup: 'Apollo Pharmacy',
    dropoff: 'Chandrasekharpur',
    status: 'Pickup Pending',
    date: '2026-01-09',
    time: '12:15 PM',
    amount: '₹85',
    icon: 'local-pharmacy',
    color: '#EF4444',
    estimatedTime: '30 mins',
  },
];

const completedOrdersData = [
  {
    id: 'ORD004',
    type: 'Transport Goods',
    pickup: 'Master Canteen Square',
    dropoff: 'Nayapalli, Bhubaneswar',
    status: 'Delivered',
    date: '2026-01-08',
    time: '04:30 PM',
    amount: '₹450',
    icon: 'fire-truck',
    color: '#10B981',
    deliveryTime: '45 mins',
  },
  {
    id: 'ORD005',
    type: 'Send Packages',
    pickup: 'Vani Vihar',
    dropoff: 'Infocity, Bhubaneswar',
    status: 'Delivered',
    date: '2026-01-07',
    time: '02:15 PM',
    amount: '₹200',
    icon: 'local-shipping',
    color: '#3B82F6',
    deliveryTime: '30 mins',
  },
  {
    id: 'ORD006',
    type: 'Food Delivery',
    pickup: 'The Yellow Chilli',
    dropoff: 'Jaydev Vihar',
    status: 'Delivered',
    date: '2026-01-06',
    time: '08:45 PM',
    amount: '₹580',
    icon: 'restaurant',
    color: '#F59E0B',
    deliveryTime: '35 mins',
  },
  {
    id: 'ORD007',
    type: 'Medicine',
    pickup: 'MedPlus Pharmacy',
    dropoff: 'Rasulgarh',
    status: 'Delivered',
    date: '2026-01-05',
    time: '11:20 AM',
    amount: '₹120',
    icon: 'local-pharmacy',
    color: '#EF4444',
    deliveryTime: '20 mins',
  },
  {
    id: 'ORD008',
    type: 'Send Packages',
    pickup: 'Baramunda',
    dropoff: 'Chandaka',
    status: 'Delivered',
    date: '2026-01-04',
    time: '03:00 PM',
    amount: '₹175',
    icon: 'local-shipping',
    color: '#3B82F6',
    deliveryTime: '40 mins',
  },
];

const MyOrders = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [activeTab, setActiveTab] = useState('active');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return '#3B82F6';
      case 'Preparing':
        return '#F59E0B';
      case 'Pickup Pending':
        return '#EF4444';
      case 'Delivered':
        return '#10B981';
      default:
        return '#64748B';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'local-shipping';
      case 'Preparing':
        return 'restaurant';
      case 'Pickup Pending':
        return 'pending';
      case 'Delivered':
        return 'check-circle';
      default:
        return 'info';
    }
  };

  const OrderCard = ({
    order,
    isActive,
  }: {
    order: Order;
    isActive: boolean;
  }) => (
    <TouchableOpacity
      style={styles.orderCard}
      activeOpacity={0.7}
      onPress={() => {
        // Navigate to order details or track order
        if (isActive) {
          navigation.navigate('TrackOrder', { orderId: order.id });
        }
      }}
    >
      {/* Order Header */}
      <View style={styles.orderHeader}>
        <View style={styles.orderHeaderLeft}>
          <View
            style={[
              styles.orderIconContainer,
              { backgroundColor: order.color + '20' },
            ]}
          >
            <MaterialIcons name={order.icon} size={24} color={order.color} />
          </View>
          <View style={styles.orderHeaderText}>
            <Text style={styles.orderType}>{order.type}</Text>
            <Text style={styles.orderId}>Order #{order.id}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(order.status) + '20' },
          ]}
        >
          <MaterialIcons
            name={getStatusIcon(order.status)}
            size={14}
            color={getStatusColor(order.status)}
          />
          <Text
            style={[styles.statusText, { color: getStatusColor(order.status) }]}
          >
            {order.status}
          </Text>
        </View>
      </View>

      {/* Pickup and Dropoff */}
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.locationDot} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationText}>{order.pickup}</Text>
          </View>
        </View>
        <View style={styles.locationLine} />
        <View style={styles.locationRow}>
          <View style={[styles.locationDot, { backgroundColor: '#10B981' }]} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Drop-off</Text>
            <Text style={styles.locationText}>{order.dropoff}</Text>
          </View>
        </View>
      </View>

      {/* Order Footer */}
      <View style={styles.orderFooter}>
        <View style={styles.orderFooterLeft}>
          <MaterialIcons name="schedule" size={16} color="#64748B" />
          <Text style={styles.footerText}>
            {order.date} • {order.time}
          </Text>
        </View>
        <View style={styles.orderFooterRight}>
          {isActive && order.estimatedTime && (
            <View style={styles.timeEstimate}>
              <MaterialIcons name="access-time" size={14} color="#3B82F6" />
              <Text style={styles.timeEstimateText}>{order.estimatedTime}</Text>
            </View>
          )}
          <Text style={styles.amountText}>{order.amount}</Text>
        </View>
      </View>

      {/* Track Button for Active Orders */}
      {isActive && (
        <TouchableOpacity
          style={styles.trackButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('TrackOrder', { orderId: order.id })
          }
        >
          <MaterialIcons name="my-location" size={18} color="#FFFFFF" />
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Orders</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText,
              ]}
            >
              Active Orders
            </Text>
            {activeOrdersData.length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>
                  {activeOrdersData.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
            {completedOrdersData.length > 0 && (
              <View style={styles.tabBadge}>
                <Text style={styles.tabBadgeText}>
                  {completedOrdersData.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {activeTab === 'active' ? (
            activeOrdersData.length > 0 ? (
              activeOrdersData.map(order => (
                <OrderCard key={order.id} order={order} isActive={true} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="inbox" size={64} color="#CBD5E1" />
                <Text style={styles.emptyStateTitle}>No Active Orders</Text>
                <Text style={styles.emptyStateText}>
                  You don't have any active orders at the moment
                </Text>
              </View>
            )
          ) : completedOrdersData.length > 0 ? (
            completedOrdersData.map(order => (
              <OrderCard key={order.id} order={order} isActive={false} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="inbox" size={64} color="#CBD5E1" />
              <Text style={styles.emptyStateTitle}>No Completed Orders</Text>
              <Text style={styles.emptyStateText}>
                Your completed orders will appear here
              </Text>
            </View>
          )}
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  orderIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderHeaderText: {
    flex: 1,
  },
  orderType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  orderId: {
    fontSize: 13,
    color: '#64748B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3B82F6',
    marginTop: 4,
    marginRight: 12,
  },
  locationLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginLeft: 5,
    marginVertical: 4,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  orderFooterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
  },
  orderFooterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  timeEstimateText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 6,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default MyOrders;

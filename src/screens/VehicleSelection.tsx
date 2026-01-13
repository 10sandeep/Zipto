import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const VEHICLES = [
  {
    id: '1',
    name: 'Bike',
    priceRange: '₹50-150',
    basePrice: 50,
    time: '5 min',
    capacity: '20 kg',
    icon: 'two-wheeler',
    emoji: '🏍️',
  },
  {
    id: '2',
    name: 'Tata Ace',
    priceRange: '₹250-500',
    basePrice: 250,
    time: '12 min',
    capacity: '750 kg',
    icon: 'local-shipping',
    emoji: '🚐',
  },
  {
    id: '3',
    name: 'Truck',
    priceRange: '₹450-800',
    basePrice: 450,
    time: '15 min',
    capacity: '1000 kg',
    icon: 'local-shipping',
    emoji: '🚚',
  },
  {
    id: '4',
    name: '3 Wheeler',
    priceRange: '₹200-400',
    basePrice: 200,
    time: '8 min',
    capacity: '500 kg',
    icon: 'local-shipping',
    emoji: '🛺',
  },
];

const VehicleSelection = () => {
  const navigation = useNavigation<any>();
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [withHelper, setWithHelper] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const buttonScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Content fade in
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Button entrance
    setTimeout(() => {
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }, 300);
  }, []);

  const handleBook = () => {
    if (selectedVehicle) {
      const vehicle = VEHICLES.find(v => v.id === selectedVehicle);
      const helperCost = withHelper ? 300 : 0;
      navigation.navigate('FareEstimate', {
        vehicle,
        withHelper,
        helperCost,
      });
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedVehicle) return '₹0';
    const vehicle = VEHICLES.find(v => v.id === selectedVehicle);
    const helperCost = withHelper ? 300 : 0;
    return `₹${vehicle.basePrice + helperCost}`;
  };

  const renderVehicleCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        selectedVehicle === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedVehicle(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.vehicleIcon}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>
          {item.capacity} • {item.time}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceRange}>{item.priceRange}</Text>
        {selectedVehicle === item.id && (
          <View style={styles.checkmark}>
            <Icon name="check-circle" size={24} color="#10B981" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.sectionTitle}>Available Vehicles</Text>
    </View>
  );

  const renderListFooter = () => (
    <View style={styles.helperSection}>
      <Text style={styles.sectionTitle}>Additional Services</Text>
      <TouchableOpacity
        style={[styles.helperCard, withHelper && styles.helperCardSelected]}
        onPress={() => setWithHelper(!withHelper)}
        activeOpacity={0.7}
      >
        <View style={styles.helperIconContainer}>
          <Text style={styles.helperEmoji}>👷</Text>
        </View>
        <View style={styles.helperInfo}>
          <Text style={styles.helperTitle}>Add Helper</Text>
          <Text style={styles.helperDescription}>
            Get assistance with loading & unloading
          </Text>
        </View>
        <View style={styles.helperPriceContainer}>
          <Text style={styles.helperPrice}>+₹300</Text>
          <View
            style={[
              styles.checkbox,
              withHelper && styles.checkboxSelected,
            ]}
          >
            {withHelper && <Icon name="check" size={16} color="#FFFFFF" />}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Vehicle</Text>
        </View>

        {/* Scrollable Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <FlatList
            data={VEHICLES}
            keyExtractor={item => item.id}
            renderItem={renderVehicleCard}
            ListHeaderComponent={renderListHeader}
            ListFooterComponent={renderListFooter}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          />
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          {selectedVehicle && (
            <View style={styles.priceBreakdown}>
              <Text style={styles.totalLabel}>Estimated Total</Text>
              <Text style={styles.totalPrice}>{calculateTotalPrice()}</Text>
            </View>
          )}
          <Animated.View
            style={{
              transform: [{ scale: buttonScale }],
            }}
          >
            <TouchableOpacity
              style={[styles.nextButton, !selectedVehicle && styles.nextButtonDisabled]}
              onPress={handleBook}
              disabled={!selectedVehicle}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.nextButtonText,
                  !selectedVehicle && styles.nextButtonTextDisabled,
                ]}
              >
                Continue to Book
              </Text>
              <Text style={[styles.arrow, !selectedVehicle && styles.arrowDisabled]}>→</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
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
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  listHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  vehicleIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 32,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#64748B',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceRange: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  checkmark: {
    marginTop: 4,
  },
  helperSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  helperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  helperCardSelected: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  helperIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helperEmoji: {
    fontSize: 28,
  },
  helperInfo: {
    flex: 1,
  },
  helperTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  helperDescription: {
    fontSize: 13,
    color: '#64748B',
  },
  helperPriceContainer: {
    alignItems: 'flex-end',
  },
  helperPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  footer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  priceBreakdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  nextButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  nextButtonTextDisabled: {
    color: '#94A3B8',
  },
  arrow: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  arrowDisabled: {
    color: '#94A3B8',
  },
});

export default VehicleSelection;
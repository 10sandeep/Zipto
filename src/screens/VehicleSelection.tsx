import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { vehicleApi, VehicleType } from '../api/vehicle';

// Emoji mapping for vehicle types
const VEHICLE_EMOJIS: Record<string, string> = {
  bike: '🏍️',
  tata_ace: '🚐',
  pickup_van: '🚐',
  mini_truck: '🚚',
};

// UI Vehicle type (transformed from API)
interface UIVehicle {
  id: string;
  name: string;
  priceRange: string;
  basePrice: number;
  capacity: string;
  emoji: string;
}

const VehicleSelection = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [withHelper, setWithHelper] = useState(false);
  const [vehicles, setVehicles] = useState<UIVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get data from route params
  const { pickup, drop, pickupCoords, dropCoords } = route.params || {};

  // Animated values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Fetch vehicle types on mount
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vehicleApi.getVehicleTypes();

      if (response.success && response.data) {
        // Transform API data to UI format
        const transformedVehicles: UIVehicle[] = response.data.map(
          (vehicle: VehicleType) => ({
            id: vehicle.type,
            name: vehicle.name,
            priceRange: `From ₹${vehicle.base_fare}`,
            basePrice: vehicle.base_fare,
            capacity: vehicle.capacity_range,
            emoji: VEHICLE_EMOJIS[vehicle.type] || '🚗',
          }),
        );

        setVehicles(transformedVehicles);
      } else {
        throw new Error('Failed to fetch vehicle types');
      }
    } catch (err) {
      console.error('Error fetching vehicle types:', err);
      setError('Failed to load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = () => {
    if (selectedVehicle) {
      const vehicle = vehicles.find((v: UIVehicle) => v.id === selectedVehicle);
      const helperCost = withHelper ? 300 : 0;
      navigation.navigate('FareEstimate', {
        vehicle,
        pickup,
        drop,
        pickupCoords,
        dropCoords,
        withHelper,
        helperCost,
      });
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedVehicle) return '₹0';
    const vehicle = vehicles.find((v: UIVehicle) => v.id === selectedVehicle);
    const helperCost = withHelper ? 300 : 0;
    return `₹${vehicle?.basePrice || 0 + helperCost}`;
  };

  const renderVehicleCard = ({ item }: { item: UIVehicle }) => (
    <TouchableOpacity
      style={[styles.card, selectedVehicle === item.id && styles.selectedCard]}
      onPress={() => setSelectedVehicle(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.vehicleIcon}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.capacity}</Text>
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
            style={[styles.checkbox, withHelper && styles.checkboxSelected]}
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
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
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text style={styles.loadingText}>Loading vehicles...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Icon name="error-outline" size={48} color="#EF4444" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={fetchVehicleTypes}
                activeOpacity={0.7}
              >
                <Icon name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={vehicles}
              keyExtractor={item => item.id}
              renderItem={renderVehicleCard}
              ListHeaderComponent={renderListHeader}
              ListFooterComponent={renderListFooter}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
            />
          )}
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
              style={[
                styles.nextButton,
                !selectedVehicle && styles.nextButtonDisabled,
              ]}
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
              <Text
                style={[styles.arrow, !selectedVehicle && styles.arrowDisabled]}
              >
                →
              </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VehicleSelection;

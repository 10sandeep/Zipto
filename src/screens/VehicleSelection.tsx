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
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { vehicleApi, VehiclePricing } from '../api/vehicle';

// Image mapping for vehicle types (lowercase keys to match API)
const VEHICLE_IMAGES: Record<string, any> = {
  bike: require('../assets/images/vehicle2.png'),
  scooty: require('../assets/images/scooter.png'),
  auto: require('../assets/images/vehicle1.png'),
  pickup: require('../assets/images/vehicle3.png'),
  mini_truck: require('../assets/images/vehicle3.png'),
  tata_ace: require('../assets/images/vehicle3.png'),
  tata_407: require('../assets/images/vehicle3.png'),
};

// UI Vehicle type (transformed from API)
export interface UIVehicle {
  id: string;
  vehicleType: string;
  name: string;
  priceRange: string;
  basePrice: number;
  perKmRate: number;
  minimumFare: number;
  capacity: string;
  helperCharge: number;
  helperAvailable: boolean; // Added this
  bestFor: string | null;
  city: string;
  perMinuteRate: number;
  nightSurchargePercent: number;
  multiStopFee: number;
}

// Helper to format vehicle_type → display name
const formatVehicleName = (vehicleType: string): string => {
  return vehicleType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const VehicleSelection = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [helperCount, setHelperCount] = useState(0);
  const [vehicles, setVehicles] = useState<UIVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    pickup,
    drop,
    pickupCoords,
    dropCoords,
    city,
    serviceCategory,
    senderName,
    senderMobile,
  } = route.params || {};

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  const fetchVehicleTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem('auth_token');
      console.log('Auth Token:', token ? 'Exists' : 'Missing');

      const response: any = await vehicleApi.getVehiclePricing();
      console.log(
        'Vehicle Pricing Response:',
        JSON.stringify(response, null, 2),
      );

      let vehiclesData: VehiclePricing[] = [];
      if (Array.isArray(response)) {
        vehiclesData = response;
      } else if (response && Array.isArray(response.data)) {
        vehiclesData = response.data;
      }

      if (vehiclesData.length > 0) {
        const transformedVehicles: UIVehicle[] = vehiclesData
          .filter((v: VehiclePricing) => v.is_active)
          .map((vehicle: VehiclePricing) => {
            const capMin = vehicle.capacity_min || 0;
            const capMax = vehicle.capacity_max || 0;
            const capacity =
              capMin > 0 && capMax > 0
                ? `${capMin}–${capMax} kg`
                : capMax > 0
                ? `Up to ${capMax} kg`
                : 'Any load';

            return {
              id: vehicle.id, // UUID
              vehicleType: vehicle.vehicle_type, // raw type string
              name: formatVehicleName(vehicle.vehicle_type),
              priceRange: `From ₹${vehicle.minimum_fare || vehicle.base_fare}`,
              basePrice: parseFloat(vehicle.base_fare),
              perKmRate: parseFloat(vehicle.per_km_rate),
              minimumFare: parseFloat(vehicle.minimum_fare),
              capacity,
              helperCharge: parseFloat(vehicle.helper_charge_per_person) || 200,
              helperAvailable: vehicle.helper_available,
              bestFor: vehicle.best_for,
              city: vehicle.city,
              perMinuteRate: parseFloat(vehicle.per_minute_rate),
              nightSurchargePercent: parseFloat(
                vehicle.night_surcharge_percent,
              ),
              multiStopFee: parseFloat(vehicle.multi_stop_fee),
            };
          });

        setVehicles(transformedVehicles);
      } else {
        throw new Error('No vehicle data received');
      }
    } catch (err) {
      console.error('Error fetching vehicle types:', err);
      setError('Failed to load vehicles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedVehicleData = (): UIVehicle | undefined =>
    vehicles.find(v => v.id === selectedVehicle);

  const handleBook = () => {
    const vehicle = getSelectedVehicleData();
    if (!vehicle) return;

    const helperCost = helperCount * vehicle.helperCharge;
    navigation.navigate('FareEstimate', {
      vehicle,
      pickup,
      drop,
      pickupCoords,
      dropCoords,
      hasHelper: helperCount > 0,
      helperCount,
      helperCost,
      city,
      serviceCategory,
      senderName,
      senderMobile,
    });
  };

  const calculateTotalPrice = (): string => {
    const vehicle = getSelectedVehicleData();
    if (!vehicle) return '₹0';
    const helperCost = helperCount * vehicle.helperCharge;
    return `₹${(vehicle.minimumFare + helperCost).toFixed(0)}`;
  };

  const renderVehicleCard = ({ item }: { item: UIVehicle }) => {
    const isSelected = selectedVehicle === item.id;
    const vehicleImage = item.vehicleType
      ? VEHICLE_IMAGES[item.vehicleType.toLowerCase()]
      : undefined;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedVehicle(item.id)}
        activeOpacity={0.7}
      >
        {/* Vehicle Image */}
        <View
          style={[styles.vehicleIcon, isSelected && styles.vehicleIconSelected]}
        >
          {vehicleImage ? (
            <Image
              source={vehicleImage}
              style={styles.vehicleImage}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.emoji}>🚛</Text>
          )}
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>
            {item.capacity}
            {item.bestFor ? ` • ${item.bestFor}` : ''}
          </Text>
          {/* Rate details row */}
          <View style={styles.rateRow}>
            <Text style={styles.rateText}>₹{item.perKmRate}/km</Text>
            <Text style={styles.rateSeparator}> · </Text>
            <Text style={styles.rateText}>Min ₹{item.minimumFare}</Text>
          </View>
        </View>

        {/* Price + Checkmark */}
        <View style={styles.priceContainer}>
          <Text
            style={[styles.priceRange, isSelected && styles.priceRangeSelected]}
          >
            {item.priceRange}
          </Text>
          {isSelected && (
            <View style={styles.checkmark}>
              <Icon name="check-circle" size={24} color="#10B981" />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Expanded detail panel shown below selected vehicle
  const renderSelectedDetails = () => {
    const vehicle = getSelectedVehicleData();
    if (!vehicle) return null;

    return (
      <View style={styles.detailPanel}>
        <Text style={styles.detailPanelTitle}>
          {vehicle.name} — Fare Details
        </Text>
        <View style={styles.detailGrid}>
          <DetailRow label="Base Fare" value={`₹${vehicle.basePrice}`} />
          <DetailRow label="Min Fare" value={`₹${vehicle.minimumFare}`} />
          <DetailRow label="Per KM" value={`₹${vehicle.perKmRate}`} />
          <DetailRow label="Per Minute" value={`₹${vehicle.perMinuteRate}`} />
          <DetailRow
            label="Night Surcharge"
            value={`${vehicle.nightSurchargePercent}%`}
          />
          <DetailRow
            label="Multi-stop Fee"
            value={`₹${vehicle.multiStopFee}`}
          />
          <DetailRow
            label="Helper Charge"
            value={`₹${vehicle.helperCharge}/person`}
          />
          <DetailRow label="City" value={vehicle.city} />
        </View>
      </View>
    );
  };

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.sectionTitle}>Available Vehicles</Text>
    </View>
  );

  const renderListFooter = () => {
    const selectedVehicleData = getSelectedVehicleData();
    const showHelper = selectedVehicleData?.helperAvailable === true;

    return (
      <>
        {renderSelectedDetails()}

        {showHelper && (
          <View style={styles.helperSection}>
            <Text style={styles.sectionTitle}>Additional Services</Text>
            <View
              style={[
                styles.helperCard,
                helperCount > 0 && styles.helperCardSelected,
              ]}
            >
              <View style={styles.helperIconContainer}>
                <Image
                  source={require('../assets/images/worker.png')}
                  style={styles.helperImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.helperInfo}>
                <Text style={styles.helperTitle}>Add Labour</Text>
                <Text style={styles.helperDescription}>
                  ₹{selectedVehicleData?.helperCharge ?? 200} per person
                </Text>
              </View>
              <View style={styles.counterContainer}>
                {helperCount > 0 ? (
                  <>
                    <TouchableOpacity
                      onPress={() => setHelperCount(h => Math.max(0, h - 1))}
                      style={styles.counterButton}
                    >
                      <Icon name="remove" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{helperCount}</Text>
                    <TouchableOpacity
                      onPress={() => setHelperCount(h => h + 1)}
                      style={styles.counterButton}
                    >
                      <Icon name="add" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => setHelperCount(1)}
                    style={styles.addButton}
                  >
                    <Text style={styles.addButtonText}>ADD</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        )}
      </>
    );
  };

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
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
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
              extraData={selectedVehicle} // re-render on selection change
            />
          )}
        </Animated.View>

        {/* Footer */}
        <View style={styles.footer}>
          {selectedVehicle && (
            <View style={styles.priceBreakdown}>
              <View>
                <Text style={styles.totalLabel}>Estimated Total</Text>
                {helperCount > 0 && (
                  <Text style={styles.helperBreakdown}>
                    +{helperCount} helper{helperCount > 1 ? 's' : ''} (₹
                    {helperCount *
                      (getSelectedVehicleData()?.helperCharge ?? 300)}
                    )
                  </Text>
                )}
              </View>
              <Text style={styles.totalPrice}>{calculateTotalPrice()}</Text>
            </View>
          )}
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
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
              <Image
                source={require('../assets/images/arrow.png')}
                style={[
                  styles.arrowIcon,
                  !selectedVehicle && styles.arrowDisabled,
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// ── Small reusable row for the detail panel ──────────────────────────────────
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  safeArea: { flex: 1 },

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
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },

  content: { flex: 1 },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  listHeader: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
  },

  /* Vehicle Card */
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
    width: 70,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(59,130,246,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  vehicleIconSelected: { backgroundColor: 'rgba(59,130,246,0.15)' },
  vehicleImage: { width: 58, height: 48 },
  emoji: { fontSize: 32 },

  info: { flex: 1 },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 3,
  },
  details: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  rateRow: { flexDirection: 'row', alignItems: 'center' },
  rateText: { fontSize: 12, color: '#3B82F6', fontWeight: '600' },
  rateSeparator: { fontSize: 12, color: '#94A3B8' },

  priceContainer: { alignItems: 'flex-end' },
  priceRange: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  priceRangeSelected: { color: '#2563EB' },
  checkmark: { marginTop: 4 },

  /* Detail Panel */
  detailPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    padding: 16,
    marginBottom: 20,
  },
  detailPanelTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 12,
  },
  detailGrid: { gap: 8 },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailLabel: { fontSize: 13, color: '#64748B' },
  detailValue: { fontSize: 13, fontWeight: '600', color: '#1E293B' },

  /* Helper Section */
  helperSection: { marginTop: 4, marginBottom: 10 },
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
    backgroundColor: 'rgba(16,185,129,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  helperImage: { width: 28, height: 28 },
  helperInfo: { flex: 1 },
  helperTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  helperDescription: { fontSize: 13, color: '#64748B' },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 4,
  },
  counterButton: {
    padding: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  counterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginHorizontal: 12,
  },
  addButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  addButtonText: { color: '#3B82F6', fontWeight: '600', fontSize: 14 },

  /* Footer */
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
  totalLabel: { fontSize: 16, color: '#64748B', fontWeight: '600' },
  helperBreakdown: { fontSize: 12, color: '#10B981', marginTop: 2 },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  nextButtonDisabled: { backgroundColor: '#E2E8F0' },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  nextButtonTextDisabled: { color: '#94A3B8' },
  arrowIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    tintColor: '#FFFFFF',
  },
  arrowDisabled: { tintColor: '#94A3B8' },

  /* Loading / Error */
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: { marginTop: 16, fontSize: 16, color: '#64748B' },
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
  retryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

export default VehicleSelection;

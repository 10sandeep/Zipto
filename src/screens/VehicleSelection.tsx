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
  Dimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { vehicleApi, VehiclePricing } from '../api/vehicle';

// ─── Responsive helpers ───────────────────────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH  = 320;
const BASE_HEIGHT = 700;
const scaleW = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const scaleH = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;
const ms = (size: number, factor = 0.45) => size + (scaleW(size) - size) * factor;
const fs = (size: number) => Math.round(PixelRatio.roundToNearestPixel(ms(size)));

// ─── Colors ───────────────────────────────────────────────────────────────────
const BLUE       = '#378ADD';
const BLUE_CARD  = '#EBF4FD';
const DARK       = '#1A1A1A';
const GREY       = '#6B7280';
const GREY_LIGHT = '#F3F4F6';
const WHITE      = '#FFFFFF';
const BG         = '#F5F5F5';

// ─── Vehicle Images ───────────────────────────────────────────────────────────
const VEHICLE_IMAGES: Record<string, any> = {
  bike:       require('../assets/images/bike_img.png'),
  scooty:     require('../assets/images/scooter_img.png'),
  auto:       require('../assets/images/auto_img.png'),
  pickup:     require('../assets/images/pickup_img.png'),
  mini_truck: require('../assets/images/truck_img.png'),
  tata_ace:   require('../assets/images/vehicle3.png'),
  tata_407:   require('../assets/images/vehicle3.png'),
};

// ─── ETA ranges per vehicle type ─────────────────────────────────────────────
const VEHICLE_ETA: Record<string, string> = {
  bike:       '20–25 mins',
  scooty:     '25–30 mins',
  auto:       '35–40 mins',
  pickup:     '45–55 mins',
  mini_truck: '60–75 mins',
 
};

// ─── Vehicle Meta ─────────────────────────────────────────────────────────────
const VEHICLE_META: Record<string, { capacity: string; startingLabel: string; baseAmount: number }> = {
  bike:       { capacity: 'Up to 20 kg',   startingLabel: 'From ₹35',  baseAmount: 35  },
  scooty:     { capacity: 'Up to 22 kg',   startingLabel: 'From ₹40',  baseAmount: 40  },
  auto:       { capacity: 'Up to 700 kg',  startingLabel: 'From ₹80',  baseAmount: 80  },
  pickup:     { capacity: 'Up to 1.5 ton', startingLabel: 'From ₹150', baseAmount: 150 },
  mini_truck: { capacity: 'Up to 2.5 ton', startingLabel: 'From ₹250', baseAmount: 250 },
  tata_ace:   { capacity: 'Up to 1.5 ton', startingLabel: 'From ₹150', baseAmount: 150 },
  tata_407:   { capacity: 'Up to 2.5 ton', startingLabel: 'From ₹250', baseAmount: 250 },
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface UIVehicle {
  id: string;
  vehicleType: string;
  name: string;
  priceRange: string;
  basePrice: number;
  perKmRate: number;
  minimumFare: number;
  baseDistanceKm: number;
  startingFare: number;
  capacity: string;
  startingLabel: string;
  helperCharge: number;
  helperAvailable: boolean;
  bestFor: string | null;
  city: string;
  perMinuteRate: number;
  nightSurchargePercent: number;
  multiStopFee: number;
  eta: string;
  baseAmount: number;
}

const formatVehicleName = (vehicleType: string): string =>
  vehicleType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// ─── Component ────────────────────────────────────────────────────────────────
const VehicleSelection = () => {
  const navigation = useNavigation<any>();
  const route      = useRoute<any>();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [vehicles, setVehicles]               = useState<UIVehicle[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);

  const {
    pickup, drop, pickupCoords, dropCoords,
    city, serviceCategory, senderName, senderMobile,
    receiverName, receiverPhone, alternativePhone,
  } = route.params || {};

  const fadeAnim  = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => { fetchVehicleTypes(); }, []);

  const fetchVehicleTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      await AsyncStorage.getItem('auth_token');
      const response: any = await vehicleApi.getVehiclePricing();

      let vehiclesData: VehiclePricing[] = [];
      if (Array.isArray(response)) vehiclesData = response;
      else if (response && Array.isArray(response.data)) vehiclesData = response.data;

      if (vehiclesData.length > 0) {
        const transformed: UIVehicle[] = vehiclesData
          .filter((v: VehiclePricing) => v.is_active)
          .map((vehicle: VehiclePricing) => {
            const key  = vehicle.vehicle_type.toLowerCase();
            const meta = VEHICLE_META[key] ?? {
              capacity: '—',
              startingLabel: `From ₹${vehicle.base_fare}`,
              baseAmount: parseFloat(vehicle.base_fare),
            };
            return {
              id: vehicle.id,
              vehicleType: vehicle.vehicle_type,
              name: formatVehicleName(vehicle.vehicle_type),
              priceRange: meta.startingLabel,
              basePrice: parseFloat(vehicle.base_fare),
              perKmRate: parseFloat(vehicle.per_km_rate),
              minimumFare: parseFloat(vehicle.minimum_fare),
              baseDistanceKm: parseFloat(vehicle.base_distance_km) || 2,
              startingFare: parseFloat(vehicle.base_fare),
              capacity: meta.capacity,
              startingLabel: meta.startingLabel,
              helperCharge: parseFloat(vehicle.helper_charge_per_person) || 200,
              helperAvailable: vehicle.helper_available,
              bestFor: vehicle.best_for,
              city: vehicle.city,
              perMinuteRate: parseFloat(vehicle.per_minute_rate),
              nightSurchargePercent: parseFloat(vehicle.night_surcharge_percent),
              multiStopFee: parseFloat(vehicle.multi_stop_fee),
              eta: VEHICLE_ETA[key] ?? '30–40 mins',
              baseAmount: meta.baseAmount,
            };
          });
        setVehicles(transformed);
      } else {
        throw new Error('No vehicle data received');
      }
    } catch (err) {
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
    navigation.navigate('FareEstimate', {
      vehicle, pickup, drop, pickupCoords, dropCoords,
      hasHelper: false, helperCount: 0, helperCost: 0,
      city, serviceCategory, senderName, senderMobile,
      receiverName, receiverPhone, alternativePhone,
    });
  };

  // ── Vehicle Card ─────────────────────────────────────────────────────────
  const renderVehicleCard = ({ item, index }: { item: UIVehicle; index: number }) => {
    const isSelected   = selectedVehicle === item.id;
    const isFastest    = index === 0;
    const vehicleImage = VEHICLE_IMAGES[item.vehicleType.toLowerCase()];

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => setSelectedVehicle(item.id)}
        activeOpacity={0.82}
      >
        {/* Top row: Fastest badge + name + Choose button */}
        <View style={styles.cardTopBar}>
          <View style={styles.cardTopLeft}>
            {isFastest && (
              <View style={styles.fastestBadge}>
                <Text style={styles.fastestText}>Fastest ⚡</Text>
              </View>
            )}
            <Text style={styles.vehicleName}>{item.name}</Text>
          </View>

          <TouchableOpacity
            style={[styles.selectBtn, isSelected && styles.selectBtnActive]}
            onPress={() => setSelectedVehicle(item.id)}
            activeOpacity={0.8}
          >
            <Icon
              name={isSelected ? 'check-circle' : 'radio-button-unchecked'}
              size={ms(14)}
              color={isSelected ? WHITE : GREY}
            />
            <Text style={[styles.selectBtnText, isSelected && styles.selectBtnTextActive]}>
              {isSelected ? 'Chosen' : 'Choose'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Middle: image + capacity + price */}
        <View style={styles.cardBody}>
          <View style={[styles.imgBox, isSelected && styles.imgBoxSelected]}>
            {vehicleImage ? (
              <Image source={vehicleImage} style={styles.vehicleImg} resizeMode="contain" />
            ) : (
              <Text style={styles.emoji}>🚛</Text>
            )}
          </View>

          {/* Capacity */}
          <View style={styles.metaBlock}>
            <View style={styles.metaRow}>
              <Icon name="inventory-2" size={ms(11)} color={GREY} />
              <Text style={styles.metaText}>{item.capacity}</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceBlock}>
            <Text style={[styles.priceAmount, isSelected && styles.priceAmountSelected]}>
              ₹{item.baseAmount}
            </Text>
            <Text style={styles.priceLabel}>Starts From</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const selectedData = getSelectedVehicleData();

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <SafeAreaView style={styles.safeHeader}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
              else navigation.navigate('PickupDropSelection');
            }}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.6}
          >
            <Icon name="arrow-back" size={ms(18)} color={DARK} />
          </TouchableOpacity>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>Select Vehicle</Text>
            <Text style={styles.headerSub}>Choose the right vehicle for your delivery</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* ── List ── */}
      <Animated.View style={[styles.listWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={BLUE} />
            <Text style={styles.loadingText}>Loading vehicles...</Text>
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Icon name="error-outline" size={ms(40)} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryBtn} onPress={fetchVehicleTypes} activeOpacity={0.7}>
              <Icon name="refresh" size={ms(16)} color={WHITE} />
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={vehicles}
            keyExtractor={item => item.id}
            renderItem={renderVehicleCard}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            bounces
            extraData={selectedVehicle}
          />
        )}
      </Animated.View>

      {/* ── Sticky Footer ── */}
      <View style={styles.footer}>
        {/* Delivery ETA info row */}
        <View style={styles.footerInfoRow}>
          <View style={styles.deliveryInfoBlock}>
            <Icon name="schedule" size={ms(14)} color={GREY} />
            <View style={styles.deliveryTextBlock}>
              <Text style={styles.deliveryLabel}>Estimated Delivery</Text>
              <Text style={styles.deliveryEta}>ETA updates based on distance & traffic</Text>
            </View>
          </View>

          <View style={styles.etaBlock}>
            <Text style={styles.etaLabel}>ETA</Text>
            <Text style={styles.etaValue}>
              {selectedData ? selectedData.eta : '— min'}
            </Text>
          </View>
        </View>

        {/* Check Final Price button */}
        <TouchableOpacity
          style={[styles.confirmBtn, !selectedVehicle && styles.confirmBtnDisabled]}
          onPress={handleBook}
          disabled={!selectedVehicle}
          activeOpacity={0.85}
        >
          <Text style={[styles.confirmText, !selectedVehicle && styles.confirmTextDisabled]}>
            Check Final Price
          </Text>
          <Image
            source={require('../assets/images/arrow.png')}
            style={[styles.arrowIcon, !selectedVehicle && styles.arrowDisabled]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ─── Derived sizes ────────────────────────────────────────────────────────────
const IMG_BOX_W = ms(70);
const IMG_BOX_H = ms(60);
const IMG_W     = ms(60);
const IMG_H     = ms(52);
const BACK_SIZE = ms(32);
const ARROW_SZ  = ms(16);

const styles = StyleSheet.create({
  container:  { flex: 1, backgroundColor: BG },
  safeHeader: { backgroundColor: WHITE },

  // ── Header ──
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: scaleW(12),
    paddingVertical:   scaleH(10),
    backgroundColor:   WHITE,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backBtn: {
    width:           BACK_SIZE,
    height:          BACK_SIZE,
    borderRadius:    BACK_SIZE / 2,
    backgroundColor: GREY_LIGHT,
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     scaleW(10),
  },
  headerTextBlock: { flex: 1 },
  headerTitle: {
    fontSize:      fs(18),
    fontWeight:    '800',
    color:         DARK,
    letterSpacing: -0.3,
  },
  headerSub: {
    fontSize:   fs(10),
    color:      GREY,
    marginTop:  scaleH(1),
    fontWeight: '500',
  },

  // ── List ──
  listWrap:    { flex: 1 },
  listContent: {
    paddingHorizontal: scaleW(10),
    paddingTop:        scaleH(10),
    paddingBottom:     scaleH(12),
  },

  // ── Card ──
  card: {
    backgroundColor: WHITE,
    borderRadius:    ms(14),
    marginBottom:    scaleH(9),
    borderWidth:     1.5,
    borderColor:     '#E5E7EB',
    overflow:        'hidden',
    shadowColor:     '#000',
    shadowOffset:    { width: 0, height: 2 },
    shadowOpacity:   0.06,
    shadowRadius:    6,
    elevation:       3,
  },
  cardSelected: {
    backgroundColor: BLUE_CARD,
    borderColor:     BLUE,
  },

  // Top bar
  cardTopBar: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'space-between',
    paddingHorizontal: ms(11),
    paddingTop:        ms(9),
    paddingBottom:     ms(4),
  },
  cardTopLeft: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           scaleW(6),
    flex:          1,
  },
  fastestBadge: {
    backgroundColor:   BLUE,
    borderRadius:      ms(20),
    paddingHorizontal: scaleW(8),
    paddingVertical:   scaleH(2),
  },
  fastestText: {
    fontSize:   fs(9),
    fontWeight: '800',
    color:      WHITE,
  },
  vehicleName: {
    fontSize:   fs(14),
    fontWeight: '800',
    color:      DARK,
  },

  // Choose button
  selectBtn: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               scaleW(4),
    borderRadius:      ms(20),
    paddingHorizontal: scaleW(9),
    paddingVertical:   scaleH(4),
    borderWidth:       1.5,
    borderColor:       '#D1D5DB',
    backgroundColor:   WHITE,
  },
  selectBtnActive: {
    backgroundColor: DARK,
    borderColor:     DARK,
  },
  selectBtnText: {
    fontSize:   fs(10),
    fontWeight: '700',
    color:      GREY,
  },
  selectBtnTextActive: { color: WHITE },

  // Card body
  cardBody: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: ms(11),
    paddingBottom:     ms(11),
  },
  imgBox: {
    width:           IMG_BOX_W,
    height:          IMG_BOX_H,
    borderRadius:    ms(10),
    backgroundColor: GREY_LIGHT,
    justifyContent:  'center',
    alignItems:      'center',
    marginRight:     scaleW(9),
    flexShrink:      0,
  },
  imgBoxSelected: { backgroundColor: '#D6EAFA' },
  vehicleImg:     { width: IMG_W, height: IMG_H },
  emoji:          { fontSize: fs(24) },

  metaBlock: { flex: 1 },
  metaRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           scaleW(4),
  },
  metaText: {
    fontSize:   fs(13),
    color:      GREY,
    fontWeight: '600',
  },

  priceBlock:  { alignItems: 'flex-end', flexShrink: 0 },
  priceAmount: {
    fontSize:      fs(24),
    fontWeight:    '900',
    color:         DARK,
    letterSpacing: -0.8,
  },
  priceAmountSelected: { color: BLUE },
  priceLabel: {
    fontSize:   fs(9),
    color:      GREY,
    fontWeight: '500',
    marginTop:  scaleH(-2),
  },

  // ── Footer ──
  footer: {
    backgroundColor:   WHITE,
    paddingHorizontal: scaleW(12),
    paddingTop:        scaleH(10),
    paddingBottom:     scaleH(16),
    borderTopWidth:    1,
    borderTopColor:    '#E5E7EB',
    elevation:         8,
    shadowColor:       '#000',
    shadowOffset:      { width: 0, height: -3 },
    shadowOpacity:     0.08,
    shadowRadius:      6,
  },
  footerInfoRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'flex-start',
    marginBottom:   scaleH(9),
    gap:            scaleW(12),
  },
  deliveryInfoBlock: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           scaleW(8),
    flex:          1,
  },
  deliveryTextBlock: { flex: 1 },
  deliveryLabel: {
    fontSize:     fs(12),
    fontWeight:   '700',
    color:        DARK,
    marginBottom: scaleH(2),
  },
  deliveryEta: {
    fontSize:   fs(10),
    color:      GREY,
    fontWeight: '500',
    lineHeight: fs(14),
  },
  etaBlock: { alignItems: 'flex-end' },
  etaLabel: {
    fontSize:     fs(10),
    color:        GREY,
    fontWeight:   '600',
    marginBottom: scaleH(2),
  },
  etaValue: {
    fontSize:   fs(16),
    fontWeight: '800',
    color:      DARK,
  },

  confirmBtn: {
    backgroundColor: BLUE,
    borderRadius:    ms(13),
    paddingVertical: scaleH(13),
    flexDirection:   'row',
    justifyContent:  'center',
    alignItems:      'center',
    gap:             scaleW(6),
  },
  confirmBtnDisabled: { backgroundColor: '#E5E7EB' },
  confirmText: {
    fontSize:      fs(13),
    fontWeight:    '800',
    color:         WHITE,
    letterSpacing: 0.2,
  },
  confirmTextDisabled: { color: '#9CA3AF' },
  arrowIcon:     { width: ARROW_SZ, height: ARROW_SZ, tintColor: WHITE },
  arrowDisabled: { tintColor: '#9CA3AF' },

  // ── Loading / Error ──
  centered: {
    flex:            1,
    justifyContent:  'center',
    alignItems:      'center',
    paddingVertical: scaleH(60),
  },
  loadingText: { marginTop: scaleH(10), fontSize: fs(12), color: GREY },
  errorText: {
    marginTop:    scaleH(10),
    fontSize:     fs(12),
    color:        GREY,
    textAlign:    'center',
    marginBottom: scaleH(16),
  },
  retryBtn: {
    flexDirection:     'row',
    alignItems:        'center',
    backgroundColor:   BLUE,
    paddingHorizontal: scaleW(18),
    paddingVertical:   scaleH(9),
    borderRadius:      ms(9),
    gap:               scaleW(6),
  },
  retryText: { color: WHITE, fontSize: fs(12), fontWeight: '700' },
});

export default VehicleSelection;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { vehicleApi } from '../api/vehicle';
import { mapboxApi } from '../api/mapbox';

const { width, height } = Dimensions.get('window');

Mapbox.setAccessToken(
  'MAPBOX_PUBLIC_TOKEN_REMOVED',
);

type BookingStatus = 'searching' | 'assigned' | 'arriving' | 'in_progress' | 'completed' | 'cancelled';

interface DriverInfo {
  name: string;
  phone: string;
  vehicle_number?: string;
  rating?: number;
}

const LiveTracking = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const cameraRef = useRef<Mapbox.Camera>(null);

  const {
    bookingId,
    pickup = '',
    drop = '',
    pickupCoords,
    dropCoords,
    vehicleType = 'bike',
    fare = 0,
  } = route.params || {};

  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('searching');
  const [driver, setDriver] = useState<DriverInfo | null>(null);
  const [otp, setOtp] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][] | null>(null);

  // MapBox coordinates [lng, lat]
  const pickupCenter: [number, number] = pickupCoords
    ? [pickupCoords.longitude, pickupCoords.latitude]
    : [85.8245, 20.2961];

  const dropCenter: [number, number] = dropCoords
    ? [dropCoords.longitude, dropCoords.latitude]
    : [85.8345, 20.3061];

  const fetchBookingDetails = useCallback(async () => {
    if (!bookingId) return;
    try {
      const response = await vehicleApi.getBookingDetails(bookingId);
      if (response.success && response.data) {
        const data = response.data;
        const status = data.status?.toLowerCase();

        if (status === 'cancelled') {
          setBookingStatus('cancelled');
        } else if (status === 'completed') {
          setBookingStatus('completed');
        } else if (status === 'in_progress' || status === 'picked_up') {
          setBookingStatus('in_progress');
        } else if (status === 'driver_arriving' || status === 'arriving') {
          setBookingStatus('arriving');
        } else if (data.driver_id || data.driver) {
          setBookingStatus('assigned');
        } else {
          setBookingStatus('searching');
        }

        if (data.driver) {
          setDriver({
            name: data.driver.name || 'Driver',
            phone: data.driver.phone || '',
            vehicle_number: data.driver.vehicle_number,
            rating: data.driver.rating,
          });
        }

        if (data.otp) {
          setOtp(data.otp);
        }
      }
    } catch (err: any) {
      console.log('Booking fetch error:', err?.message);
    }
  }, [bookingId]);

  // Initial fetch
  useEffect(() => {
    fetchBookingDetails();
  }, [fetchBookingDetails]);

  // Poll for updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (bookingStatus !== 'completed' && bookingStatus !== 'cancelled') {
        fetchBookingDetails();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [bookingStatus, fetchBookingDetails]);

  // Fetch actual road route from Mapbox Directions API
  useEffect(() => {
    const fetchRoute = async () => {
      const coords = await mapboxApi.getDirections(pickupCenter, dropCenter);
      if (coords) {
        setRouteCoordinates(coords);
      }
    };
    fetchRoute();
  }, [pickupCenter[0], pickupCenter[1], dropCenter[0], dropCenter[1]]);

  // Fit map to show both markers
  useEffect(() => {
    if (cameraRef.current && pickupCoords && dropCoords) {
      const minLng = Math.min(pickupCenter[0], dropCenter[0]);
      const maxLng = Math.max(pickupCenter[0], dropCenter[0]);
      const minLat = Math.min(pickupCenter[1], dropCenter[1]);
      const maxLat = Math.max(pickupCenter[1], dropCenter[1]);

      cameraRef.current.fitBounds(
        [maxLng, maxLat],
        [minLng, minLat],
        [80, 80, 300, 80],
        1000,
      );
    }
  }, []);

  const handleCall = () => {
    if (driver?.phone) {
      Linking.openURL(`tel:${driver.phone}`);
    } else {
      Alert.alert('Unavailable', 'Driver phone number is not available yet.');
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ],
    );
  };

  const getStatusConfig = () => {
    switch (bookingStatus) {
      case 'searching':
        return {
          color: '#F59E0B',
          bg: '#FFFBEB',
          border: '#FDE68A',
          icon: 'search',
          title: 'Looking for a driver...',
          subtitle: 'Please wait while we find the best driver for you',
        };
      case 'assigned':
        return {
          color: '#2563EB',
          bg: '#EFF6FF',
          border: '#BFDBFE',
          icon: 'person-pin',
          title: 'Driver assigned!',
          subtitle: 'Your driver is preparing to pick up',
        };
      case 'arriving':
        return {
          color: '#059669',
          bg: '#F0FDF4',
          border: '#BBF7D0',
          icon: 'directions-car',
          title: 'Driver on the way',
          subtitle: 'Your driver is heading to the pickup point',
        };
      case 'in_progress':
        return {
          color: '#7C3AED',
          bg: '#F5F3FF',
          border: '#DDD6FE',
          icon: 'local-shipping',
          title: 'Ride in progress',
          subtitle: 'You are on your way to the destination',
        };
      case 'completed':
        return {
          color: '#059669',
          bg: '#F0FDF4',
          border: '#BBF7D0',
          icon: 'check-circle',
          title: 'Ride completed',
          subtitle: 'Thank you for riding with Zipto!',
        };
      case 'cancelled':
        return {
          color: '#DC2626',
          bg: '#FEF2F2',
          border: '#FECACA',
          icon: 'cancel',
          title: 'Booking cancelled',
          subtitle: 'This booking has been cancelled',
        };
      default:
        return {
          color: '#6B7280',
          bg: '#F9FAFB',
          border: '#E5E7EB',
          icon: 'info',
          title: 'Loading...',
          subtitle: '',
        };
    }
  };

  const statusConfig = getStatusConfig();

  // Use real route if available, fallback to straight line
  const routeLineGeoJSON: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates || [pickupCenter, dropCenter],
        },
      },
    ],
  };

  // Pick vehicle icon name based on vehicle type
  const getVehicleIcon = () => {
    switch (vehicleType) {
      case 'bike':
        return 'two-wheeler';
      case 'auto':
        return 'electric-rickshaw';
      case 'mini_truck':
      case 'truck':
        return 'local-shipping';
      case 'cab':
      case 'car':
        return 'directions-car';
      default:
        return 'two-wheeler';
    }
  };

  return (
    <View style={styles.container}>
      {/* MapBox Map */}
      <Mapbox.MapView
        style={styles.map}
        styleURL={Mapbox.StyleURL.Street}
        logoEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
        onDidFinishLoadingMap={() => setMapReady(true)}
      >
        <Mapbox.Camera
          ref={cameraRef}
          centerCoordinate={pickupCenter}
          zoomLevel={13}
          animationDuration={0}
        />

        {/* Route line between pickup and drop */}
        <Mapbox.ShapeSource id="routeLine" shape={routeLineGeoJSON}>
          <Mapbox.LineLayer
            id="routeLineLine"
            style={{
              lineColor: '#2563EB',
              lineWidth: 4,
              lineCap: 'round',
              lineJoin: 'round',
            }}
          />
        </Mapbox.ShapeSource>

        {/* Vehicle Marker at Pickup */}
        <Mapbox.PointAnnotation
          id="vehicle-marker"
          coordinate={pickupCenter}
          title="Vehicle"
        >
          <View style={styles.vehicleMarkerContainer}>
            <View style={styles.vehicleMarker}>
              <Icon name={getVehicleIcon()} size={22} color="#FFFFFF" />
            </View>
            <View style={styles.vehicleMarkerArrow} />
          </View>
        </Mapbox.PointAnnotation>

        {/* Pickup dot */}
        <Mapbox.PointAnnotation
          id="pickup-marker"
          coordinate={pickupCenter}
          title="Pickup"
        >
          <View style={styles.pickupDotOuter}>
            <View style={styles.pickupDotInner} />
          </View>
        </Mapbox.PointAnnotation>

        {/* Drop Marker */}
        <Mapbox.PointAnnotation
          id="drop-marker"
          coordinate={dropCenter}
          title="Drop"
        >
          <View style={styles.markerContainer}>
            <View style={[styles.marker, styles.dropMarker]}>
              <Icon name="place" size={16} color="#FFFFFF" />
            </View>
          </View>
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>

      {/* Map Loading Overlay */}
      {!mapReady && (
        <View style={styles.mapLoadingOverlay}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.mapLoadingText}>Loading map...</Text>
        </View>
      )}

      {/* Overlay Content */}
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        {/* Top Bar - Status Badge */}
        <View style={styles.topSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>

          <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg, borderColor: statusConfig.border }]}>
            {bookingStatus === 'searching' ? (
              <ActivityIndicator size="small" color={statusConfig.color} style={{ marginRight: 8 }} />
            ) : (
              <View style={[styles.statusDot, { backgroundColor: statusConfig.color }]} />
            )}
            <Text style={[styles.statusBadgeText, { color: statusConfig.color }]}>
              {statusConfig.title}
            </Text>
          </View>
        </View>

        {/* Bottom Card */}
        <View style={styles.bottomCard}>
          {/* Status Info */}
          <View style={[styles.statusRow, { backgroundColor: statusConfig.bg, borderColor: statusConfig.border }]}>
            <Icon name={statusConfig.icon} size={24} color={statusConfig.color} />
            <View style={styles.statusInfo}>
              <Text style={[styles.statusTitle, { color: statusConfig.color }]}>
                {statusConfig.title}
              </Text>
              <Text style={styles.statusSubtitle}>{statusConfig.subtitle}</Text>
            </View>
          </View>

          {/* OTP Section */}
          {otp && bookingStatus !== 'completed' && bookingStatus !== 'cancelled' && (
            <View style={styles.otpContainer}>
              <Text style={styles.otpLabel}>Share this OTP with driver</Text>
              <View style={styles.otpBox}>
                {otp.split('').map((digit, index) => (
                  <View key={index} style={styles.otpDigit}>
                    <Text style={styles.otpDigitText}>{digit}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Driver Card (when assigned) */}
          {driver && bookingStatus !== 'searching' && (
            <>
              <View style={styles.divider} />
              <View style={styles.driverHeader}>
                <View style={styles.driverAvatar}>
                  <Icon name="person" size={28} color="#2563EB" />
                </View>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  {driver.vehicle_number && (
                    <Text style={styles.vehicleInfo}>{vehicleType} {driver.vehicle_number}</Text>
                  )}
                </View>
                {driver.rating && (
                  <View style={styles.ratingBadge}>
                    <Icon name="star" size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{driver.rating.toFixed(1)}</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} onPress={handleCall}>
                  <View style={styles.actionIcon}>
                    <Icon name="call" size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <View style={styles.actionIcon}>
                    <Icon name="chat" size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.actionText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <View style={styles.actionIcon}>
                    <Icon name="share" size={20} color="#2563EB" />
                  </View>
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Booking Details */}
          <View style={styles.divider} />
          <View style={styles.routeSection}>
            <View style={styles.routeRow}>
              <View style={styles.routeDots}>
                <View style={[styles.routeDot, { backgroundColor: '#2563EB' }]} />
                <View style={styles.routeLine} />
                <View style={[styles.routeDot, { backgroundColor: '#059669' }]} />
              </View>
              <View style={styles.routeAddresses}>
                <View style={styles.routeItem}>
                  <Text style={styles.routeLabel}>Pickup</Text>
                  <Text style={styles.routeAddress} numberOfLines={1}>{pickup || 'Pickup location'}</Text>
                </View>
                <View style={styles.routeItem}>
                  <Text style={styles.routeLabel}>Drop-off</Text>
                  <Text style={styles.routeAddress} numberOfLines={1}>{drop || 'Drop location'}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Fare & Vehicle */}
          <View style={styles.fareRow}>
            <View style={styles.fareItem}>
              <Icon name="local-shipping" size={18} color="#6B7280" />
              <Text style={styles.fareLabel}>{vehicleType}</Text>
            </View>
            <View style={styles.fareItem}>
              <Icon name="payments" size={18} color="#6B7280" />
              <Text style={styles.fareValue}>₹{fare}</Text>
            </View>
          </View>

          {/* Cancel Button */}
          {bookingStatus !== 'completed' && bookingStatus !== 'cancelled' && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Icon name="close" size={18} color="#DC2626" />
              <Text style={styles.cancelText}>Cancel Booking</Text>
            </TouchableOpacity>
          )}

          {/* Go Home Button (completed/cancelled) */}
          {(bookingStatus === 'completed' || bookingStatus === 'cancelled') && (
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
            >
              <Icon name="home" size={20} color="#FFFFFF" />
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  map: {
    width,
    height,
    ...StyleSheet.absoluteFillObject,
  },
  mapLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mapLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  // Top section
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statusBadge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusBadgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Markers
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pickupMarker: {
    backgroundColor: '#2563EB',
  },
  dropMarker: {
    backgroundColor: '#059669',
  },
  // Vehicle marker
  vehicleMarkerContainer: {
    alignItems: 'center',
  },
  vehicleMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  vehicleMarkerArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2563EB',
    marginTop: -2,
  },
  // Pickup dot
  pickupDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  // Bottom Card
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  // Status row
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  statusInfo: {
    flex: 1,
    marginLeft: 12,
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  // OTP
  otpContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  otpLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  otpBox: {
    flexDirection: 'row',
    gap: 8,
  },
  otpDigit: {
    width: 40,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  otpDigitText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  // Driver
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#BFDBFE',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  vehicleInfo: {
    fontSize: 13,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: '700',
    color: '#D97706',
    fontSize: 13,
  },
  // Actions
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  actionBtn: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  actionText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  // Route
  routeSection: {
    marginBottom: 8,
  },
  routeRow: {
    flexDirection: 'row',
  },
  routeDots: {
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 4,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  routeAddresses: {
    flex: 1,
    justifyContent: 'space-between',
    height: 64,
  },
  routeItem: {
    flex: 1,
    justifyContent: 'center',
  },
  routeLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 1,
  },
  routeAddress: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  // Fare
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  fareItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fareLabel: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  fareValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  // Cancel
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
  // Home button
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  homeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default LiveTracking;

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, UrlTile } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BottomTabBar from './BottomTabBar';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [useOpenStreetMap, setUseOpenStreetMap] = useState(true);

  const [region, setRegion] = useState({
    latitude: 20.2961,
    longitude: 85.8245,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const services = [
    {
      id: 1,
      title: 'Send Packages',
      icon: 'local-shipping',
      gradient: ['#3B82F6', '#2563EB'],
      description: 'Quick delivery',
    },
    {
      id: 2,
      title: 'Transport Goods',
      icon: 'fire-truck',
      gradient: ['#10B981', '#059669'],
      description: 'Heavy items',
    },
    {
      id: 3,
      title: 'Food Delivery',
      icon: 'restaurant',
      gradient: ['#F59E0B', '#D97706'],
      description: 'Hot & fresh',
    },
    {
      id: 4,
      title: 'Medicine',
      icon: 'local-pharmacy',
      gradient: ['#EF4444', '#DC2626'],
      description: 'Emergency delivery',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Map with Light Style */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        customMapStyle={lightMapStyle}
      >
        {/* OpenStreetMap Tile Layer */}
        {useOpenStreetMap && (
          <UrlTile
            urlTemplate="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
        )}

        {/* Marker at Bhubaneswar */}
        <Marker coordinate={{ latitude: 20.2961, longitude: 85.8245 }}>
          <View style={styles.customMarker}>
            <MaterialIcons name="location-on" size={40} color="#3B82F6" />
          </View>
        </Marker>
      </MapView>

      {/* Map Toggle Button */}
      <TouchableOpacity
        style={styles.mapToggleButton}
        onPress={() => setUseOpenStreetMap(!useOpenStreetMap)}
        activeOpacity={0.8}
      >
        <MaterialIcons name="layers" size={20} color="#0F172A" />
        <Text style={styles.mapToggleText}>
          {useOpenStreetMap ? 'OSM' : 'Google'}
        </Text>
      </TouchableOpacity>

      {/* Main Content Overlay */}
      <SafeAreaView style={styles.mainOverlay} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          {/* Left Side - Logo and Zipto Text */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logo_zipto.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.ziptoText}>Zipto</Text>
          </View>

          {/* Right Side - Wallet Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Wallet')}
            style={styles.walletButton}
            activeOpacity={0.7}
          >
            <MaterialIcons name="account-balance-wallet" size={24} color="#3B82F6" />
            <Text style={styles.walletText}>Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Content Container */}
        <View style={styles.bottomContainer}>
          {/* Services Grid */}
          <View style={styles.servicesContainer}>
            <Text style={styles.servicesTitle}>Our Services</Text>
            <View style={styles.servicesGrid}>
              {services.map(service => (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => navigation.navigate('PickupDropSelection')}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.serviceIconContainer,
                      { backgroundColor: service.gradient[0] },
                    ]}
                  >
                    <MaterialIcons
                      name={service.icon}
                      size={32}
                      color="#FFFFFF"
                    />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>
                    {service.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom Navigation Bar */}
      <BottomTabBar />
    </View>
  );
};

// Light map style for Google Maps
const lightMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'on' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#f5f5f5' }],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#bdbdbd' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#dadada' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#616161' }],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{ color: '#e5e5e5' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{ color: '#eeeeee' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#c9c9c9' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  map: {
    width,
    height,
    ...StyleSheet.absoluteFillObject,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapToggleButton: {
    position: 'absolute',
    bottom: 280,
    right: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mapToggleText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },
  mainOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 40,
    height: 40,
    marginRight:200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  ziptoText: {
    fontSize: 14,
     marginRight:200,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
  },
  walletButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  walletText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
  },
  bottomContainer: {
    marginBottom: 80,
  },
  servicesContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    marginBottom: 12,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    textAlign: 'center',
  },
});

export default Home;
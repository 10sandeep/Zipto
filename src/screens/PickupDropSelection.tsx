import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
  Animated,
  Easing,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';

// Type definitions
type Location = {
  id: string;
  name: string;
  address: string;
};

type CityName =
  | 'Bhubaneswar'
  | 'Cuttack'
  | 'Puri'
  | 'Berhampur'
  | 'Sambalpur'
  | 'Rourkela'
  | 'Balasore'
  | 'Baripada'
  | 'Bhadrak'
  | 'Jharsuguda';

type LocationType = 'Home' | 'Shop' | 'Office' | 'Other';

type MockLocationsType = {
  [key in CityName]: Location[];
};

const CITIES: CityName[] = [
  'Bhubaneswar',
  'Cuttack',
  'Puri',
  'Berhampur',
  'Sambalpur',
  'Rourkela',
  'Balasore',
  'Baripada',
  'Bhadrak',
  'Jharsuguda',
];

const LOCATION_TYPES: LocationType[] = ['Home', 'Shop', 'Office', 'Other'];

const MOCK_LOCATIONS: MockLocationsType = {
  Bhubaneswar: [
    {
      id: '1',
      name: 'Master Canteen Area',
      address: 'Kharvela Nagar, Bhubaneswar',
    },
    { id: '2', name: 'KIIT University', address: 'Patia, Bhubaneswar' },
    { id: '3', name: 'Jayadev Vihar', address: 'Nayapalli, Bhubaneswar' },
    { id: '4', name: 'Esplanade One Mall', address: 'Rasulgarh, Bhubaneswar' },
    { id: '5', name: 'Lingaraj Temple', address: 'Old Town, Bhubaneswar' },
    { id: '6', name: 'Khandagiri', address: 'Khandagiri, Bhubaneswar' },
    { id: '7', name: 'Patia', address: 'Patia, Bhubaneswar' },
    {
      id: '8',
      name: 'Chandrasekharpur',
      address: 'Chandrasekharpur, Bhubaneswar',
    },
  ],
  Cuttack: [
    { id: '1', name: 'Buxi Bazaar', address: 'Buxi Bazaar, Cuttack' },
    { id: '2', name: 'CDA Market', address: 'Sector 9, Cuttack' },
    { id: '3', name: 'Madhupatna', address: 'Madhupatna, Cuttack' },
  ],
  Puri: [
    { id: '1', name: 'Jagannath Temple', address: 'Grand Road, Puri' },
    { id: '2', name: 'Puri Beach', address: 'Sea Beach, Puri' },
    { id: '3', name: 'Gundicha Temple', address: 'Gundicha, Puri' },
  ],
  Berhampur: [
    {
      id: '1',
      name: 'Berhampur University',
      address: 'Bhanja Bihar, Berhampur',
    },
    { id: '2', name: 'Silk City', address: 'Gandhi Nagar, Berhampur' },
  ],
  Sambalpur: [
    { id: '1', name: 'Hirakud Dam', address: 'Hirakud, Sambalpur' },
    { id: '2', name: 'VSS University', address: 'Burla, Sambalpur' },
  ],
  Rourkela: [
    { id: '1', name: 'Steel Plant', address: 'Rourkela Steel Plant, Rourkela' },
    { id: '2', name: 'NIT Rourkela', address: 'NIT Campus, Rourkela' },
  ],
  Balasore: [
    { id: '1', name: 'Chandipur Beach', address: 'Chandipur, Balasore' },
    {
      id: '2',
      name: 'Balasore Station',
      address: 'Railway Station Road, Balasore',
    },
  ],
  Baripada: [
    { id: '1', name: 'Baripada Bus Stand', address: 'Main Road, Baripada' },
    { id: '2', name: 'Simlipal', address: 'Simlipal National Park, Baripada' },
  ],
  Bhadrak: [
    {
      id: '1',
      name: 'Bhadrak Railway Station',
      address: 'Station Road, Bhadrak',
    },
    { id: '2', name: 'Bhadrak Market', address: 'Market Complex, Bhadrak' },
  ],
  Jharsuguda: [
    {
      id: '1',
      name: 'Jharsuguda Airport',
      address: 'Veer Surendra Sai Airport, Jharsuguda',
    },
    { id: '2', name: 'VIMSAR', address: 'Hospital Road, Jharsuguda' },
  ],
};

const PickupDropSelection = () => {
  const navigation = useNavigation<any>();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [activeInput, setActiveInput] = useState<'pickup' | 'drop'>('pickup');
  const [selectedCity, setSelectedCity] = useState<CityName | ''>('');
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [filteredCities, setFilteredCities] = useState<CityName[]>(CITIES);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showCitySelection, setShowCitySelection] = useState(true);
  const [currentLocationCoords, setCurrentLocationCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // New states for sender details
  const [senderName, setSenderName] = useState('');
  const [senderMobile, setSenderMobile] = useState('');
  const [selectedLocationType, setSelectedLocationType] = useState<
    LocationType | ''
  >('');
  const [customLocationName, setCustomLocationName] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (selectedCity && MOCK_LOCATIONS[selectedCity]) {
      setFilteredLocations(MOCK_LOCATIONS[selectedCity]);
      setShowCitySelection(false);
    }
  }, [selectedCity]);

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const mockAddresses = [
        'Master Canteen Area, Kharvela Nagar, Bhubaneswar',
        'KIIT University, Patia, Bhubaneswar',
        'Esplanade One Mall, Rasulgarh, Bhubaneswar',
        'Chandrasekharpur, Bhubaneswar',
      ];

      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
    } catch (error) {
      throw new Error('Unable to get address');
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);

    Geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocationCoords({ latitude, longitude });

        try {
          const address = await reverseGeocode(latitude, longitude);

          if (activeInput === 'pickup') {
            setPickup(address);
          } else {
            setDrop(address);
          }

          const detectedCity = CITIES.find(city =>
            address.toLowerCase().includes(city.toLowerCase()),
          );

          if (detectedCity && !selectedCity) {
            setSelectedCity(detectedCity);
          }

          setIsLoadingLocation(false);
        } catch (error) {
          Alert.alert('Error', 'Could not get your current location address');
          setIsLoadingLocation(false);
        }
      },
      error => {
        console.error(error);
        let errorMessage = 'Could not get your location';

        if (error.code === 1) {
          errorMessage =
            'Location permission denied. Please enable location access.';
        } else if (error.code === 2) {
          errorMessage = 'Location not available. Please try again.';
        } else if (error.code === 3) {
          errorMessage = 'Location request timed out. Please try again.';
        }

        Alert.alert('Location Error', errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  const handleCitySelect = (city: CityName) => {
    setSelectedCity(city);
    setShowCitySelection(false);
  };

  const handleLocationSelect = (location: Location) => {
    const fullAddress = location.name + ', ' + location.address;

    if (activeInput === 'pickup') {
      setPickup(fullAddress);
    } else {
      setDrop(fullAddress);
    }
  };

  const handleSearchCity = (text: string) => {
    if (text.trim() === '') {
      setFilteredCities(CITIES);
    } else {
      const filtered = CITIES.filter(city =>
        city.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredCities(filtered);
    }
  };

  const handleSearchLocation = (text: string) => {
    if (activeInput === 'pickup') {
      setPickup(text);
    } else {
      setDrop(text);
    }

    if (selectedCity && text.trim() !== '') {
      const filtered = MOCK_LOCATIONS[selectedCity]?.filter(
        location =>
          location.name.toLowerCase().includes(text.toLowerCase()) ||
          location.address.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredLocations(filtered || []);
    } else if (selectedCity) {
      setFilteredLocations(MOCK_LOCATIONS[selectedCity] || []);
    }
  };

  const validateMobileNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, '');
    return cleaned.length === 10;
  };

  const navigateToBook = () => {
    if (!senderName.trim()) {
      Alert.alert('Missing Information', 'Please enter sender name');
      return;
    }

    if (!validateMobileNumber(senderMobile)) {
      Alert.alert(
        'Invalid Mobile Number',
        'Please enter a valid 10-digit mobile number',
      );
      return;
    }

    if (!selectedLocationType) {
      Alert.alert('Missing Information', 'Please select location type');
      return;
    }

    if (selectedLocationType === 'Other' && !customLocationName.trim()) {
      Alert.alert('Missing Information', 'Please enter custom location name');
      return;
    }

    if (pickup && drop) {
      navigation.navigate('VehicleSelection', {
        pickup,
        drop,
        currentLocationCoords,
        senderName,
        senderMobile,
        locationType:
          selectedLocationType === 'Other'
            ? customLocationName
            : selectedLocationType,
      });
    }
  };

  const canProceed =
    pickup.trim() !== '' &&
    drop.trim() !== '' &&
    senderName.trim() !== '' &&
    validateMobileNumber(senderMobile) &&
    selectedLocationType !== '' &&
    (selectedLocationType !== 'Other' || customLocationName.trim() !== '');

  const getLocationIcon = (type: LocationType) => {
    switch (type) {
      case 'Home':
        return 'home';
      case 'Shop':
        return 'store';
      case 'Office':
        return 'business';
      case 'Other':
        return 'location-on';
      default:
        return 'location-on';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Location</Text>
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* City Selection */}
        {showCitySelection && !selectedCity && (
          <View style={styles.citySelectionContainer}>
            <Text style={styles.sectionTitle}>Select City</Text>
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#64748B" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search city..."
                placeholderTextColor="#94A3B8"
                onChangeText={handleSearchCity}
              />
            </View>
            <FlatList
              data={filteredCities}
              keyExtractor={item => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityCard}
                  onPress={() => handleCitySelect(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.cityIconContainer}>
                    <MaterialIcons
                      name="location-city"
                      size={24}
                      color="#3B82F6"
                    />
                  </View>
                  <Text style={styles.cityName}>{item}</Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={24}
                    color="#64748B"
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Location Inputs */}
        {selectedCity && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Selected City:{' '}
                <Text style={styles.cityBadge}>{selectedCity}</Text>
              </Text>
              <TouchableOpacity
                style={styles.changeCityButton}
                onPress={() => {
                  setSelectedCity('');
                  setShowCitySelection(true);
                  setPickup('');
                  setDrop('');
                  setFilteredLocations([]);
                }}
              >
                <Text style={styles.changeCityText}>Change City</Text>
              </TouchableOpacity>
            </View>

            {/* Sender Details Section */}
            <View style={styles.senderDetailsSection}>
              <Text style={styles.sectionTitle}>Sender Details</Text>

              {/* Sender Name */}
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color="#64748B"
                  style={styles.inputIconLeft}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Sender Name *"
                  placeholderTextColor="#94A3B8"
                  value={senderName}
                  onChangeText={setSenderName}
                />
              </View>

              {/* Sender Mobile */}
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="phone"
                  size={20}
                  color="#64748B"
                  style={styles.inputIconLeft}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Mobile Number *"
                  placeholderTextColor="#94A3B8"
                  value={senderMobile}
                  onChangeText={text =>
                    setSenderMobile(text.replace(/\D/g, '').slice(0, 10))
                  }
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              {/* Location Type */}
              <Text style={styles.subSectionTitle}>Save Location As *</Text>
              <View style={styles.locationTypeContainer}>
                {LOCATION_TYPES.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.locationTypeChip,
                      selectedLocationType === type &&
                        styles.locationTypeChipActive,
                    ]}
                    onPress={() => setSelectedLocationType(type)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons
                      name={getLocationIcon(type)}
                      size={18}
                      color={
                        selectedLocationType === type ? '#FFFFFF' : '#64748B'
                      }
                    />
                    <Text
                      style={[
                        styles.locationTypeText,
                        selectedLocationType === type &&
                          styles.locationTypeTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Custom Location Name for "Other" */}
              {selectedLocationType === 'Other' && (
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color="#64748B"
                    style={styles.inputIconLeft}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter location name (e.g., Gym, Friend's Place) *"
                    placeholderTextColor="#94A3B8"
                    value={customLocationName}
                    onChangeText={setCustomLocationName}
                  />
                </View>
              )}
            </View>

            {/* Pickup & Drop Section */}
            <View style={styles.locationsSection}>
              <Text style={styles.sectionTitle}>Pickup & Drop Locations</Text>

              <View style={styles.inputsWrapper}>
                {/* Pickup Input */}
                <View style={styles.locationInputContainer}>
                  <View style={styles.inputIcon}>
                    <View style={styles.pickupDot} />
                  </View>
                  <TextInput
                    style={[
                      styles.locationInput,
                      activeInput === 'pickup' && styles.activeInput,
                    ]}
                    placeholder="Enter pickup location *"
                    placeholderTextColor="#94A3B8"
                    value={pickup}
                    onChangeText={handleSearchLocation}
                    onFocus={() => setActiveInput('pickup')}
                  />
                  <TouchableOpacity
                    onPress={getCurrentLocation}
                    style={styles.gpsButton}
                    disabled={isLoadingLocation}
                  >
                    {isLoadingLocation && activeInput === 'pickup' ? (
                      <ActivityIndicator size="small" color="#3B82F6" />
                    ) : (
                      <MaterialIcons
                        name="my-location"
                        size={20}
                        color="#3B82F6"
                      />
                    )}
                  </TouchableOpacity>
                </View>

                {/* Drop Input */}
                <View style={styles.locationInputContainer}>
                  <View style={styles.inputIcon}>
                    <View style={styles.dropDot} />
                  </View>
                  <TextInput
                    style={[
                      styles.locationInput,
                      activeInput === 'drop' && styles.activeInput,
                    ]}
                    placeholder="Enter drop location *"
                    placeholderTextColor="#94A3B8"
                    value={drop}
                    onChangeText={handleSearchLocation}
                    onFocus={() => setActiveInput('drop')}
                  />
                  <TouchableOpacity
                    onPress={getCurrentLocation}
                    style={styles.gpsButton}
                    disabled={isLoadingLocation}
                  >
                    {isLoadingLocation && activeInput === 'drop' ? (
                      <ActivityIndicator size="small" color="#3B82F6" />
                    ) : (
                      <MaterialIcons
                        name="my-location"
                        size={20}
                        color="#3B82F6"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Location Suggestions - Only show when user is typing */}
            {((activeInput === 'pickup' && pickup.trim() !== '') ||
              (activeInput === 'drop' && drop.trim() !== '')) && (
              <View style={styles.suggestionsSection}>
                <Text style={styles.subSectionTitle}>Suggested Locations</Text>
                {filteredLocations.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.locationCard}
                    onPress={() => handleLocationSelect(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.locationIconContainer}>
                      <MaterialIcons
                        name="location-on"
                        size={18}
                        color="#3B82F6"
                      />
                    </View>
                    <View style={styles.locationInfo}>
                      <Text style={styles.locationName}>{item.name}</Text>
                      <Text style={styles.locationAddress}>{item.address}</Text>
                    </View>
                    <MaterialIcons
                      name="north-west"
                      size={16}
                      color="#64748B"
                    />
                  </TouchableOpacity>
                ))}

                {filteredLocations.length === 0 && (
                  <View style={styles.emptyContainer}>
                    <MaterialIcons
                      name="search-off"
                      size={40}
                      color="#94A3B8"
                    />
                    <Text style={styles.emptyText}>No locations found</Text>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        )}
      </Animated.View>

      {/* Footer */}
      {selectedCity && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !canProceed && styles.continueButtonDisabled,
            ]}
            onPress={navigateToBook}
            disabled={!canProceed}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.continueButtonText,
                !canProceed && styles.continueButtonTextDisabled,
              ]}
            >
              Continue
            </Text>
            <Text style={[styles.arrow, !canProceed && styles.arrowDisabled]}>
              →
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  citySelectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 14,
  },
  subSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 10,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    paddingVertical: 12,
    marginLeft: 12,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cityIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cityName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  inputLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  cityBadge: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  changeCityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  changeCityText: {
    fontSize: 13,
    color: '#3B82F6',
    fontWeight: '600',
  },
  senderDetailsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIconLeft: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    paddingVertical: 12,
  },
  locationTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  locationTypeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  locationTypeChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  locationTypeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  locationTypeTextActive: {
    color: '#FFFFFF',
  },
  locationsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 2,
  },
  inputsWrapper: {
    gap: 12,
  },
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
  },
  dropDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  locationInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
    paddingVertical: 14,
  },
  activeInput: {
    color: '#1E293B',
  },
  gpsButton: {
    padding: 8,
    marginLeft: 8,
  },
  suggestionsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 3,
  },
  locationAddress: {
    fontSize: 12,
    color: '#64748B',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E2E8F0',
  },
  continueButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  continueButtonTextDisabled: {
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

export default PickupDropSelection;

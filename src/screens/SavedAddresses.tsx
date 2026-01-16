import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../navigation/AppNavigator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SavedAddresses = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const addresses = [
    { 
      id: 1, 
      type: 'Home', 
      address: '123 Main Street, Chandrasekharpur, Bhubaneswar, Odisha 751001', 
      isDefault: true 
    },
    { 
      id: 2, 
      type: 'Work', 
      address: '456 Park Avenue, Patia, Bhubaneswar, Odisha 751024', 
      isDefault: false 
    },
    { 
      id: 3, 
      type: 'Other', 
      address: '789 Lake View Road, Saheed Nagar, Bhubaneswar, Odisha 751007', 
      isDefault: false 
    },
  ];

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
          <Text style={styles.headerTitle}>Saved Addresses</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Addresses List */}
          {addresses.map((item) => (
            <View key={item.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeContainer}>
                  <View style={styles.iconContainer}>
                    <MaterialIcons 
                      name={item.type === 'Home' ? 'home' : item.type === 'Work' ? 'work' : 'location-on'} 
                      size={20} 
                      color="#3B82F6" 
                    />
                  </View>
                  <Text style={styles.addressType}>{item.type}</Text>
                  {item.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultBadgeText}>Default</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <MaterialIcons name="edit" size={20} color="#64748B" />
                </TouchableOpacity>
              </View>
              
              <Text style={styles.addressText}>{item.address}</Text>
              
              <View style={styles.addressActions}>
                {!item.isDefault && (
                  <TouchableOpacity style={styles.addressActionButton}>
                    <MaterialIcons name="check-circle-outline" size={16} color="#3B82F6" />
                    <Text style={styles.addressActionText}>Set as Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.deleteButton}>
                  <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add New Address Button */}
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons name="add-circle-outline" size={24} color="#3B82F6" />
            <Text style={styles.addButtonText}>Add New Address</Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <MaterialIcons name="info-outline" size={20} color="#3B82F6" />
            <Text style={styles.infoText}>
              Your default address will be used for all deliveries unless you choose a different one during checkout.
            </Text>
          </View>
        </ScrollView>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressType: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#0F172A',
  },
  defaultBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  defaultBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#16A34A',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 12,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  addressActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  addressActionText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: '#3B82F6',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 10,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#1E40AF',
    lineHeight: 20,
  },
});

export default SavedAddresses;
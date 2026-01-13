import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FareEstimate = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const [selectedPayment, setSelectedPayment] = useState<'cash' | 'online'>('cash');

    const { vehicle } = route.params || {};
    const baseFare = 250;
    const distanceCharge = 80;
    const platformCharge = 5;
    const gst = 20;
    const fareAmount = baseFare + distanceCharge + platformCharge + gst;

    const handleOnlinePayment = async () => {
        try {
            // Simulate payment processing
            Alert.alert(
                'Payment Gateway',
                'Redirecting to payment gateway...',
                [
                    {
                        text: 'Simulate Success',
                        onPress: () => {
                            // Navigate to LiveTracking after successful payment
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }, { name: 'LiveTracking' }],
                            });
                        }
                    },
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Failed to initiate payment');
        }
    };

    const handleConfirmBooking = () => {
        if (selectedPayment === 'online') {
            handleOnlinePayment();
        } else {
            // Cash payment - direct navigation to LiveTracking
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }, { name: 'LiveTracking' }],
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fare Estimate</Text>
                <View style={styles.backButton} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Route Information */}
                <View style={styles.card}>
                    <View style={styles.locationContainer}>
                        <View style={styles.locationIconContainer}>
                            <View style={styles.pickupDot} />
                            <View style={styles.routeLine} />
                            <Icon name="location-on" size={24} color="#EF4444" />
                        </View>
                        <View style={styles.locationDetails}>
                            <View style={styles.locationItem}>
                                <Text style={styles.locationLabel}>Pickup</Text>
                                <Text style={styles.locationText}>Master Canteen Area</Text>
                            </View>
                            <View style={styles.locationItem}>
                                <Text style={styles.locationLabel}>Drop</Text>
                                <Text style={styles.locationText}>Patia, Bhubaneswar</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Fare Breakdown */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Fare Details</Text>
                    <View style={styles.divider} />
                    
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>Base Fare</Text>
                        <Text style={styles.fareValue}>₹{baseFare}</Text>
                    </View>
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>Distance Charges</Text>
                        <Text style={styles.fareValue}>₹{distanceCharge}</Text>
                    </View>
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>Platform Charge</Text>
                        <Text style={styles.fareValue}>₹{platformCharge}</Text>
                    </View>
                    <View style={styles.fareRow}>
                        <Text style={styles.fareLabel}>GST (5%)</Text>
                        <Text style={styles.fareValue}>₹{gst}</Text>
                    </View>
                    
                    <View style={styles.divider} />
                    
                    <View style={styles.fareRow}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalAmount}>₹{fareAmount}</Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Payment Method</Text>
                    <View style={styles.divider} />
                    
                    {/* Cash Option */}
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            selectedPayment === 'cash' && styles.paymentOptionSelected
                        ]}
                        onPress={() => setSelectedPayment('cash')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.paymentIconContainer}>
                            <Icon name="money" size={28} color={selectedPayment === 'cash' ? '#8B5CF6' : '#6B7280'} />
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={[
                                styles.paymentTitle,
                                selectedPayment === 'cash' && styles.paymentTitleSelected
                            ]}>Cash</Text>
                            <Text style={styles.paymentSubtitle}>Pay to driver</Text>
                        </View>
                        <View style={[
                            styles.radioButton,
                            selectedPayment === 'cash' && styles.radioButtonSelected
                        ]}>
                            {selectedPayment === 'cash' && <View style={styles.radioButtonInner} />}
                        </View>
                    </TouchableOpacity>

                    {/* Online Option */}
                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            selectedPayment === 'online' && styles.paymentOptionSelected
                        ]}
                        onPress={() => setSelectedPayment('online')}
                        activeOpacity={0.7}
                    >
                        <View style={styles.paymentIconContainer}>
                            <Icon name="credit-card" size={28} color={selectedPayment === 'online' ? '#8B5CF6' : '#6B7280'} />
                        </View>
                        <View style={styles.paymentInfo}>
                            <Text style={[
                                styles.paymentTitle,
                                selectedPayment === 'online' && styles.paymentTitleSelected
                            ]}>Online Payment</Text>
                            <Text style={styles.paymentSubtitle}>UPI, Card, Net Banking</Text>
                        </View>
                        <View style={[
                            styles.radioButton,
                            selectedPayment === 'online' && styles.radioButtonSelected
                        ]}>
                            {selectedPayment === 'online' && <View style={styles.radioButtonInner} />}
                        </View>
                    </TouchableOpacity>

                    {selectedPayment === 'online' && (
                        <View style={styles.paymentNote}>
                            <Icon name="security" size={16} color="#059669" />
                            <Text style={styles.paymentNoteText}>
                                Secure payment powered by Razorpay
                            </Text>
                        </View>
                    )}
                </View>

                {/* Additional Info */}
                <View style={styles.infoCard}>
                    <Icon name="info-outline" size={20} color="#2563EB" />
                    <Text style={styles.infoText}>
                        Estimated time of arrival: 5-10 mins
                    </Text>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <View>
                        <Text style={styles.footerLabel}>Total Fare</Text>
                        <Text style={styles.footerAmount}>₹{fareAmount}</Text>
                    </View>
                    <Button
                        title={selectedPayment === 'online' ? 'Pay Now' : 'Confirm Booking'}
                        onPress={handleConfirmBooking}
                        style={styles.confirmButton}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    content: {
        padding: 16,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    locationContainer: {
        flexDirection: 'row',
    },
    locationIconContainer: {
        alignItems: 'center',
        marginRight: 16,
    },
    pickupDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#8B5CF6',
        borderWidth: 3,
        borderColor: '#DDD6FE',
    },
    routeLine: {
        width: 2,
        height: 40,
        backgroundColor: '#E5E7EB',
        marginVertical: 4,
    },
    locationDetails: {
        flex: 1,
    },
    locationItem: {
        marginBottom: 16,
    },
    locationLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
        fontWeight: '500',
    },
    locationText: {
        fontSize: 15,
        color: '#111827',
        fontWeight: '600',
    },
    fareRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    fareLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    fareValue: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '600',
    },
    totalLabel: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '700',
    },
    totalAmount: {
        fontSize: 20,
        color: '#8B5CF6',
        fontWeight: '700',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
        marginBottom: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    paymentOptionSelected: {
        backgroundColor: '#F5F3FF',
        borderColor: '#8B5CF6',
    },
    paymentIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    paymentTitleSelected: {
        color: '#8B5CF6',
    },
    paymentSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#8B5CF6',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#8B5CF6',
    },
    paymentNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D1FAE5',
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
    },
    paymentNoteText: {
        marginLeft: 8,
        fontSize: 12,
        color: '#059669',
        fontWeight: '500',
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DBEAFE',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 13,
        color: '#1E40AF',
        fontWeight: '500',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 4,
    },
    footerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    footerLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    footerAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    confirmButton: {
        minWidth: 160,
    },
});

export default FareEstimate
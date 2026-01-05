import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FareEstimate = () => {
    const route = useRoute<any>();
    const navigation = useNavigation<any>();

    const { vehicle } = route.params || {};

    const handleConfirmBooking = () => {
        // Navigate to Live Tracking after "booking"
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }, { name: 'LiveTracking' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Fare Estimate</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.routeCard}>
                    <View style={styles.locationRow}>
                        <Icon name="my-location" size={20} color={THEME.colors.primary} />
                        <Text style={styles.locationText}>Master Canteen Area</Text>
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.locationRow}>
                        <Icon name="location-on" size={20} color={THEME.colors.secondary} />
                        <Text style={styles.locationText}>Patia, Bhubaneswar</Text>
                    </View>
                </View>

                <View style={styles.fareCard}>
                    <Text style={styles.fareTitle}>Total Fare</Text>
                    <Text style={styles.fareAmount}>₹350</Text>
                    <Text style={styles.fareSubtitle}>Includes taxes and fees</Text>
                </View>

                <View style={styles.paymentMethod}>
                    <Text style={styles.paymentLabel}>Payment Method</Text>
                    <View style={styles.paymentRow}>
                        <Icon name="money" size={24} color={THEME.colors.text} />
                        <Text style={styles.paymentText}>Cash</Text>
                        <Text style={styles.changeText} onPress={() => { }}>Change</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Confirm Booking"
                    onPress={handleConfirmBooking}
                    style={{ backgroundColor: THEME.colors.success }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    header: {
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: THEME.spacing.m,
    },
    routeCard: {
        backgroundColor: THEME.colors.white,
        padding: THEME.spacing.m,
        borderRadius: 8,
        marginBottom: THEME.spacing.m,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    locationText: {
        marginLeft: 10,
        fontSize: THEME.sizes.body1,
        color: THEME.colors.text,
    },
    verticalLine: {
        width: 1,
        height: 20,
        backgroundColor: THEME.colors.border,
        marginLeft: 10,
    },
    fareCard: {
        backgroundColor: THEME.colors.white,
        padding: THEME.spacing.m,
        borderRadius: 8,
        marginBottom: THEME.spacing.m,
        alignItems: 'center',
    },
    fareTitle: {
        fontSize: THEME.sizes.body1,
        color: THEME.colors.textSecondary,
    },
    fareAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginVertical: 5,
    },
    fareSubtitle: {
        fontSize: THEME.sizes.caption,
        color: THEME.colors.textSecondary,
    },
    paymentMethod: {
        backgroundColor: THEME.colors.white,
        padding: THEME.spacing.m,
        borderRadius: 8,
    },
    paymentLabel: {
        fontSize: THEME.sizes.body2,
        color: THEME.colors.textSecondary,
        marginBottom: 5,
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentText: {
        flex: 1,
        marginLeft: 10,
        fontSize: THEME.sizes.body1,
        fontWeight: '600',
    },
    changeText: {
        color: THEME.colors.primary,
        fontWeight: '600',
    },
    footer: {
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
});

export default FareEstimate;

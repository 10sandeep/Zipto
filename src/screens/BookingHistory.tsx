import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HISTORY_DATA = [
    { id: '1', date: '04 Jan, 10:30 AM', pickup: 'Master Canteen', drop: 'Patia', price: '₹350', status: 'Completed', vehicle: 'Tata Ace' },
    { id: '2', date: '02 Jan, 05:15 PM', pickup: 'Rasulgarh', drop: 'Jayadev Vihar', price: '₹120', status: 'Cancelled', vehicle: 'Bike' },
];

const BookingHistory = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="history" size={24} color={THEME.colors.black} style={{ marginRight: 10 }} />
                <Text style={styles.headerTitle}>Your Bookings</Text>
            </View>

            <FlatList
                data={HISTORY_DATA}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={[
                                styles.status,
                                { color: item.status === 'Completed' ? THEME.colors.success : THEME.colors.error }
                            ]}>{item.status}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.locationRow}>
                            <View style={[styles.dot, { backgroundColor: THEME.colors.primary }]} />
                            <Text style={styles.locationText}>{item.pickup}</Text>
                        </View>
                        <View style={styles.locationRow}>
                            <View style={[styles.dot, { backgroundColor: THEME.colors.secondary }]} />
                            <Text style={styles.locationText}>{item.drop}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.row}>
                            <Text style={styles.vehicle}>{item.vehicle}</Text>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
         fontFamily: 'Poppins-Regular',
    },
    list: {
        padding: THEME.spacing.m,
    },
    card: {
        backgroundColor: THEME.colors.white,
        borderRadius: 8,
        padding: THEME.spacing.m,
        marginBottom: THEME.spacing.m,
        elevation: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: THEME.sizes.caption,
        color: THEME.colors.textSecondary,
    },
    status: {
        fontSize: THEME.sizes.caption,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: THEME.colors.border,
        marginVertical: THEME.spacing.s,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    locationText: {
        fontSize: THEME.sizes.body1,
        color: THEME.colors.text,
    },
    vehicle: {
        fontSize: THEME.sizes.body2,
        color: THEME.colors.textSecondary,
    },
    price: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
});

export default BookingHistory;

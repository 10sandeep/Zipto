import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VEHICLES = [
    { id: '1', name: 'Bike', price: '₹40', time: '5 min', capacity: '20 kg', icon: 'two-wheeler' },
    { id: '2', name: 'Tata Ace', price: '₹250', time: '12 min', capacity: '750 kg', icon: 'local-shipping' },
    { id: '3', name: 'Pickup 8ft', price: '₹450', time: '15 min', capacity: '1000 kg', icon: 'local-shipping' },
    { id: '4', name: '3 Wheeler', price: '₹200', time: '8 min', capacity: '500 kg', icon: 'local-shipping' },
];

const VehicleSelection = () => {
    const navigation = useNavigation<any>();
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleBook = () => {
        navigation.navigate('FareEstimate', { vehicle: selectedVehicle });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={THEME.colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Vehicle</Text>
            </View>

            <FlatList
                data={VEHICLES}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, selectedVehicle === item.id && styles.selectedCard]}
                        onPress={() => setSelectedVehicle(item.id as any)}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name={item.icon} size={30} color={THEME.colors.primary} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.capacity}>{item.capacity} • {item.time}</Text>
                        </View>
                        <Text style={styles.price}>{item.price}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.footer}>
                <Button
                    title="Next"
                    onPress={handleBook}
                    disabled={!selectedVehicle}
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
    },
    backButton: {
        marginRight: THEME.spacing.m,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        padding: THEME.spacing.m,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.white,
        padding: THEME.spacing.m,
        marginBottom: THEME.spacing.m,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 1,
    },
    selectedCard: {
        borderColor: THEME.colors.primary,
        backgroundColor: '#FFF0E0',
    },
    iconContainer: {
        width: 50,
        alignItems: 'center',
    },
    info: {
        flex: 1,
        paddingHorizontal: THEME.spacing.m,
    },
    name: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    capacity: {
        fontSize: THEME.sizes.caption,
        color: THEME.colors.textSecondary,
    },
    price: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    footer: {
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
});

export default VehicleSelection;

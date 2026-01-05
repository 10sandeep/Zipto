import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Input } from '../components/Input';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MOCK_LOCATIONS = [
    { id: '1', name: 'Master Canteen Area, Bhubaneswar', address: 'Kharvela Nagar' },
    { id: '2', name: 'KIIT University', address: 'Patia, Bhubaneswar' },
    { id: '3', name: 'Jayadev Vihar', address: 'Nayapalli, Bhubaneswar' },
    { id: '4', name: 'Esplanade One Mall', address: 'Rasulgarh, Bhubaneswar' },
    { id: '5', name: 'Lingaraj Temple', address: 'Old Town, Bhubaneswar' },
];

const PickupDropSelection = () => {
    const navigation = useNavigation<any>();
    const [pickup, setPickup] = useState('Current Location');
    const [drop, setDrop] = useState('');

    const navigateToBook = () => {
        // Simulate selection
        navigation.navigate('VehicleSelection');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={THEME.colors.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Select Location</Text>
            </View>

            <View style={styles.inputContainer}>
                <Input
                    value={pickup}
                    onChangeText={setPickup}
                    placeholder="Pickup Location"
                    style={styles.input}
                    containerStyle={{ marginBottom: 10 }}
                />
                <Input
                    value={drop}
                    onChangeText={setDrop}
                    placeholder="Drop Location"
                    autoFocus
                    style={styles.input}
                />
            </View>

            <FlatList
                data={MOCK_LOCATIONS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row} onPress={navigateToBook}>
                        <View style={styles.iconContainer}>
                            <Icon name="location-on" size={20} color={THEME.colors.textSecondary} />
                        </View>
                        <View>
                            <Text style={styles.locationName}>{item.name}</Text>
                            <Text style={styles.locationAddress}>{item.address}</Text>
                        </View>
                    </TouchableOpacity>
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
    inputContainer: {
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
        elevation: 2,
    },
    input: {
        backgroundColor: THEME.colors.background,
        borderWidth: 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
        backgroundColor: THEME.colors.white,
    },
    iconContainer: {
        marginRight: THEME.spacing.m,
        backgroundColor: THEME.colors.background,
        padding: 8,
        borderRadius: 20,
    },
    locationName: {
        fontSize: THEME.sizes.body1,
        fontWeight: '600',
        color: THEME.colors.text,
    },
    locationAddress: {
        fontSize: THEME.sizes.caption,
        color: THEME.colors.textSecondary,
    },
});

export default PickupDropSelection;

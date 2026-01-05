import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import { Input } from '../components/Input';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const navigation = useNavigation<any>();

    // Default to Bhubaneswar coordinates
    const [region, setRegion] = useState({
        latitude: 20.2961,
        longitude: 85.8245,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                showsUserLocation
                showsMyLocationButton
            >
                <Marker coordinate={region} />
            </MapView>

            <SafeAreaView style={styles.overlay} pointerEvents="box-none">
                <View style={styles.header}>
                    <View style={styles.menuButton}>
                        {/* Hamburger Menu Placeholder */}
                        <View style={{ width: 20, height: 2, backgroundColor: 'black', marginBottom: 4 }} />
                        <View style={{ width: 20, height: 2, backgroundColor: 'black', marginBottom: 4 }} />
                        <View style={{ width: 20, height: 2, backgroundColor: 'black' }} />
                    </View>
                    <Text style={styles.headerTitle}>Zipto</Text>
                </View>

                <View style={styles.searchContainer}>
                    <Button
                        title="Where to?"
                        onPress={() => navigation.navigate('PickupDropSelection')}
                        variant="outline"
                        style={{ backgroundColor: 'white', justifyContent: 'flex-start' }}
                        textStyle={{ color: THEME.colors.textSecondary }}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.white,
    },
    map: {
        width,
        height,
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: THEME.spacing.m,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuButton: {
        padding: 5,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.primary,
    },
    searchContainer: {
        backgroundColor: 'white',
        padding: THEME.spacing.m,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
});

export default Home;

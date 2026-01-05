import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

const LiveTracking = () => {
    const region = {
        latitude: 20.2961,
        longitude: 85.8245,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                showsUserLocation
            >
                <Marker coordinate={region} title="Driver" description="Arriving in 5 mins" />
            </MapView>

            <SafeAreaView style={styles.overlay} pointerEvents="box-none">
                <View />

                <View style={styles.driverCard}>
                    <View style={styles.driverHeader}>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Ramesh Kumar</Text>
                            <Text style={styles.vehicleInfo}>Tata Ace • OD-02-B-1234</Text>
                        </View>
                        <View style={styles.rating}>
                            <Icon name="star" size={16} color={THEME.colors.warning} />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon name="call" size={24} color={THEME.colors.primary} />
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon name="chat" size={24} color={THEME.colors.primary} />
                            <Text style={styles.actionText}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon name="share" size={24} color={THEME.colors.primary} />
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.statusRow}>
                        <Text style={styles.statusTitle}>Arriving in 5 mins</Text>
                        <Text style={styles.statusSubtitle}>Your driver is on the way</Text>
                    </View>
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
    driverCard: {
        backgroundColor: THEME.colors.white,
        borderRadius: 16,
        padding: THEME.spacing.m,
        elevation: 5,
    },
    driverHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: THEME.spacing.m,
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    vehicleInfo: {
        fontSize: THEME.sizes.caption,
        color: THEME.colors.textSecondary,
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: THEME.colors.border,
        paddingVertical: THEME.spacing.m,
        marginBottom: THEME.spacing.m,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        marginTop: 4,
        fontSize: 12,
        color: THEME.colors.primary,
    },
    statusRow: {
        alignItems: 'center',
    },
    statusTitle: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        color: THEME.colors.success,
    },
    statusSubtitle: {
        fontSize: 12,
        color: THEME.colors.textSecondary,
    },
});

export default LiveTracking;

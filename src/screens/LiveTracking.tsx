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

    // Light map style (standard/default map)
    const lightMapStyle = [
        {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "off" }]
        }
    ];

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                showsUserLocation
                customMapStyle={lightMapStyle}
            >
                <Marker 
                    coordinate={region} 
                    title="Driver" 
                    description="Arriving in 5 mins"
                    pinColor="#8B5CF6"
                />
            </MapView>

            <SafeAreaView style={styles.overlay} pointerEvents="box-none">
                {/* Top Status Bar */}
                <View style={styles.topBar}>
                    <View style={styles.statusBadge}>
                        <View style={styles.pulseDot} />
                        <Text style={styles.statusText}>Driver on the way</Text>
                    </View>
                </View>

                {/* Driver Card */}
                <View style={styles.driverCard}>
                    <View style={styles.driverHeader}>
                        <View style={styles.driverAvatar}>
                            <Icon name="person" size={32} color="#8B5CF6" />
                        </View>
                        <View style={styles.driverInfo}>
                            <Text style={styles.driverName}>Ramesh Kumar</Text>
                            <Text style={styles.vehicleInfo}>Tata Ace • OD-02-B-1234</Text>
                        </View>
                        <View style={styles.rating}>
                            <Icon name="star" size={16} color="#F59E0B" />
                            <Text style={styles.ratingText}>4.8</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="call" size={24} color="#8B5CF6" />
                            </View>
                            <Text style={styles.actionText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="chat" size={24} color="#8B5CF6" />
                            </View>
                            <Text style={styles.actionText}>Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <View style={styles.actionIconContainer}>
                                <Icon name="share" size={24} color="#8B5CF6" />
                            </View>
                            <Text style={styles.actionText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.statusRow}>
                        <Icon name="access-time" size={20} color="#059669" />
                        <View style={styles.statusInfo}>
                            <Text style={styles.statusTitle}>Arriving in 5 mins</Text>
                            <Text style={styles.statusSubtitle}>1.2 km away from pickup point</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.cancelButton}>
                        <Icon name="close" size={20} color="#DC2626" />
                        <Text style={styles.cancelText}>Cancel Ride</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    map: {
        width,
        height,
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
    },
    topBar: {
        alignItems: 'center',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    pulseDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#10B981',
        marginRight: 8,
    },
    statusText: {
        color: '#111827',
        fontSize: 14,
        fontWeight: '600',
    },
    driverCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    driverHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    driverAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    driverInfo: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    vehicleInfo: {
        fontSize: 13,
        color: '#6B7280',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF3C7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: '700',
        color: '#D97706',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    actionButton: {
        alignItems: 'center',
        flex: 1,
    },
    actionIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#E5E7EB',
    },
    actionText: {
        fontSize: 12,
        color: '#374151',
        fontWeight: '600',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0FDF4',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#BBF7D0',
    },
    statusInfo: {
        flex: 1,
        marginLeft: 12,
    },
    statusTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#059669',
        marginBottom: 4,
    },
    statusSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FEE2E2',
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    cancelText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#DC2626',
    },
});

export default LiveTracking;
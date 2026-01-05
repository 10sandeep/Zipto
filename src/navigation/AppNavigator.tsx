import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import PickupDropSelection from '../screens/PickupDropSelection';
import VehicleSelection from '../screens/VehicleSelection';
import FareEstimate from '../screens/FareEstimate';
import LiveTracking from '../screens/LiveTracking';

// Placeholder for screens not yet implemented
import { View, Text } from 'react-native';
const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{name} Screen</Text>
    </View>
);
// const Payment = () => <PlaceholderScreen name="Payment" />;

import Payment from '../screens/Payment'; // We will create this next
import BookingHistory from '../screens/BookingHistory'; // And this

export type AppStackParamList = {
    Home: undefined;
    PickupDropSelection: undefined;
    VehicleSelection: undefined;
    FareEstimate: { vehicle: string } | undefined;
    LiveTracking: undefined;
    Payment: undefined;
    BookingHistory: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PickupDropSelection" component={PickupDropSelection} />
            <Stack.Screen name="VehicleSelection" component={VehicleSelection} />
            <Stack.Screen name="FareEstimate" component={FareEstimate} />
            <Stack.Screen name="LiveTracking" component={LiveTracking} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="BookingHistory" component={BookingHistory} />
        </Stack.Navigator>
    );
};

export default AppNavigator;

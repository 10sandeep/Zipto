import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import PickupDropSelection from '../screens/PickupDropSelection';
import VehicleSelection from '../screens/VehicleSelection';
import FareEstimate from '../screens/FareEstimate';
import LiveTracking from '../screens/LiveTracking';
import MyOrders from '../screens/MyOrders';
import Payment from '../screens/Payment';
import BookingHistory from '../screens/BookingHistory';
import Profile from '../screens/Profile';
import Coins from '../screens/Coins'; // Import the actual Coins screen

// Placeholder for screens not yet implemented
import { View, Text } from 'react-native';
const PlaceholderScreen = ({ name }: { name: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{name} Screen</Text>
  </View>
);

export type AppStackParamList = {
  Home: undefined;
  PickupDropSelection: undefined;
  VehicleSelection: undefined;
  FareEstimate: { vehicle: string } | undefined;
  LiveTracking: undefined;
  Payment: undefined;
  BookingHistory: undefined;
  Profile: undefined;
  MyOrders: undefined;
  TrackOrder: { orderId?: string };
  Wallet: undefined;
  Support: undefined;
  Settings: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  AboutUs: undefined;
  Notifications: undefined;
  ScheduleDelivery: undefined;
  EditProfile: undefined;
  SavedAddresses: undefined;
  FAQs: undefined;
  NotificationSettings: undefined;
  Coins: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="PickupDropSelection"
        component={PickupDropSelection}
      />
      <Stack.Screen name="VehicleSelection" component={VehicleSelection} />
      <Stack.Screen name="FareEstimate" component={FareEstimate} />
      <Stack.Screen name="LiveTracking" component={LiveTracking} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="BookingHistory" component={BookingHistory} />
      
      {/* Use actual Profile component */}
      <Stack.Screen name="Profile" component={Profile} />
      
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen
        name="TrackOrder"
        component={() => <PlaceholderScreen name="TrackOrder" />}
      />
      <Stack.Screen
        name="Wallet"
        component={() => <PlaceholderScreen name="Wallet" />}
      />
      <Stack.Screen
        name="Support"
        component={() => <PlaceholderScreen name="Support" />}
      />
      <Stack.Screen
        name="Settings"
        component={() => <PlaceholderScreen name="Settings" />}
      />
      <Stack.Screen
        name="TermsAndConditions"
        component={() => <PlaceholderScreen name="TermsAndConditions" />}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={() => <PlaceholderScreen name="PrivacyPolicy" />}
      />
      <Stack.Screen
        name="AboutUs"
        component={() => <PlaceholderScreen name="AboutUs" />}
      />
      <Stack.Screen
        name="Notifications"
        component={() => <PlaceholderScreen name="Notifications" />}
      />
      <Stack.Screen
        name="ScheduleDelivery"
        component={() => <PlaceholderScreen name="ScheduleDelivery" />}
      />
      
      {/* Additional screens for Profile menu items */}
      <Stack.Screen
        name="EditProfile"
        component={() => <PlaceholderScreen name="EditProfile" />}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={() => <PlaceholderScreen name="SavedAddresses" />}
      />
      <Stack.Screen
        name="FAQs"
        component={() => <PlaceholderScreen name="FAQs" />}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={() => <PlaceholderScreen name="NotificationSettings" />}
      />
      
      {/* Use actual Coins component */}
      <Stack.Screen name="Coins" component={Coins} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
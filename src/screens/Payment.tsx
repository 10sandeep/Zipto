import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomTabBar from './BottomTabBar';

const Payment = () => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState<'cash' | 'upi'>('cash');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color={THEME.colors.black} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Payment</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.amount}>₹350</Text>
                    <Text style={styles.amountLabel}>Total Amount</Text>

                    <Text style={styles.sectionTitle}>Select Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.methodCard, selectedMethod === 'cash' && styles.selectedCard]}
                        onPress={() => setSelectedMethod('cash')}
                    >
                        <Icon name="money" size={24} color={THEME.colors.text} />
                        <Text style={styles.methodName}>Cash</Text>
                        {selectedMethod === 'cash' && <Icon name="check-circle" size={24} color={THEME.colors.primary} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.methodCard, selectedMethod === 'upi' && styles.selectedCard]}
                        onPress={() => setSelectedMethod('upi')}
                    >
                        <Icon name="account-balance-wallet" size={24} color={THEME.colors.text} />
                        <Text style={styles.methodName}>UPI (GPay / PhonePe)</Text>
                        {selectedMethod === 'upi' && <Icon name="check-circle" size={24} color={THEME.colors.primary} />}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Button
                        title={`Pay via ${selectedMethod === 'cash' ? 'Cash' : 'UPI'}`}
                        onPress={() => navigation.goBack()} // In real app, process payment then go back or success
                    />
                </View>
            </SafeAreaView>

            {/* Bottom Navigation Bar */}
            <BottomTabBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: THEME.spacing.m,
        backgroundColor: THEME.colors.white,
    },
    backButton: {
        marginRight: THEME.spacing.m,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: THEME.spacing.l,
    },
    amount: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: THEME.colors.primary,
    },
    amountLabel: {
        textAlign: 'center',
        color: THEME.colors.textSecondary,
        marginBottom: THEME.spacing.xl,
    },
    sectionTitle: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        marginBottom: THEME.spacing.m,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.colors.white,
        padding: THEME.spacing.m,
        borderRadius: 8,
        marginBottom: THEME.spacing.m,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: THEME.colors.primary,
        backgroundColor: '#FFF0E0',
    },
    methodName: {
        flex: 1,
        marginLeft: 10,
        fontSize: THEME.sizes.body1,
    },
    footer: {
        padding: THEME.spacing.m,
        paddingBottom: 10,
    },
});

export default Payment;
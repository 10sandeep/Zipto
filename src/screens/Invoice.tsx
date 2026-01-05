import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { THEME } from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Invoice = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="receipt" size={24} color={THEME.colors.black} style={{ marginRight: 10 }} />
                <Text style={styles.headerTitle}>Invoice #ZIP-12345</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>04 Jan 2026, 10:30 AM</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Vehicle</Text>
                        <Text style={styles.value}>Tata Ace</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>Pickup</Text>
                        <Text style={styles.locationValue}>Master Canteen Area</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.locationLabel}>Drop</Text>
                        <Text style={styles.locationValue}>Patia, Bhubaneswar</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Fare Breakdown</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Base Fare</Text>
                        <Text style={styles.value}>₹250</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Distance Charge (10km)</Text>
                        <Text style={styles.value}>₹80</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Taxes & Fees</Text>
                        <Text style={styles.value}>₹20</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={[styles.label, { fontWeight: 'bold', color: THEME.colors.black }]}>Total</Text>
                        <Text style={[styles.value, { fontWeight: 'bold', color: THEME.colors.black, fontSize: 18 }]}>₹350</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Download Receipt"
                    onPress={() => { }}
                    variant="outline"
                    icon={<Icon name="file-download" size={20} color={THEME.colors.primary} style={{ marginRight: 8 }} />}
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
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
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
        marginBottom: 8,
    },
    label: {
        fontSize: THEME.sizes.body2,
        color: THEME.colors.textSecondary,
    },
    value: {
        fontSize: THEME.sizes.body2,
        color: THEME.colors.text,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: THEME.colors.border,
        marginVertical: THEME.spacing.s,
    },
    locationContainer: {
        paddingVertical: 4,
    },
    locationLabel: {
        fontSize: 10,
        color: THEME.colors.textSecondary,
        textTransform: 'uppercase',
    },
    locationValue: {
        fontSize: THEME.sizes.body1,
        color: THEME.colors.text,
    },
    sectionTitle: {
        fontSize: THEME.sizes.body1,
        fontWeight: 'bold',
        marginBottom: THEME.spacing.m,
    },
    footer: {
        padding: THEME.spacing.m,
    },
});

export default Invoice;

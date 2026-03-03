import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OwnerDashboardScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Welcome back, Owner!</Text>
                    <Text style={styles.headerSubtitle}>Here is what's happening today.</Text>
                </View>

                {/* KPI Cards Section */}
                <View style={styles.kpiContainer}>
                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Total Revenue</Text>
                        <Text style={styles.kpiValue}>$2,450.00</Text>
                    </View>
                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>New Orders</Text>
                        <Text style={styles.kpiValue}>14</Text>
                    </View>
                    <View style={styles.kpiCard}>
                        <Text style={styles.kpiLabel}>Pending</Text>
                        <Text style={styles.kpiValue}>3</Text>
                    </View>
                </View>

                {/* Revenue Chart Placeholder */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Revenue Overview</Text>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderText}>[ Revenue Chart rendered here ]</Text>
                    </View>
                </View>

                {/* Inventory Summary Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Inventory Alerts</Text>
                        <TouchableOpacity>
                            <Text style={styles.linkText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>Organic Milk (Low Stock)</Text>
                        <Text style={styles.alertText}>5 left</Text>
                    </View>
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>Whole Wheat Bread (Out of Stock)</Text>
                        <Text style={styles.alertText}>0 left</Text>
                    </View>
                </View>

                {/* AI Recommendations Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AI Recommendations</Text>
                    <View style={styles.recommendationCard}>
                        <Text style={styles.recommendationText}>
                            Your bread sales peak on weekend mornings. Consider increasing your Friday inventory orders to meet demand.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA', // Light grey app background
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#718096',
        marginTop: 4,
    },
    kpiContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    kpiCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        width: '31%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
    },
    kpiLabel: {
        fontSize: 12,
        color: '#A0AEC0',
        marginBottom: 8,
        textAlign: 'center',
    },
    kpiValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3748',
        marginBottom: 12,
    },
    linkText: {
        color: '#3182CE',
        fontWeight: '600',
    },
    chartPlaceholder: {
        height: 180,
        backgroundColor: '#E2E8F0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#718096',
        fontStyle: 'italic',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 2,
        elevation: 1,
    },
    itemText: {
        fontSize: 15,
        color: '#4A5568',
    },
    alertText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#E53E3E', // Red for alerts
    },
    recommendationCard: {
        backgroundColor: '#EBF8FF', // Light blue background
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#3182CE',
    },
    recommendationText: {
        color: '#2B6CB0',
        fontSize: 15,
        lineHeight: 22,
    },
});

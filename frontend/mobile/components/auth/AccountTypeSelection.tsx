import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const PRIMARY_COLOR = '#16A34A';
const PADDING = 24;

interface AccountTypeSelectionProps {
    accountType: 'USER' | 'OWNER' | null;
    setAccountType: (type: 'USER' | 'OWNER') => void;
    onBack: () => void;
    onContinue: () => void;
    isLoading?: boolean;
}

export default function AccountTypeSelection({
    accountType,
    setAccountType,
    onBack,
    onContinue,
    isLoading = false,
}: AccountTypeSelectionProps) {
    return (
        <View style={styles.screenContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Choose your account type</Text>
                <Text style={styles.helperText}>Select how you want to use the app</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.accountCard,
                    accountType === 'USER' && styles.accountCardSelected
                ]}
                activeOpacity={0.8}
                onPress={() => setAccountType('USER')}
            >
                <View style={[styles.iconContainer, accountType === 'USER' && styles.iconContainerSelected]}>
                    <Ionicons name="bag-handle-outline" size={24} color={accountType === 'USER' ? PRIMARY_COLOR : '#6B7280'} />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>User</Text>
                    <Text style={styles.cardDesc}>Browse and order products</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.accountCard,
                    accountType === 'OWNER' && styles.accountCardSelected
                ]}
                activeOpacity={0.8}
                onPress={() => setAccountType('OWNER')}
            >
                <View style={[styles.iconContainer, accountType === 'OWNER' && styles.iconContainerSelected]}>
                    <Ionicons name="storefront-outline" size={24} color={accountType === 'OWNER' ? PRIMARY_COLOR : '#6B7280'} />
                </View>
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Store Owner</Text>
                    <Text style={styles.cardDesc}>Manage inventory and sell products</Text>
                </View>
            </TouchableOpacity>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
                style={[styles.primaryButton, (!accountType || isLoading) && styles.disabledButton]}
                activeOpacity={0.8}
                disabled={!accountType || isLoading}
                onPress={onContinue}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.primaryButtonText}>Continue</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: PADDING,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    helperText: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
    },
    accountCard: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        marginBottom: 16,
    },
    accountCardSelected: {
        backgroundColor: '#F0FDF4',
        borderColor: PRIMARY_COLOR,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconContainerSelected: {
        backgroundColor: '#DCFCE7',
    },
    cardTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
    primaryButton: {
        backgroundColor: PRIMARY_COLOR,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#E5E7EB',
        shadowOpacity: 0,
        elevation: 0,
    },
});

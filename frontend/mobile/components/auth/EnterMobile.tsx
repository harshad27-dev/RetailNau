import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#16A34A';
const PADDING = 24;

interface EnterMobileProps {
    mobileNumber: string;
    setMobileNumber: (num: string) => void;
    onBack: () => void;
    onSendOtp: () => void;
    isLoading?: boolean;
}

export default function EnterMobile({
    mobileNumber,
    setMobileNumber,
    onBack,
    onSendOtp,
    isLoading = false,
}: EnterMobileProps) {
    const isValid = mobileNumber.length === 10;

    return (
        <View style={styles.screenContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Enter your mobile</Text>
                <Text style={styles.helperText}>We'll send a verification code</Text>
            </View>

            <View style={[styles.phoneInputContainer, mobileNumber.length > 0 && styles.phoneInputContainerFocused]}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCodeText}>+91</Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </View>
                <View style={styles.divider} />
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Mobile Number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    maxLength={10}
                    autoFocus
                    selectionColor={PRIMARY_COLOR}
                />
            </View>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
                style={[styles.primaryButton, (!isValid || isLoading) && styles.disabledButton]}
                activeOpacity={0.8}
                disabled={!isValid || isLoading}
                onPress={onSendOtp}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.primaryButtonText}>Send OTP</Text>
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
    phoneInputContainer: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#F3F4F6',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    phoneInputContainerFocused: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#fff',
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginRight: 6,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 16,
    },
    phoneInput: {
        flex: 1,
        fontSize: 18,
        color: '#111827',
        fontWeight: '500',
        height: '100%',
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

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#16A34A';
const PADDING = 24;

interface WelcomeProps {
    onContinueMobile: () => void;
    onContinueGoogle: () => void;
    onContinueApple: () => void;
}

export default function Welcome({
    onContinueMobile,
    onContinueGoogle,
    onContinueApple
}: WelcomeProps) {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.logoContainer}>
                <View style={styles.logoPlaceholder}>
                    <Ionicons name="basket" size={48} color={PRIMARY_COLOR} />
                </View>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Login or create an account to continue</Text>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={onContinueMobile}>
                    <Text style={styles.primaryButtonText}>Continue with Mobile Number</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>OR</Text>
                    <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7} onPress={onContinueGoogle}>
                    <Ionicons name="logo-google" size={20} color="#000" style={styles.buttonIcon} />
                    <Text style={styles.outlineButtonText}>Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.outlineButton} activeOpacity={0.7} onPress={onContinueApple}>
                    <Ionicons name="logo-apple" size={20} color="#000" style={styles.buttonIcon} />
                    <Text style={styles.outlineButtonText}>Continue with Apple</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: PADDING,
        backgroundColor: '#fff',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    logoPlaceholder: {
        width: 88,
        height: 88,
        backgroundColor: '#F0FDF4',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 2,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    bottomContainer: {
        paddingBottom: 20,
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
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#F3F4F6',
    },
    dividerText: {
        color: '#9CA3AF',
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '500',
    },
    outlineButton: {
        height: 56,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    buttonIcon: {
        marginRight: 12,
    },
    outlineButtonText: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '600',
    },
    termsText: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 18,
    },
});

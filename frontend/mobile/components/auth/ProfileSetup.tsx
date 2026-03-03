import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#16A34A';
const PADDING = 24;

interface ProfileSetupProps {
    fullName: string;
    setFullName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    onBack: () => void;
    onComplete: () => void;
    onSkip: () => void;
}

export default function ProfileSetup({
    fullName,
    setFullName,
    email,
    setEmail,
    onBack,
    onComplete,
    onSkip
}: ProfileSetupProps) {
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);

    return (
        <View style={styles.screenContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Set up your profile</Text>
                <Text style={styles.helperText}>Tell us a bit about yourself</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                    style={[styles.textInput, isFocusedName && styles.textInputFocused]}
                    placeholder="e.g. John Doe"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setIsFocusedName(true)}
                    onBlur={() => setIsFocusedName(false)}
                    selectionColor={PRIMARY_COLOR}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email (Optional)</Text>
                <TextInput
                    style={[styles.textInput, isFocusedEmail && styles.textInputFocused]}
                    placeholder="e.g. john@example.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    selectionColor={PRIMARY_COLOR}
                />
            </View>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
                style={[styles.primaryButton, (!fullName.trim()) && styles.disabledButton]}
                activeOpacity={0.8}
                disabled={!fullName.trim()}
                onPress={onComplete}
            >
                <Text style={styles.primaryButtonText}>Complete Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.textButton} onPress={onSkip} activeOpacity={0.6}>
                <Text style={styles.textButtonText}>Skip for now</Text>
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
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    textInput: {
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#111827',
    },
    textInputFocused: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#fff',
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    primaryButton: {
        backgroundColor: PRIMARY_COLOR,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
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
    textButton: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    textButtonText: {
        color: '#6B7280',
        fontSize: 15,
        fontWeight: '600',
    },
});

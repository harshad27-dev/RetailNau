import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#16A34A';
const PADDING = 24;

interface OTPVerificationProps {
    mobileNumber: string;
    otp: string[];
    setOtp: (otp: string[]) => void;
    timer: number;
    onBack: () => void;
    onResendOtp: () => void;
    onVerify: () => void;
    isLoading: boolean;
}

export default function OTPVerification({
    mobileNumber,
    otp,
    setOtp,
    timer,
    onBack,
    onResendOtp,
    onVerify,
    isLoading
}: OTPVerificationProps) {

    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleOtpChange = (value: string, index: number) => {
        // Handle paste: if user pastes a full OTP string into first box
        if (value.length > 1) {
            const digits = value.replace(/\D/g, '').slice(0, 6).split('');
            const newOtp = [...otp];
            digits.forEach((d, i) => { newOtp[i] = d; });
            setOtp(newOtp);
            // Focus the last filled box (or last box)
            const lastIndex = Math.min(digits.length - 1, 5);
            inputRefs.current[lastIndex]?.focus();
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-advance to next input when a digit is entered
        if (value.length === 1 && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        // Move back to previous input on backspace if current box is already empty
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const isComplete = otp.join('').length === 6;

    return (
        <View style={styles.screenContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>

            <View style={styles.headerContainer}>
                <Text style={styles.title}>Verify OTP</Text>
                <Text style={styles.helperText}>
                    Enter 6-digit code sent to +91 {mobileNumber}
                </Text>
            </View>

            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => { inputRefs.current[index] = ref; }}
                        style={[styles.otpInput, digit.length > 0 && styles.otpInputFilled]}
                        keyboardType="number-pad"
                        maxLength={6}
                        value={digit}
                        onChangeText={(value) => handleOtpChange(value, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        autoFocus={index === 0}
                        cursorColor={PRIMARY_COLOR}
                        selectionColor={PRIMARY_COLOR}
                    />
                ))}
            </View>

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                    {timer > 0 ? `Resend OTP in 00:${timer.toString().padStart(2, '0')}` : "Didn't receive the code?"}
                </Text>
                {timer === 0 && (
                    <TouchableOpacity onPress={onResendOtp} disabled={isLoading}>
                        <Text style={styles.resendButtonText}>Resend</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={{ flex: 1 }} />

            <TouchableOpacity
                style={[styles.primaryButton, !isComplete && styles.disabledButton]}
                activeOpacity={0.8}
                disabled={!isComplete || isLoading}
                onPress={onVerify}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.primaryButtonText}>Verify & Continue</Text>
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
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    otpInput: {
        width: (width - (PADDING * 2) - (5 * 10)) / 6,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#F9FAFB',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        color: '#111827',
    },
    otpInputFilled: {
        borderColor: PRIMARY_COLOR,
        backgroundColor: '#fff',
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resendText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    resendButtonText: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
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

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    StyleSheet,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';

import Welcome from '../../components/auth/Welcome';
import EnterMobile from '../../components/auth/EnterMobile';
import OTPVerification from '../../components/auth/OTPVerification';
import AccountTypeSelection from '../../components/auth/AccountTypeSelection';
import ProfileSetup from '../../components/auth/ProfileSetup';
import { useMutation } from '@tanstack/react-query';
import { sendOtp, verifyOtp, updateRole } from '../../services/auth.service';
import { setCredentials } from '../../store/slices/authSlice';

export default function AuthScreen() {
    const dispatch = useDispatch();
    const router = useRouter();
    const role = useSelector((state: any) => state.auth.role);

    const [step, setStep] = useState(1);
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [accountType, setAccountType] = useState<'USER' | 'OWNER' | null>(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');

    // ─────────────────────────────────────────────
    // Mutation: Send OTP
    // ─────────────────────────────────────────────
    const sendOtpMutation = useMutation({
        mutationFn: (mobile: string) => sendOtp(mobile),
        onSuccess: () => {
            setTimer(30);
            handleNextStep();
        },
        onError: (error: any) => {
            console.error('Send OTP failed:', error);
        }
    });

    // ─────────────────────────────────────────────
    // Mutation: Verify OTP — stores JWT in Redux on success
    // ─────────────────────────────────────────────
    const verifyOtpMutation = useMutation({
        mutationFn: (data: { mobile: string, otp: string }) => verifyOtp(data.mobile, data.otp),
        onSuccess: (response: any) => {
            // response.data = { success, message, data: { isNewUser, user, tokens } }
            const payload = response?.data?.data ?? response?.data;
            const { isNewUser, user, tokens } = payload;

            if (!tokens?.accessToken) {
                console.error('[AuthScreen] verifyOtp: could not find accessToken in response', response?.data);
                return;
            }

            // Store access token + user in Redux so axios interceptor attaches it automatically
            dispatch(setCredentials({
                user: {
                    id: user.id,
                    email: '',
                    firstName: '',
                    lastName: '',
                    role: user.role,
                    createdAt: '',
                    updatedAt: '',
                },
                token: tokens.accessToken,
            }));

            if (!isNewUser) {
                // Returning user — role already set, skip onboarding and go home directly
                navigateToHome();
            } else {
                // New user — show AccountTypeSelection → ProfileSetup
                handleNextStep();
            }
        },
        onError: (error: any) => {
            console.error('OTP Verification failed:', error?.message ?? error);
        }
    });

    // ─────────────────────────────────────────────
    // Mutation: Update Role — sends selected account type to backend
    // ─────────────────────────────────────────────
    const updateRoleMutation = useMutation({
        mutationFn: (role: 'USER' | 'SHOP_OWNER') => updateRole(role),
        onSuccess: () => {
            handleNextStep();
        },
        onError: (error: any) => {
            console.error('Set role failed:', error?.message ?? error);
        }
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (step === 3 && timer > 0) {
            interval = setInterval(() => {
                setTimer((previewTimer) => previewTimer - 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [step, timer]);

    const handleNextStep = () => setStep(step + 1);
    const handlePrevStep = () => setStep(step - 1);

    // Navigate buyer → customer home, seller → owner dashboard
    // router.replace removes auth screens from history so back button can't return to them
    const navigateToHome = () => {
        if (role === 'SHOP_OWNER') {
            router.replace('/(owner)/(tabs)/dashboard');
        } else {
            router.replace('/(customer)/(tabs)/home');
        }
    };

    const renderCurrentStep = () => {
        switch (step) {
            case 1:
                return (
                    <Welcome
                        onContinueMobile={handleNextStep}
                        onContinueGoogle={() => console.log('Google Auth')}
                        onContinueApple={() => console.log('Apple Auth')}
                    />
                );
            case 2:
                return (
                    <EnterMobile
                        mobileNumber={mobileNumber}
                        setMobileNumber={setMobileNumber}
                        onBack={handlePrevStep}
                        isLoading={sendOtpMutation.isPending}
                        onSendOtp={() => {
                            if (mobileNumber.length === 10) {
                                sendOtpMutation.mutate(mobileNumber);
                            }
                        }}
                    />
                );
            case 3:
                return (
                    <OTPVerification
                        mobileNumber={mobileNumber}
                        otp={otp}
                        setOtp={setOtp}
                        timer={timer}
                        onBack={handlePrevStep}
                        onResendOtp={() => sendOtpMutation.mutate(mobileNumber)}
                        isLoading={verifyOtpMutation.isPending}
                        onVerify={() => {
                            const otpString = otp.join('');
                            if (otpString.length === 6) {
                                verifyOtpMutation.mutate({ mobile: mobileNumber, otp: otpString });
                            }
                        }}
                    />
                );
            case 4:
                return (
                    <AccountTypeSelection
                        accountType={accountType}
                        setAccountType={setAccountType}
                        onBack={handlePrevStep}
                        isLoading={updateRoleMutation.isPending}
                        onContinue={() => {
                            if (accountType) {
                                // Map 'OWNER' → 'SHOP_OWNER' to match backend enum
                                const backendRole = accountType === 'OWNER' ? 'SHOP_OWNER' : 'USER';
                                updateRoleMutation.mutate(backendRole);
                            }
                        }}
                    />
                );
            case 5:
                return (
                    <ProfileSetup
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                        onBack={handlePrevStep}
                        onComplete={navigateToHome}
                        onSkip={navigateToHome}
                    />
                );
            default:
                return <View />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        {renderCurrentStep()}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
});

// ──────────────────────────────────────────────────────────────────────────────
// Auth Component Prop Types
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Account type selected by the user during onboarding.
 */
export type AccountType = 'USER' | 'SHOP_OWNER';

export interface WelcomeProps {
    onContinueMobile: () => void;
    onContinueGoogle: () => void;
    onContinueApple: () => void;
}

export interface EnterMobileProps {
    mobileNumber: string;
    setMobileNumber: (num: string) => void;
    onBack: () => void;
    onSendOtp: () => void;
    isLoading?: boolean;
}

export interface OTPVerificationProps {
    mobileNumber: string;
    otp: string[];
    setOtp: (otp: string[]) => void;
    timer: number;
    onBack: () => void;
    onResendOtp: () => void;
    onVerify: () => void;
    isLoading: boolean;
}

export interface AccountTypeSelectionProps {
    accountType: AccountType | null;
    setAccountType: (type: AccountType) => void;
    onBack: () => void;
    onContinue: () => void;
    isLoading?: boolean;
}

export interface ProfileSetupProps {
    fullName: string;
    setFullName: (name: string) => void;
    email: string;
    setEmail: (email: string) => void;
    onBack: () => void;
    onComplete: () => void;
    onSkip: () => void;
}

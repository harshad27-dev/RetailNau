export const generateOtp = (): string => {
    // TODO: Switch back to real random string before pushing to production
    return (process.env.NODE_ENV === "production")
        ? Math.floor(100000 + Math.random() * 900000).toString()
        : "123456";
};

/** OTP validity window in minutes */
export const OTP_TTL_MINUTES = 5;

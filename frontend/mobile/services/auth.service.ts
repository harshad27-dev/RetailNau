import api from "./api";

export const sendOtp = (mobile: string) => {
    return api.post("/api/auth/send-otp", { mobile });
};

export const verifyOtp = (mobile: string, otp: string) => {
    return api.post("/api/auth/verify-otp", { mobile, otp });
};

export const updateRole = (role: "USER" | "SHOP_OWNER") => {
    return api.patch("/api/auth/role", { role });
};
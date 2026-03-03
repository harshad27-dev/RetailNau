import prisma from "../config/prisma";
import { generateTokens } from "../utils/jwt";
import { generateOtp, OTP_TTL_MINUTES } from "../utils/otp";
import { AuthResponse } from "../types/types";

export const authService = {

    // ─────────────────────────────────────────────
    // Send OTP to Mobile
    // ─────────────────────────────────────────────
    async sendOtp(mobile: string): Promise<{ message: string }> {
        // 1. Find or create user (upsert for atomicity)
        const user = await prisma.user.upsert({
            where: { mobile },
            create: { mobile },
            update: {}, // do not update anything if user already exists
        });

        // 2. Delete all previously unverified OTPs for this user
        await prisma.otp.deleteMany({
            where: { userId: user.id },
        });

        // 3. Generate new OTP
        const code = generateOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + OTP_TTL_MINUTES);

        // 4. Create OTP record using FK userId (scalar relation)
        await prisma.otp.create({
            data: {
                code,
                type: "LOGIN",
                expiresAt,
                user: {
                    connect: { id: user.id },
                },
            },
        });

        // TODO: Integrate SMS gateway (Twilio / MSG91) here
        console.log(`[DEV ONLY] OTP for ${mobile}: ${code}`);

        return { message: "OTP sent successfully" };
    },

    // ─────────────────────────────────────────────
    // Verify OTP & return JWT tokens
    // ─────────────────────────────────────────────
    async verifyOtp(mobile: string, code: string): Promise<AuthResponse> {
        // 1. Find user by mobile
        const user = await prisma.user.findUnique({
            where: { mobile },
        });

        if (!user) {
            const error: any = new Error("User not found. Please request an OTP first.");
            error.statusCode = 404;
            throw error;
        }

        // 2. Find a valid, unused, non-expired OTP
        const otpRecord = await prisma.otp.findFirst({
            where: {
                userId: user.id,
                code,
                isUsed: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!otpRecord) {
            const error: any = new Error("Invalid or expired OTP");
            error.statusCode = 401;
            throw error;
        }

        // 3. Mark OTP as used; mark user as verified if first time
        //    Capture the current state BEFORE updating so we know if this is a new user
        const wasAlreadyVerified = user.isVerified;

        await prisma.otp.update({
            where: { id: otpRecord.id },
            data: { isUsed: true },
        });

        if (!wasAlreadyVerified) {
            await prisma.user.update({
                where: { id: user.id },
                data: { isVerified: true },
            });
        }

        // 4. Generate access + refresh tokens
        const tokens = generateTokens({
            userId: user.id,
            mobile: user.mobile,
            role: user.role,
        });

        // 5. Persist refresh token in DB (7 day expiry)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.refreshToken.create({
            data: {
                token: tokens.refreshToken,
                expiresAt,
                user: {
                    connect: { id: user.id },
                },
            },
        });

        return {
            // isNewUser = true  → first login ever → show AccountTypeSelection + ProfileSetup
            // isNewUser = false → returning user  → skip onboarding, go straight to home
            isNewUser: !wasAlreadyVerified,
            user: {
                id: user.id,
                mobile: user.mobile,
                role: user.role,
            },
            tokens,
        };
    },

    // ─────────────────────────────────────────────
    // Rotate: generate a new access token from refresh token
    // ─────────────────────────────────────────────
    async refreshToken(token: string): Promise<{ accessToken: string }> {
        const { verifyRefreshToken, generateTokens: genTokens } = await import("../utils/jwt");

        // 1. Verify token signature
        const payload = verifyRefreshToken(token);

        // 2. Ensure token exists in DB and is active
        const stored = await prisma.refreshToken.findUnique({
            where: { token },
        });

        if (!stored || stored.isRevoked || stored.expiresAt < new Date()) {
            const error: any = new Error("Invalid or expired refresh token");
            error.statusCode = 401;
            throw error;
        }

        // 3. Issue new access token (refresh token stays the same)
        const tokens = genTokens({
            userId: payload.userId,
            mobile: payload.mobile,
            role: payload.role,
        });

        return { accessToken: tokens.accessToken };
    },

    // ─────────────────────────────────────────────
    // Logout — revoke the refresh token
    // ─────────────────────────────────────────────
    async logout(token: string): Promise<void> {
        await prisma.refreshToken.updateMany({
            where: { token },
            data: { isRevoked: true },
        });
    },

    // ─────────────────────────────────────────────
    // Set Role — called after OTP verified
    // ─────────────────────────────────────────────
    async setRole(userId: string, role: "USER" | "SHOP_OWNER"): Promise<{ id: string; mobile: string; role: string }> {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, mobile: true, role: true },
        });
        return user;
    },
};

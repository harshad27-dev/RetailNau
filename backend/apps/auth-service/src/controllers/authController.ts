import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import { AuthRequest } from "../middlewares/authMiddleware";

/* ================================================================
   AUTH CONTROLLER
   Route → Controller → Service → Prisma
================================================================ */

// ---------------------------------------------------------------
// POST /api/auth/send-otp
// ---------------------------------------------------------------
export const sendOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { mobile } = req.body;

        if (!mobile) {
            res.status(400).json({
                success: false,
                message: "Mobile number is required",
            });
            return;
        }

        const result = await authService.sendOtp(mobile);

        res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// POST /api/auth/verify-otp
// ---------------------------------------------------------------
export const verifyOtp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            res.status(400).json({
                success: false,
                message: "Mobile and OTP are required",
            });
            return;
        }

        const result = await authService.verifyOtp(mobile, otp);

        res.status(200).json({
            success: true,
            message: "OTP Verified successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// POST /api/auth/refresh
// ---------------------------------------------------------------
export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
            return;
        }

        const result = await authService.refreshToken(refreshToken);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// POST /api/auth/logout
// ---------------------------------------------------------------
export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
            return;
        }

        await authService.logout(refreshToken);

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// PATCH /api/auth/role  (protected — requires JWT)
// ---------------------------------------------------------------
export const setRole = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = req.userId;
        const { role } = req.body;

        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }

        if (!role || !["USER", "SHOP_OWNER"].includes(role)) {
            res.status(400).json({ success: false, message: "Invalid role. Must be USER or SHOP_OWNER" });
            return;
        }

        const user = await authService.setRole(userId, role);

        res.status(200).json({
            success: true,
            message: "Role updated successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

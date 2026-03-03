import { Router } from "express";
import {
    sendOtp,
    verifyOtp,
    refreshToken,
    logout,
    setRole,
} from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

// POST /api/auth/send-otp
router.post("/send-otp", sendOtp);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

// POST /api/auth/refresh
router.post("/refresh", refreshToken);

// POST /api/auth/logout
router.post("/logout", logout);

// PATCH /api/auth/role  (protected)
router.patch("/role", requireAuth, setRole);

export default router;

import { Router } from "express";
import {
    createProfile,
    updateProfile,
    getProfile,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Apply auth middleware to all profile routes
router.use(authMiddleware);

// POST /api/users/profile
router.post("/profile", createProfile);

// PUT /api/users/profile
router.put("/profile", updateProfile);

// GET /api/users/profile
router.get("/profile", getProfile);

export default router;
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_dev";

export interface AuthRequest extends Request {
    userId?: string;
    mobile?: string;
    role?: string;
}

export const requireAuth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ success: false, message: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, ACCESS_SECRET) as {
            userId: string;
            mobile: string;
            role: string;
        };

        req.userId = payload.userId;
        req.mobile = payload.mobile;
        req.role = payload.role;

        next();
    } catch {
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

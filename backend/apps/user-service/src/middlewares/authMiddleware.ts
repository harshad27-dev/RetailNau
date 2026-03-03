import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "access_secret_dev";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    role?: string;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token provided" });
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
        req.role = payload.role;

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

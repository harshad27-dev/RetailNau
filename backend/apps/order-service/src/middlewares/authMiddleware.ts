import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/types";

// Extend Express Request to carry the decoded user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

/* ================================================================
   AUTH MIDDLEWARE — verifies JWT access token
   Expects header:  Authorization: Bearer <token>
================================================================ */
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Unauthorized — no token provided",
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("JWT_SECRET not configured");

        const decoded = jwt.verify(token, secret) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err: any) {
        res.status(401).json({
            success: false,
            message: "Unauthorized — invalid or expired token",
        });
    }
};

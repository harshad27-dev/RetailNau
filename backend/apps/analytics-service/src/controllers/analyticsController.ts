import { NextFunction, Request, Response } from "express";
import { analyticsService } from "../services/analyticsService";

export const getAnalytics = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await analyticsService.getAnalytics();
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

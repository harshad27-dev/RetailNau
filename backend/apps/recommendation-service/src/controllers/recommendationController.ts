import { NextFunction, Request, Response } from "express";
import { recommendationService } from "../services/recommendationService";

export const getRecommendations = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await recommendationService.getRecommendations();
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

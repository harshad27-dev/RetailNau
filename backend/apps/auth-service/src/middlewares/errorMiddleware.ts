import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(`[ERROR] ${err.message}`);

    const statusCode = err.statusCode || err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};

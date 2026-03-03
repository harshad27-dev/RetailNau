import { NextFunction, Request, Response } from "express";
import { productService } from "../services/productService";

export const getProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await productService.getProducts();
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

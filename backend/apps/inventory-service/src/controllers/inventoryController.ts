import { NextFunction, Request, Response } from "express";
import { inventoryService } from "../services/inventoryService";

export const getInventory = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await inventoryService.getInventory();
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

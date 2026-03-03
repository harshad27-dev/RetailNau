import { Request, Response, NextFunction } from "express";
import { orderService } from "../services/orderService";
import { CreateOrderDTO, UpdateOrderStatusDTO } from "../types/types";

/* ================================================================
   ORDER CONTROLLER
   Route → Controller → Service → Prisma
================================================================ */

// ---------------------------------------------------------------
// POST /api/orders
// ---------------------------------------------------------------
export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const body = req.body as CreateOrderDTO;

        // Basic validation
        if (!body.shopId) {
            res.status(400).json({ success: false, message: "shopId is required" });
            return;
        }
        if (!body.items || body.items.length === 0) {
            res.status(400).json({ success: false, message: "Order must have at least one item" });
            return;
        }

        const order = await orderService.createOrder(body);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// GET /api/orders?shopId=xxx&page=1&limit=20
// ---------------------------------------------------------------
export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const shopId = req.query.shopId as string;

        if (!shopId) {
            res.status(400).json({ success: false, message: "shopId query param is required" });
            return;
        }

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;

        const result = await orderService.getOrdersByShop(shopId, page, limit);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// GET /api/orders/:id?shopId=xxx
// ---------------------------------------------------------------
export const getOrderById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const shopId = req.query.shopId as string;

        if (!shopId) {
            res.status(400).json({ success: false, message: "shopId query param is required" });
            return;
        }

        const order = await orderService.getOrderById(id, shopId);

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// PATCH /api/orders/:id/status
// ---------------------------------------------------------------
export const updateOrderStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const shopId = req.query.shopId as string || req.body.shopId;
        const body = req.body as UpdateOrderStatusDTO;

        if (!shopId) {
            res.status(400).json({ success: false, message: "shopId is required" });
            return;
        }
        if (!body.status) {
            res.status(400).json({ success: false, message: "status is required" });
            return;
        }

        const order = await orderService.updateOrderStatus(id, shopId, body);

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

// ---------------------------------------------------------------
// PATCH /api/orders/:id/cancel
// ---------------------------------------------------------------
export const cancelOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const shopId = req.query.shopId as string || req.body.shopId;

        if (!shopId) {
            res.status(400).json({ success: false, message: "shopId is required" });
            return;
        }

        const order = await orderService.cancelOrder(id, shopId);

        res.status(200).json({
            success: true,
            message: "Order cancelled",
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

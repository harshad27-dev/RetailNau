import { Router } from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
} from "../controllers/orderController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();

// All order routes are protected
router.use(authenticate);

// POST   /api/orders          — create a new order
router.post("/", createOrder);

// GET    /api/orders?shopId=  — list orders for a shop (paginated)
router.get("/", getOrders);

// GET    /api/orders/:id      — get a single order by ID
router.get("/:id", getOrderById);

// PATCH  /api/orders/:id/status   — update order status
router.patch("/:id/status", updateOrderStatus);

// PATCH  /api/orders/:id/cancel   — cancel an order
router.patch("/:id/cancel", cancelOrder);

export default router;

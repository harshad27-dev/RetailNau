import prisma from "../config/prisma";
import {
    CreateOrderDTO,
    UpdateOrderStatusDTO,
    OrderResponse,
} from "../types/types";
import { AppError } from "../utils/AppError";

/* ================================================================
   ORDER SERVICE — all database operations via Prisma
================================================================ */

export const orderService = {

    // ─────────────────────────────────────────────
    // Create a new order with nested order items
    // ─────────────────────────────────────────────
    async createOrder(data: CreateOrderDTO): Promise<OrderResponse> {
        const { shopId, customerId, items, discount = 0, paymentMethod = "CASH", notes } = data;

        if (!items || items.length === 0) {
            throw new AppError("Order must have at least one item", 400);
        }

        // Calculate totals
        const totalAmount = items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );
        const finalAmount = Math.max(0, totalAmount - discount);

        const order = await prisma.order.create({
            data: {
                shopId,
                customerId: customerId ?? null,
                totalAmount,
                discount,
                finalAmount,
                paymentMethod,
                notes: notes ?? null,
                items: {
                    create: items.map((item) => ({
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        totalPrice: item.unitPrice * item.quantity,
                    })),
                },
            },
            include: { items: true },
        });

        return order as unknown as OrderResponse;
    },

    // ─────────────────────────────────────────────
    // Get all orders for a shop (with pagination)
    // ─────────────────────────────────────────────
    async getOrdersByShop(
        shopId: string,
        page: number = 1,
        limit: number = 20
    ): Promise<{ orders: OrderResponse[]; total: number; page: number; limit: number }> {
        const skip = (page - 1) * limit;

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: { shopId },
                include: { items: true },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.order.count({ where: { shopId } }),
        ]);

        return {
            orders: orders as unknown as OrderResponse[],
            total,
            page,
            limit,
        };
    },

    // ─────────────────────────────────────────────
    // Get a single order by ID
    // ─────────────────────────────────────────────
    async getOrderById(id: string, shopId: string): Promise<OrderResponse> {
        const order = await prisma.order.findFirst({
            where: { id, shopId },
            include: { items: true },
        });

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        return order as unknown as OrderResponse;
    },

    // ─────────────────────────────────────────────
    // Update order status / payment status
    // ─────────────────────────────────────────────
    async updateOrderStatus(
        id: string,
        shopId: string,
        data: UpdateOrderStatusDTO
    ): Promise<OrderResponse> {
        // Verify the order belongs to this shop
        const existing = await prisma.order.findFirst({ where: { id, shopId } });

        if (!existing) {
            throw new AppError("Order not found", 404);
        }

        // Prevent illegal status transitions
        if (existing.status === "CANCELLED") {
            throw new AppError("Cannot update a cancelled order", 400);
        }

        const updated = await prisma.order.update({
            where: { id },
            data: {
                status: data.status,
                ...(data.paymentStatus && { paymentStatus: data.paymentStatus }),
            },
            include: { items: true },
        });

        return updated as unknown as OrderResponse;
    },

    // ─────────────────────────────────────────────
    // Cancel an order
    // ─────────────────────────────────────────────
    async cancelOrder(id: string, shopId: string): Promise<OrderResponse> {
        const existing = await prisma.order.findFirst({ where: { id, shopId } });

        if (!existing) {
            throw new AppError("Order not found", 404);
        }

        if (existing.status === "COMPLETED") {
            throw new AppError("Cannot cancel a completed order", 400);
        }

        const cancelled = await prisma.order.update({
            where: { id },
            data: { status: "CANCELLED" },
            include: { items: true },
        });

        return cancelled as unknown as OrderResponse;
    },
};

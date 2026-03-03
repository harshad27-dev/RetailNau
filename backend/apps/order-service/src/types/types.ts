// ============================================================
// Order Service — Types & DTOs
// ============================================================

// ── Enums (mirror Prisma enums for use in app logic) ────────

export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "COMPLETED"
    | "CANCELLED";

export type PaymentMethod = "CASH" | "UPI" | "CARD" | "CREDIT";

export type PaymentStatus = "UNPAID" | "PAID" | "PARTIALLY_PAID" | "REFUNDED";

// ── Request DTOs ─────────────────────────────────────────────

export interface OrderItemDTO {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface CreateOrderDTO {
    shopId: string;
    customerId?: string;
    items: OrderItemDTO[];
    discount?: number;
    paymentMethod?: PaymentMethod;
    notes?: string;
}

export interface UpdateOrderStatusDTO {
    status: OrderStatus;
    paymentStatus?: PaymentStatus;
}

// ── Response types ───────────────────────────────────────────

export interface OrderItemResponse {
    id: string;
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderResponse {
    id: string;
    shopId: string;
    customerId: string | null;
    status: OrderStatus;
    totalAmount: number;
    discount: number;
    finalAmount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItemResponse[];
}

// ── JWT payload attached by authMiddleware ───────────────────

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

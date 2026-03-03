import { SERVICE_GATEWAY_BASE_URL } from "@kyrana/constants";

export const serviceGatewayConfig = {
  gateway: process.env.GATEWAY_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.gateway,
  analytics: process.env.ANALYTICS_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.analytics,
  auth: process.env.AUTH_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.auth,
  inventory: process.env.INVENTORY_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.inventory,
  order: process.env.ORDER_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.order,
  product: process.env.PRODUCT_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.product,
  recommendation:
    process.env.RECOMMENDATION_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.recommendation,
  user: process.env.USER_BASE_URL ?? SERVICE_GATEWAY_BASE_URL.user,
} as const;

export const KYRANA_OFFICE_NETWORK = {
  subnet: "192.168.1.0/24",
  gateway: "192.168.1.1",
  parentInterface: "Ethernet",
} as const;

export const SERVICE_GATEWAY_IPV4 = {
  gateway: "192.168.1.40",
  analytics: "192.168.1.50",
  auth: "192.168.1.51",
  inventory: "192.168.1.52",
  order: "192.168.1.53",
  product: "192.168.1.54",
  recommendation: "192.168.1.55",
  user: "192.168.1.56",
} as const;

export const SERVICE_GATEWAY_PORT = 80 as const;

export const SERVICE_GATEWAY_BASE_URL = {
  gateway: `http://${SERVICE_GATEWAY_IPV4.gateway}:${SERVICE_GATEWAY_PORT}`,
  analytics: `http://${SERVICE_GATEWAY_IPV4.analytics}:${SERVICE_GATEWAY_PORT}`,
  auth: `http://${SERVICE_GATEWAY_IPV4.auth}:${SERVICE_GATEWAY_PORT}`,
  inventory: `http://${SERVICE_GATEWAY_IPV4.inventory}:${SERVICE_GATEWAY_PORT}`,
  order: `http://${SERVICE_GATEWAY_IPV4.order}:${SERVICE_GATEWAY_PORT}`,
  product: `http://${SERVICE_GATEWAY_IPV4.product}:${SERVICE_GATEWAY_PORT}`,
  recommendation: `http://${SERVICE_GATEWAY_IPV4.recommendation}:${SERVICE_GATEWAY_PORT}`,
  user: `http://${SERVICE_GATEWAY_IPV4.user}:${SERVICE_GATEWAY_PORT}`,
} as const;

# Per-Service IPv4 Gateways (Office LAN)

## Purpose
This deployment exposes each Kyrana microservice through its own LAN IPv4 gateway using Nginx and Docker macvlan.

## Compose File
- infrastructure/docker/docker-compose.gateways.yml

## Static IPv4 Assignment
- global-gateway: 192.168.1.40
- analytics-gateway: 192.168.1.50
- auth-gateway: 192.168.1.51
- inventory-gateway: 192.168.1.52
- order-gateway: 192.168.1.53
- product-gateway: 192.168.1.54
- recommendation-gateway: 192.168.1.55
- user-gateway: 192.168.1.56

## Expected Internal Upstream DNS
Each gateway proxies to backend service DNS names on the `kyrana_backend_internal` network:
- gateway:3000
- analytics-service:3000
- auth-service:3000
- inventory-service:3000
- order-service:3000
- product-service:3000
- recommendation-service:3000
- user-service:3000

## Bring Up
From backend/ run:
- docker compose -f infrastructure/docker/docker-compose.gateways.yml --env-file .env.example up -d

## LAN Requirements
- Office router subnet must match OFFICE_LAN_SUBNET / OFFICE_LAN_GATEWAY values.
- Parent NIC name must match OFFICE_LAN_PARENT_INTERFACE (default: Ethernet on Windows).
- Reserve these IPs in DHCP to avoid collision.


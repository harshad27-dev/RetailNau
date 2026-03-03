# Kyrana Platform Monorepo Architecture

## Monorepo Strategy
- Package manager: npm workspaces
- Workspace roots:
  - apps/*
  - packages/*
- Objective: independently deployable backend microservices with shared contracts and platform utilities.

## Service Topology
- gateway: edge routing, request composition, authentication delegation, rate limiting, cross-cutting middleware.
- auth-service: authentication, authorization, token lifecycle.
- user-service: user profile domain and preference domain.
- product-service: product catalog domain.
- order-service: order lifecycle domain.
- inventory-service: stock, reservations, and availability domain.
- analytics-service: event ingestion and pre-aggregated KPI materialization.
- recommendation-service: rule-based recommendation generation.

## Internal Service Structure (Standardized)
Each service under apps/* follows:
- src/models
- src/controllers
- src/services
- src/routes
- src/middlewares
- src/config
- src/utils
- src/types
- src/app.ts
- src/server.ts

## Shared Packages (Single Source of Truth)
- packages/types: shared DTOs, event contracts, and cross-service type contracts.
- packages/validation: reusable validation schemas for API and event boundaries.
- packages/constants: platform constants and feature flags.
- packages/utils: reusable utility helpers.
- packages/config: environment and runtime configuration abstractions.
- packages/logger: centralized logging interfaces and adapters.

This organization prevents duplicated schemas by centralizing contracts and validation in shared packages.

## Production Capabilities
- Pre-aggregated analytics:
  - analytics-service computes and serves pre-aggregated KPI datasets.
  - cron schedules located in infrastructure/cron trigger aggregation windows.
- Rule-based recommendations:
  - recommendation-service evaluates deterministic business rules.
  - rule constants/versioning supported through packages/constants.
- KPI dashboards:
  - dashboard backends consume analytics-service pre-aggregated endpoints.
  - observability stack definitions under infrastructure/observability.
- Redis caching:
  - shared cache topology managed in infrastructure/redis.
  - service-level cache policy configured via packages/config.
- Docker deployment:
  - per-service Dockerfile under apps/*.
  - local orchestration entrypoint in docker-compose.yml.
  - infrastructure/docker contains reusable container assets.

## Scalability and Reliability
- Independent scaling:
  - each service is an isolated deployable unit with independent runtime, release, and autoscaling policy.
- Domain isolation:
  - bounded contexts are mapped to service ownership to reduce coupling.
- Contract governance:
  - packages/types and packages/validation are the cross-service contract boundary.
- Operational readiness:
  - infrastructure supports monitoring/log aggregation under observability components.
  - kubernetes and terraform directories reserved for production rollout patterns.

## Infrastructure Layout
- infrastructure/docker: base images and service/monitoring container assets.
- infrastructure/nginx: edge proxy/gateway ingress definitions.
- infrastructure/redis: cache deployment assets.
- infrastructure/cron: scheduled job definitions for aggregation workflows.
- infrastructure/observability:
  - prometheus
  - grafana
  - loki
- infrastructure/kubernetes: cluster manifests.
- infrastructure/terraform: infrastructure as code modules.
- infrastructure/scripts: platform automation scripts.

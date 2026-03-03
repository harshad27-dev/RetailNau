import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances in development (tsx watch issue)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // remove "query" in production
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
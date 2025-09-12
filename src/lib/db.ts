import { PrismaClient } from "@prisma/client";

// évite de recréer des clients en dev (hot reload)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["warn", "error"], // tu peux mettre "query" pour debugger
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

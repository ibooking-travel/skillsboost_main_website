import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Check if we're in a build environment where database might not be available
const isBuildTime = process.env.CI === 'true' || process.env.VERCEL === '1' || process.env.NETLIFY === 'true' || !process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // Skip database connection during build if in CI/build environment
    datasources: !isBuildTime ? {
      db: {
        url: process.env.DATABASE_URL,
      },
    } : undefined,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

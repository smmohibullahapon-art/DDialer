// Fallback Mock Prisma Client for DDialer Web Dashboard
class MockPrismaClient {
  call = {
    count: async () => 1420,
    findMany: async () => [],
  };
  sms = {
    count: async () => 6270,
  };
  tenant = {
    findUnique: async () => ({ id: 'tenant-1', name: 'Dial Dynamic Ltd', walletBalance: 15000 }),
  };
}

let prismaInstance: any;

try {
  const { PrismaClient } = require('@prisma/client');
  const globalForPrisma = globalThis as unknown as { prisma: any };
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
} catch {
  prismaInstance = new MockPrismaClient();
}

export const prisma = prismaInstance;
export default prisma;
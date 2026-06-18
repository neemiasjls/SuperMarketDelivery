import { PrismaClient } from '@prisma/client'

// Singleton do PrismaClient.
// Em desenvolvimento o ts-node-dev faz respawn a cada alteração; sem o cache
// global isso criaria várias conexões e estouraria o pool do Postgres.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  })

if (process.env.NODE_ENV === 'development') {
  globalForPrisma.prisma = prisma
}

import { PrismaClient } from '@prisma/client'

// Use the same database connection as the backend
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: "postgres://lucav:lucav@localhost:5431/db"
      }
    }
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma

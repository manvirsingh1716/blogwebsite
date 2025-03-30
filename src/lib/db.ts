import { PrismaClient } from '@prisma/client'

// Use the same database connection as the backend
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://neondb_owner:npg_cBLVKiA08bpY@ep-polished-glitter-a5woj7fo-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
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

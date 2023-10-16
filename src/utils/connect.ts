// Vì cần prisma client để fetch data từ CSDL prisma ,mỗi lần fetch tránh tạo nhiều đối tượng prisma 
// Sử dụng một singleton, đảm bảo rằng chỉ có một thực thể PrismaClient 
// được tạo ra và tất cả các phần của ứng dụng của bạn đều sử dụng cùng một thực thể đó.

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}
// 
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
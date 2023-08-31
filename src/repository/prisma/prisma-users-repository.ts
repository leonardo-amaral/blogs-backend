import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: Pick<Prisma.UserCreateInput, 'email'>) {
    const user = await prisma.user.findUnique({
      where: email
    })

    return user
  }

  async findById(id: Pick<Prisma.UserCreateInput, 'id'>) {
    const user = await prisma.user.findUnique({
      where: id
    })

    return user
  }
}

import { UsersService } from '@/modules/users/UsersService'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

export function FactoryUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const userServices = new UsersService(usersRepository)

  return userServices
}

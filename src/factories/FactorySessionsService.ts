import { SessionService } from '@/modules/sessions/SessionsServices'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

export function FactorySessionsService() {
  const usersRepository = new PrismaUsersRepository()
  const sessionsServices = new SessionService(usersRepository)

  return sessionsServices
}

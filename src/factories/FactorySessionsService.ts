import { SessionService } from '@/modules/sessions/SessionsService'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

export function FactorySessionsService() {
  const usersRepository = new PrismaUsersRepository()
  const sessionsServices = new SessionService(usersRepository)

  return sessionsServices
}

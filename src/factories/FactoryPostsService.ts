import { PostsServices } from '@/modules/posts/PostsServices'
import { PrismaPostsRepository } from '@/repository/prisma/prisma-post-repository'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

export function FactoryPostsService() {
  const postsRepository = new PrismaPostsRepository()
  const usersRepository = new PrismaUsersRepository()
  const sessionsServices = new PostsServices(usersRepository, postsRepository)

  return sessionsServices
}

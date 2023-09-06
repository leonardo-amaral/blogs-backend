import { CommentsServices } from '@/modules/comments/CommentsServices'
import { PrismaCommentsRepository } from '@/repository/prisma/prisma-comments-repository'
import { PrismaPostsRepository } from '@/repository/prisma/prisma-post-repository'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

export function FactoryCommentsService() {
  const commentsRepository = new PrismaCommentsRepository()
  const userRepository = new PrismaUsersRepository()
  const postsRepository = new PrismaPostsRepository()

  const commentsService = new CommentsServices(
    commentsRepository,
    userRepository,
    postsRepository
  )

  return commentsService
}

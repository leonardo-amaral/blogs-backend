import { PrismaCommentsRepository } from '@/repository/prisma/prisma-comments-repository'
import { PrismaPostsRepository } from '@/repository/prisma/prisma-post-repository'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'

interface CreateCommentProps {
  content: string
  authorId: string
  postId: string
}

export class CommentsServices {
  constructor(
    private commentsRepository: PrismaCommentsRepository,
    private usersRepository: PrismaUsersRepository,
    private postsRepository: PrismaPostsRepository
  ) {}

  async create({ authorId, content, postId }: CreateCommentProps) {
    const user = await this.usersRepository.findById({ id: authorId })
    if (!user) {
      throw new Error('User not found!')
    }

    const { posts } = await this.postsRepository.findPostById({ id: postId })
    if (!posts) {
      throw new Error('Post not found')
    }

    const comments = await this.commentsRepository.create({
      authorId,
      content,
      postId
    })

    return {
      comments
    }
  }

  async find({ postId }: { postId: string }) {
    const { posts } = await this.postsRepository.findPostById({ id: postId })
    if (!posts) {
      throw new Error('Post not found')
    }

    const { comments } = await this.commentsRepository.findComments({
      id: postId
    })
    if (!comments) {
      throw new Error('Comments not found')
    }

    return {
      comments
    }
  }
}

import { prisma } from '@/lib/prisma'

interface CreateCommentInput {
  content: string
  authorId: string
  postId: string
}

export class PrismaCommentsRepository {
  async create(data: CreateCommentInput) {
    const comments = await prisma.comment.create({
      data: {
        content: data.content,
        authorId: data.authorId,
        postId: data.postId
      }
    })

    return {
      comments
    }
  }

  async findComments({ id }: { id: string }) {
    const comments = await prisma.comment.findMany({
      where: {
        postId: id
      }
    })

    return {
      comments
    }
  }
}

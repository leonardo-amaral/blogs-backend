import { prisma } from '@/lib/prisma'

interface CreatePostServiceProps {
  title: string
  authorId: string
}

export class PrismaPostsRepository {
  async create(data: CreatePostServiceProps) {
    const posts = await prisma.post.create({
      data: {
        title: data.title,
        authorId: data.authorId
      }
    })

    return {
      posts
    }
  }

  async findPostById(id: string) {
    const posts = await prisma.post.findUnique({
      where: {
        id
      }
    })
    return {
      posts
    }
  }

  async listPosts() {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc'
      }
    })

    return {
      posts
    }
  }
}

import { prisma } from '@/lib/prisma'

interface CreatePostServiceProps {
  title: string
  authorId: string
  description: string
  categories: string[]
}

interface CreatedPost {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  description: string
  categories: string
  authorId: string
}

export class PrismaPostsRepository {
  async create(data: CreatePostServiceProps) {
    const post = await prisma.post.create({
      data: {
        title: data.title,
        authorId: data.authorId,
        description: data.description
      }
    })

    const findCategories = await prisma.category.findMany({
      where: {
        name: {
          in: data.categories
        }
      }
    })

    console.log(findCategories)

    for (let item of findCategories) {
      await prisma.postRelCategory.create({
        data: {
          categoryId: item.id,
          postId: post.id
        }
      })
    }

    return {
      post
    }
  }

  async findPostById({ id }: { id: string }) {
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

import { PrismaPostsRepository } from '@/repository/prisma/prisma-post-repository'
import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import fs from 'fs'
import path from 'path'

interface CreatePostsProps {
  title: string
  userId: string
  data: string
}

export class PostsServices {
  constructor(
    private usersRepository: PrismaUsersRepository,
    private postsRepository: PrismaPostsRepository
  ) {}

  async create({ title, userId, data }: CreatePostsProps) {
    const user = await this.usersRepository.findById({ id: userId })
    if (!user) {
      throw new Error('Invalid ID')
    }

    const { posts } = await this.postsRepository.create({
      authorId: user.id,
      title
    })

    const fileName = `${posts.id}.html`
    const filePath = path.join(__dirname, '../../data/posts/', fileName)

    try {
      fs.writeFileSync(filePath, data)
      console.log('File saved successfully:', filePath)
    } catch (error) {
      console.error('Error saving file:', error)
      throw new Error('Error in save file!')
    }
  }

  async findPost({ id }: { id: string }) {
    const { posts } = await this.postsRepository.findPostById(id)

    if (!posts) {
      throw new Error('Post not found!')
    }
    const fileName = `${posts?.id}.html`
    const filePath = path.join(__dirname, '../../data/posts/', fileName)

    try {
      const htmlContent = fs.readFileSync(filePath, 'utf-8')
      return {
        htmlContent
      }
    } catch (error) {
      throw `Error reading HTML file - ${error}`
    }
  }

  async findList() {
    const { posts } = await this.postsRepository.listPosts()
    if (!posts) {
      throw new Error('Not found')
    }

    return {
      posts
    }
  }
}

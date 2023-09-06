import { FactoryPostsService } from '@/factories/FactoryPostsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
export class PostsControllers {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      title: z.string(),
      data: z.string(),
      description: z.string(),
      categorie: z.string().array()
    })

    const { title, data, description, categorie } = bodySchema.parse(
      request.body
    )
    try {
      await request.jwtVerify()
      const postsService = FactoryPostsService()

      await postsService.create({
        userId: request.user.sub,
        title,
        data,
        description,
        categorie
      })

      return reply.status(200).send()
    } catch (error) {
      if (error) {
        return reply
          .status(500)
          .send({ message: 'Internal Server Error', error })
      }
    }
  }

  async getPostById(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      post_id: z.string()
    })
    const { post_id } = bodySchema.parse(request.params)
    try {
      await request.jwtVerify()
      const postsService = FactoryPostsService()

      const { htmlContent, posts } = await postsService.findPost({
        id: post_id
      })

      return reply.status(200).send({
        htmlContent,
        posts
      })
    } catch (error) {
      return reply
        .status(500) // Use o código de status fornecido ou 500 por padrão
        .send({ message: error || 'Internal Server Error' })
    }
  }

  async listPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify()
      const postsServices = FactoryPostsService()
      const { posts } = await postsServices.findList()

      return reply.status(200).send({ posts })
    } catch (error) {
      if (error) {
        return reply
          .status(500)
          .send({ message: 'Internal Server Error', error })
      }
    }
  }
}

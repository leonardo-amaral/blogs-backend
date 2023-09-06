import { FactoryCommentsService } from '@/factories/FactoryCommentsService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class CommentsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      postId: z.string(),
      content: z.string()
    })
    try {
      await request.jwtVerify()
      const { content, postId } = bodySchema.parse(request.body)

      const commentsService = FactoryCommentsService()
      const { comments } = await commentsService.create({
        authorId: request.user.sub,
        content,
        postId
      })

      return reply.status(200).send(comments)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal Server Error'
      })
    }
  }

  async find(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      postId: z.string()
    })
    try {
      await request.jwtVerify()
      const { postId } = bodySchema.parse(request.params)
      const commentsServices = FactoryCommentsService()

      const { comments } = await commentsServices.find({ postId })

      return reply.status(200).send(comments)
    } catch (error) {
      return reply.status(500).send({
        message: 'Internal Server Error'
      })
    }
  }
}

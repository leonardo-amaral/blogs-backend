import { CommentsController } from '@/modules/comments/CommentsController'
import { FastifyInstance } from 'fastify'

const commentsController = new CommentsController()

export async function commentsRoutes(app: FastifyInstance) {
  app.post('/', commentsController.create)
  app.get('/:postId', commentsController.find)
}

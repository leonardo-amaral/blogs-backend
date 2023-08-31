import { UsersControllers } from '@/modules/users/UsersControllers'
import { FastifyInstance } from 'fastify'

const userController = new UsersControllers()

export async function userRoutes(app: FastifyInstance) {
  app.post('/', userController.create)
}

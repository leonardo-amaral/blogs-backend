import { SessionsController } from '@/modules/sessions/SessionsController'
import { FastifyInstance } from 'fastify'

const sessionsControllers = new SessionsController()

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/', sessionsControllers.authenticate)
}

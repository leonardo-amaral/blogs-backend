import { UserAlreadyExistError } from '@/errors/user-alredy-exist'
import { FactorySessionsService } from '@/factories/FactorySessionsService'
import {} from '@/factories/FactoryUsersService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class SessionsController {
  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string(),
      password: z.string()
    })
    const { email, password } = bodySchema.parse(request.body)
    try {
      const sessionsServices = FactorySessionsService()
      const { user } = await sessionsServices.authenticate({ email, password })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id
          }
        }
      )

      return reply.status(200).send(token)
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return reply.status(409).send({
          message: 'Invalid Credentials'
        })
      }
    }
  }
}

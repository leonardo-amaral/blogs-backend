import { UserAlreadyExistError } from '@/errors/user-alredy-exist'
import { FactoryUsersService } from '@/factories/FactoryUsersService'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export class UsersControllers {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string().max(20),
      last_name: z.string().max(20),
      username: z.string().max(20),
      email: z.string().max(100),
      password: z.string().max(256)
    })
    const { name, last_name, username, password, email } = bodySchema.parse(
      request.body
    )

    try {
      const usersService = FactoryUsersService()
      await usersService.create({
        name,
        email,
        last_name,
        password,
        username
      })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return reply.status(409).send({
          message: 'User Aleredy Exist'
        })
      }
    }
  }
}

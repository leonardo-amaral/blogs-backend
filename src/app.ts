import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { commentsRoutes } from './routes/commentsRoutes'
import { postsRoutes } from './routes/postsRoutes'
import { sessionsRoutes } from './routes/sessionsRoutes'
import { userRoutes } from './routes/userRoutes'

export const app = fastify()

app.register(commentsRoutes, { prefix: '/comments' })
app.register(postsRoutes, { prefix: '/posts' })
app.register(userRoutes, { prefix: '/users' })
app.register(sessionsRoutes, { prefix: '/sessions' })

app.register(fastifyCors, { origin: '*' })

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format()
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //TODO
  }

  return reply.status(500).send({
    message: 'Internal Server Error'
  })
})

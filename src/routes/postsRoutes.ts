import { PostsControllers } from '@/modules/posts/PostsController'
import { FastifyInstance } from 'fastify'

const sessionsControllers = new PostsControllers()

export async function postsRoutes(app: FastifyInstance) {
  app.post('/', sessionsControllers.create)
  app.get('/', sessionsControllers.listPosts)
  app.get('/:post_id', sessionsControllers.getPostById)
}

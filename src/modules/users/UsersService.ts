import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateServiceProps {
  name: string
  last_name: string
  username: string
  email: string
  password: string
}

interface CreateServiceResponse {
  user: User
}
export class UsersService {
  constructor(private usersRepository: PrismaUsersRepository) {}
  async create({
    email,
    last_name,
    name,
    password,
    username
  }: CreateServiceProps): Promise<CreateServiceResponse> {
    const password_hash = await hash(password, 8)
    const userWithSameEmail = await this.usersRepository.findByEmail({ email })
    if (userWithSameEmail) {
      throw new Error('User with same email')
    }

    const user = await this.usersRepository.create({
      name,
      email,
      last_name,
      username,
      password: password_hash
    })

    return {
      user
    }
  }
}

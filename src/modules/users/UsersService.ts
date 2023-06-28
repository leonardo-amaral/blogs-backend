import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'

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

interface AuthenticateProps {
  email: string
  password: string
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
      password
    })

    return {
      user
    }
  }

  async authenticate({ password, email }: AuthenticateProps) {
    const user = await this.usersRepository.findByEmail({ email })
    if (!user) {
      throw new Error('Invalid Credentials')
    }

    const passowrdMatch = await compare(password, user.password)
    if (!passowrdMatch) {
      throw new Error('Invalid Credentials')
    }

    return {
      user
    }
  }
}

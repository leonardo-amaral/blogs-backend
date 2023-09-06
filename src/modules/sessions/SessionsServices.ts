import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

interface AuthenticateProps {
  email: string
  password: string
}

export class SessionService {
  constructor(private usersRepository: PrismaUsersRepository) {}

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

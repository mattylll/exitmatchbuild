import { User as PrismaUser } from '@prisma/client'

export type SafeUser = Omit<PrismaUser, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export interface SessionUser {
  id: string
  email: string | null
  name: string | null
  image: string | null
  role: string
}
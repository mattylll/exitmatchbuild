import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { config } from '@/lib/config'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google OAuth
    ...(config.auth.providers.google.clientId && config.auth.providers.google.clientSecret
      ? [
          GoogleProvider({
            clientId: config.auth.providers.google.clientId,
            clientSecret: config.auth.providers.google.clientSecret,
          }),
        ]
      : []),
    
    // GitHub OAuth
    ...(config.auth.providers.github.clientId && config.auth.providers.github.clientSecret
      ? [
          GitHubProvider({
            clientId: config.auth.providers.github.clientId,
            clientSecret: config.auth.providers.github.clientSecret,
          }),
        ]
      : []),
    
    // Credentials provider for email/password login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        // TODO: Implement actual password verification
        // This is a placeholder - you should implement proper password hashing
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error('User not found')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  
  callbacks: {
    async session({ session, token, user }) {
      if (session.user) {
        // Fetch the latest user data from database
        const dbUser = await prisma.user.findUnique({
          where: {
            id: user?.id || token?.sub,
          },
        })
        
        if (dbUser) {
          session.user.id = dbUser.id
          session.user.role = dbUser.role
        }
      }
      return session
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  
  session: {
    strategy: 'jwt',
  },
  
  secret: config.auth.nextAuthSecret,
  
  debug: config.app.environment === 'development',
}

// Extend the session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string | null
      name: string | null
      image: string | null
      role: string
    }
  }
  
  interface User {
    role?: string
  }
}
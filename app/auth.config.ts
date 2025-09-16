import type { NextAuthConfig } from 'next-auth'

// Demo mode check
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

// Conditional imports for production mode
let PrismaAdapter: any
let PrismaClient: any
let Credentials: any
let Google: any
let LinkedIn: any
let bcrypt: any
let prisma: any

if (!isDemoMode) {
  try {
    PrismaAdapter = require('@auth/prisma-adapter').PrismaAdapter
    PrismaClient = require('@prisma/client').PrismaClient
    Credentials = require('next-auth/providers/credentials').default
    Google = require('next-auth/providers/google').default
    LinkedIn = require('next-auth/providers/linkedin').default
    bcrypt = require('bcryptjs')
    prisma = new PrismaClient()
  } catch (error) {
    console.log('Running in demo mode - database features disabled')
  }
}

export const authConfig: NextAuthConfig = {
  ...(isDemoMode ? {} : { adapter: PrismaAdapter && prisma ? PrismaAdapter(prisma) : undefined }),
  providers: isDemoMode ? [] : [
    ...(Google && process.env.GOOGLE_CLIENT_ID ? [Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'buyer' // Default role for OAuth users
        }
      }
    })] : []),
    ...(LinkedIn && process.env.LINKEDIN_CLIENT_ID ? [LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: 'buyer' // Default role for OAuth users
        }
      }
    })] : []),
    ...(Credentials && prisma ? [Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })] : [])
  ],
  pages: {
    signIn: '/auth/login',
    signUp: '/auth/register',
    error: '/auth/error'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
}
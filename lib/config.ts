import { z } from 'zod'

/**
 * Application configuration schema and validation
 */

// Environment variable schemas
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url().optional(),

  // NextAuth
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(1).optional(),

  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // Email
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM_EMAIL: z.string().email().optional(),
  SENDGRID_FROM_NAME: z.string().optional(),

  // Analytics
  MIXPANEL_TOKEN: z.string().optional(),
  POSTHOG_KEY: z.string().optional(),
  POSTHOG_HOST: z.string().url().optional(),

  // Public Environment Variables
  NEXT_PUBLIC_SPLINE_SCENE_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_NAME: z.string().optional(),
  NEXT_PUBLIC_APP_DESCRIPTION: z.string().optional(),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(['true', 'false']).optional(),
  NEXT_PUBLIC_ENABLE_3D_ANIMATIONS: z.enum(['true', 'false']).optional(),

  // Node Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),

  // AWS
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),

  // Rate Limiting
  RATE_LIMIT_ENABLED: z.enum(['true', 'false']).default('true'),
  RATE_LIMIT_REQUESTS_PER_MINUTE: z.string().regex(/^\d+$/).default('60'),
})

// Parse and validate environment variables
const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.flatten().fieldErrors)
  // Don't throw in production, but log the error
  if (process.env.NODE_ENV === 'development') {
    throw new Error('Invalid environment variables')
  }
}

// Export validated config
export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || '',
  },

  // Authentication
  auth: {
    nextAuthUrl: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    nextAuthSecret: process.env.NEXTAUTH_SECRET || '',
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      },
    },
  },

  // Email
  email: {
    sendgrid: {
      apiKey: process.env.SENDGRID_API_KEY || '',
      fromEmail: process.env.SENDGRID_FROM_EMAIL || 'noreply@exitmatch.co.uk',
      fromName: process.env.SENDGRID_FROM_NAME || 'ExitMatch',
    },
  },

  // Analytics
  analytics: {
    mixpanel: {
      token: process.env.MIXPANEL_TOKEN || '',
    },
    posthog: {
      key: process.env.POSTHOG_KEY || '',
      host: process.env.POSTHOG_HOST || 'https://app.posthog.com',
    },
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },

  // Application
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'ExitMatch',
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'M&A Platform for Business Acquisitions',
    environment: process.env.NODE_ENV || 'development',
  },

  // Features
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    animations3d: process.env.NEXT_PUBLIC_ENABLE_3D_ANIMATIONS === 'true',
  },

  // Spline 3D
  spline: {
    sceneUrl: process.env.NEXT_PUBLIC_SPLINE_SCENE_URL || '',
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // AWS
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || '',
    s3Bucket: process.env.AWS_S3_BUCKET || '',
  },

  // Rate Limiting
  rateLimit: {
    enabled: process.env.RATE_LIMIT_ENABLED === 'true',
    requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '60', 10),
  },
} as const

// Type exports
export type Config = typeof config

// Helper functions
export const isDevelopment = () => config.app.environment === 'development'
export const isProduction = () => config.app.environment === 'production'
export const isTest = () => config.app.environment === 'test'
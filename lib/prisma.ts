// Demo mode check
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined
}

let prisma: any

if (!isDemoMode) {
  try {
    const { PrismaClient } = require('@prisma/client')
    prisma = global.prisma || new PrismaClient()
    
    if (process.env.NODE_ENV !== 'production') {
      global.prisma = prisma
    }
  } catch (error) {
    console.log('Running in demo mode - database features disabled')
    // Create a mock prisma object for demo mode
    prisma = {
      user: { 
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => ({ id: 'demo' })
      },
      business: { 
        findMany: async () => [],
        create: async () => ({ id: 'demo' })
      },
      valuation: { 
        create: async () => ({ id: 'demo' }),
        findMany: async () => []
      },
      dealRoom: {
        findMany: async () => [],
        create: async () => ({ id: 'demo' })
      }
    }
  }
} else {
  // Create a mock prisma object for demo mode
  prisma = {
    user: { 
      findUnique: async () => null,
      findMany: async () => [],
      create: async () => ({ id: 'demo' })
    },
    business: { 
      findMany: async () => [],
      create: async () => ({ id: 'demo' })
    },
    valuation: { 
      create: async () => ({ id: 'demo' }),
      findMany: async () => []
    },
    dealRoom: {
      findMany: async () => [],
      create: async () => ({ id: 'demo' })
    }
  }
}

export { prisma }
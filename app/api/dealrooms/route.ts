import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { auth } from '@/app/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dealRooms = await prisma.dealRoom.findMany({
      where: {
        OR: [
          { sellerId: session.user.id },
          { primaryBuyerId: session.user.id },
          {
            access: {
              some: { userId: session.user.id }
            }
          }
        ]
      },
      include: {
        business: {
          select: {
            title: true,
            confidentialName: true,
            industry: true
          }
        },
        access: {
          include: {
            user: {
              select: { name: true, email: true }
            }
          }
        },
        _count: {
          select: {
            documents: true,
            activities: true,
            tasks: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ dealRooms })
  } catch (error) {
    console.error('Error fetching deal rooms:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { businessId, buyerId, dealType = 'ACQUISITION' } = await request.json()

    // Verify the user is the seller of this business
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { sellerId: true, title: true }
    })

    if (!business || business.sellerId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Generate unique reference code
    const referenceCode = `DR-${Date.now().toString(36).toUpperCase()}`

    // Create deal room
    const dealRoom = await prisma.dealRoom.create({
      data: {
        businessId,
        sellerId: session.user.id,
        primaryBuyerId: buyerId,
        referenceCode,
        name: `Deal Room - ${business.title}`,
        dealType,
        status: 'ACTIVE',
        stage: 'INITIAL_DISCUSSION'
      }
    })

    // Grant access to seller and buyer
    await prisma.dealRoomAccess.createMany({
      data: [
        {
          dealRoomId: dealRoom.id,
          userId: session.user.id,
          role: 'SELLER',
          permissions: ['read', 'write', 'delete', 'invite', 'manage']
        },
        {
          dealRoomId: dealRoom.id,
          userId: buyerId,
          role: 'BUYER',
          permissions: ['read', 'write', 'invite'],
          invitedBy: session.user.id
        }
      ]
    })

    // Log activity
    await prisma.dealRoomActivity.create({
      data: {
        dealRoomId: dealRoom.id,
        userId: session.user.id,
        activityType: 'deal_room_created',
        description: 'Deal room created'
      }
    })

    return NextResponse.json({ dealRoom }, { status: 201 })
  } catch (error) {
    console.error('Error creating deal room:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
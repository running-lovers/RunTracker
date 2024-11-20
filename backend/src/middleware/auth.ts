import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
  };
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  try {
    const userId = Buffer.from(token, 'base64').toString('ascii')
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } })

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Attach the user to the request object
    req.user = { id: user.id.toString(), name: user.name }
    next()
  } catch (error) {
    console.error('Error in auth middleware:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
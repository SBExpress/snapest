import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
  companyId?: string
  userId?: string
  user?: {
    id: string
    email: string
    name: string
    role: string
    companyId: string
  }
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET || 'your-secret-key'
    const decoded = jwt.verify(token, secret) as any
    req.userId = decoded.userId
    req.companyId = decoded.companyId
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.companyId) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

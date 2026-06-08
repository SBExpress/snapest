import { Request, Response, NextFunction } from 'express'

// For MVP, we'll use a simple header-based auth (company ID + API key)
// In production, use JWT tokens

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
    // For MVP: Accept company ID from header
    // In production: Parse JWT from Authorization header
    const companyId = req.headers['x-company-id'] as string
    const userId = req.headers['x-user-id'] as string

    if (!companyId) {
      return res.status(401).json({ error: 'Missing x-company-id header' })
    }

    req.companyId = companyId
    req.userId = userId || 'anonymous'

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

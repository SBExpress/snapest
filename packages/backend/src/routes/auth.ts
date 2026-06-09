import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../db/client.js'
import crypto from 'crypto'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production'

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex')
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password, name, companyName } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' })
    }

    let company = await prisma.company.findFirst({
      where: { email },
    })

    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName || `${name}'s Company`,
          email,
          status: 'active',
          subscriptionTier: 'starter',
        },
      })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword(password),
        name,
        role: 'admin',
        companyId: company.id,
      },
    })

    const token = jwt.sign(
      { userId: user.id, companyId: company.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyId: company.id,
      },
    })
  } catch (error) {
    console.error('Error during signup:', error)
    res.status(500).json({ error: 'Signup failed' })
  }
})

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    const user = await prisma.user.findFirst({
      where: { email },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    if (!verifyPassword(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.id, companyId: user.companyId, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyId: user.companyId,
      },
    })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyId: user.companyId,
      },
    })
  } catch (error) {
    console.error('Error verifying token:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router

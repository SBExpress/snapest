import express, { Request, Response } from 'express'
import { prisma } from '../db/client.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

// Get all jobs for the company
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const jobs = await prisma.job.findMany({
      where: { companyId: user.companyId },
      orderBy: { updatedAt: 'desc' },
    })

    res.json({ jobs })
  } catch (err) {
    console.error('Error fetching jobs:', err)
    res.status(500).json({ error: 'Failed to fetch jobs' })
  }
})

// Create new job
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ error: 'Job name is required' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const job = await prisma.job.create({
      data: {
        name,
        description: description || '',
        companyId: user.companyId,
      },
    })

    res.json({ success: true, job })
  } catch (err) {
    console.error('Error creating job:', err)
    res.status(500).json({ error: 'Failed to create job' })
  }
})

// Get specific job
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const job = await prisma.job.findFirst({
      where: {
        id,
        companyId: user.companyId,
      },
    })

    if (!job) {
      return res.status(404).json({ error: 'Job not found' })
    }

    res.json({ job })
  } catch (err) {
    console.error('Error fetching job:', err)
    res.status(500).json({ error: 'Failed to fetch job' })
  }
})

// Update job
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params
    const { name, description, status } = req.body

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const job = await prisma.job.updateMany({
      where: {
        id,
        companyId: user.companyId,
      },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
    })

    res.json({ success: true, job })
  } catch (err) {
    console.error('Error updating job:', err)
    res.status(500).json({ error: 'Failed to update job' })
  }
})

// Delete job
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    })

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    await prisma.job.deleteMany({
      where: {
        id,
        companyId: user.companyId,
      },
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Error deleting job:', err)
    res.status(500).json({ error: 'Failed to delete job' })
  }
})

export default router

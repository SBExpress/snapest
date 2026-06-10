import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).companyId
    const jobs = await prisma.job.findMany({ where: { companyId }, orderBy: { createdAt: 'desc' } })
    res.json({ success: true, jobs })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to list jobs' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).companyId
    const { name, description } = req.body
    const job = await prisma.job.create({ data: { name, description: description || '', status: 'Draft', companyId } })
    res.json({ success: true, job })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create job' })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).companyId
    const { id } = req.params
    const job = await prisma.job.findFirst({ where: { id, companyId } })
    res.json({ success: true, job })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed' })
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).companyId
    const { id } = req.params
    const { name, description, status } = req.body
    const job = await prisma.job.findFirst({ where: { id, companyId } })
    const updated = await prisma.job.update({ where: { id }, data: { ...(name && { name }), ...(description !== undefined && { description }), ...(status && { status }) } })
    res.json({ success: true, job: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed' })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const companyId = (req as any).companyId
    const { id } = req.params
    const job = await prisma.job.findFirst({ where: { id, companyId } })
    await prisma.job.delete({ where: { id } })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed' })
  }
})

export default router
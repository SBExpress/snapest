import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const companyId = (req as any).companyId
  const materials = await prisma.material.findMany({ where: { companyId }, orderBy: { category: 'asc', name: 'asc' } })
  res.json({ success: true, materials })
})

router.post('/', async (req, res) => {
  const companyId = (req as any).companyId
  const { name, category, unitCost, defaultUM, laborHours, laborUM } = req.body
  const material = await prisma.material.create({ data: { name, category, unitCost: parseFloat(unitCost), defaultUM, laborHours: parseFloat(laborHours), laborUM, companyId } })
  res.json({ success: true, material })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, category, unitCost, defaultUM, laborHours, laborUM } = req.body
  const material = await prisma.material.update({ where: { id }, data: { name, category, unitCost: parseFloat(unitCost), defaultUM, laborHours: parseFloat(laborHours), laborUM } })
  res.json({ success: true, material })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await prisma.material.delete({ where: { id } })
  res.json({ success: true })
})

router.post('/import/csv', async (req, res) => {
  const companyId = (req as any).companyId
  const { csv } = req.body
  const lines = csv.split('\n').slice(1).filter(l => l.trim())
  for (const line of lines) {
    const [category, name, unitCost, defaultUM, laborHours, laborUM] = line.split(',').map(v => v.trim())
    if (name) {
      await prisma.material.create({ data: { category, name, unitCost: parseFloat(unitCost), defaultUM, laborHours: parseFloat(laborHours), laborUM, companyId } })
    }
  }
  res.json({ success: true, imported: lines.length })
})

export default router

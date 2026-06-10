import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/:jobId', async (req, res) => {
  const { jobId } = req.params
  const takeoffs = await prisma.takeoff.findMany({ where: { jobId }, orderBy: { createdAt: 'asc' } })
  res.json({ success: true, takeoffs })
})

router.post('/:jobId', async (req, res) => {
  const { jobId } = req.params
  const { description, quantity, materialUM, materialUnitCost, laborUM, laborHours, notes } = req.body
  const takeoff = await prisma.takeoff.create({ data: { jobId, description, quantity: parseFloat(quantity), materialUM, materialUnitCost: parseFloat(materialUnitCost), laborUM, laborHours: parseFloat(laborHours), notes } })
  res.json({ success: true, takeoff })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { description, quantity, materialUM, materialUnitCost, laborUM, laborHours, notes } = req.body
  const takeoff = await prisma.takeoff.update({ where: { id }, data: { description, quantity: parseFloat(quantity), materialUM, materialUnitCost: parseFloat(materialUnitCost), laborUM, laborHours: parseFloat(laborHours), notes } })
  res.json({ success: true, takeoff })
})

router.delete('/:id', async (req, res) => {
  await prisma.takeoff.delete({ where: { id: req.params.id } })
  res.json({ success: true })
})

export default router

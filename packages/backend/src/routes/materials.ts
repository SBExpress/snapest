import express from 'express'
import { prisma } from '../db/client.js'
import { AuthRequest, requireAuth } from '../middleware/auth.js'

const router = express.Router()

// Apply auth to all routes
router.use(requireAuth)

// GET /api/materials - List all materials for company
router.get('/', async (req: AuthRequest, res) => {
  try {
    const { isActive, category, isTemporary } = req.query
    const filters: any = { companyId: req.companyId }

    if (isActive !== undefined) {
      filters.isActive = isActive === 'true'
    }
    if (category) {
      filters.category = category
    }
    if (isTemporary !== undefined) {
      filters.isTemporary = isTemporary === 'true'
    }

    const materials = await prisma.material.findMany({
      where: filters,
      orderBy: { itemNumber: 'asc' },
    })

    res.json(materials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch materials' })
  }
})

// GET /api/materials/:id - Get specific material
router.get('/:id', async (req: AuthRequest, res) => {
  try {
    const material = await prisma.material.findUnique({
      where: { id: req.params.id },
    })

    if (!material || material.companyId !== req.companyId) {
      return res.status(404).json({ error: 'Material not found' })
    }

    res.json(material)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch material' })
  }
})

// POST /api/materials - Create new material
router.post('/', async (req: AuthRequest, res) => {
  try {
    const {
      itemNumber,
      description,
      unit,
      basePrice,
      laborLevel1Hours,
      laborLevel2Hours,
      laborLevel3Hours,
      category = 'General',
      supplier,
      isTemporary = false,
    } = req.body

    // Validate required fields
    if (!itemNumber || !description || !unit || basePrice === undefined) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if item number already exists for this company
    const existing = await prisma.material.findUnique({
      where: {
        itemNumber_companyId: {
          itemNumber,
          companyId: req.companyId!,
        },
      },
    })

    if (existing) {
      return res.status(409).json({ error: 'Item number already exists' })
    }

    const material = await prisma.material.create({
      data: {
        itemNumber,
        description,
        unit,
        basePrice,
        laborLevel1Hours: laborLevel1Hours || null,
        laborLevel2Hours: laborLevel2Hours || null,
        laborLevel3Hours: laborLevel3Hours || null,
        category,
        supplier: supplier || null,
        isTemporary,
        companyId: req.companyId!,
      },
    })

    res.status(201).json(material)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create material' })
  }
})

// PUT /api/materials/:id - Update material
router.put('/:id', async (req: AuthRequest, res) => {
  try {
    const material = await prisma.material.findUnique({
      where: { id: req.params.id },
    })

    if (!material || material.companyId !== req.companyId) {
      return res.status(404).json({ error: 'Material not found' })
    }

    const updated = await prisma.material.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        companyId: undefined, // Prevent changing company
      },
    })

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update material' })
  }
})

// DELETE /api/materials/:id - Delete material
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    const material = await prisma.material.findUnique({
      where: { id: req.params.id },
    })

    if (!material || material.companyId !== req.companyId) {
      return res.status(404).json({ error: 'Material not found' })
    }

    await prisma.material.delete({
      where: { id: req.params.id },
    })

    res.json({ success: true, id: req.params.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete material' })
  }
})

// POST /api/materials/search - Search materials by item number or description
router.post('/search', async (req: AuthRequest, res) => {
  try {
    const { query = '', limit = 10, includeTemporary = false } = req.body

    const materials = await prisma.material.findMany({
      where: {
        companyId: req.companyId,
        isActive: true,
        isTemporary: includeTemporary ? undefined : false,
        OR: [
          { itemNumber: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: [
        { itemNumber: 'asc' },
        { description: 'asc' },
      ],
    })

    res.json(materials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Search failed' })
  }
})

export default router

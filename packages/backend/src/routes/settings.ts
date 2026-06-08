import express from 'express'

const router = express.Router()

// GET /api/settings - Get global settings
router.get('/', (req, res) => {
  // TODO: Implement database query
  res.json({
    laborLevelNames: ['Level 1', 'Level 2', 'Level 3'],
    laborRates: [0, 0, 0],
    laborBurdenPercent: 30,
    salesTaxPercent: 0,
    taxCalculationMode: 'modeA',
    materialOverheadPercent: 15,
    materialProfitPercent: 12,
    laborOverheadPercent: 15,
    laborProfitPercent: 12,
    showPerLineUnitPrice: false,
    showRunningFinalPrice: false,
  })
})

// PUT /api/settings - Update global settings
router.put('/', (req, res) => {
  // TODO: Implement update logic
  res.json(req.body)
})

// GET /api/settings/:jobId - Get per-job settings overrides
router.get('/:jobId', (req, res) => {
  // TODO: Implement database query
  res.json({
    jobId: req.params.jobId,
    overrides: {},
  })
})

// PUT /api/settings/:jobId - Update per-job settings overrides
router.put('/:jobId', (req, res) => {
  // TODO: Implement update logic
  res.json({
    jobId: req.params.jobId,
    overrides: req.body,
  })
})

export default router

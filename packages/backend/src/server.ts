import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { authMiddleware } from './middleware/auth.js'
// TODO: Uncomment routes once Prisma is initialized
// import materialsRouter from './routes/materials.js'
// import assembliesRouter from './routes/assemblies.js'
// import estimatesRouter from './routes/estimates.js'
// import settingsRouter from './routes/settings.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Apply auth middleware to all API routes
app.use('/api', authMiddleware)

// Health check (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes (temporarily disabled - Prisma initialization issue)
// app.use('/api/materials', materialsRouter)
// app.use('/api/assemblies', assembliesRouter)
// app.use('/api/estimates', estimatesRouter)
// app.use('/api/settings', settingsRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`SnapEst backend listening on port ${PORT}`)
  console.log(`Visit http://localhost:${PORT}/api/health to check status`)
  console.log(`\nSend x-company-id header with all API requests`)
  console.log(`Example: curl -H "x-company-id: company-123" http://localhost:${PORT}/api/materials`)
})

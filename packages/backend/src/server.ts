import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { authMiddleware } from './middleware/auth.js'
import authRouter from './routes/auth.js'
import jobsRouter from './routes/jobs.js'
import settingsRouter from './routes/settings.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Health check (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Auth routes (no auth required for signup/login)
app.use('/api/auth', authRouter)

// Routes with auth
app.use('/api/jobs', jobsRouter)
app.use('/api/settings', authMiddleware, settingsRouter)

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
})

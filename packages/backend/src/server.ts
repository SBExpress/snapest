import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'

import { authMiddleware } from './middleware/auth.js'
import settingsRouter from './routes/settings.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/settings', authMiddleware, settingsRouter)

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`SnapEst backend listening on port ${PORT}`)
})

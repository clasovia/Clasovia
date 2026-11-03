import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import errorHandler from './middleware/errorHandler.js'
import paymentRoutes from './routes/paymentRoutes.js'

const app = express()
const configuredOrigins = process.env.CLIENT_URLS
  ?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowedOrigins = new Set(
  configuredOrigins?.length
    ? configuredOrigins
    : process.env.NODE_ENV === 'production'
      ? []
      : ['http://localhost:5173', 'http://127.0.0.1:5173'],
)

app.use(cors({
  origin: (origin, callback) => {
    callback(null, !origin || allowedOrigins.has(origin))
  },
}))
app.use(express.json({ limit: '20kb' }))

app.get('/health', (req, res) => {
  res.json({ success: true, status: 'ok' })
})

app.use('/', paymentRoutes)

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
})

app.use(errorHandler)

export default app

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import webinarRoutes from './routes/webinarRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import registrationRoutes from './routes/registrationRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/webinars', webinarRoutes)
app.use('/api/payment', paymentRoutes)
app.use('/api/register', registrationRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }))

const PORT = process.env.PORT || 4000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}).catch((err) => {
  console.error('Failed to connect to DB', err)
})

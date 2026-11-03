import 'dotenv/config'
import app from './app.js'
import connectDatabase from './services/database.js'

const port = Number(process.env.PORT) || 5000

if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_URLS) {
  throw new Error('CLIENT_URLS must be configured in production')
}

await connectDatabase()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

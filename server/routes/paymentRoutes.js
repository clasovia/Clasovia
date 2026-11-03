import { Router } from 'express'
import {
  createOrder,
  getKey,
  verifyPayment,
} from '../controllers/paymentController.js'
import createRateLimiter from '../middleware/rateLimiter.js'
import {
  validateCreateOrder,
  validatePaymentVerification,
} from '../middleware/validatePayment.js'

const router = Router()
const paymentRateLimiter = createRateLimiter()

router.get('/api/get-key', getKey)
router.post('/create-order', paymentRateLimiter, validateCreateOrder, createOrder)
router.post('/verify-payment', paymentRateLimiter, validatePaymentVerification, verifyPayment)

export default router
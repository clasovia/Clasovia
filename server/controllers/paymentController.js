import {
  createPaymentOrder,
  getPublicRazorpayKey,
  verifyAndSavePayment,
} from '../services/paymentService.js'

export function getKey(req, res) {
  res.json({ success: true, key: getPublicRazorpayKey() })
}

export async function createOrder(req, res) {
  const order = await createPaymentOrder(req.body)
  res.json(order)
}

export async function verifyPayment(req, res) {
  const result = await verifyAndSavePayment(req.body)
  res.json(result)
}
import { createHmac, timingSafeEqual } from 'node:crypto'
import Razorpay from 'razorpay'
import PaymentUser from '../models/PaymentUser.js'
import connectDatabase from './database.js'
import AppError from '../utils/AppError.js'

let razorpayClient

function getRazorpayClient() {
  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    throw new AppError(503, 'Payment service is not configured')
  }

  if (!razorpayClient) {
    razorpayClient = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    })
  }

  return razorpayClient
}

export function verifyRazorpaySignature(orderId, paymentId, signature, secret) {
  if (!/^[\da-f]{64}$/i.test(signature) || !secret) {
    return false
  }

  const expectedSignature = createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest()
  const receivedSignature = Buffer.from(signature, 'hex')

  return receivedSignature.length === expectedSignature.length
    && timingSafeEqual(receivedSignature, expectedSignature)
}

export function getPublicRazorpayKey() {
  if (!process.env.RAZORPAY_KEY_ID) {
    throw new AppError(503, 'Payment service is not configured')
  }

  return process.env.RAZORPAY_KEY_ID
}

export async function createPaymentOrder({ name, email, phone }) {
  const order = await getRazorpayClient().orders.create({
    amount: 9900,
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: { name, email, phone },
  })

  console.log(`Payment order created: ${order.id}`)

  return {
    success: true,
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
  }
}

export async function verifyAndSavePayment({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  name,
  email,
  phone,
}) {
  const secret = process.env.RAZORPAY_KEY_SECRET

  if (!verifyRazorpaySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    secret,
  )) {
    throw new AppError(400, 'Invalid payment signature')
  }

  await connectDatabase()
  await PaymentUser.create({
    name,
    email,
    phone,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    signature: razorpay_signature,
    status: 'success',
  })

  console.log(`Payment verified: ${razorpay_payment_id}`)
  return { success: true }
}

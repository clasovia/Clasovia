import Razorpay from 'razorpay'
import crypto from 'crypto'
import dotenv from 'dotenv'
import Payment from '../models/Payment.js'
import Webinar from '../models/Webinar.js'

dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const createOrder = async (req, res) => {
  try {
    const { webinarId, amount } = req.body
    const webinar = await Webinar.findById(webinarId)
    if (!webinar) return res.status(404).json({ success: false, message: 'Webinar not found' })
    if (webinar.seatsTaken >= webinar.seats) {
      return res.status(400).json({ success: false, message: 'No seats remaining' })
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `webinar_${webinarId}_${Date.now()}`,
      payment_capture: 1
    }

    const order = await razorpay.orders.create(options)

    const paymentRecord = await Payment.create({
      orderId: order.id,
      amount: options.amount,
      status: 'created'
    })

    res.json({ success: true, data: { order, paymentRecord } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, webinarId } = req.body
    const body = razorpay_order_id + '|' + razorpay_payment_id
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body).digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid signature' })
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { paymentId: razorpay_payment_id, status: 'paid' },
      { new: true }
    )

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' })
    }

    const webinar = await Webinar.findById(webinarId)
    if (!webinar) return res.status(404).json({ success: false, message: 'Webinar not found' })

    webinar.seatsTaken += 1
    await webinar.save()

    res.json({ success: true, data: { payment, webinar } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

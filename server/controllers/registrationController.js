import User from '../models/User.js'
import Webinar from '../models/Webinar.js'
import Registration from '../models/Registration.js'
import Payment from '../models/Payment.js'
import { sendRegistrationConfirmation } from '../utils/emailService.js'

export const registerForWebinar = async (req, res) => {
  try {
    const { name, email, phone, webinarId, paymentId } = req.body

    if (!name || !email || !phone || !webinarId || !paymentId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' })
    }

    const webinar = await Webinar.findById(webinarId)
    if (!webinar) return res.status(404).json({ success: false, message: 'Webinar not found' })

    const payment = await Payment.findOne({ paymentId: paymentId })
    if (!payment || payment.status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Invalid payment status' })
    }

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ name, email, phone })
    }

    const existing = await Registration.findOne({ user: user._id, webinar: webinar._id })
    if (existing) {
      return res.status(409).json({ success: false, message: 'Already registered for this webinar' })
    }

    const registration = await Registration.create({
      user: user._id,
      webinar: webinar._id,
      payment: payment._id,
      paymentStatus: 'paid'
    })

    await sendRegistrationConfirmation({ userName: user.name, userEmail: user.email, webinar })

    res.status(201).json({ success: true, data: registration })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}

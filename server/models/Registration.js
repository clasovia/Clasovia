import mongoose from 'mongoose'

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  webinar: { type: mongoose.Schema.Types.ObjectId, ref: 'Webinar', required: true },
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' }
}, { timestamps: true })

export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema)

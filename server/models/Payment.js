import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  paymentId: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' }
}, { timestamps: true })

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema)

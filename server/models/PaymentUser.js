const mongoose = require('mongoose');

const paymentUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  signature: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PaymentUser', paymentUserSchema);

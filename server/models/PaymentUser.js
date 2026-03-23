const mongoose = require('mongoose');

const paymentUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  payment_id: { type: String },
  order_id: { type: String },
  status: { type: String, enum: ['success', 'failed'], required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PaymentUser', paymentUserSchema);

function rejectRequest(res, message) {
  return res.status(400).json({ success: false, error: message })
}

function getPaymentDetails(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return null
  }

  const { name, email, phone } = body
  if (
    typeof name !== 'string'
    || typeof email !== 'string'
    || typeof phone !== 'string'
  ) {
    return null
  }

  const details = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
  }

  if (details.name.length < 2 || details.name.length > 100) {
    return null
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    return null
  }

  if (!/^\d{7,15}$/.test(details.phone)) {
    return null
  }

  return details
}

export function validateCreateOrder(req, res, next) {
  const details = getPaymentDetails(req.body)
  if (!details) {
    return rejectRequest(res, 'Valid name, email, and phone are required')
  }

  req.body = details
  return next()
}

export function validatePaymentVerification(req, res, next) {
  const details = getPaymentDetails(req.body)
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}

  if (!details) {
    return rejectRequest(res, 'Valid name, email, and phone are required')
  }

  if (
    typeof razorpay_order_id !== 'string'
    || !razorpay_order_id.trim()
    || typeof razorpay_payment_id !== 'string'
    || !razorpay_payment_id.trim()
    || typeof razorpay_signature !== 'string'
    || !/^[\da-f]{64}$/i.test(razorpay_signature)
  ) {
    return rejectRequest(res, 'Valid payment details are required')
  }

  req.body = {
    ...details,
    razorpay_order_id: razorpay_order_id.trim(),
    razorpay_payment_id: razorpay_payment_id.trim(),
    razorpay_signature,
  }

  return next()
}
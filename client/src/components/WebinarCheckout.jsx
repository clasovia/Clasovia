import { useState } from 'react'
import { FiArrowUpRight, FiCheck, FiShield } from 'react-icons/fi'

export default function WebinarCheckout({
  formData,
  setFormData,
  onSubmit,
  paymentLoading,
  error,
  successMessage,
}) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid name'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validate()) onSubmit(formData)
  }

  const updateField = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }))
    setErrors((previous) => ({ ...previous, [field]: '' }))
  }

  return (
    <div className="checkout-panel">
      <p className="eyebrow"><span /> ONE PRACTICAL FIRST STEP</p>
      <h2 id="payment-title">Save your seat.</h2>
      <p className="checkout-intro">Join the live 360° virtual tour business workshop.</p>

      <div className="checkout-summary">
        <div>
          <span className="checkout-summary-label">Live workshop · 2 hours</span>
          <span className="checkout-summary-detail">Beginner-friendly · Instant confirmation</span>
        </div>
        <strong>₹99</strong>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <label className="checkout-field">
          <span>Your name</span>
          <input
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={updateField('name')}
            placeholder="Full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'checkout-name-error' : undefined}
          />
          {errors.name && <span className="checkout-error" id="checkout-name-error">{errors.name}</span>}
        </label>
        <label className="checkout-field">
          <span>Email address</span>
          <input
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={updateField('email')}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'checkout-email-error' : undefined}
          />
          {errors.email && <span className="checkout-error" id="checkout-email-error">{errors.email}</span>}
        </label>
        <label className="checkout-field">
          <span>Phone number</span>
          <input
            type="tel"
            autoComplete="tel-national"
            inputMode="numeric"
            maxLength={10}
            value={formData.phone}
            onChange={updateField('phone')}
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'checkout-phone-error' : undefined}
          />
          {errors.phone && <span className="checkout-error" id="checkout-phone-error">{errors.phone}</span>}
        </label>

        <button className="checkout-submit" type="submit" disabled={paymentLoading}>
          {paymentLoading ? 'Processing...' : 'Continue to secure payment'} <FiArrowUpRight />
        </button>
        <p className="checkout-security"><FiShield /> Secure payment powered by Razorpay</p>
        {error && <p className="checkout-message checkout-message-error" role="alert">{error}</p>}
        {successMessage && <p className="checkout-message checkout-message-success" role="status"><FiCheck /> {successMessage}</p>}
      </form>
    </div>
  )
}

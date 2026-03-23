import { useState } from 'react'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(formData)
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.7)] backdrop-blur-xl">

      {/* 🔥 PREMIUM BADGE */}
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white shadow">
                Limited Time Offer
            </div>

      {/* TITLE */}
      <div className="mt-4 text-center mb-5">
        <h2 className="text-3xl font-extrabold text-white">
          Live Webinar Access
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Become a 360° Virtual Tour Expert and Get Paid by Real Clients
        </p>

        {/* PRICE */}
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="text-sm text-slate-500 line-through">₹999</span>
          <span className="text-4xl font-extrabold text-emerald-400">₹99</span>
          <span className="rounded-md bg-emerald-400/10 px-2 py-0.5 text-xs font-semibold text-emerald-300">
            90% OFF
          </span>
        </div>

        <p className="text-xs uppercase text-slate-500 mt-1">
          One-Time Investment
        </p>
      </div>

      {/* TESTIMONIAL */}
      <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4 max-w-xl mx-auto">
        <div className="flex gap-3">
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
            RK
          </div>
          <div>
            <p className="text-sm text-slate-300">
              “I closed my first client within a week after this webinar.”
            </p>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-white font-medium">Rahul Kumar</span> • Freelancer
              <span className="ml-2 text-emerald-300">★★★★★</span>
            </p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl mx-auto">
        {[
          { key: 'name', type: 'text', placeholder: 'Full Name' },
          { key: 'email', type: 'email', placeholder: 'Email Address' },
          { key: 'phone', type: 'tel', placeholder: 'Phone Number' },
        ].map((field) => (
          <div key={field.key}>
            <input
              type={field.type}
              value={formData[field.key]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              placeholder={field.placeholder}
              className={`w-full rounded-lg px-3 py-2.5 text-sm text-white bg-slate-900 border ${
                errors[field.key] ? 'border-red-400' : 'border-white/10'
              } focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 outline-none`}
            />
            {errors[field.key] && (
              <p className="text-xs text-red-400 mt-1">
                {errors[field.key]}
              </p>
            )}
          </div>
        ))}

        {/* CTA */}
        <button
          type="submit"
          disabled={paymentLoading}
          className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 py-3 font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paymentLoading ? 'Processing...' : 'Pay ₹99 now'}
        </button>

        {/* TRUST */}
        <div className="text-center mt-2">
          <p className="text-xs text-emerald-300 font-medium">
            🔐 Secure Payment powered by Razorpay
          </p>
        </div>

        {error && <p className="text-center text-sm text-red-400">{error}</p>}
        {successMessage && (
          <p className="text-center text-sm text-emerald-300">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  )
}
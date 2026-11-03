import { FiX } from 'react-icons/fi'
import WebinarCheckout from './WebinarCheckout.jsx'

export default function PaymentModal({
  isOpen,
  onClose,
  onSubmit,
  paymentLoading,
  error,
  successMessage,
  formData,
  setFormData,
}) {
  if (!isOpen) return null

  return (
    <div
      className="payment-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="payment-dialog" role="dialog" aria-modal="true" aria-labelledby="payment-title">
        <button className="payment-close" onClick={onClose} aria-label="Close payment modal">
          <FiX />
        </button>
        <WebinarCheckout
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          paymentLoading={paymentLoading}
          error={error}
          successMessage={successMessage}
        />
      </div>
    </div>
  )
}

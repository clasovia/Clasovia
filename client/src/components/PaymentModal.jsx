import WebinarCheckout from './WebinarCheckout.jsx'

export default function PaymentModal({ isOpen, onClose, onSubmit, paymentLoading, error, successMessage, formData, setFormData }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative mx-auto w-full max-w-lg transform rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-950/70 to-slate-800/70 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-300 ease-out hover:shadow-[0_35px_80px_rgba(0,0,0,0.6)] md:p-6 md:scale-100 md:animate-[fadeInScale_0.25s_ease-out_forwards]">
        <style>{`@keyframes fadeInScale { from { transform: translateY(8px) scale(0.96); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }`}</style>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-slate-900/80 px-3 py-1 text-sm text-white transition hover:bg-slate-800"
          aria-label="Close payment modal"
        >
          ×
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
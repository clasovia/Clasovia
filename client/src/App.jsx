import { useEffect, useState } from 'react'
import { FiArrowRight, FiArrowUpRight, FiCamera, FiCheck, FiCompass, FiMapPin, FiMove, FiTarget, FiTrendingUp } from 'react-icons/fi'
import PremiumHeader from './components/PremiumHeader.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import PaymentModal from './components/PaymentModal.jsx'
import { createOrder, verifyPayment, getRazorpayKey } from './utils/api.js'

const outcomes = [
  {
    number: '01',
    icon: FiCamera,
    title: 'Create immersive tours',
    description: 'Plan a shoot, capture a space, and turn it into a polished 360° experience.',
  },
  {
    number: '02',
    icon: FiCompass,
    title: 'Make places discoverable',
    description: 'Understand how virtual tours and maps help people explore local businesses.',
  },
  {
    number: '03',
    icon: FiTarget,
    title: 'Find your first clients',
    description: 'Build a simple offer and learn how to start conversations with local businesses.',
  },
  {
    number: '04',
    icon: FiTrendingUp,
    title: 'Turn skill into a service',
    description: 'Shape your packages, explain your value, and build a practical path to grow.',
  },
]

const modules = [
  ['01', 'The opportunity', 'Where 360° experiences fit into the modern local-business landscape.'],
  ['02', 'Capture & create', 'Camera setup, shooting flow, and the details that make a tour feel seamless.'],
  ['03', 'Publish & present', 'Connect the tour to a map listing and share it with confidence.'],
  ['04', 'Pitch & price', 'Package your service, approach businesses, and build your next steps.'],
]

const questions = [
  ['Do I need a 360° camera to get started?', 'A dedicated 360° camera is useful, but you do not need to own one before learning the workflow. The session covers the setup and practical options.'],
  ['Is this suitable for beginners?', 'Yes. The workshop starts with the fundamentals and walks through the process in a clear, practical order.'],
  ['What happens after I book?', 'You will receive the next steps for joining the live session after your payment is confirmed.'],
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const openPaymentModal = () => {
    setError(null)
    setSuccessMessage('')
    setIsPaymentModalOpen(true)
  }

  const closePaymentModal = () => setIsPaymentModalOpen(false)

  const handlePayment = async (userData) => {
    if (paymentLoading) return

    const { name, email, phone } = userData || {}
    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      setError('Please provide name, email and phone before payment.')
      return
    }

    setPaymentLoading(true)
    setError(null)
    setSuccessMessage('')

    try {
      const keyResponse = await getRazorpayKey()
      if (!keyResponse.success) {
        throw new Error(keyResponse.error || 'Failed to get Razorpay key')
      }

      const orderResponse = await createOrder({ name, email, phone })
      if (!orderResponse.success) {
        throw new Error(orderResponse.error || 'Failed to create order')
      }

      const { order_id, amount, currency } = orderResponse
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://checkout.razorpay.com/v1/checkout.js'
          script.async = true
          script.onload = resolve
          script.onerror = () => reject(new Error('Razorpay SDK failed to load'))
          document.body.appendChild(script)
        })
      }

      const options = {
        key: keyResponse.key,
        amount,
        currency,
        order_id,
        name: 'Clasovia',
        description: '360° Virtual Tour Business Workshop',
        prefill: { name, email, contact: phone },
        theme: { color: '#c4f06a' },
        handler: async (response) => {
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              name,
              email,
              phone,
            })

            if (verifyResponse.success) {
              setSuccessMessage('Payment successful. Redirecting...')
              setTimeout(() => {
                window.location.href = 'https://chat.whatsapp.com/FB7wl6p8K8x6MVGVucIR6J'
              }, 700)
            } else {
              setError('Payment verification failed. Please try again.')
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError)
            setError('Payment verification failed. Please contact support.')
          } finally {
            setPaymentLoading(false)
            setIsPaymentModalOpen(false)
          }
        },
        modal: {
          ondismiss: () => setPaymentLoading(false),
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (paymentError) {
      console.error('Payment error:', paymentError)
      setError(paymentError.message || 'Failed to initiate payment')
      setPaymentLoading(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="site-shell">
      <PremiumHeader onPayClick={openPaymentModal} disabled={paymentLoading} />

      <main>
        <Hero onPayClick={openPaymentModal} disabled={paymentLoading} />

        <section className="proof-strip" aria-label="Workshop highlights">
          <div className="proof-item"><span className="proof-mark"><FiMove /></span><span>Immersive 360° experiences</span></div>
          <span className="proof-divider" />
          <div className="proof-item"><span className="proof-mark"><FiMapPin /></span><span>Maps & local discovery</span></div>
          <span className="proof-divider" />
          <div className="proof-item"><span className="proof-mark"><FiTrendingUp /></span><span>A skill you can take to market</span></div>
        </section>

        <section className="section outcomes-section" id="learn">
          <div className="section-heading">
            <p className="eyebrow"><span /> THE PLAYBOOK</p>
            <h2>See the whole picture.<br /><span>Build what comes next.</span></h2>
            <p className="section-intro">A practical introduction to creating virtual tours—and turning that skill into a service local businesses can use.</p>
          </div>
          <div className="outcome-grid">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon
              return (
                <article className="outcome-card" key={outcome.number}>
                  <div className="card-topline"><span>{outcome.number} / 04</span><Icon aria-hidden="true" /></div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                  <span className="card-arrow"><FiArrowUpRight /></span>
                </article>
              )
            })}
          </div>
        </section>

        <section className="workflow-section" aria-labelledby="workflow-title">
          <div className="workflow-inner">
            <div className="workflow-copy">
              <p className="eyebrow"><span /> FROM CAMERA TO CLIENT</p>
              <h2 id="workflow-title">A real-world skill.<br /><span>A clearer way forward.</span></h2>
              <p>Learn a simple end-to-end workflow—from capturing a space to showing a business owner what a virtual tour can do for them.</p>
              <a className="text-link" href="#curriculum">Explore the workshop <FiArrowRight /></a>
            </div>
            <div className="workflow-map" aria-label="Illustration of the virtual-tour workflow">
              <div className="map-grid" />
              <svg className="route-lines" viewBox="0 0 640 400" fill="none" aria-hidden="true">
                <path d="M66 324 158 271 226 287 302 190 388 204 474 112 590 75" />
                <path d="M86 90 166 130 226 104 302 190 346 285 451 300 550 232" />
                <path className="route-dash" d="M158 271 226 287 302 190 388 204 474 112" />
              </svg>
              <div className="map-coordinate">28° 36&apos; 50.1&quot; N<br />77° 12&apos; 32.8&quot; E</div>
              <div className="map-label map-label-top"><span className="live-dot" /> LIVE TOUR WORKFLOW</div>
              <div className="map-pin map-pin-one"><FiCamera /><span>CAPTURE</span></div>
              <div className="map-pin map-pin-two"><FiMapPin /><span>GET DISCOVERED</span></div>
              <div className="map-pin map-pin-three"><FiTarget /><span>WIN A CLIENT</span></div>
              <div className="map-legend"><span>01</span> Create <i /> <span>02</span> Publish <i /> <span>03</span> Grow</div>
            </div>
          </div>
        </section>

        <section className="section curriculum-section" id="curriculum">
          <div className="curriculum-heading">
            <div className="section-heading">
              <p className="eyebrow"><span /> INSIDE THE SESSION</p>
              <h2>Less theory.<br /><span>More field notes.</span></h2>
            </div>
            <p className="section-intro">A focused, live two-hour session that takes you from the first camera setup to your first client conversation.</p>
          </div>
          <div className="module-list">
            {modules.map(([number, title, description]) => (
              <article className="module-row" key={number}>
                <span className="module-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <FiArrowUpRight className="module-icon" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="instructor-section" id="about">
          <div className="instructor-image-wrap">
            <img src="/founder.jpg" alt="Santosh Prajapati, 360° virtual tour specialist" />
            <div className="image-caption"><span className="live-dot" /> OUT IN THE FIELD</div>
          </div>
          <div className="instructor-copy">
            <p className="eyebrow"><span /> LEARN FROM THE FIELD</p>
            <h2>Built on real work.<br /><span>Taught by doing.</span></h2>
            <p className="instructor-lede">“I started with no big network. I learned how to help local businesses get seen—and built a service around it.”</p>
            <p>Santosh Prajapati is the founder of ZUSTP and a 360° virtual tour specialist. His hands-on experience helping 73+ businesses shape the workshop, with practical steps you can start applying right away.</p>
            <div className="instructor-signoff">
              <div className="instructor-avatar">SP</div>
              <div><strong>Santosh Prajapati</strong><span>Founder, ZUSTP · 360° Virtual Tour Specialist</span></div>
            </div>
            <div className="instructor-stat"><strong>73<span>+</span></strong><span>businesses helped with immersive tours</span></div>
          </div>
        </section>

        <section className="enroll-section" id="pricing">
          <div className="enroll-copy">
            <p className="eyebrow"><span /> YOUR NEXT MOVE</p>
            <h2>Learn the skill.<br /><span>Map the opportunity.</span></h2>
            <p>Join a live, beginner-friendly workshop and leave with a practical roadmap for building your own 360° virtual tour service.</p>
            <ul className="enroll-benefits">
              <li><FiCheck /> 2-hour live, step-by-step session</li>
              <li><FiCheck /> Camera, editing & publishing workflow</li>
              <li><FiCheck /> Client outreach and pricing fundamentals</li>
              <li><FiCheck /> Time for your questions, live</li>
            </ul>
          </div>
          <div className="price-card">
            <div className="price-card-top"><span className="price-pill"><span className="live-dot" /> LIVE WORKSHOP</span><span className="price-duration">2 HOURS · BEGINNER FRIENDLY</span></div>
            <p className="price-label">One-time seat</p>
            <div className="price-amount"><span>₹</span>99</div>
            <p className="price-note">A small first step toward a new skill.</p>
            <button className="button button-primary price-cta" onClick={openPaymentModal} disabled={paymentLoading}>
              {paymentLoading ? 'Processing...' : 'Reserve your seat'} <FiArrowUpRight />
            </button>
            <p className="price-secure"><span>✳</span> Secure checkout powered by Razorpay</p>
            <div className="price-card-footer"><span>Instant confirmation</span><span>Questions? <a href="mailto:info.zustp@gmail.com">Talk to us</a></span></div>
            {error && <p className="payment-inline-error" role="alert">{error}</p>}
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-heading">
            <p className="eyebrow"><span /> GOOD TO KNOW</p>
            <h2>Before you <span>jump in.</span></h2>
            <a className="text-link" href="#contact">Still curious? Get in touch <FiArrowRight /></a>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details className="faq-item" key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-cta" id="contact">
          <div className="final-cta-orbit" aria-hidden="true" />
          <p className="eyebrow"><span /> THE NEXT MOVE IS YOURS</p>
          <h2>Make the real world<br />your <span>classroom.</span></h2>
          <p>Start with a camera. Leave with a whole new perspective.</p>
          <button className="button button-primary" onClick={openPaymentModal} disabled={paymentLoading}>
            {paymentLoading ? 'Processing...' : 'Join the live workshop'} <FiArrowUpRight />
          </button>
          <a className="final-contact-link" href="mailto:info.zustp@gmail.com">Questions first? info.zustp@gmail.com</a>
        </section>
      </main>

      <Footer />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        onSubmit={handlePayment}
        paymentLoading={paymentLoading}
        error={error}
        successMessage={successMessage}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  )
}

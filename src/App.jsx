import { useState, useEffect } from 'react'
import PremiumHeader from './components/PremiumHeader.jsx'
import Hero from './components/Hero.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="scroll-smooth min-h-screen bg-slate-950 text-white">
      <PremiumHeader />

      <main className="pt-10">
        <Hero />

        {/* ABOUT SECTION */}
        <section id="about" className="bg-slate-900 px-4 py-20 md:px-6">
          <div className="mx-auto grid max-w-[1100px] gap-5 lg:grid-cols-2 lg:items-center">
            
            {/* LEFT CONTENT */}
            <div className="space-y-5">
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                About the Trainer
              </h2>

              <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                Hi, I’m Santosh Prajapati — Founder of ZUSTP and a 360° Virtual Tour Expert.
              </p>

              <p className="max-w-xl text-slate-300">
                I started with zero clients and no big network. By leveraging 360° virtual tours, I helped local businesses stand out online, attract more customers, and generate real results.
              </p>

              {/* PROOF */}
              <p className="max-w-xl text-lg leading-relaxed font-medium text-emerald-300">
                Helped 73+ businesses improve their visibility using 360° tours
              </p>

              <p className="max-w-xl text-slate-300">
                Today, I help others do the same.
              </p>

              {/* BULLETS */}
              <div className="max-w-xl text-lg leading-relaxed space-y-2 text-slate-300">
                <p>✔ Learn this high-demand skill</p>
                <p>✔ Start earning from it</p>
                <p>✔ Grow it into a sustainable business</p>
              </div>

              <p className="max-w-xl text-lg leading-relaxed text-sm text-slate-300">
                Everything I teach is based on real-world experience — not theory.
              </p>
            </div>

            {/* RIGHT CARD */}
            <div className="ml-auto max-w-sm rounded-3xl border border-emerald-500/30 bg-slate-900 p-6 justify-end shadow-lg shadow-emerald-500/10  transition hover:shadow-emerald-500/20">
              
              {/* IMAGE ADDED */}
              <img
                src="/founder.jpg"
                alt="Santosh Prajapati"
                className="h-72 w-full object-cover rounded-2xl"
              />

              {/* NAME */}
              <div className="mt-4 text-center">
                <p className="text-white font-semibold">Santosh Prajapati</p>
                <p className="mt-2 text-sm space-y-1 text-slate-400">
                  Founder @ ZUSTP | 360° Virtual Tour Specialist
                </p>
              </div>

              {/* MINI TRUST */}
              <div className="mt-3 space-y-1 text-xs text-slate-400">
                <p>✔ Delivered Virtual Tour Solutions for 70+ Businesses</p>
                <p>✔ Hands-on Training with Real Client Projects</p>
                <p>✔ Step-by-Step System Designed for Beginners</p>
              </div>
            </div>

          </div>
        </section>

        {/* LEARN SECTION */}
        <section id="learn" className="bg-slate-950 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-6xl">
            
            <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
              What You&apos;ll Learn
            </h2>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                { title: '360° Virtual Tours Explained (Beginner to Pro)', icon: '🧭' },
                { title: 'How to Find & Approach High-Paying Clients ?', icon: '🤝' },
                { title: 'Complete Shooting Setup (Camera + Angles)', icon: '📷' },
                { title: 'Editing & Publishing Workflow (Step-by-Step)', icon: '✂️' },
                { title: 'Pricing Strategy (₹5K–₹25K per Project)', icon: '💰' },
                { title: 'How to Get Your First Client Fast ?', icon: '🚀' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-black/20"
                >
                  <p className="text-2xl">{item.icon}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Practical step-by-step guidance during the live session.
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-center text-sm text-emerald-400">
              By the end of this webinar, you&apos;ll have a clear roadmap to start your own 360° virtual tour business.
            </p>

          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="bg-slate-900 px-4 py-20 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-500/50 bg-slate-950 p-8 shadow-2xl shadow-emerald-500/10 transition duration-300 hover:scale-[1.01]">

              {/* TOP BADGE */}
              <div className="absolute -top-0 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-semibold text-white shadow">
                Limited Time Offer
              </div>

              {/* HEADLINE */}
              <h2 className="mt-4 text-center text-3xl font-bold text-white md:text-4xl">
                Live Webinar Access
              </h2>

              {/* SUBTEXT */}
              <p className="mt-3 text-center text-slate-400 max-w-xl mx-auto">
                Learn what actually works — practical strategies you can implement immediately to get real results.
              </p>

              {/* PRICE */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-500 line-through">Worth ₹999</p>
                <div className="text-5xl font-extrabold text-emerald-400">₹99</div>
                <p className="text-xs text-slate-400 mt-1">
                  One-time payment • Instant access
                </p>
              </div>

              {/* FEATURES (PREMIUM GRID) */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                
                <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition hover:border-emerald-500/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-lg">
                    ✔
                  </div>
                  <div>
                    <p className="font-semibold text-white">2-hour intensive session</p>
                    <p className="text-sm text-slate-400">
                      Focused on clarity and real outcomes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition hover:border-emerald-500/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-lg">
                    ✔
                  </div>
                  <div>
                    <p className="font-semibold text-white">Execution framework</p>
                    <p className="text-sm text-slate-400">
                      Step-by-step system you can apply instantly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition hover:border-emerald-500/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-lg">
                    ✔
                  </div>
                  <div>
                    <p className="font-semibold text-white">Live Q&A session</p>
                    <p className="text-sm text-slate-400">
                      Get real answers to your real questions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition hover:border-emerald-500/40">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 text-lg">
                    ✔
                  </div>
                  <div>
                    <p className="font-semibold text-white">Actionable roadmap</p>
                    <p className="text-sm text-slate-400">
                      Clear plan to start with confidence
                    </p>
                  </div>
                </div>

              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="group mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:bg-emerald-600 hover:shadow-emerald-500/30 active:scale-95"
              >
                Reserve Your Seat
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

              {/* URGENCY */}
              <p className="mt-5 text-center text-sm text-amber-400">
                Limited seats available — filling fast
              </p>

              {/* TRUST BADGES */}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span>🔒 Secure Checkout</span>
                <span>⚡ Instant Confirmation</span>
                <span>✔ No Hidden Charges</span>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT */}
          <section id="contact" className="bg-slate-950 px-4 py-20 md:px-6">
            <div className="mx-auto max-w-6xl text-center">

              <h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
                Need Assistance?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Have questions about the webinar, payment, or getting started?  
                Our team is here to assist you instantly.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

                {/* WhatsApp */}
                <a
                  href="https://api.whatsapp.com/send?phone=917488735601&text=Hi%2C%20I%20want%20to%20join%20your%20%E2%82%B999%20webinar.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-600"
                >
                  Chat on WhatsApp
                </a>

                {/* Gmail Compose */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info.zustp@gmail.com&su=Webinar%20Inquiry&body=Hi%2C%20I%20want%20to%20join%20your%20%E2%82%B999%20webinar.%20Please%20share%20details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  Email Support
                </a>

              </div>

              {/* TRUST LINE */}
              <p className="mt-6 text-xs text-slate-500">
                  We’re available to help before and after the webinar.
              </p>

            </div>
          </section>

        {/* CTA */}
        <section className="relative bg-gradient-to-r from-emerald-600 via-cyan-500 to-blue-500 px-4 py-20 text-center text-white md:px-6 overflow-hidden">
      
      {/* Glow effect (subtle) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">

        {/* Heading */}
        <h2 className="text-3xl font-bold sm:text-4xl">
          Start Your Journey with @Zustp
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-lg text-white/90">
          Learn a high-income skill and start earning with just ₹99
        </p>

        {/* 🔥 Urgency line */}
        <p className="mt-2 text-sm text-white/80">
          Limited seats available — secure your spot now
        </p>

        {/* CTA BUTTON */}
        <a
          href="#pricing"
          className="group mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-8 py-3 text-base font-semibold text-emerald-400 transition-all duration-300 hover:bg-slate-800"
        >
          Reserve Seat Now →
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        {/* 🔥 Trust line */}
        <p className="mt-5 text-xs text-white/80">
          500+ students already joined • Beginner friendly • Limited time offer
        </p>

      </div>
    </section>

      </main>

      <Footer />
    </div>
  )
}
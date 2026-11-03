import { FiArrowUpRight, FiCamera, FiMapPin, FiMove, FiPlay } from 'react-icons/fi'

export default function Hero({ onPayClick, disabled }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-copy">
          <a className="hero-kicker" href="#curriculum">
            <span className="live-dot" /> THE 360° BUSINESS WORKSHOP <FiArrowUpRight />
          </a>
          <h1>Make the world<br />your <span>next big idea.</span></h1>
          <p className="hero-description">Turn the way people see a place into a skill you can sell. Learn 360° virtual tours, maps, and the business behind bringing local spaces to life.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onPayClick} disabled={disabled}>
              {disabled ? 'Processing...' : 'Explore the workshop'} <FiArrowUpRight />
            </button>
            <a className="button button-quiet" href="#learn"><span className="play-icon"><FiPlay /></span> See what you&apos;ll learn</a>
          </div>
          <div className="hero-note">
            <div className="avatar-stack" aria-hidden="true"><span>360</span><span>◉</span><span>↗</span></div>
            <p><strong>A new perspective. A practical skill.</strong><span>Beginner-friendly · Live, hands-on session</span></p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" aria-hidden="true" />
          <div className="tour-window">
            <video src="/main.mp4" autoPlay loop muted playsInline aria-label="360° virtual tour example" />
            <div className="tour-shade" />
            <div className="tour-topbar">
              <span className="tour-location"><FiMapPin /> OLD TOWN · NEW DELHI</span>
              <span className="tour-360"><FiMove /> 360° VIEW</span>
            </div>
            <div className="tour-center" aria-hidden="true"><span><FiPlay /></span></div>
            <svg className="tour-route" viewBox="0 0 640 420" fill="none" aria-hidden="true">
              <path d="M92 344c77-8 71-91 166-92s82 74 161-2 86-135 174-133" />
              <circle cx="92" cy="344" r="6" /><circle cx="419" cy="250" r="6" /><circle cx="593" cy="117" r="6" />
            </svg>
            <div className="tour-coordinate"><span>LIVE PREVIEW</span><strong>Find your next angle</strong><small>28.6139° N &nbsp; 77.2090° E</small></div>
            <div className="tour-hud" aria-label="360 degree camera guide">
              <span><FiCamera /> CAMERA</span>
              <i />
              <span>DRAG TO EXPLORE</span>
            </div>
          </div>
          <div className="visual-float visual-float-top"><span className="float-icon"><FiMapPin /></span><span><strong>Be found</strong><small>Maps · discovery · visits</small></span><FiArrowUpRight /></div>
          <div className="visual-float visual-float-bottom"><span className="float-wave">↗</span><span><strong>Build a service</strong><small>A skill with real-world reach</small></span></div>
          <div className="visual-index"><span>FIELD NOTES</span><span>01 — 04</span></div>
        </div>
      </div>
      <div className="hero-bottomline"><span>NEW LENS. NEW POSSIBILITIES.</span><span>SCROLL TO EXPLORE <span className="scroll-cue">↓</span></span></div>
    </section>
  )
}

import { useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'

const links = [
  ['#learn', 'The playbook'],
  ['#curriculum', 'Workshop'],
  ['#about', 'Your guide'],
]

export default function PremiumHeader({ onPayClick, disabled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handlePayClick = () => {
    setMenuOpen(false)
    onPayClick()
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Clasovia home">
        <span className="brand-mark">C<span>.</span></span>
        <span className="brand-name">clasovia<span>FIELD SCHOOL</span></span>
      </a>
      <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {links.map(([href, label]) => (
          <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
        <button className="nav-mobile-cta" onClick={handlePayClick} disabled={disabled}>
          Join the workshop <FiArrowUpRight />
        </button>
      </nav>
      <div className="header-actions">
        <span className="header-price">Live workshop <strong>₹99</strong></span>
        <button className="header-cta" onClick={handlePayClick} disabled={disabled}>
          Get started <FiArrowUpRight />
        </button>
      </div>
      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </header>
  )
}

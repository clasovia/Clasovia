import { FiArrowUpRight } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#home" aria-label="Clasovia home">
        <span className="brand-mark">C<span>.</span></span>
        <span className="brand-name">clasovia<span>FIELD SCHOOL</span></span>
      </a>
      <p>Learn a new way to see the world—and work in it.</p>
      <nav className="footer-links" aria-label="Footer navigation">
        <a href="#learn">The playbook</a>
        <a href="#curriculum">Workshop</a>
        <a href="mailto:info.zustp@gmail.com">Get in touch <FiArrowUpRight /></a>
      </nav>
      <span className="footer-copyright">© {new Date().getFullYear()} Clasovia. All rights reserved.</span>
    </footer>
  )
}

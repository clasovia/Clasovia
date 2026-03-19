import { useEffect, useState } from "react";

export default function PremiumHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 z-50 w-full">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 py-3 transition-all duration-300 ${
        scrolled
            ? "bg-[#0F121B]/10 backdrop-blur-md shadow-lg"
            : "bg-[#0F121B]/0 backdrop-blur-sm"
        } rounded-full border border-white/10`}
      >
        {/* Logo */}
        <a
        href="/"
        className="text-white text-xl font-bold tracking-wide"
        style={{ fontFamily: "Sora, sans-serif", letterSpacing: "0.04em"}}
        >
        <span className="text-emerald-400">C</span>
        <span className="text-white">lasovia</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#about" className="text-white transition hover:text-emerald-400">
            About
          </a>
          <a href="#learn" className="text-white transition hover:text-emerald-400">
            What You'll Learn
          </a>
          <a href="#contact" className="text-white transition hover:text-emerald-400">
            Contact
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-emerald-600"
          >
            Get Started for ₹99 →
          </a>
        </nav>

        {/* Mobile Button */}
        <div className="md:hidden">
          <a
            href="#pricing"
            className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-emerald-600"
          >
            Join ₹99
          </a>
        </div>
      </div>
    </header>
  );
}
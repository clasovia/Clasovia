export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-slate-300 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4">

        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          {/* LEFT - BRAND */}
          <div>
            <h3 className="text-xl font-bold text-white">Clasovia</h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Practical learning, built for real-world results.
            </p>
          </div>

          {/* CENTER - LINKS */}
          <div className="flex flex-col gap-2 text-sm">
            <a href="#about" className="hover:text-emerald-400 transition">About</a>
            <a href="#learn" className="hover:text-emerald-400 transition">What You’ll Learn</a>
            <a href="#pricing" className="hover:text-emerald-400 transition">Pricing</a>
            <a href="#contact" className="hover:text-emerald-400 transition">Contact</a>
          </div>

          {/* RIGHT - CONTACT */}
         <div className="text-sm space-y-2">
  
            <p className="text-slate-400">
              Need Assistance?
            </p>

            <a
              href="mailto:info.zustp@gmail.com"
              className="block text-emerald-400 font-medium hover:text-emerald-300 transition"
            >
              info.zustp@gmail.com
            </a>

            <p className="text-xs text-slate-500">
              Get quick support for your queries before and after the session.
            </p>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Clasovia. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
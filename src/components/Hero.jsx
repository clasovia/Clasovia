import { useEffect, useState, useRef } from "react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({});
  const [seatsLeft, setSeatsLeft] = useState(49);
  const [usersJoined, setUsersJoined] = useState(20);

  // ✅ Stable target date
  const targetDateRef = useRef(null);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    targetDateRef.current = date;
  }, []);

  const targetDate = targetDateRef.current;

  const nextDateString = targetDate
    ? targetDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  // ⏳ Countdown
  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // 🔴 Seats decreasing
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 12 ? prev - 1 : prev));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // 📈 Users increasing
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersJoined((prev) => prev + Math.floor(Math.random() * 2));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const isUrgent =
    timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes <= 59;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      
      {/* Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-emerald-400/40 blur-3xl" />
        <div className="absolute right-4 top-28 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-28 md:flex-row md:items-center md:justify-between md:px-6">
        
        {/* LEFT */}
        <div className="max-w-2xl space-y-7">

          {/* 🔥 INFO PILLS */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">

            <div className="rounded-full bg-emerald-500/10 px-4 py-1 text-emerald-300 border border-emerald-400/20">
              🔥Live Webinar: {nextDateString}
            </div>

            <div className="rounded-full bg-red-500/10 px-4 py-1 text-red-400 border border-red-400/20">
              🔴 {seatsLeft} Seats Left
            </div>

            <div className="rounded-full bg-white/5 px-4 py-1 text-slate-300 border border-white/10">
              📈 {usersJoined}+ Joined
            </div>

          </div>

          {/* ⏳ Countdown */}
          <div className="flex items-center gap-3">
            {["days", "hours", "minutes", "seconds"].map((unit) => (
              <div
                key={unit}
                className={`flex min-w-[65px] flex-col items-center rounded-lg px-3 py-2 border backdrop-blur-md ${
                  isUrgent
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                <span
                  className={`text-lg font-bold ${
                    isUrgent ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {timeLeft[unit] ?? "00"}
                </span>
                <span className="text-xs uppercase text-slate-400">
                  {unit}
                </span>
              </div>
            ))}
          </div>

          {/* Heading */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-white"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Create & Sell
          <span className="block mt-4">360° Virtual Tours</span>

          <span className="block mt-4 text-emerald-400">
            Like a Pro
          </span>
        </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-300 sm:text-xl">
            Learn the complete process to create, price, and sell virtual tours to real clients — even if you're starting from scratch.
          </p>

          {/* CTA */}
       <div className="flex flex-col gap-4 sm:flex-row">

  {/* Primary CTA */}
 <a
  href="#pricing"
  className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-400 transition-all duration-300 group"
>
  <span className="absolute inset-0 bg-emerald-500 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>

  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Get Started for ₹99 →
  </span>
</a>

  {/* Secondary CTA */}
  <a
  href="#learn"
  className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-300"
>
  {/* Hover background */}
  <span className="absolute inset-0 bg-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>

  {/* Border glow */}
  <span className="absolute inset-0 rounded-full border border-white/10 group-hover:border-white/30 transition-all duration-300"></span>

  {/* Text */}
  <span className="relative z-10 flex items-center gap-2">
    What You'll Learn
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</a>

</div>
        </div>

        {/* RIGHT */}
        <div className="h-72 w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-700 p-3 shadow-2xl md:h-[400px] md:w-[800px]">
  <div className="flex h-full flex-col rounded-2xl bg-white/5 p-2">
    
    <div className="flex-1 rounded-xl overflow-hidden">
      <video
        src="/demo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </div>

    <p className="mt-5 text-xs text-slate-400">
      Build a ₹1L–₹2L/month income with 360° Virtual Tours
    </p>
  </div>
</div>

      </div>
    </section>
  );
}
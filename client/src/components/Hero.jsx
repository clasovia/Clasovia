import { useEffect, useState } from "react";

export default function Hero({ onPayClick, disabled }) {
  const [timeLeft, setTimeLeft] = useState({});

  const TOTAL_SEATS = 151;

  // ✅ Initial values
  const [usersJoined, setUsersJoined] = useState(97);
  const [seatsLeft, setSeatsLeft] = useState(TOTAL_SEATS - 97);

  // ✅ FIXED: Instant target date (2 days)
  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date;
  });

  const nextDateString = targetDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // ⏳ Countdown (same as before)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // 🔥 ✅ SYNCED LOGIC (MAIN FIX)
  useEffect(() => {
    const interval = setInterval(() => {
      setUsersJoined((prev) => {
        if (prev >= TOTAL_SEATS) return prev;

        const newUsers = prev + 1; // +1 each time

        setSeatsLeft(TOTAL_SEATS - newUsers); // auto decrease

        return newUsers;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  // ⏳ Countdown (instant start)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) return;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    updateTime(); // 🔥 instant run
    const interval = setInterval(updateTime, 1000);

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
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* 🔥 Background Glow */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute left-[-100px] top-[50px] h-[300px] w-[300px] bg-emerald-500/30 blur-[120px]" />
        <div className="absolute right-[-80px] bottom-[50px] h-[300px] w-[300px] bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 py-28 md:flex-row md:items-center md:justify-between md:px-6">

        {/* LEFT */}
        <div className="max-w-2xl space-y-7">

          {/* Pills */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">

            <div className="rounded-full bg-emerald-500/10 px-4 py-1 text-emerald-300 border border-emerald-400/20">
              🔥 Live Webinar: {nextDateString}
            </div>

            <div className="rounded-full bg-red-500/10 px-4 py-1 text-red-400 border border-red-400/20">
              🔴 {seatsLeft} Seats Left
            </div>

            <div className="rounded-full bg-white/5 px-4 py-1 text-slate-300 border border-white/10">
              📈 {usersJoined}+ Joined
            </div>

          </div>

          {/* Countdown */}
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
        className="max-w-xl text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >

        {/* Line 1 */}
        <span className="block text-white">
          Build a Profitable Income
        </span>

        {/* Line 2 */}
        <span className="block mt-4 text-slate-300">
          With
          <span className="ml-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-medium">
            360° Virtual Tours
          </span>
        </span>

        {/* Line 3 */}
        <span className="block mt-4 text-white">
          Even as a
          <span className="ml-4 text-emerald-400 font-medium">
            Beginner
          </span>
        </span>

      </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-300">
            Learn how to create, price, and sell virtual tours to real clients — even if you're starting from scratch.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">

            <button
              onClick={onPayClick}
              disabled={disabled}
              className="inline-flex items-center justify-center rounded-full border border-emerald-400 px-8 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {disabled ? 'Processing...' : 'Get Started for ₹99 →'}
            </button>

            <a
              href="#learn"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              What You'll Learn →
            </a>

          </div>
        </div>

        {/* RIGHT */}
        <div className="relative w-full max-w-md md:max-w-1xl">

          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-60"></div>

          {/* Card */}
          <div className="relative group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.6)] overflow-hidden transition duration-500 hover:-translate-y-2">

            {/* Video */}
            <div className="relative h-64 md:h-[360px] overflow-hidden">

              <video
                src="/main.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* Tag */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1 text-xs border border-white/20 backdrop-blur">
                🎥 Real Client Work
              </div>

            </div>

            {/* Content */}
            <div className="p-6">

              <h3 className="text-xl font-semibold">
                Turn Skills into Income
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Learn how to create & sell 360° virtual tours to businesses.
              </p>

              <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                <span>💰 ₹1L–₹2L/month</span>
                <span>📍 Real Clients</span>
                <span>⚡ Beginner Friendly</span>
              </div>

              <button
                onClick={onPayClick}
                disabled={disabled}
                className="mt-5 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 text-sm font-semibold text-white transition hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {disabled ? 'Processing...' : 'Start Learning →'}
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
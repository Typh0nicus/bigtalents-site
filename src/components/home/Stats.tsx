"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FaTrophy, FaDollarSign, FaUsers, FaGlobeAmericas } from "react-icons/fa";
import { TOURNAMENTS } from "@/data/tournaments";

/* ======================= Round Down Helper ======================= */
function roundDownToNearest(value: number, nearest: number = 100): number {
  return Math.floor(value / nearest) * nearest;
}

/* ======================= Count Up (flicker-safe) ======================= */
function CountUp({
  to,
  duration = 900,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [val, setVal] = useState(0);
  const startRef = useRef<number | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef, { once: true, margin: "-50px" });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // If user prefers reduced motion or we aren't mounted/in view yet, show final number (no pop/mismatch)
    if (!mounted || !inView || prefersReduced) {
      setVal(to);
      return;
    }

    let raf = 0;
    startRef.current = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const p = Math.min(1, (ts - startRef.current) / duration);
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, mounted, inView, prefersReduced]);

  const formatted = `${prefix}${val.toLocaleString(undefined, {
    maximumFractionDigits: decimals,
  })}${suffix}`;

  return <span ref={spanRef}>{formatted}</span>;
}

/* ======================= Stat Card ======================= */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  delay: number;
  mounted: boolean;
}

function StatCard({ icon: Icon, label, value, delay, mounted }: StatCardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={mounted ? { opacity: 1, y: 0, scale: 1 } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 group select-none relative overflow-hidden hover:-translate-y-1 transition-transform duration-200 will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37]/10 mb-3 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
          <Icon className="text-[#D4AF37] text-xl" />
        </div>
        <div className="text-sm text-white/70 mb-1 font-medium">{label}</div>
        <div className="text-3xl font-extrabold text-[#D4AF37] group-hover:text-[#FFD700] transition-colors duration-200">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* ======================= Main Stats ======================= */
export function Stats() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const finalizedTournaments = useMemo(
    () => TOURNAMENTS.filter((t) => t.archived === true),
    []
  );

  // Keep your +123 addition
  const totalPrizeRaw = useMemo(
    () => finalizedTournaments.reduce((acc, t) => acc + (t.prizeUsd ?? 0), 0) + 123,
    [finalizedTournaments]
  );
  const totalPrizeDisplayed = roundDownToNearest(totalPrizeRaw, 100);

  const totalEvents = finalizedTournaments.length;

  const totalTeamsRaw = useMemo(
    () => finalizedTournaments.reduce((acc, t) => acc + (t.participants ?? 0), 0),
    [finalizedTournaments]
  );
  const totalTeamsDisplayed = roundDownToNearest(totalTeamsRaw, 100);

  const communityMembers = 10000; // adjust as needed

  return (
    <section className="container py-8 md:py-12 select-none">
      <motion.div
        initial={false}
        whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 will-change-transform"
      >
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Our <span className="text-[#D4AF37]">Impact</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          Building championship rosters and competitive opportunities
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FaTrophy}
          label="Events Organized"
          value={<CountUp to={totalEvents} duration={800} suffix="+" />}
          delay={0.1}
          mounted={mounted}
        />

        <StatCard
          icon={FaDollarSign}
          label="Prizes Awarded"
          value={<CountUp to={totalPrizeDisplayed} duration={1000} prefix="$" suffix="+" />}
          delay={0.2}
          mounted={mounted}
        />

        <StatCard
          icon={FaUsers}
          label="Teams Competed"
          value={<CountUp to={totalTeamsDisplayed} duration={1200} suffix="+" />}
          delay={0.3}
          mounted={mounted}
        />

        <StatCard
          icon={FaGlobeAmericas}
          label="Global Community"
          value={<CountUp to={communityMembers} duration={1000} suffix="+" />}
          delay={0.4}
          mounted={mounted}
        />
      </div>
    </section>
  );
}

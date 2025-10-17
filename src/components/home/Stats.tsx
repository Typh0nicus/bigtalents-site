"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaDollarSign, FaUsers, FaGlobeAmericas } from "react-icons/fa";
import { TOURNAMENTS } from "@/data/tournaments";

/* ======================= Count Up Hook ======================= */
function CountUp({ to, duration = 900, prefix = "", suffix = "", decimals = 0 }: { 
  to: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number; 
}) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    let raf: number;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (start.current === null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / duration);
      setVal(to * ease(p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  const formatted = useMemo(() => {
    return `${prefix}${val.toLocaleString(undefined, { maximumFractionDigits: decimals })}${suffix}`;
  }, [val, prefix, suffix, decimals]);

  return <span>{formatted}</span>;
}

/* ======================= Stat Card Component ======================= */
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
  delay: number;
}

function StatCard({ icon: Icon, label, value, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card p-6 group select-none relative overflow-hidden hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37]/10 mb-3 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
          <Icon className="text-[#D4AF37] text-xl" />
        </div>
        
        {/* Label */}
        <div className="text-sm text-white/70 mb-1 font-medium">{label}</div>
        
        {/* Value */}
        <div className="text-3xl font-extrabold text-[#D4AF37] group-hover:text-[#FFD700] transition-colors duration-200">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

/* ======================= Main Stats Component ======================= */
export function Stats() {
  const finalizedTournaments = useMemo(
    () => TOURNAMENTS.filter(t => t.archived === true),
    []
  );

  const totalPrize = useMemo(
    () => finalizedTournaments.reduce((acc, t) => acc + (t.prizeUsd ?? 0), 0),
    [finalizedTournaments]
  );

  const totalEvents = finalizedTournaments.length;

  const totalTeams = useMemo(
    () => finalizedTournaments.reduce((acc, t) => acc + (t.participants ?? 0), 0),
    [finalizedTournaments]
  );

  const countriesCount = "150+";

  return (
    <section className="container py-8 md:py-12 select-none">
      {/* Optional: Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          By the <span className="text-[#D4AF37]">Numbers</span>
        </h2>
        <p className="text-white/60 text-sm md:text-base">
          Building the future of competitive esports
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FaTrophy}
          label="Tournaments Completed"
          value={<CountUp to={totalEvents} duration={800} />}
          delay={0.1}
        />

        <StatCard
          icon={FaDollarSign}
          label="Prize Pool Awarded"
          value={<CountUp to={totalPrize} duration={1000} prefix="$" />}
          delay={0.2}
        />

        <StatCard
          icon={FaUsers}
          label="Teams Participated"
          value={<CountUp to={totalTeams} duration={1200} />}
          delay={0.3}
        />

        <StatCard
          icon={FaGlobeAmericas}
          label="Countries Represented"
          value={countriesCount}
          delay={0.4}
        />
      </div>
    </section>
  );
}

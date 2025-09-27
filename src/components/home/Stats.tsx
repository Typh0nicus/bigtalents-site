"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { TOURNAMENTS } from "@/data/tournaments";

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

export function Stats() {
  // Only count FINALIZED (archived) tournaments
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

  // EMEA + NA Brawl Stars region coverage
  // EMEA: Europe (44 countries) + Middle East (16 countries) + Africa (54 countries) + Russia/CIS (15 countries)
  // NA: North America (23 countries) + Central America (7 countries)
  // Total: ~159 countries, rounded down to 150+
  const countriesCount = "150+";

  return (
    <section className="container py-8 md:py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="text-sm text-white/70">Tournaments Completed</div>
          <div className="mt-1 text-3xl font-extrabold text-[var(--gold)]">
            <CountUp to={totalEvents} duration={800} />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-white/70">Prize Pool Awarded</div>
          <div className="mt-1 text-3xl font-extrabold text-[var(--gold)]">
            <CountUp to={totalPrize} duration={1000} prefix="$" />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-white/70">Teams Participated</div>
          <div className="mt-1 text-3xl font-extrabold text-[var(--gold)]">
            <CountUp to={totalTeams} duration={1200} />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-white/70">Countries</div>
          <div className="mt-1 text-3xl font-extrabold text-[var(--gold)]">
            {countriesCount}
          </div>
        </div>
      </div>
    </section>
  );
}

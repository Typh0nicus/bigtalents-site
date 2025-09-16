"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { TOURNAMENTS } from "@/data/tournaments";

function CountUp({ to, duration = 900, prefix = "", suffix = "", decimals = 0 }: { to: number; duration?: number; prefix?: string; suffix?: string; decimals?: number; }) {
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
  const totalPrize = useMemo(
    () => TOURNAMENTS.reduce((acc, t) => acc + (t.prizeUsd ?? 0), 0),
    []
  );
  const totalEvents = TOURNAMENTS.length;

  return (
    <section className="container py-8 md:py-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <div className="text-sm text-white/70">Tournaments Hosted</div>
          <div className="mt-1 text-3xl font-extrabold">
            <CountUp to={totalEvents} duration={800} />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-white/70">Prize Pool Awarded</div>
          <div className="mt-1 text-3xl font-extrabold">
            <CountUp to={totalPrize} duration={1000} prefix="$" decimals={2} />
          </div>
        </div>

        <div className="card p-6">
          <div className="text-sm text-white/70">Regions</div>
          <div className="mt-1 text-3xl font-extrabold">NA · EU</div>
        </div>
      </div>
    </section>
  );
}

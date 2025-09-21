// src/components/home/TrustedBy.tsx
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function TrustedBy() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="container py-8 md:py-12">
      {/* Title */}
      <div className="text-center">
        <h3 className="h4">Partnered With</h3>
        <div className="mx-auto mt-2 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-white/18 to-transparent" />
        <div className="mx-auto mt-[2px] h-[1px] w-10 rounded-full bg-[color:var(--gold)]/35" />
      </div>

      {/* Centered partner tile */}
      <motion.div
        className="mt-6 flex items-center justify-center"
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: prefersReduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* ambient glow (quiet) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 h-28 w-64 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(212,175,55,.06), rgba(212,175,55,0) 70%)",
          }}
        />

        <a
          href="https://matcherino.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Matcherino — payouts & operations"
          className="group max-w-fit"
          title="Matcherino"
        >
          {/* compact, premium card; static clipped highlight (no slide) */}
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur-[2px] shadow-[0_6px_24px_rgba(0,0,0,.34)] transition-all duration-300 ease-out hover:border-[color:var(--gold)]/35 hover:bg-white/[0.03] hover:shadow-[0_10px_30px_rgba(212,175,55,.08)] hover:-translate-y-[1px]">
            {/* subtle highlight fades in */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(120% 160% at 20% 0%, rgba(255,255,255,.06), transparent 60%)",
              }}
            />

            {/* smaller, responsive logo box (autosize across breakpoints) */}
            <div className="relative h-10 md:h-12 w-[160px] sm:w-[180px] md:w-[220px]">
              <Image
                src="/images/logo/matcherino.png"
                alt="Matcherino"
                fill
                className="object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 220px"
                priority={false}
              />
            </div>

            {/* inner hairline ring */}
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5" aria-hidden />
          </div>
        </a>
      </motion.div>
    </section>
  );
}

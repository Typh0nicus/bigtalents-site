"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function TypingEffect({ text }: { text: string }) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? text : "");
  
  useEffect(() => {
    if (prefersReduced) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [text, prefersReduced]);
  
  return <p className="lead mt-6 text-center text-white/90">{display}</p>;
}

function AnimatedChunk({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <span className={highlight ? "text-gradient-vibrant" : ""}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={ch === " " ? "inline-block w-2" : ""}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function ApparelHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* BGT Master Background */}
        <div className="absolute inset-0 bgt-bg-master" />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90" />
        
        {/* Gold gradient glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 600px at 50% 30%, rgba(212,175,55,0.08), transparent 60%),
              radial-gradient(800px 400px at 20% 50%, rgba(255,187,0,0.05), transparent 50%)
            `
          }}
        />
        
        {/* Dotted grid */}
        <div className="absolute inset-0 dotted-grid opacity-30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-6 py-20">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="label-esports text-gold-vibrant text-xs sm:text-sm inline-block">
            Official Merchandise
          </span>
        </motion.div>

        {/* Animated Heading */}
        <motion.h1
          className="h1 font-technopath leading-tight text-center"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.035 } }
          }}
        >
          <AnimatedChunk text="BGT " highlight />
          <AnimatedChunk text="APPAREL" />
        </motion.h1>

        {/* Typing tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <TypingEffect text="Premium esports apparel for champions." />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="#products"
            className="btn btn-primary btn-lg inline-flex items-center gap-2"
          >
            Shop Collection
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </section>
  );
}

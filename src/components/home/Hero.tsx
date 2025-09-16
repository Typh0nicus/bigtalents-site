"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";

// ====== Tuning (performance-friendly) =====================================
const PARTICLE_COUNT = 45; // smooth FPS
const SPEED = 0.014; // just a little faster than before (was 0.012)
// ==========================================================================

// Subtle gold particles (time-based for smoothness) — wrap-around, no edge clustering
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    // keep render away from exact edges
    const MARGIN = 0.035; // 3.5% inset on each side (visual margin)
    const JITTER = 0.10;  // tiny random accel factor
    const CENTER_PULL = 0.08; // gentle pull toward center (prevents long-term drift)

    type P = { x: number; y: number; r: number; dx: number; dy: number };
    const P: P[] = [];

    const resetParticles = () => {
      P.length = 0;
      const count = prefersReduced ? 0 : PARTICLE_COUNT;
      for (let i = 0; i < count; i++) {
        // Uniformly distribute in [0..1]
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 0.6; // base speed (unitless)
        P.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 2 + 0.8,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
        });
      }
    };

    const resize = () => {
      const w = Math.floor(window.innerWidth * DPR);
      const h = Math.floor(window.innerHeight * DPR);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(DPR, DPR);
    };

    const step = (ts: number) => {
      const dt = (ts - last) / 1000; // seconds
      last = ts;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of P) {
        // --- draw (map normalized coords into [margin..1-margin]) ---
        const sx = (MARGIN + (1 - 2 * MARGIN) * p.x) * w;
        const sy = (MARGIN + (1 - 2 * MARGIN) * p.y) * h;

        ctx.beginPath();
        ctx.arc(sx, sy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,175,55,0.30)";
        ctx.fill();

        // --- integrate velocity with tiny jitter + soft center pull ---
        // micro randomness (keeps things organic)
        p.dx += (Math.random() - 0.5) * JITTER * dt;
        p.dy += (Math.random() - 0.5) * JITTER * dt;

        // subtle pull toward center (prevents long-term edge drift)
        p.dx += (0.5 - p.x) * CENTER_PULL * dt;
        p.dy += (0.5 - p.y) * CENTER_PULL * dt;

        // move (time-based; SPEED scales field-wide)
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        // --- wrap-around instead of bounce (torus world) ---
        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;

        // clamp velocity a bit to avoid runaway
        const vmax = 1.2;
        if (p.dx > vmax) p.dx = vmax;
        if (p.dx < -vmax) p.dx = -vmax;
        if (p.dy > vmax) p.dy = vmax;
        if (p.dy < -vmax) p.dy = -vmax;
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    resetParticles();
    last = performance.now();
    raf = requestAnimationFrame(step);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-40 pointer-events-none border-0 outline-none block"
      style={{ border: "none", outline: "none" }}
      aria-hidden
    />
  );
}


// Per-letter animated heading with gold highlight for “Bigger Stages.”
function AnimatedChunk({
  text,
  highlight = false,
}: {
  text: string;
  highlight?: boolean;
}) {
  return (
    <span
      className={
        highlight
          ? "bg-clip-text text-transparent [background-image:linear-gradient(90deg,var(--gold),#ffdf7e)]"
          : ""
      }
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}-${highlight ? "h" : "n"}`}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
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

function AnimatedHeading() {
  return (
    <motion.h1
      className="h1 leading-tight"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.035 } } }}
      aria-label="Big Talents. Bigger Stages."
    >
      <AnimatedChunk text="Big Talents. " />
      <AnimatedChunk text="Bigger Stages." highlight />
    </motion.h1>
  );
}

// Typing effect (respects reduced motion)
function TypingEffect({ text }: { text: string }) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? text : "");

  useEffect(() => {
    if (prefersReduced) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 2; // speed
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [text, prefersReduced]);

  return <p className="lead mt-5 max-w-2xl text-white/90">{display}</p>;
}

// Only arrow cue (no "SCROLL" text)
function ScrollCue() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
      <motion.div
        initial={{ y: 0, opacity: 0.85 }}
        animate={{ y: 6, opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.2 }}
      >
        ▾
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background layers */}
      <Particles />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% -10%, rgba(212,175,55,.18), transparent 60%), radial-gradient(1000px 540px at 90% 5%, rgba(224,184,79,.12), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 py-24 md:py-36">
        {/* Brand tag */}
        <motion.div
          className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-3.5 py-2 text-sm text-white/85 backdrop-blur-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.08 }}
        >
          <img src="/images/logo/bgt-logo.png" alt="BGT" className="h-6 w-auto" />
          <span className="hidden sm:inline">Official Esports Tournaments</span>
          <span className="sm:hidden">Esports Tournaments</span>
        </motion.div>

        {/* Heading */}
        <div className="mt-4">
          <AnimatedHeading />
        </div>

        {/* Subheadline (typing) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <TypingEffect text="Player-first esports tournaments across NA & EU. Clean formats, on-time starts, transparent comms." />
        </motion.div>

        {/* CTAs + socials */}
        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <a
            href="/tournaments"
            className="btn btn-primary rounded-2xl px-6 py-3 text-base md:text-lg transition-all duration-300 ease-in-out hover:scale-[1.07] hover:shadow-[0_0_25px_rgba(212,175,55,.3)] focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50 active:scale-[0.98]"
          >
            View Tournaments
          </a>
          <a
            href="https://discord.gg/bgt?utm_source=site&utm_medium=hero_btn&utm_campaign=join_discord"
            className="btn btn-outline rounded-2xl px-6 py-3 text-base md:text-lg transition-all duration-300 ease-in-out hover:scale-[1.07] hover:bg-[color:var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50 active:scale-[0.98]"
            rel="noopener noreferrer"
          >
            Join Discord
          </a>

          {/* Socials: X + IG only */}
          <div className="ml-1 flex items-center gap-4">
            <a
              href="https://x.com/bgtalents"
              aria-label="Twitter/X"
              className="text-2xl text-white/85 transition-all duration-200 ease-in-out hover:text-[color:var(--gold)] hover:drop-shadow-[0_0_12px_rgba(212,175,55,.35)]"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/bigtalents_org"
              aria-label="Instagram"
              className="text-2xl text-white/85 transition-all duration-200 ease-in-out hover:text-[color:var(--gold)] hover:drop-shadow-[0_0_12px_rgba(212,175,55,.35)]"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll arrow only */}
      <ScrollCue />
    </section>
  );
}

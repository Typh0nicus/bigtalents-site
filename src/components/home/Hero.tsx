"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";

// ====== Tuning (performance-friendly) =====================================
const PARTICLE_COUNT = 45;     // desktop baseline
const PARTICLE_COUNT_MOBILE = 24;
const SPEED = 0.014;           // smooth
const MAX_FPS = 58;            // mild cap to avoid mobile jank
// ==========================================================================

// Subtle gold particles (time-based, wrap-around, no edge clustering)
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
    let lastDraw = 0;
    const FRAME = 1000 / MAX_FPS;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const MARGIN = 0.035; // 3.5% inset per side (visual margin)
    const JITTER = 0.10;  // micro randomness
    const CENTER_PULL = 0.08; // gentle pull to center

    type P = { x: number; y: number; r: number; dx: number; dy: number };
    const P: P[] = [];

    const isMobile = () => window.innerWidth < 640;

    const resetParticles = () => {
      P.length = 0;
      const count = prefersReduced
        ? 0
        : (isMobile() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 0.6;
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
      resetParticles(); // re-balance on screen/orientation changes
    };

    const step = (ts: number) => {
      if (ts - lastDraw < FRAME) {
        raf = requestAnimationFrame(step);
        return;
      }
      const dt = (ts - last) / 1000;
      last = ts;
      lastDraw = ts;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (const p of P) {
        // draw inside inset box (prevents edge clustering)
        const sx = (MARGIN + (1 - 2 * MARGIN) * p.x) * w;
        const sy = (MARGIN + (1 - 2 * MARGIN) * p.y) * h;

        ctx.beginPath();
        ctx.arc(sx, sy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,175,55,0.30)";
        ctx.fill();

        // micro jitter + center pull
        p.dx += (Math.random() - 0.5) * JITTER * dt;
        p.dy += (Math.random() - 0.5) * JITTER * dt;
        p.dx += (0.5 - p.x) * CENTER_PULL * dt;
        p.dy += (0.5 - p.y) * CENTER_PULL * dt;

        // integrate
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        // wrap-around
        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;

        // clamp velocity
        const vmax = 1.2;
        p.dx = Math.max(-vmax, Math.min(vmax, p.dx));
        p.dy = Math.max(-vmax, Math.min(vmax, p.dy));
      }

      raf = requestAnimationFrame(step);
    };

    resize();
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
      className="absolute inset-0 h-full w-full opacity-40 pointer-events-none block"
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
      className="h1 leading-tight max-w-[22ch]"
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
          <Image
            src="/images/logo/bgt-logo.png"
            alt="BGT"
            width={96}
            height={24}
            priority
            className="h-6 w-auto"
          />
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
            aria-label="View Tournaments"
            className={`btn btn-primary rounded-2xl px-6 py-3 text-base md:text-lg h-12 sm:w-auto w-full transition-all duration-300 ease-in-out hover:scale-[1.07] hover:shadow-[0_0_25px_rgba(212,175,55,.3)] focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50 active:scale-[0.98]`}
          >
            View Tournaments
          </a>
          <a
            href="https://discord.gg/bgt?utm_source=site&utm_medium=hero_btn&utm_campaign=join_discord"
            aria-label="Join Big Talents on Discord"
            className={`btn btn-outline rounded-2xl px-6 py-3 text-base md:text-lg h-12 sm:w-auto w-full transition-all duration-300 ease-in-out hover:scale-[1.07] hover:bg-[color:var(--gold)] hover:text-black focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50 active:scale-[0.98]`}
            rel="noopener noreferrer"
          >
            Join Discord
          </a>

          {/* Socials: wraps below on small screens */}
          <div className="sm:ml-1 w-full sm:w-auto flex items-center gap-4">
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

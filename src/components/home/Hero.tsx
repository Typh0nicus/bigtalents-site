"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const PARTICLE_COUNT = 70;
const PARTICLE_COUNT_MOBILE = 35;
const SPEED = 0.025;
const MAX_FPS = 60;
const FRAME_TIME = 1000 / MAX_FPS;
const CONNECTION_DISTANCE = 160;

const HIGHLIGHTS = [
  { label: "Global Expansion", value: "NA 2026", detail: "Planting the BGT flag across continents" },
  { label: "Championship DNA", value: "$7,300+", detail: "Awarded to competitors in our circuit" },
  { label: "Community", value: "10,000+", detail: "Players and fans inside the BGT ecosystem" },
];

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let lastDraw = 0;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    type Particle = {
      x: number; y: number; r: number; dx: number; dy: number;
      opacity: number; pulsePhase: number;
      color: { r: number; g: number; b: number; };
      glowSize: number; maxSpeed: number;
    };

    const particles: Particle[] = [];
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const particleCount = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT;

    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.floor(rect.width * DPR);
      const h = Math.floor(rect.height * DPR);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";
        const c = ctx as CanvasRenderingContext2D & { resetTransform?: () => void };
        if (typeof c.resetTransform === "function") c.resetTransform();
        else c.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(DPR, DPR);
      }
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random();
        const goldVariant = Math.random();
        particles.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 2 + 0.8,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          opacity: Math.random() * 0.6 + 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          color: goldVariant < 0.7
            ? { r: 212, g: 175, b: 55 }
            : goldVariant < 0.9
            ? { r: 255, g: 215, b: 0 }
            : { r: 255, g: 235, b: 120 },
          glowSize: Math.random() * 10 + 6,
          maxSpeed: 1.5
        });
      }
    };

    sizeCanvas();
    initParticles();

    const animate = (ts: number) => {
      if (ts - lastDraw < FRAME_TIME) { raf = requestAnimationFrame(animate); return; }
      const dt = Math.min((ts - last) / 1000, 0.025);
      last = ts; lastDraw = ts;

      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p, i) => {
        p.x += p.dx * dt * SPEED; p.y += p.dy * dt * SPEED;
        const randomForce = 0.3;
        p.dx += (Math.random() - 0.5) * randomForce * dt;
        p.dy += (Math.random() - 0.5) * randomForce * dt;

        const sp = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (sp > p.maxSpeed) { const s = p.maxSpeed / sp; p.dx *= s; p.dy *= s; }
        else if (sp < 0.3) { const a = Math.random() * Math.PI * 2, s = 0.5 + Math.random() * 0.5; p.dx = Math.cos(a) * s; p.dy = Math.sin(a) * s; }

        if (p.x < -0.05) p.x = 1.05; if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05; if (p.y > 1.05) p.y = -0.05;

        p.pulsePhase += dt * 2;
        const pulse = Math.sin(p.pulsePhase) * 0.2 + 0.8;

        if (!isFinite(p.x) || !isFinite(p.y)) { const a = Math.random() * Math.PI * 2; p.x = Math.random(); p.y = Math.random(); p.dx = Math.cos(a); p.dy = Math.sin(a); }

        const x = p.x * w, y = p.y * h;
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

        const radius = p.r * pulse, alpha = p.opacity * pulse * 0.8;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.glowSize * pulse);
        glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.3})`);
        glow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(x, y, p.glowSize * pulse, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill();

        const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
        core.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        core.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath(); ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2); ctx.fillStyle = core; ctx.fill();

        ctx.beginPath(); ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, alpha * 1.3)})`; ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j], dx = (p2.x - p.x) * w, dy = (p2.y - p.y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const la = (1 - dist / CONNECTION_DISTANCE) * 0.15 * pulse;
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(212,175,55, ${la * 0.6})`; ctx.lineWidth = 1.2; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(255,215,0, ${la})`; ctx.lineWidth = 0.4; ctx.stroke();
          }
        }
      });

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    const onResize = () => sizeCanvas();
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [prefersReduced]);

  if (prefersReduced) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.55] pointer-events-none" aria-hidden />;
}

function AnimatedChunk({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <span className={highlight ? "bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#ffdf7e]" : ""}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
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
      className="h1 leading-tight text-center select-none tracking-wide"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.035 } } }}
      aria-label="Big Talents. Bigger Stages."
    >
      <AnimatedChunk text="Big Talents. " />
      <br />
      <AnimatedChunk text="Bigger Stages." highlight />
    </motion.h1>
  );
}

function TypingEffect({ text }: { text: string }) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? text : "");
  useEffect(() => {
    if (prefersReduced) return;
    let i = 0; const timer = setInterval(() => { i += 2; setDisplay(text.slice(0, i)); if (i >= text.length) clearInterval(timer); }, 18);
    return () => clearInterval(timer);
  }, [text, prefersReduced]);
  return <p className="lead mt-6 text-center text-white/90 select-none">{display}</p>;
}

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  return (
    <motion.div style={{ opacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 select-none">
      <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">Scroll to explore</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>
    </motion.div>
  );
}

const SOCIALS = [
  { icon: FaDiscord, href: "https://discord.gg/bgt", label: "Discord", color: "hover:text-indigo-400", bg: "hover:bg-indigo-500/10" },
  { icon: FaTwitter, href: "https://x.com/bgtalents", label: "Twitter", color: "hover:text-blue-400", bg: "hover:bg-blue-500/10" },
  { icon: FaInstagram, href: "https://instagram.com/bigtalents_org", label: "Instagram", color: "hover:text-pink-400", bg: "hover:bg-pink-500/10" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section ref={containerRef} style={{ y, opacity }} className="relative min-h-screen flex items-center justify-center select-none overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* BGT Master Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/background/bgt-master-bg.png')`,
          }}
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/55 to-black/85" />

        {/* Premium gold glows and map inspired wash */}
        <div className="absolute inset-0 brand-ornament" />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 75% 18%, rgba(255, 196, 86, 0.09), transparent 55%), radial-gradient(900px 520px at 15% 12%, rgba(255, 221, 130, 0.07), transparent 50%)",
          }}
        />

        {/* Leaf-like filigree to match art direction */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffcf6a' stroke-width='1.4' stroke-opacity='0.35'%3E%3Cpath d='M20 88c14-14 32-14 46 0m12-50c8-8 22-8 30 0'/%3E%3Cpath d='M68 30c-4 12-1 24 9 34 10 10 22 13 34 9' stroke-linecap='round'/%3E%3Cpath d='M12 54c10 0 18-4 24-10s10-14 10-24' stroke-linecap='round'/%3E%3Ccircle cx='48' cy='98' r='2.6'/%3E%3Ccircle cx='104' cy='34' r='2.6'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "240px 240px",
          }}
        />

        {/* Particles on top */}
        <Particles />

        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.01] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Crest / badge on the right for large screens */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex absolute right-12 top-24 z-20"
      >
        <div className="glass-panel rounded-3xl px-6 py-6 flex flex-col items-center gap-4 border border-[#D4AF37]/30 shadow-2xl">
          <div className="relative w-24 h-24">
            <Image src="/images/logo/bgt-logo.png" alt="Big Talents crest" fill className="object-contain" sizes="96px" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFD700]/10 via-transparent to-transparent blur-xl" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs uppercase tracking-[0.25em] text-white/60">Premier Org</p>
            <p className="text-lg font-bold bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
              Big Talents™
            </p>
            <p className="text-sm text-white/60">Elite rosters • Creator empire</p>
          </div>
        </div>
      </motion.div>

      <div className="container relative z-10 text-center max-w-5xl px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="inline-flex items-center gap-3 rounded-full px-4 py-2 glass-panel border border-[#FFD700]/20 text-xs uppercase tracking-[0.2em] text-white/70"
        >
          <span className="inline-flex h-2 w-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFBB00] shadow-[0_0_0_6px_rgba(255,215,0,0.15)]" />
          <span>Global Offensive</span>
          <span className="text-[#FFD700] font-semibold">Coming to NA • 2026</span>
        </motion.div>

        <AnimatedHeading />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.35 }}>
          <TypingEffect text="Think Big, Play Bigger. Premium esports, creator-first." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.45 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/club" className="btn btn-primary btn-lg shadow-xl">
            Join the Club
          </Link>
          <Link href="/rosters" className="btn btn-outline btn-lg border-[#FFD700]/50">
            Meet the Roster
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          {SOCIALS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex aspect-square h-12 w-12 items-center justify-center leading-none rounded-xl p-0 transition-all duration-300 bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-[#D4AF37]/30 ${s.color} ${s.bg}`}
                style={{
                  boxShadow: 'none',
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
                aria-label={s.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="glass-panel rounded-2xl px-5 py-4 text-left border border-[#FFD700]/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">{item.label}</p>
              <p className="text-2xl font-black mt-2 bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                {item.value}
              </p>
              <p className="text-sm text-white/70 mt-1 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
}

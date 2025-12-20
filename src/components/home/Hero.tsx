"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { GridOverlay } from "@/components/ui/GridOverlay";

const PARTICLE_COUNT = 70;
const PARTICLE_COUNT_MOBILE = 35;
const SPEED = 0.025;
const MAX_FPS = 60;
const FRAME_TIME = 1000 / MAX_FPS;
const CONNECTION_DISTANCE = 160;

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
    <span className={highlight ? "bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent" : ""}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          variants={{ hidden: { opacity: 0, y: 14, filter: "blur(8px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={ch === " " ? "inline-block w-2" : ""}
          style={{ WebkitTextFillColor: highlight ? "transparent" : undefined }}
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
      className="h1 leading-tight text-center select-none"
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
    <motion.section ref={containerRef} style={{ y, opacity }} className="relative min-h-screen flex items-center justify-center select-none">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 800px at 15% -10%, rgba(212,175,55,0.08), transparent 50%),
              radial-gradient(1200px 600px at 85% 10%, rgba(224,184,79,0.05), transparent 50%),
              radial-gradient(800px 600px at 50% 100%, rgba(212,175,55,0.03), transparent 50%)
            `
          }}
        />
        <Particles />
        
        {/* Subtle grid overlay with fade at top for navbar */}
        <div className="absolute inset-0">
          <GridOverlay opacity={0.025} size={28} />
          {/* Very subtle fade at top to acknowledge navbar - smooth gradient to zero */}
          <div 
            className="absolute inset-x-0 top-0 h-48 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.12) 30%, rgba(0,0,0,0.04) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
        </div>
        
        <div
          className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="container relative z-10 text-center max-w-4xl px-6 pb-6">
        <AnimatedHeading />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.3 }}>
          <TypingEffect text="Think Big, Play Bigger." />
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
                className={`inline-flex aspect-square h-12 w-12 items-center justify-center leading-none rounded-xl p-0 ${s.color} ${s.bg} bg-white/5 transition-all duration-300 hover:shadow-lg backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20`}
                aria-label={s.label}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
}

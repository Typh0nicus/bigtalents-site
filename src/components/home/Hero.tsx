"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { FiArrowDown, FiPlay } from "react-icons/fi";

// Optimized constants
const PARTICLE_COUNT = 70;
const PARTICLE_COUNT_MOBILE = 35;
const SPEED = 0.025;
const MAX_FPS = 60;
const FRAME_TIME = 1000 / MAX_FPS;
const CONNECTION_DISTANCE = 160;

// [PARTICLE SYSTEM CODE - KEEPING AS IS SINCE IT'S GOAT STATUS]
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
      if (ts - lastDraw < FRAME_TIME) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((ts - last) / 1000, 0.025);
      last = ts;
      lastDraw = ts;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p, i) => {
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        const randomForce = 0.3;
        p.dx += (Math.random() - 0.5) * randomForce * dt;
        p.dy += (Math.random() - 0.5) * randomForce * dt;

        const currentSpeed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (currentSpeed > p.maxSpeed) {
          const scale = p.maxSpeed / currentSpeed;
          p.dx *= scale;
          p.dy *= scale;
        } else if (currentSpeed < 0.3) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 0.5;
          p.dx = Math.cos(angle) * speed;
          p.dy = Math.sin(angle) * speed;
        }

        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        p.pulsePhase += dt * 2;
        const pulse = Math.sin(p.pulsePhase) * 0.2 + 0.8;

        if (!isFinite(p.x) || !isFinite(p.y)) {
          const angle = Math.random() * Math.PI * 2;
          p.x = Math.random();
          p.y = Math.random();
          p.dx = Math.cos(angle);
          p.dy = Math.sin(angle);
        }

        const x = p.x * w;
        const y = p.y * h;
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

        const radius = p.r * pulse;
        const alpha = p.opacity * pulse * 0.8;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.glowSize * pulse);
        glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.3})`);
        glow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(x, y, p.glowSize * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
        core.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        core.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, alpha * 1.3)})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = (p2.x - p.x) * w;
          const dy = (p2.y - p.y) * h;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < CONNECTION_DISTANCE) {
            const lineAlpha = (1 - distance / CONNECTION_DISTANCE) * 0.15 * pulse;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha * 0.6})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(255, 215, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });

      ctx.globalCompositeOperation = 'source-over';
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    const handleResize = () => sizeCanvas();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-55 pointer-events-none"
      aria-hidden
    />
  );
}

// Improved animated text components
function AnimatedChunk({ text, highlight = false }: { text: string; highlight?: boolean; }) {
  return (
    <span className={highlight ? "bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#ffdf7e]" : ""}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
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
    let i = 0;
    const timer = setInterval(() => {
      i += 2;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, [text, prefersReduced]);

  return <p className="lead mt-6 text-center text-white/90 select-none">{display}</p>;
}

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 select-none"
    >
      <span className="text-xs font-medium tracking-wide">SCROLL TO EXPLORE</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="p-2 border border-white/20 rounded-full hover:border-[#D4AF37]/50 transition-colors duration-300"
      >
        <FiArrowDown size={16} />
      </motion.div>
    </motion.div>
  );
}

const SOCIALS = [
  { icon: FaDiscord, href: "https://discord.gg/bgt", label: "Discord", color: "hover:text-indigo-400", bg: "hover:bg-indigo-500/10" },
  { icon: FaTwitter, href: "https://x.com/bgtalents", label: "Twitter", color: "hover:text-blue-400", bg: "hover:bg-blue-500/10" },
  { icon: FaInstagram, href: "https://instagram.com/bigtalents_org", label: "Instagram", color: "hover:text-pink-400", bg: "hover:bg-pink-500/10" }
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden select-none"
    >
      <div className="absolute inset-0">
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
        
        <div 
          className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      <div className="container relative z-10 text-center max-w-4xl px-6">
        <AnimatedHeading />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <TypingEffect text="Player-first esports community across NA & EU." />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 mb-12"
        >
          <motion.a
            href="/tournaments"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,.4)" }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary rounded-2xl px-8 py-4 text-lg shadow-2xl inline-flex items-center gap-2 group/btn backdrop-blur-sm"
          >
            <FiPlay className="group-hover/btn:scale-110 transition-transform duration-200" />
            View Tournaments
          </motion.a>
          
          <motion.a
            href="https://discord.gg/bgt"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline rounded-2xl px-8 py-4 text-lg hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Discord
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          {SOCIALS.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 bg-white/5 rounded-xl transition-all duration-300 ${social.color} ${social.bg} hover:shadow-lg backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20`}
                aria-label={social.label}
              >
                <IconComponent size={20} />
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <ScrollIndicator />
    </motion.section>
  );
}

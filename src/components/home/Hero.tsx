"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";
import { FiArrowDown, FiPlay } from "react-icons/fi";

// Fast vector particle system
const PARTICLE_COUNT = 70;
const PARTICLE_COUNT_MOBILE = 35;
const SPEED = 0.025; // Faster movement
const MAX_FPS = 60;

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let lastDraw = 0;
    const FRAME = 1000 / MAX_FPS;
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    type Particle = { 
      x: number; 
      y: number; 
      r: number; 
      dx: number; 
      dy: number; 
      opacity: number;
      pulsePhase: number;
      color: { r: number; g: number; b: number; };
      glowSize: number;
      maxSpeed: number;
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
        const speed = 0.5 + Math.random() * 1.0; // Faster initial speed
        const goldVariant = Math.random();
        
        particles.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 2.0 + 0.8,
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
          maxSpeed: 1.5 // Higher speed limit for faster movement
        });
      }
    };

    sizeCanvas();
    initParticles();

    const animate = (ts: number) => {
      if (ts - lastDraw < FRAME) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((ts - last) / 1000, 0.025);
      last = ts;
      lastDraw = ts;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Clean clear
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);
      
      ctx.globalCompositeOperation = 'lighter';

      particles.forEach((p, i) => {
        // Fast random movement - no center attraction
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        // Random directional changes for organic movement
        const randomForce = 0.3; // Strong random forces
        p.dx += (Math.random() - 0.5) * randomForce * dt;
        p.dy += (Math.random() - 0.5) * randomForce * dt;

        // Speed regulation - maintain fast movement
        const currentSpeed = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (currentSpeed > p.maxSpeed) {
          const scale = p.maxSpeed / currentSpeed;
          p.dx *= scale;
          p.dy *= scale;
        } else if (currentSpeed < 0.3) {
          // Boost slow particles
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 0.5;
          p.dx = Math.cos(angle) * speed;
          p.dy = Math.sin(angle) * speed;
        }

        // Edge wrapping
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        // Pulse
        p.pulsePhase += dt * 2.0;
        const pulse = Math.sin(p.pulsePhase) * 0.2 + 0.8;

        // Safety check
        if (!isFinite(p.x) || !isFinite(p.y) || !isFinite(p.dx) || !isFinite(p.dy)) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 1.0;
          p.x = Math.random();
          p.y = Math.random();
          p.dx = Math.cos(angle) * speed;
          p.dy = Math.sin(angle) * speed;
        }

        // Draw particle
        const x = p.x * w;
        const y = p.y * h;
        const radius = p.r * pulse;
        const alpha = p.opacity * pulse * 0.8;
        const glowAlpha = alpha * 0.3;

        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

        // Outer glow
        const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, p.glowSize * pulse);
        outerGlow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${glowAlpha})`);
        outerGlow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${glowAlpha * 0.5})`);
        outerGlow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(x, y, p.glowSize * pulse, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Core
        const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
        coreGradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        coreGradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.9, alpha * 1.3)})`;
        ctx.fill();

        // More connected vector lines - like a network
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = (p2.x - p.x) * w;
          const dy = (p2.y - p.y) * h;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 160) { // Larger connection range for more vectors
            const lineAlpha = (1 - distance / 160) * 0.15 * pulse;
            
            // Vector connection lines
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(212, 175, 55, ${lineAlpha * 0.6})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            
            // Bright core line
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

    const handleResize = () => {
      sizeCanvas();
    };

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

// Fixed AnimatedChunk component
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
      className="h1 leading-tight text-center"
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

  return <p className="lead mt-6 text-center text-white/90">{display}</p>;
}

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
    >
      <span className="text-xs font-medium tracking-wide">SCROLL TO EXPLORE</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="p-2 border border-white/20 rounded-full"
      >
        <FiArrowDown size={16} />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
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

      <div className="container relative z-10 text-center max-w-4xl">
        <div>
          <AnimatedHeading />
        </div>

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
            whileHover={{ scale: 1.07, boxShadow: "0 0 25px rgba(212,175,55,.3)" }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-primary rounded-2xl px-8 py-4 text-lg shadow-2xl focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50 inline-flex items-center gap-2"
          >
            <FiPlay />
            View Tournaments
          </motion.a>
          
          <motion.a
            href="https://discord.gg/bgt"
            whileHover={{ scale: 1.07, backgroundColor: "var(--gold)", color: "black" }}
            whileTap={{ scale: 0.98 }}
            className="btn btn-outline rounded-2xl px-8 py-4 text-lg focus-visible:outline-none focus-visible:ring focus-visible:ring-[color:var(--gold)]/50"
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
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: FaDiscord, href: "https://discord.gg/bgt", label: "Discord", color: "hover:text-indigo-400" },
            { icon: FaTwitter, href: "https://x.com/bgtalents", label: "Twitter", color: "hover:text-blue-400" },
            { icon: FaInstagram, href: "https://instagram.com/bigtalents_org", label: "Instagram", color: "hover:text-pink-400" }
          ].map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 bg-white/5 rounded-xl transition-all duration-200 ${social.color} hover:bg-white/10`}
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

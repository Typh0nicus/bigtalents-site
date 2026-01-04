"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const PARTICLE_COUNT = 50;
const PARTICLE_COUNT_MOBILE = 25;
const SPEED = 0.02;
const MAX_FPS = 60;
const FRAME_TIME = 1000 / MAX_FPS;
const MAX_DELTA_TIME = 0.025; // Cap delta time at 25ms to prevent large jumps

export function GoldParticles() {
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
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      opacity: number;
      pulsePhase: number;
      color: { r: number; g: number; b: number };
      glowSize: number;
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
        const speed = 0.4 + Math.random() * 0.6;
        const goldVariant = Math.random();
        particles.push({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.5 + 0.6,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          opacity: Math.random() * 0.5 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          color:
            goldVariant < 0.6
              ? { r: 212, g: 175, b: 55 } // Classic gold
              : goldVariant < 0.85
              ? { r: 255, g: 215, b: 0 } // Bright gold
              : { r: 255, g: 187, b: 0 }, // Vibrant gold
          glowSize: Math.random() * 8 + 5,
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
      const dt = Math.min((ts - last) / 1000, MAX_DELTA_TIME);
      last = ts;
      lastDraw = ts;

      const w = canvas.clientWidth,
        h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        // Wrap around edges
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        p.pulsePhase += dt * 1.5;
        const pulse = Math.sin(p.pulsePhase) * 0.15 + 0.85;

        const x = p.x * w,
          y = p.y * h;
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

        const radius = p.r * pulse,
          alpha = p.opacity * pulse * 0.7;

        // Glow
        const glow = ctx.createRadialGradient(x, y, 0, x, y, p.glowSize * pulse);
        glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.25})`);
        glow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.1})`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, p.glowSize * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
        core.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
        core.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.8, alpha * 1.2)})`;
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    const onResize = () => sizeCanvas();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}

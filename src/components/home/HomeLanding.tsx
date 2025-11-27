"use client";

import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTwitch,
  FaTiktok,
  FaPlay,
} from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowRight,
  FiExternalLink,
} from "react-icons/fi";

import { NEWS, type NewsItem } from "@/data/news";
import type { ScoredContent } from "@/lib/featuredAlgorithm";

/* -------------------------------------------------------------------------- */
/*                               GLOBAL BACKDROP                              */
/* -------------------------------------------------------------------------- */

const PARTICLE_COUNT = 70;
const PARTICLE_COUNT_MOBILE = 35;
const SPEED = 0.025;
const MAX_FPS = 60;
const FRAME_TIME = 1000 / MAX_FPS;
const CONNECTION_DISTANCE = 160;

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

function GlobalParticles() {
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
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        const c = ctx as CanvasRenderingContext2D & {
          resetTransform?: () => void;
        };
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
          color:
            goldVariant < 0.7
              ? { r: 212, g: 175, b: 55 } // #D4AF37
              : goldVariant < 0.9
              ? { r: 255, g: 215, b: 0 } // #FFD700
              : { r: 255, g: 235, b: 120 },
          glowSize: Math.random() * 10 + 6,
          maxSpeed: 1.5,
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
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p, i) => {
        p.x += p.dx * dt * SPEED;
        p.y += p.dy * dt * SPEED;

        const randomForce = 0.3;
        p.dx += (Math.random() - 0.5) * randomForce * dt;
        p.dy += (Math.random() - 0.5) * randomForce * dt;

        const sp = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
        if (sp > p.maxSpeed) {
          const s = p.maxSpeed / sp;
          p.dx *= s;
          p.dy *= s;
        } else if (sp < 0.3) {
          const a = Math.random() * Math.PI * 2;
          const s = 0.5 + Math.random() * 0.5;
          p.dx = Math.cos(a) * s;
          p.dy = Math.sin(a) * s;
        }

        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        p.pulsePhase += dt * 2;
        const pulse = Math.sin(p.pulsePhase) * 0.2 + 0.8;

        if (!isFinite(p.x) || !isFinite(p.y)) {
          const a = Math.random() * Math.PI * 2;
          p.x = Math.random();
          p.y = Math.random();
          p.dx = Math.cos(a);
          p.dy = Math.sin(a);
        }

        const x = p.x * w;
        const y = p.y * h;
        if (x < -50 || x > w + 50 || y < -50 || y > h + 50) return;

        const radius = p.r * pulse;
        const alpha = p.opacity * pulse * 0.8;

        const glow = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          p.glowSize * pulse
        );
        glow.addColorStop(
          0,
          `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${
            alpha * 0.3
          })`
        );
        glow.addColorStop(
          0.4,
          `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${
            alpha * 0.15
          })`
        );
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, p.glowSize * pulse, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        const core = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius * 1.8
        );
        core.addColorStop(
          0,
          `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`
        );
        core.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(
          0.9,
          alpha * 1.3
        )})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = (p2.x - p.x) * w;
          const dy = (p2.y - p.y) * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const la = (1 - dist / CONNECTION_DISTANCE) * 0.15 * pulse;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(212,175,55, ${la * 0.6})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.strokeStyle = `rgba(255,215,0, ${la})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
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
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.45]"
      aria-hidden
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO HELPERS                                */
/* -------------------------------------------------------------------------- */

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
          ? "bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#ffdf7e] bg-clip-text text-transparent"
          : ""
      }
    >
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

  return (
    <p className="lead mt-6 text-center text-white/90 select-none">
      {display}
    </p>
  );
}

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 select-none"
    >
      <span className="text-xs font-medium tracking-wide">
        SCROLL TO EXPLORE
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="rounded-full border border-white/20 p-2 transition-colors duration-300"
      >
        <FiArrowDown size={16} />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                HERO SECTION                                */
/* -------------------------------------------------------------------------- */

const SOCIALS = [
  {
    icon: FaDiscord,
    href: "https://discord.gg/bgt",
    label: "Discord",
    color: "hover:text-indigo-400",
    bg: "hover:bg-indigo-500/10",
  },
  {
    icon: FaTwitter,
    href: "https://x.com/bgtalents",
    label: "Twitter",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-500/10",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com/bigtalents_org",
    label: "Instagram",
    color: "hover:text-pink-400",
    bg: "hover:bg-pink-500/10",
  },
];

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ y, opacity }}
      className="relative flex min-h-[100svh] items-center justify-center select-none"
    >
      {/* subtle extra fade at bottom so hero melts into News */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#020617]/60 to-[#020617]" />

      <div className="container relative z-10 max-w-4xl px-6 pb-6 text-center">
        <AnimatedHeading />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <TypingEffect text="Think Big, Play Bigger." />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4"
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
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 p-0 leading-none ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:ring-white/20 ${s.color} ${s.bg}`}
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

/* -------------------------------------------------------------------------- */
/*                              NEWS / UTILITIES                              */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildSummary(item: NewsItem): string | null {
  if (item.excerpt && item.excerpt.trim().length > 0) {
    return item.excerpt.trim();
  }

  if (item.content) {
    const plain = item.content
      .replace(/[#>*`]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!plain) return null;
    if (plain.length <= 160) return plain;
    return plain.slice(0, 157) + "…";
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*                               HOME NEWS SECTION                            */
/* -------------------------------------------------------------------------- */

function NewsCard({ item, priority }: { item: NewsItem; priority?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryTag = item.tags?.[0] ?? "Update";
  const summary = buildSummary(item);
  const imageSrc = item.image ?? "/images/news/news-placeholder.webp";

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.article
        className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] transition"
        animate={isHovered ? { y: -8, scale: 1.01 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority={priority}
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="shine"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-[60%] bg-white/35"
                  style={{
                    transform: "skewX(-18deg)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">
              {primaryTag}
            </span>
            <span className="rounded-full bg-black/60 px-2 py-1 font-medium text-white/70">
              {formatDate(item.date)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-5 pb-4">
          <h3 className="text-base font-semibold text-white line-clamp-2 transition-colors duration-150 group-hover:text-[#FFD700] sm:text-lg">
            {item.title}
          </h3>

          {summary && (
            <p className="text-xs text-white/70 line-clamp-2 sm:text-sm">
              {summary}
            </p>
          )}

          <div className="mt-2 flex items-center gap-1.5 text-[#FFD700] opacity-85 transition group-hover:opacity-100">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
              Read Story
            </span>
            <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function HomeNewsSection() {
  const latestNews: NewsItem[] = [...NEWS]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 2);

  if (!latestNews.length) return null;

  return (
    <section className="relative select-none pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-7 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
              <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Featured News
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/70 md:text-base">
              The latest stories from our roster, events, and the
              Big Talents project.
            </p>
          </div>

          <div className="flex md:justify-end">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-[color:var(--gold)] md:text-sm"
            >
              <span>View all news</span>
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {latestNews.map((item, idx) => (
            <NewsCard
              key={item.slug}
              item={item}
              priority={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                          FEATURED CONTENT SECTION                          */
/* -------------------------------------------------------------------------- */

const MICRO_PARTICLE_POSITIONS = Array.from(
  { length: 14 },
  (_, i) => ({
    left: 8 + ((i % 7) * 13),
    top: 10 + Math.floor(i / 7) * 35,
  })
);

type Video = ScoredContent;

function FeaturedVideoCard({
  video,
  mounted,
}: {
  video: Video;
  mounted: boolean;
}) {
  const [hover, setHover] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });
  const springY = useSpring(rawY, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  const translateX = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const scale = useTransform(springX, [-0.5, 0.5], [1.03, 1.03]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const platformIcon =
    video.platform === "youtube" ? (
      <FaYoutube className="text-red-500" />
    ) : video.platform === "twitch" ? (
      <FaTwitch className="text-purple-500" />
    ) : (
      <FaTiktok className="text-white" />
    );

  const contentTypeLabel =
    video.contentType === "youtube_video"
      ? "Video"
      : video.contentType === "youtube_short"
      ? "Short"
      : video.contentType === "twitch_stream"
      ? "Stream"
      : video.contentType === "twitch_clip"
      ? "Clip"
      : video.contentType === "tiktok_video"
      ? "Video"
      : "Live";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => mounted && setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rawX.set(0);
        rawY.set(0);
      }}
      className="group block"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl shadow-black/20 backdrop-blur-xl md:rounded-3xl md:shadow-2xl"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={imageRef}
          className="relative aspect-video overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <motion.div
            style={{ x: translateX, y: translateY, scale }}
            transition={{ type: "tween", duration: 0.25 }}
            className="h-full w-full"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <AnimatePresence>
            {hover && mounted && (
              <motion.div
                key="shine"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-[60%] bg-white/35"
                  style={{
                    transform: "skewX(-18deg)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-2.5 py-1 text-xs md:left-4 md:top-4 md:gap-2 md:px-3 md:py-1.5">
            <span className="text-base md:text-xl">{platformIcon}</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/70 md:text-[11px] md:tracking-[0.16em]">
              {contentTypeLabel}
            </span>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={hover && mounted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              animate={hover && mounted ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] shadow-[0_0_40px_rgba(212,175,55,0.55)] md:h-20 md:w-20 lg:h-24 lg:w-24"
            >
              <FaPlay className="ml-0.5 text-xl text-black md:ml-1 md:text-2xl lg:text-3xl" />
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4 sm:p-5 md:p-6 lg:p-7">
          <div className="flex items-start gap-2 md:gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-base font-bold text-white line-clamp-2 transition-colors duration-200 group-hover:text-[#FFD700] sm:text-lg md:mb-1.5 md:text-xl lg:text-2xl">
                {video.title}
              </h3>
              <p className="text-xs text-white/65 sm:text-sm">
                {video.creatorName}
              </p>
            </div>
            <FiExternalLink className="mt-0.5 flex-shrink-0 text-white/40 transition-colors group-hover:text-[#FFD700] md:mt-1" />
          </div>
          <div className="mt-2 flex items-center gap-2 md:mt-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#FFD700]/60 sm:text-xs">
              {video.creatorTier}
            </span>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

function SecondaryVideoCard({
  video,
  index,
  mounted,
}: {
  video: Video;
  index: number;
  mounted: boolean;
}) {
  const [hover, setHover] = useState(false);

  const platformIcon =
    video.platform === "youtube" ? (
      <FaYoutube className="text-xs text-red-500" />
    ) : video.platform === "twitch" ? (
      <FaTwitch className="text-xs text-purple-500" />
    ) : (
      <FaTiktok className="text-xs text-white" />
    );

  const contentTypeLabel =
    video.contentType === "youtube_video"
      ? "Video"
      : video.contentType === "youtube_short"
      ? "Short"
      : video.contentType === "twitch_stream"
      ? "Stream"
      : video.contentType === "twitch_clip"
      ? "Clip"
      : video.contentType === "tiktok_video"
      ? "Video"
      : "Live";

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => mounted && setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{
          duration: 0.5,
          delay: 0.15 + index * 0.08,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -4 }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-md shadow-black/40 backdrop-blur-xl md:rounded-2xl"
      >
        <div className="flex gap-2.5 sm:gap-3">
          <div className="relative aspect-video w-28 shrink-0 overflow-hidden sm:w-32 md:w-40">
            <motion.div
              animate={hover ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="pointer-events-none absolute left-1.5 top-1.5 inline-flex items-center justify-center rounded-full bg-black/70 px-1.5 py-0.5 md:left-2 md:top-2 md:px-2 md:py-1">
              {platformIcon}
            </div>
            {hover && (
              <motion.div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FFD700] md:h-8 md:w-8">
                  <FaPlay className="ml-0.5 text-[10px] text-black md:text-xs" />
                </div>
              </motion.div>
            )}
          </div>

          <div className="min-w-0 flex-1 py-2.5 pr-3 sm:py-3 sm:pr-4">
            <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40 sm:text-[10px] md:mb-1 md:text-[11px] md:tracking-[0.16em]">
              {contentTypeLabel}
            </p>
            <h4 className="text-xs font-semibold text-white line-clamp-2 transition-colors duration-200 group-hover:text-[#FFD700] sm:text-sm md:text-base">
              {video.title}
            </h4>
            <p className="mt-0.5 text-[10px] text-white/60 line-clamp-1 sm:text-xs md:mt-1">
              {video.creatorName}
            </p>
          </div>
        </div>
      </motion.div>
    </a>
  );
}

function FeaturedContentSection({
  content,
}: {
  content: ScoredContent[];
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!content.length) return null;

  const featured = content[0];
  const others = content.slice(1);

  return (
    <section
      ref={sectionRef}
      className="relative select-none py-10 md:py-14 lg:py-20"
    >
      {/* tiny micro-particles just in this band (kept subtle) */}
      {mounted && (
        <div className="pointer-events-none absolute inset-0 opacity-20">
          {MICRO_PARTICLE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-px rounded-full bg-[#D4AF37]"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              animate={{
                y: [0, -24, 0],
                opacity: [0.15, 0.6, 0.15],
              }}
              transition={{
                duration: 3.5 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}

      <div className="container relative z-10 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-8 lg:mb-10"
        >
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
              Featured Content
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-5 pb-[1px] md:gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1.2fr)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.97, y: 20 }
            }
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <FeaturedVideoCard video={featured} mounted={mounted} />
          </motion.div>

          {others.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }
              }
              transition={{
                duration: 0.7,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="space-y-3 md:space-y-4"
            >
              {others.slice(0, 3).map((video, index) => (
                <SecondaryVideoCard
                  key={video.id}
                  video={video}
                  index={index}
                  mounted={mounted}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                              EXPORTED WRAPPER                              */
/* -------------------------------------------------------------------------- */

export function HomeLanding({
  featuredContent,
}: {
  featuredContent: ScoredContent[];
}) {
  return (
    <main className="relative overflow-hidden bg-[#020617] text-white">
      {/* One continuous background across the whole home area */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 800px at 15% -10%, rgba(212,175,55,0.09), transparent 55%),
              radial-gradient(1200px 700px at 85% 0%, rgba(224,184,79,0.06), transparent 55%),
              radial-gradient(900px 700px at 50% 120%, rgba(212,175,55,0.03), transparent 70%)
            `,
          }}
        />
        <GlobalParticles />
        <div
          className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
          style={{ backgroundImage: `url("${NOISE_SVG}")` }}
        />
      </div>

      <HeroSection />
      <HomeNewsSection />
      <FeaturedContentSection content={featuredContent} />
    </main>
  );
}

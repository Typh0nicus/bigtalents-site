"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const SOCIALS = [
  {
    icon: FaTwitter,
    href: "https://x.com/bgtalents",
    label: "Twitter",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-500/10",
  },
  {
    icon: FaDiscord,
    href: "https://discord.gg/bgt",
    label: "Discord",
    color: "hover:text-indigo-400",
    bg: "hover:bg-indigo-500/10",
  },
];

export function ComingSoonHero() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12 md:py-16 min-h-screen">
      {/* 2026 watermark behind Santa */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-black text-white/[0.02] select-none block"
          style={{ lineHeight: 1 }}
        >
          2026
        </motion.span>
      </div>

      {/* Santa figure with gold aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 md:mb-12 z-10"
      >
        {/* Gold radial glow behind Santa */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, rgba(255,215,0,0.08) 40%, transparent 70%)",
            filter: "blur(40px)",
            transform: "scale(1.5)",
          }}
        />

        {/* Breathing/floating animation */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-48 h-72 sm:w-56 sm:h-80 md:w-64 md:h-96"
        >
          <Image
            src="/images/players/coming-soon/santa-silhouette.svg"
            alt="Mystery figure"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center max-w-4xl z-10"
      >
        <h1 className="h1 mb-4 md:mb-6">
          <span className="block text-white">NEW ROSTER</span>
          <span className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#ffdf7e] bg-clip-text text-transparent">
            INCOMING
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lead text-white/70 max-w-2xl mx-auto mb-8 md:mb-12"
        >
          Three elite players. One legendary team. The reveal is coming.
        </motion.p>

        {/* Follow for the reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 md:mt-12"
        >
          <p className="text-white/70 uppercase tracking-wider font-bold text-sm mb-6">
            Follow for the reveal
          </p>

          {/* Social buttons */}
          <div className="flex items-center justify-center gap-4">
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
                  className={`inline-flex aspect-square h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-[#D4AF37]/30 ${s.color} ${s.bg}`}
                  style={{
                    boxShadow: "none",
                    transition: "all 0.3s ease-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(212,175,55,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  aria-label={s.label}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

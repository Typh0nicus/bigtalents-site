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
      {/* 2026 watermark behind Santa with stroke */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-black select-none block"
          style={{ 
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "2px rgba(212,175,55,0.15)",
            mixBlendMode: "overlay",
          }}
        >
          2026
        </motion.span>
      </div>

      {/* Santa figure with enhanced fog and positioning */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-16 md:mb-20 z-10"
      >
        {/* Enhanced gold radial glow behind Santa */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(circle at center, rgba(212,175,55,0.2) 0%, rgba(255,215,0,0.12) 35%, rgba(212,175,55,0.06) 60%, transparent 80%)",
            filter: "blur(60px)",
            transform: "scale(1.8)",
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
          className="relative w-80 h-[28rem] sm:w-96 sm:h-[32rem] md:w-[30rem] md:h-[36rem] lg:w-[32rem] lg:h-[40rem]"
        >
          <Image
            src="/images/players/coming-soon/santa-silhouette.png"
            alt="Mystery figure"
            fill
            className="object-contain object-top drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            priority
          />
          
          {/* Extended atmospheric fog layers for proper fadeout */}
          {/* Base fog layer - extends beyond image */}
          <div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: "150%",
              height: "60%",
              background: "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.85) 25%, rgba(10,10,10,0.6) 45%, rgba(10,10,10,0.3) 65%, transparent 90%)",
              filter: "blur(40px)",
              zIndex: 1,
            }}
          />
          {/* Secondary mist layer */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "45%",
              background: "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.7) 30%, rgba(10,10,10,0.4) 55%, transparent 80%)",
              filter: "blur(25px)",
              zIndex: 2,
            }}
          />
          {/* Top smooth gradient for natural blend */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "35%",
              background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 35%, rgba(10,10,10,0.2) 65%, transparent 100%)",
              filter: "blur(12px)",
              zIndex: 3,
            }}
          />
          {/* Additional fadeout on Santa's lower end */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "25%",
              background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 30%, rgba(10,10,10,0.3) 60%, transparent 100%)",
              filter: "blur(8px)",
              zIndex: 4,
            }}
          />
        </motion.div>

        {/* Follow for the reveal - positioned on the smoke */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-30 text-center w-full px-4"
        >
          <p className="text-white/80 uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-4 sm:mb-6">
            Follow for the reveal
          </p>

          {/* Social buttons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex aspect-square h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-[#D4AF37]/30 ${s.color} ${s.bg}`}
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
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

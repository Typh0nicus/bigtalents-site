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
            textStroke: "2px rgba(212,175,55,0.15)",
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
        className="relative mb-0 z-10 -mt-12 md:-mt-16"
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
          className="relative w-80 h-[30rem] sm:w-96 sm:h-[36rem] md:w-[32rem] md:h-[42rem] lg:w-[36rem] lg:h-[48rem]"
        >
          <Image
            src="/images/players/coming-soon/santa-silhouette.png"
            alt="Mystery figure"
            fill
            className="object-contain object-top drop-shadow-[0_0_40px_rgba(212,175,55,0.4)]"
            priority
          />
          
          {/* Multi-layer atmospheric fog for proper mist effect */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "40%",
              background: "radial-gradient(ellipse 140% 100% at 50% 100%, rgba(10,10,10,1) 0%, rgba(10,10,10,0.95) 20%, rgba(10,10,10,0.75) 40%, rgba(10,10,10,0.4) 60%, transparent 85%)",
              filter: "blur(30px)",
              zIndex: 1,
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "35%",
              background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 30%, rgba(10,10,10,0.3) 60%, transparent 100%)",
              filter: "blur(15px)",
              zIndex: 2,
            }}
          />
        </motion.div>

        {/* Mystery name tag "???" positioned professionally */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.span
            animate={
              prefersReduced
                ? {}
                : {
                    opacity: [0.85, 1, 0.85],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="block text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.4em]"
            style={{
              color: "#ffffff",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.4em",
              textShadow: "0 0 20px rgba(0,0,0,0.8), 0 4px 8px rgba(0,0,0,0.6)",
            }}
          >
            ???
          </motion.span>
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

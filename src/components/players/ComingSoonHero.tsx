"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function ComingSoonHero() {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12 md:py-16">
      {/* Santa figure with gold aura */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mb-8 md:mb-12"
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
        className="text-center max-w-4xl"
      >
        <h1 className="h1 mb-4 md:mb-6">
          <span className="block text-white">NEW ROSTER</span>
          <span className="block bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#ffdf7e] bg-clip-text text-transparent">
            INCOMING
          </span>
        </h1>

        {/* Optional subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lead text-white/70 max-w-2xl mx-auto"
        >
          Three elite players. One legendary team. The reveal is coming.
        </motion.p>
      </motion.div>
    </div>
  );
}

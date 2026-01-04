"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface GiftBoxCardProps {
  index: number;
}

export function GiftBoxCard({ index }: GiftBoxCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col items-center"
    >
      {/* Glass card backdrop */}
      <motion.div
        className="relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 transition-all duration-300"
        animate={
          isHovered && !prefersReduced
            ? {
                y: -8,
                borderColor: "rgba(212,175,55,0.3)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(255,187,0,0.12)",
              }
            : {
                y: 0,
                borderColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }
        }
        transition={{ duration: 0.3 }}
      >
        {/* Floating/bobbing animation */}
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 3 + index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
          className="relative w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56"
        >
          {/* Gold glow on hover */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={
              isHovered && !prefersReduced
                ? {
                    opacity: 1,
                    scale: 1.2,
                  }
                : {
                    opacity: 0.3,
                    scale: 1,
                  }
            }
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle, rgba(255,187,0,0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Shake/wobble on hover */}
          <motion.div
            animate={
              isHovered && !prefersReduced
                ? {
                    rotate: [0, -2, 2, -2, 2, 0],
                  }
                : { rotate: 0 }
            }
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/players/coming-soon/gift-box.png"
              alt="Mystery player"
              fill
              className="object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* ??? text below box */}
        <motion.div
          className="mt-4 text-center"
          animate={
            isHovered && !prefersReduced
              ? {
                  scale: 1.05,
                }
              : { scale: 1 }
          }
          transition={{ duration: 0.2 }}
        >
          <span className="text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-wider">
            ???
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

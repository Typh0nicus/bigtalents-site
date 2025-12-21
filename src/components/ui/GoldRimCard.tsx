"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GoldRimCardProps {
  children: ReactNode;
  className?: string;
  glowIntensity?: "subtle" | "medium" | "strong";
  hoverScale?: boolean;
}

/**
 * Premium card component with gold rim glow effect
 * Matches the aesthetic from roster teaser graphics
 * - Subtle animated gold glow around edges
 * - Inner gradient overlay on hover
 * - NO cheap pulsing - smooth, elegant transitions only
 * - Respects prefers-reduced-motion
 */
export function GoldRimCard({
  children,
  className = "",
  glowIntensity = "medium",
  hoverScale = true,
}: GoldRimCardProps) {
  const prefersReduced = useReducedMotion();

  const glowConfig = {
    subtle: {
      opacity: [0.15, 0.25, 0.15],
      blur: "12px",
      color: "rgba(255, 187, 0, 0.3)",
      innerColor: "rgba(255, 187, 0, 0.1)",
    },
    medium: {
      opacity: [0.25, 0.4, 0.25],
      blur: "16px",
      color: "rgba(255, 187, 0, 0.4)",
      innerColor: "rgba(255, 187, 0, 0.15)",
    },
    strong: {
      opacity: [0.35, 0.55, 0.35],
      blur: "20px",
      color: "rgba(255, 187, 0, 0.5)",
      innerColor: "rgba(255, 187, 0, 0.2)",
    },
  };

  const config = glowConfig[glowIntensity];

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={
        !prefersReduced && hoverScale ? { y: -4, scale: 1.01 } : undefined
      }
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Card content */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Outer glow layer - animated breathing effect */}
      {!prefersReduced && (
        <motion.div
          className="absolute -inset-[6px] rounded-2xl pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
            filter: `blur(${config.blur})`,
          }}
          animate={{
            opacity: config.opacity,
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Inner glow with box shadow */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
          style={{
            boxShadow: `0 0 24px ${config.color}, inset 0 0 16px ${config.innerColor}`,
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      )}
    </motion.div>
  );
}

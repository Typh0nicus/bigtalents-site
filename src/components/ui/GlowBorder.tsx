"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animate?: boolean;
}

export function GlowBorder({ 
  children, 
  className = "",
  glowColor = "255,187,0", // RGB for vibrant orange/gold
  animate = true 
}: GlowBorderProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Animated glow border */}
      {animate && !prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            borderRadius: "inherit",
          }}
          animate={{
            boxShadow: [
              `0 0 20px rgba(${glowColor},0.2), inset 0 0 20px rgba(${glowColor},0.1)`,
              `0 0 40px rgba(${glowColor},0.4), inset 0 0 30px rgba(${glowColor},0.2)`,
              `0 0 20px rgba(${glowColor},0.2), inset 0 0 20px rgba(${glowColor},0.1)`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Static glow for reduced motion */}
      {(!animate || prefersReduced) && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            borderRadius: "inherit",
            boxShadow: `0 0 20px rgba(${glowColor},0.2)`,
          }}
        />
      )}
    </div>
  );
}

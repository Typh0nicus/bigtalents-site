"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GoldFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}

/**
 * Elegant vine/laurel flourish decoration
 * Matches the organic leaf patterns in the brand graphics
 * - Elegant curved vines with small leaves
 * - Gold gradient fill
 * - Position options: corners
 * - Subtle fade-in animation (no bouncing/scaling)
 */
export function GoldFlourish({
  position = "top-left",
  className = "",
  size = 120,
}: GoldFlourishProps) {
  const prefersReduced = useReducedMotion();

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-100",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: prefersReduced ? 0.01 : 0.8,
        ease: "easeOut",
      }}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#FFBB00" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Main vine curve */}
        <path
          d="M 5 5 Q 15 15, 25 20 Q 35 25, 40 35 Q 45 45, 50 50"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.7"
        />

        {/* Secondary vine branch */}
        <path
          d="M 25 20 Q 30 15, 35 18 Q 40 21, 42 26"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Leaf 1 */}
        <ellipse
          cx="28"
          cy="18"
          rx="4"
          ry="7"
          fill="url(#goldGradient)"
          opacity="0.5"
          transform="rotate(-25 28 18)"
        />

        {/* Leaf 2 */}
        <ellipse
          cx="38"
          cy="30"
          rx="5"
          ry="8"
          fill="url(#goldGradient)"
          opacity="0.5"
          transform="rotate(15 38 30)"
        />

        {/* Leaf 3 */}
        <ellipse
          cx="47"
          cy="45"
          rx="4"
          ry="7"
          fill="url(#goldGradient)"
          opacity="0.5"
          transform="rotate(-35 47 45)"
        />

        {/* Small decorative dots */}
        <circle cx="20" cy="16" r="1.5" fill="#FFD700" opacity="0.4" />
        <circle cx="33" cy="26" r="1.5" fill="#FFBB00" opacity="0.4" />
        <circle cx="44" cy="40" r="1.5" fill="#D4AF37" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

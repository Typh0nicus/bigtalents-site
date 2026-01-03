"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GoldFlourishProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  animate?: boolean;
}

const positionStyles = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0 scale-x-[-1]",
  "bottom-left": "bottom-0 left-0 scale-y-[-1]",
  "bottom-right": "bottom-0 right-0 scale-[-1]",
};

export function GoldFlourish({
  position,
  className = "",
  animate = true,
}: GoldFlourishProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const }
    },
  };

  return (
    <motion.div
      initial={shouldAnimate ? "hidden" : "visible"}
      animate="visible"
      variants={variants}
      className={`absolute ${positionStyles[position]} w-24 h-24 md:w-32 md:h-32 pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFBB00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E0B84F" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Decorative flourish design */}
        <path
          d="M 0 0 Q 10 5, 20 0 Q 15 15, 25 20 Q 20 25, 15 30 Q 10 25, 5 20 Q 0 15, 0 0"
          fill="url(#goldGradient)"
          opacity="0.6"
        />
        <path
          d="M 0 0 L 30 0 Q 25 10, 20 15 L 15 20 Q 10 15, 5 10 L 0 5 Z"
          fill="url(#goldGradient)"
          opacity="0.4"
        />
        <circle cx="8" cy="8" r="2" fill="#FFBB00" opacity="0.8" />
        <circle cx="18" cy="12" r="1.5" fill="#D4AF37" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

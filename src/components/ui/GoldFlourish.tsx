"use client";

import { motion } from "framer-motion";

interface GoldFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  animate?: boolean;
}

export function GoldFlourish({ 
  position = "top-right", 
  className = "",
  animate = true 
}: GoldFlourishProps) {
  const positionClasses = {
    "top-left": "top-0 left-0 rotate-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  const gradientId = `goldGradient-${position}`;

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`absolute ${positionClasses[position]} pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-30"
      >
        {/* Elegant curved vine flourish */}
        <path
          d="M10 10 Q30 10, 40 25 T50 50 Q55 65, 70 70 T100 75"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M15 15 Q25 20, 30 30 T40 45"
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="2" fill={`url(#${gradientId})`} />
        <circle cx="70" cy="70" r="2" fill={`url(#${gradientId})`} />
        <circle cx="40" cy="25" r="1.5" fill={`url(#${gradientId})`} opacity="0.6" />
        
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFBB00" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

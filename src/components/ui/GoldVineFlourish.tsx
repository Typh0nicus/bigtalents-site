"use client";

import { motion, useReducedMotion } from "framer-motion";

interface GoldVineFlourishProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export function GoldVineFlourish({ 
  position = 'top-left',
  className = "" 
}: GoldVineFlourishProps) {
  const prefersReduced = useReducedMotion();

  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 scale-x-[-1]',
    'bottom-left': 'bottom-0 left-0 scale-y-[-1]',
    'bottom-right': 'bottom-0 right-0 scale-x-[-1] scale-y-[-1]',
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} pointer-events-none select-none ${className}`}
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden="true"
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
      >
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFBB00" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
        
        {/* Main vine curve */}
        <path
          d="M 10 10 Q 30 30, 50 35 Q 70 40, 85 50 Q 95 60, 100 75"
          stroke="url(#gold-gradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* Leaf 1 */}
        <path
          d="M 35 30 Q 40 25, 45 30 Q 40 35, 35 30 Z"
          fill="url(#gold-gradient)"
          opacity="0.5"
        />
        
        {/* Leaf 2 */}
        <path
          d="M 60 38 Q 65 33, 70 38 Q 65 43, 60 38 Z"
          fill="url(#gold-gradient)"
          opacity="0.5"
        />
        
        {/* Leaf 3 */}
        <path
          d="M 80 52 Q 85 47, 90 52 Q 85 57, 80 52 Z"
          fill="url(#gold-gradient)"
          opacity="0.5"
        />
        
        {/* Small decorative dots */}
        <circle cx="25" cy="25" r="2" fill="url(#gold-gradient)" opacity="0.4" />
        <circle cx="55" cy="40" r="2" fill="url(#gold-gradient)" opacity="0.4" />
        <circle cx="92" cy="60" r="2" fill="url(#gold-gradient)" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

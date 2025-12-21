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
        width="300"
        height="300"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-25"
      >
        <defs>
          {/* Gold gradient - matches the premium color palette */}
          <linearGradient id={`gold-gradient-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="30%" stopColor="#FFBB00" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
          
          {/* Radial gradient for glow effect */}
          <radialGradient id={`gold-glow-${position}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFBB00" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Geometric corner accent */}
        <g opacity="0.8">
          <line x1="20" y1="20" x2="80" y2="20" stroke={`url(#gold-gradient-${position})`} strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="20" x2="20" y2="80" stroke={`url(#gold-gradient-${position})`} strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="20" r="4" fill={`url(#gold-gradient-${position})`} />
        </g>
        
        {/* Main elegant curved vine stem */}
        <path
          d="M 25 25 Q 45 40, 65 50 Q 85 60, 105 75 Q 125 90, 140 110 Q 155 130, 165 155"
          stroke={`url(#gold-gradient-${position})`}
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        
        {/* Secondary vine branch */}
        <path
          d="M 70 55 Q 85 65, 95 80 Q 105 95, 110 115"
          stroke={`url(#gold-gradient-${position})`}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
        
        {/* Laurel-style leaves - larger and more detailed */}
        {/* Leaf cluster 1 */}
        <g opacity="0.6">
          <path
            d="M 50 45 Q 58 42, 62 48 Q 58 54, 50 51 Z"
            fill={`url(#gold-gradient-${position})`}
          />
          <path
            d="M 48 48 Q 56 45, 60 51 Q 56 57, 48 54 Z"
            fill={`url(#gold-gradient-${position})`}
            opacity="0.8"
          />
        </g>
        
        {/* Leaf cluster 2 */}
        <g opacity="0.6">
          <path
            d="M 75 60 Q 83 57, 87 63 Q 83 69, 75 66 Z"
            fill={`url(#gold-gradient-${position})`}
          />
          <path
            d="M 78 63 Q 86 60, 90 66 Q 86 72, 78 69 Z"
            fill={`url(#gold-gradient-${position})`}
            opacity="0.8"
          />
        </g>
        
        {/* Leaf cluster 3 */}
        <g opacity="0.6">
          <path
            d="M 100 78 Q 108 75, 112 81 Q 108 87, 100 84 Z"
            fill={`url(#gold-gradient-${position})`}
          />
          <path
            d="M 103 81 Q 111 78, 115 84 Q 111 90, 103 87 Z"
            fill={`url(#gold-gradient-${position})`}
            opacity="0.8"
          />
        </g>
        
        {/* Leaf cluster 4 */}
        <g opacity="0.6">
          <path
            d="M 125 100 Q 133 97, 137 103 Q 133 109, 125 106 Z"
            fill={`url(#gold-gradient-${position})`}
          />
          <path
            d="M 128 103 Q 136 100, 140 106 Q 136 112, 128 109 Z"
            fill={`url(#gold-gradient-${position})`}
            opacity="0.8"
          />
        </g>
        
        {/* Leaf cluster 5 - on secondary branch */}
        <g opacity="0.5">
          <path
            d="M 88 70 Q 93 67, 97 72 Q 93 77, 88 74 Z"
            fill={`url(#gold-gradient-${position})`}
          />
        </g>
        
        {/* Decorative star/sparkle accents */}
        <g opacity="0.5">
          <path
            d="M 60 50 L 62 52 L 60 54 L 58 52 Z"
            fill="#FFD700"
          />
          <path
            d="M 110 85 L 112 87 L 110 89 L 108 87 Z"
            fill="#FFBB00"
          />
          <path
            d="M 145 120 L 147 122 L 145 124 L 143 122 Z"
            fill="#D4AF37"
          />
        </g>
        
        {/* Subtle glow circles for depth */}
        <circle cx="65" cy="50" r="15" fill={`url(#gold-glow-${position})`} opacity="0.3" />
        <circle cx="105" cy="75" r="20" fill={`url(#gold-glow-${position})`} opacity="0.2" />
        <circle cx="140" cy="110" r="25" fill={`url(#gold-glow-${position})`} opacity="0.15" />
      </svg>
    </motion.div>
  );
}

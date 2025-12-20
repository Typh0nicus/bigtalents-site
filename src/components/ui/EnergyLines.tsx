"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

interface EnergyLinesProps {
  count?: number;
  className?: string;
}

export function EnergyLines({ count = 5, className = "" }: EnergyLinesProps) {
  const prefersReduced = useReducedMotion();
  
  const lines = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      delay: i * 0.3,
      duration: 2 + Math.random() * 2,
      startY: 20 + (i * 15) + Math.random() * 10,
      angle: -25 + Math.random() * 10,
      width: 60 + Math.random() * 40,
      opacity: 0.15 + Math.random() * 0.2,
    }));
  }, [count]);

  if (prefersReduced) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#FFBB00] to-transparent"
          style={{
            top: `${line.startY}%`,
            width: `${line.width}%`,
            transform: `rotate(${line.angle}deg)`,
            opacity: line.opacity,
          }}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: ["100%", "200%"],
            opacity: [0, line.opacity, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Motion blur effect lines */}
      {lines.slice(0, 2).map((line, i) => (
        <motion.div
          key={`blur-${i}`}
          className="absolute h-[2px] blur-sm"
          style={{
            top: `${line.startY + 5}%`,
            width: `${line.width * 0.8}%`,
            transform: `rotate(${line.angle}deg)`,
            background: "linear-gradient(90deg, transparent, rgba(255,187,0,0.3), transparent)",
          }}
          initial={{ x: "-100%", opacity: 0 }}
          animate={{
            x: ["100%", "200%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: line.duration * 1.2,
            delay: line.delay + 0.2,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

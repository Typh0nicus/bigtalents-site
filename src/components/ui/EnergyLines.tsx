"use client";

import { useReducedMotion } from "framer-motion";

interface EnergyLinesProps {
  count?: number;
  className?: string;
}

export function EnergyLines({ count = 5, className = "" }: EnergyLinesProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const delay = i * 0.6;
        const duration = 3 + Math.random() * 2;
        const startY = Math.random() * 100;
        const opacity = 0.1 + Math.random() * 0.15;
        
        return (
          <div
            key={i}
            className="absolute w-full h-[2px] blur-sm"
            style={{
              top: `${startY}%`,
              background: `linear-gradient(90deg, transparent, rgba(255,187,0,${opacity}), transparent)`,
              animation: `energy-line ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes energy-line {
          0% {
            transform: translateX(-120%);
            filter: blur(2px);
          }
          100% {
            transform: translateX(120%);
            filter: blur(4px);
          }
        }
      `}</style>
    </div>
  );
}

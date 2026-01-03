"use client";

import { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animate?: boolean;
  borderWidth?: number;
}

export function GlowBorder({
  children,
  className = "",
  glowColor = "255,187,0",
  animate = true,
  borderWidth = 2,
}: GlowBorderProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animate && !prefersReduced;

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 rounded-inherit"
        style={{
          padding: `${borderWidth}px`,
          background: `linear-gradient(45deg, rgba(${glowColor}, 0.8), rgba(${glowColor}, 0.4), rgba(${glowColor}, 0.8))`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          animation: shouldAnimate ? "glow-border-rotate 3s linear infinite" : "none",
        }}
      />
      <div className="relative bg-black/50 rounded-inherit">
        {children}
      </div>
    </div>
  );
}

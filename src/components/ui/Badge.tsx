"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "live" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
}

const variantStyles = {
  default: "bg-white/10 text-white/90 border-white/20",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  error: "bg-red-500/20 text-red-400 border-red-500/30",
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  live: "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse-gold",
  gold: "bg-gradient-to-r from-[var(--gold-primary)]/20 to-[var(--gold-classic)]/20 text-[var(--gold-vibrant)] border-[var(--border-gold-glow)]",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const glowStyles = {
  default: "shadow-md",
  success: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
  warning: "shadow-[0_0_10px_rgba(234,179,8,0.3)]",
  error: "shadow-[0_0_10px_rgba(239,68,68,0.3)]",
  info: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  live: "shadow-[0_0_15px_rgba(239,68,68,0.4)]",
  gold: "shadow-glow-gold-sm",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  glow = false,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-bold uppercase tracking-wider
        rounded-full border
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glow ? glowStyles[variant] : ""}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

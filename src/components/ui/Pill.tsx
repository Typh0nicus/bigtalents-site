"use client";

import { ReactNode } from "react";

interface PillProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "gold" | "outlined";
  size?: "sm" | "md" | "lg";
  className?: string;
  glow?: boolean;
}

const variantStyles = {
  default: "bg-white/5 text-white/90 border border-white/10",
  gold: "bg-gradient-to-r from-[var(--gold-primary)]/15 to-[var(--gold-classic)]/10 text-[var(--gold-vibrant)] border border-[var(--border-gold)]",
  outlined: "bg-transparent text-white/90 border-2 border-white/20",
};

const sizeStyles = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-4 py-1.5 text-sm gap-2",
  lg: "px-6 py-2 text-base gap-2.5",
};

export function Pill({
  children,
  icon,
  variant = "default",
  size = "md",
  className = "",
  glow = false,
}: PillProps) {
  return (
    <div
      className={`
        inline-flex items-center justify-center
        font-bold rounded-full
        transition-all duration-200
        backdrop-blur-sm
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${glow && variant === "gold" ? "shadow-glow-gold-sm" : ""}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </div>
  );
}

"use client";

import { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  variant?: "default" | "gold" | "neon-blue" | "neon-purple";
  size?: "sm" | "md";
  className?: string;
  removable?: boolean;
  onRemove?: () => void;
}

const variantStyles = {
  default: "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20",
  gold: "bg-[var(--gold-primary)]/10 text-[var(--gold-vibrant)] border-[var(--border-gold)] hover:bg-[var(--gold-primary)]/15 hover:border-[var(--border-gold-glow)]",
  "neon-blue": "bg-[var(--neon-blue)]/10 text-[var(--neon-blue)] border-[var(--neon-blue)]/30 hover:bg-[var(--neon-blue)]/15",
  "neon-purple": "bg-[var(--neon-purple)]/10 text-[var(--neon-purple)] border-[var(--neon-purple)]/30 hover:bg-[var(--neon-purple)]/15",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
};

export function Chip({
  children,
  variant = "default",
  size = "md",
  className = "",
  removable = false,
  onRemove,
}: ChipProps) {
  return (
    <span
      className={`
        inline-flex items-center justify-center
        font-medium rounded-lg border
        transition-all duration-200
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

"use client";

interface AccentDividerProps {
  variant?: "default" | "gold" | "gradient";
  thickness?: "thin" | "medium" | "thick";
  className?: string;
}

const variantStyles = {
  default: "bg-gradient-to-r from-transparent via-white/10 to-transparent",
  gold: "bg-gradient-to-r from-transparent via-[var(--gold-vibrant)]/30 to-transparent",
  gradient: "bg-gradient-to-r from-transparent via-[var(--gold-primary)]/40 via-[var(--gold-classic)]/30 to-transparent",
};

const thicknessStyles = {
  thin: "h-[1px]",
  medium: "h-[2px]",
  thick: "h-[3px]",
};

export function AccentDivider({
  variant = "gold",
  thickness = "thin",
  className = "",
}: AccentDividerProps) {
  return (
    <div
      className={`
        w-full
        ${variantStyles[variant]}
        ${thicknessStyles[thickness]}
        ${className}
      `}
      aria-hidden="true"
    />
  );
}

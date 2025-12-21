"use client";

interface GridOverlayProps {
  opacity?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function GridOverlay({ 
  opacity = 0.03, // Subtle default matching graphics
  size = 40, // 40px spacing as specified
  color = "255,255,255", // White dots, not gold
  className = "" 
}: GridOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(${color},${opacity}) 1.5px, transparent 1.5px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  );
}

"use client";

interface GridOverlayProps {
  opacity?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function GridOverlay({ 
  opacity = 0.03, // Much more subtle default
  size = 24,
  color = "255,255,255", // White dots, not gold
  className = "" 
}: GridOverlayProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(${color},${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
      aria-hidden="true"
    />
  );
}

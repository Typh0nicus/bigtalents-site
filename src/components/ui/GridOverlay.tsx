"use client";

interface GridOverlayProps {
  opacity?: number;
  size?: number;
  color?: string;
  className?: string;
}

export function GridOverlay({ 
  opacity = 0.035, // BGT spec: 0.03-0.04
  size = 40, // BGT spec: 40px spacing
  color = "255,255,255", // BGT spec: white dots
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

"use client";

interface AtmosphericFogProps {
  position?: "top" | "bottom";
  opacity?: number;
  height?: string;
  className?: string;
}

/**
 * Subtle fog/smoke effect for section transitions
 * - CSS-only gradient approach (performant)
 * - NO heavy canvas animations
 * - Positioned at top or bottom of sections
 * - Very subtle opacity (0.1-0.2 max)
 */
export function AtmosphericFog({
  position = "bottom",
  opacity = 0.15,
  height = "200px",
  className = "",
}: AtmosphericFogProps) {
  const isBottom = position === "bottom";
  
  // Define color stops for reuse
  const colorStops = {
    primary: `rgba(212, 175, 55, ${opacity * 0.3})`,
    secondary: `rgba(212, 175, 55, ${opacity * 0.2})`,
    tertiary: `rgba(212, 175, 55, ${opacity * 0.1})`,
    radial1: `rgba(255, 215, 0, ${opacity * 0.2})`,
    radial2: `rgba(255, 187, 0, ${opacity * 0.15})`,
  };

  return (
    <div
      className={`absolute ${
        isBottom ? "bottom-0" : "top-0"
      } left-0 right-0 pointer-events-none select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* Multi-layer gradient fog for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: isBottom
            ? `linear-gradient(to top, ${colorStops.primary} 0%, ${colorStops.secondary} 20%, ${colorStops.tertiary} 40%, transparent 100%)`
            : `linear-gradient(to bottom, ${colorStops.primary} 0%, ${colorStops.secondary} 20%, ${colorStops.tertiary} 40%, transparent 100%)`,
        }}
      />

      {/* Secondary layer for more organic look */}
      <div
        className="absolute inset-0"
        style={{
          background: isBottom
            ? `radial-gradient(ellipse at 30% 100%, ${colorStops.radial1} 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, ${colorStops.radial2} 0%, transparent 50%)`
            : `radial-gradient(ellipse at 30% 0%, ${colorStops.radial1} 0%, transparent 50%), radial-gradient(ellipse at 70% 0%, ${colorStops.radial2} 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}

"use client";

import { GoldParticles } from "./GoldParticles";
import { ComingSoonHero } from "./ComingSoonHero";

export function PlayersComingSoon() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Subtle dotted grid */}
        <div className="absolute inset-0 dotted-grid" />

        {/* Enhanced gold gradient glows with more depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1400px 900px at 50% 40%, rgba(212,175,55,0.12), transparent 65%),
              radial-gradient(ellipse 1200px 700px at 80% 80%, rgba(255,215,0,0.06), transparent 65%),
              radial-gradient(ellipse 1000px 600px at 20% 90%, rgba(255,187,0,0.05), transparent 65%)
            `,
          }}
        />

        {/* Gold particles effect */}
        <GoldParticles />

        {/* Multi-layered fog/mist at bottom for premium depth */}
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[rgba(10,10,10,0.9)] via-[rgba(10,10,10,0.4)] to-transparent pointer-events-none" />
        
        {/* Atmospheric vignette for premium feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section with Santa, headline, and social CTA */}
        <ComingSoonHero />
      </div>
    </section>
  );
}

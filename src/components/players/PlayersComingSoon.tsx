"use client";

import { GoldParticles } from "./GoldParticles";
import { ComingSoonHero } from "./ComingSoonHero";

export function PlayersComingSoon() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full page gold-to-black gradient background */}
      <div className="absolute inset-0">
        {/* Main gradient - gold at top fading to black at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.08) 20%, rgba(10,10,10,0.95) 60%, #000000 100%)",
          }}
        />

        {/* Subtle dotted grid */}
        <div className="absolute inset-0 dotted-grid opacity-30" />

        {/* Gold particles effect */}
        <GoldParticles />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section with Santa, headline, and social CTA */}
        <ComingSoonHero />
      </div>
    </section>
  );
}

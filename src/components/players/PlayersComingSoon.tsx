"use client";

import { GoldParticles } from "./GoldParticles";
import { ComingSoonHero } from "./ComingSoonHero";
import { GiftBoxGrid } from "./GiftBoxGrid";
import { SocialCTA } from "./SocialCTA";
import { GoldLeafDecoration } from "./GoldLeafDecoration";

export function PlayersComingSoon() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Subtle dotted grid */}
        <div className="absolute inset-0 dotted-grid" />

        {/* Gold gradient glows */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 1200px 800px at 50% 20%, rgba(212,175,55,0.08), transparent 60%),
              radial-gradient(ellipse 1000px 600px at 80% 80%, rgba(255,215,0,0.04), transparent 60%),
              radial-gradient(ellipse 900px 500px at 20% 90%, rgba(255,187,0,0.03), transparent 60%)
            `,
          }}
        />

        {/* Gold particles effect */}
        <GoldParticles />

        {/* Faded "2026" watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="text-[20rem] md:text-[28rem] font-black text-white/[0.015] select-none"
            style={{ lineHeight: 1 }}
          >
            2026
          </span>
        </div>

        {/* Subtle fog gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
      </div>

      {/* Decorative gold leaf flourishes */}
      <GoldLeafDecoration />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero section with Santa and headline */}
        <ComingSoonHero />

        {/* Gift box grid */}
        <GiftBoxGrid />

        {/* Social CTA */}
        <SocialCTA />
      </div>
    </section>
  );
}

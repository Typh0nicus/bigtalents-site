"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Creator } from "@/lib/featuredAlgorithm";
import { FaYoutube, FaTwitch, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

type CreatorTier = Creator["tier"];
type PlatformKey = keyof Creator["platforms"];

const TIER_CONFIG: Record<
  CreatorTier,
  {
    label: string;
    gradient: string;
    tierGradient: string;
    accentColor: string;
    borderColor: string;
    glowIntensity: string;
    accentGradient: string; // For tier wash effect
  }
> = {
  elite: {
    label: "Elite Creator",
    gradient: "from-[#D4AF37] via-[#FFD700] to-[#D4AF37]",
    tierGradient: "bg-gradient-to-r from-white via-[#FFD700] to-[#E8AA39]",
    accentColor: "#E8AA39",
    borderColor: "border-[#D4AF37]/30",
    glowIntensity: "strong", // Best glow for elite
    accentGradient: "bg-gradient-to-br from-[#E8AA39]/0 via-[#E8AA39]/8 to-transparent",
  },
  partnered: {
    label: "Partnered Creator",
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    tierGradient: "bg-gradient-to-r from-white via-purple-400 to-pink-400",
    accentColor: "#a855f7",
    borderColor: "border-purple-500/30",
    glowIntensity: "medium",
    accentGradient: "bg-gradient-to-br from-purple-500/0 via-purple-500/10 to-transparent",
  },
  academy: {
    label: "Academy Creator",
    gradient: "from-sky-500 via-cyan-500 to-sky-500",
    tierGradient: "bg-gradient-to-r from-white via-sky-400 to-cyan-400",
    accentColor: "#0ea5e9",
    borderColor: "border-sky-500/30",
    glowIntensity: "none",
    accentGradient: "bg-gradient-to-br from-sky-500/0 via-sky-500/10 to-transparent",
  },
};

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

function formatFans(n: number): string {
  if (!n) return "0";
  if (n < 1000) return n.toLocaleString();
  return compactFormatter.format(n);
}

function SocialIcon(props: { platform: PlatformKey; size?: string }) {
  const size = props.size || "text-base";
  switch (props.platform) {
    case "youtube":
      return <FaYoutube className={`text-red-500 ${size}`} />;
    case "twitch":
      return <FaTwitch className={`text-purple-400 ${size}`} />;
    case "tiktok":
      return <SiTiktok className={`text-white ${size}`} />;
    case "instagram":
      return <FaInstagram className={`text-pink-500 ${size}`} />;
    case "x":
      return <FaTwitter className={`text-white ${size}`} />;
    default:
      return null;
  }
}

interface CreatorCardProps {
  creator: Creator;
  index?: number;
}

export function CreatorCard({ creator, index = 0 }: CreatorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const tierConfig = TIER_CONFIG[creator.tier];

  const bgSrc = creator.avatar || "/images/rosters/player-cover.webp";

  const platforms = useMemo(() => {
    const order: PlatformKey[] = ["youtube", "twitch", "tiktok", "x", "instagram"];
    return order
      .map((key) => ({ key, value: creator.platforms[key] }))
      .filter((p) => p.value);
  }, [creator.platforms]);

  // Sparkle particles for hover effect (from original design)
  // Memoized per creator to maintain consistent particle positions
  const sparkleParticles = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        x: (Math.random() - 0.5) * 40,
        y: -10 - Math.random() * 18,
        delay: i * 0.06,
      })),
    [creator.id]
  );

  const totalFans =
    (creator.platforms.youtube?.subscribers ?? 0) +
    (creator.platforms.twitch?.followers ?? 0) +
    (creator.platforms.tiktok?.followers ?? 0) +
    (creator.platforms.x?.followers ?? 0) +
    (creator.platforms.instagram?.followers ?? 0);

  return (
    <Link href={`/creators/${creator.id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={prefersReduced ? {} : { y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative cursor-pointer h-full"
      >
        {/* Card Container - BGT Glass Effect */}
        <div className="relative h-full rounded-2xl overflow-hidden bg-black/60 border border-white/8 backdrop-blur-sm antialiased transition-all duration-300"
          style={{
            borderColor: isHovered ? tierConfig.accentColor === "#E8AA39" ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
            boxShadow: isHovered && creator.tier === 'elite' ? '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(255,187,0,0.08)' : '0 8px 32px rgba(0,0,0,0.2)'
          }}
        >
          {/* Image Section - More compact on mobile */}
          <div className="relative aspect-square sm:aspect-[3/4] overflow-hidden">
            <Image
              src={bgSrc}
              alt={creator.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Tier wash on bottom portion - inspired by original - toned down */}
            <motion.div
              className={`absolute inset-0 pointer-events-none ${tierConfig.accentGradient}`}
              animate={{ opacity: isHovered ? 0.4 : 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Sparkle particles on hover - from original design */}
            <AnimatePresence>
              {isHovered && !prefersReduced && (
                <>
                  {sparkleParticles.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-10 left-10 z-20 pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.9, 0],
                        scale: [0, 1, 0.5],
                        x: particle.x,
                        y: particle.y,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: particle.delay,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{
                          background:
                            creator.tier === "elite"
                              ? "#FFD700"
                              : creator.tier === "partnered"
                              ? "#c084fc"
                              : "#38bdf8",
                          boxShadow:
                            creator.tier === "elite"
                              ? "0 0 8px rgba(255,215,0,0.6)"
                              : "0 0 7px rgba(255,255,255,0.25)",
                        }}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
            
            {/* Tier Badge - Desktop only, positioned below name like original */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-20">
              <h3 className="text-base sm:text-2xl font-black text-white mb-0.5 sm:mb-1 line-clamp-1">
                {creator.name}
              </h3>
              {/* Desktop: Show tier badge below name */}
              <p
                className={`hidden sm:block text-xs font-semibold uppercase tracking-[0.15em] bg-clip-text text-transparent ${tierConfig.tierGradient} mb-1`}
              >
                {tierConfig.label}
              </p>
              {totalFans > 0 && (
                <p className="text-xs sm:text-sm text-white/70 font-medium">
                  {formatFans(totalFans)} followers
                </p>
              )}
            </div>
          </div>

          {/* Info Section - Different for mobile vs desktop */}
          <div className="relative p-2 sm:p-4 bg-black/40 backdrop-blur-sm border-t border-white/5">
            {/* Mobile: View Profile button centered */}
            <div className="sm:hidden flex items-center justify-center">
              <motion.div
                className="relative text-center"
                animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: isHovered ? "transparent" : "white",
                    backgroundImage: isHovered
                      ? "linear-gradient(90deg,#D4AF37 0%,#FFD700 50%,#D4AF37 100%)"
                      : "none",
                    backgroundSize: "200% 100%",
                    backgroundPosition: isHovered ? "100% 0" : "0 0",
                    WebkitBackgroundClip: isHovered ? "text" : "unset",
                    WebkitTextFillColor: isHovered ? "transparent" : "white",
                    transition: "all 0.25s ease",
                  }}
                >
                  View Profile
                </span>
              </motion.div>
            </div>
            
            {/* Desktop: Platform icons and View Profile */}
            <div className="hidden sm:flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {platforms.map(({ key, value }) => (
                  <motion.button
                    key={String(key)}
                    type="button"
                    whileHover={prefersReduced ? {} : { scale: 1.08, y: -1 }}
                    whileTap={prefersReduced ? {} : { scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (value?.url) window.open(value.url, "_blank", "noopener,noreferrer");
                    }}
                    aria-label={`${creator.name} on ${String(key)}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-white/15 hover:border-white/35 transition-colors duration-200 text-lg"
                  >
                    <SocialIcon platform={key} />
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="relative text-center"
                animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: isHovered ? "transparent" : "white",
                    backgroundImage: isHovered
                      ? "linear-gradient(90deg,#D4AF37 0%,#FFD700 50%,#D4AF37 100%)"
                      : "none",
                    backgroundSize: "200% 100%",
                    backgroundPosition: isHovered ? "100% 0" : "0 0",
                    WebkitBackgroundClip: isHovered ? "text" : "unset",
                    WebkitTextFillColor: isHovered ? "transparent" : "white",
                    transition: "all 0.25s ease",
                  }}
                >
                  View Profile
                </span>
              </motion.div>
            </div>
          </div>

          {/* Shimmer Effect removed - tier wash is better */}
        </div>

        {/* Tier-specific Glow Effects - Fixed positioning to eliminate gap */}
        {!prefersReduced && tierConfig.glowIntensity === "strong" && (
          <>
            {/* Elite - Outer glow layer - adjusted to eliminate gap */}
            <motion.div
              className="absolute -inset-2 rounded-2xl blur-lg pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${tierConfig.accentColor}40 0%, transparent 70%)`,
              }}
              animate={{
                opacity: [0.28, 0.55, 0.28],
                scale: [0.99, 1.01, 0.99],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Elite - Inner glow with box shadow - tighter fit */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
              style={{
                boxShadow: `0 0 20px ${tierConfig.accentColor}45, inset 0 0 12px ${tierConfig.accentColor}20`,
              }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}
        {!prefersReduced && tierConfig.glowIntensity === "medium" && (
          <>
            {/* Partnered - Outer glow layer - adjusted to eliminate gap */}
            <motion.div
              className="absolute -inset-2 rounded-2xl blur-lg pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${tierConfig.accentColor}40 0%, transparent 70%)`,
              }}
              animate={{
                opacity: [0.28, 0.55, 0.28],
                scale: [0.99, 1.01, 0.99],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Partnered - Inner glow with box shadow - tighter fit */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
              style={{
                boxShadow: `0 0 20px ${tierConfig.accentColor}45, inset 0 0 12px ${tierConfig.accentColor}20`,
              }}
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}
      </motion.div>
    </Link>
  );
}

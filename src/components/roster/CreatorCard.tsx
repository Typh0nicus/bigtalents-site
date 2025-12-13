"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Creator } from "@/lib/featuredAlgorithm";
import { FaYoutube, FaTwitch, FaInstagram, FaTwitter } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { HiArrowRight } from "react-icons/hi2";

type CreatorTier = Creator["tier"];
type PlatformKey = keyof Creator["platforms"];

const TIER_CONFIG: Record<
  CreatorTier,
  {
    label: string;
    gradient: string;
    accentColor: string;
    borderColor: string;
  }
> = {
  elite: {
    label: "Elite",
    gradient: "from-[#D4AF37] via-[#FFD700] to-[#D4AF37]",
    accentColor: "#D4AF37",
    borderColor: "border-[#D4AF37]/30",
  },
  partnered: {
    label: "Partnered",
    gradient: "from-purple-500 via-pink-500 to-purple-500",
    accentColor: "#a855f7",
    borderColor: "border-purple-500/30",
  },
  academy: {
    label: "Academy",
    gradient: "from-sky-500 via-cyan-500 to-sky-500",
    accentColor: "#0ea5e9",
    borderColor: "border-sky-500/30",
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

  const totalFans =
    (creator.platforms.youtube?.subscribers ?? 0) +
    (creator.platforms.twitch?.followers ?? 0) +
    (creator.platforms.tiktok?.followers ?? 0) +
    (creator.platforms.x?.followers ?? 0) +
    (creator.platforms.instagram?.followers ?? 0);

  return (
    <Link href={`/rosters/creators/${creator.id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={prefersReduced ? {} : { y: -8 }}
        transition={{ duration: 0.3 }}
        className="group relative cursor-pointer h-full"
      >
        {/* Card Container */}
        <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900/50 to-black border border-white/10 backdrop-blur-sm">
          {/* Image Section */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={bgSrc}
              alt={creator.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            
            {/* Tier Badge */}
            <div className="absolute top-4 left-4">
              <div
                className={`px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border ${tierConfig.borderColor}`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${tierConfig.gradient} bg-clip-text text-transparent`}
                >
                  {tierConfig.label}
                </span>
              </div>
            </div>

            {/* Stats Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-2xl font-black text-white mb-1 line-clamp-1">
                {creator.name}
              </h3>
              {totalFans > 0 && (
                <p className="text-sm text-white/70 font-medium">
                  {formatFans(totalFans)} followers
                </p>
              )}
            </div>

            {/* Hover Arrow */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <HiArrowRight className="text-white text-lg" />
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <div className="relative p-4 bg-black/40 backdrop-blur-sm border-t border-white/5">
            {/* Platforms */}
            <div className="flex items-center gap-2 flex-wrap">
              {platforms.map(({ key, value }) => (
                <button
                  key={String(key)}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (value?.url) window.open(value.url, "_blank", "noopener,noreferrer");
                  }}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200"
                  aria-label={`${creator.name} on ${String(key)}`}
                >
                  <SocialIcon platform={key} size="text-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Hover Shimmer Effect */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isHovered && !prefersReduced ? "100%" : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
          />
        </div>

        {/* Glow Effect for Elite/Partnered */}
        {(creator.tier === "elite" || creator.tier === "partnered") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered && !prefersReduced ? [0.3, 0.6, 0.3] : 0,
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-[1px] rounded-2xl blur-xl pointer-events-none -z-10"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${tierConfig.accentColor}40, transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </Link>
  );
}

  useEffect(() => setIsMounted(true), []);

  const bgSrc = creator.avatar || "/images/rosters/player-cover.webp";

  const orderedPlatforms: PlatformKey[] = [
    "youtube",
    "twitch",
    "tiktok",
    "x",
    "instagram",
    "discord",
  ];

  const platforms: PlatformEntry[] = useMemo(() => {
    return orderedPlatforms
      .map((key): PlatformEntry | null => {
        const value = creator.platforms[key];
        if (!value) return null;
        return [key, value] as PlatformEntry;
      })
      .filter((entry): entry is PlatformEntry => entry !== null);
  }, [creator.platforms]);

  const totalFans =
    (creator.platforms.youtube?.subscribers ?? 0) +
    (creator.platforms.twitch?.followers ?? 0) +
    (creator.platforms.tiktok?.followers ?? 0) +
    (creator.platforms.x?.followers ?? 0) +
    (creator.platforms.instagram?.followers ?? 0);

  const sparkleParticles = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        x: (Math.random() - 0.5) * 40,
        y: -10 - Math.random() * 18,
        delay: i * 0.06,
      })),
    [creator.id]
  );

  const showAura = isMounted && (creator.tier === "elite" || creator.tier === "partnered");

  return (
    <Link href={`/rosters/creators/${creator.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.05,
          duration: 0.5,
          ease: EASE_OUT,
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={prefersReduced ? {} : { y: -12 }}
        className="group cursor-pointer relative"
      >
        {/* Tier aura (same sizing system for elite + partnered) */}
        {showAura && (
          <>
            <motion.div
              className="absolute -inset-1.5 rounded-3xl blur-lg pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tier.glowColor}33 0%, transparent 70%)`,
              }}
              animate={
                prefersReduced
                  ? {}
                  : { opacity: [0.22, 0.5, 0.22], scale: [0.985, 1.015, 0.985] }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -inset-0.5 rounded-3xl pointer-events-none"
              style={{
                boxShadow: `0 0 22px ${tier.glowColor}40, inset 0 0 14px ${tier.glowColor}1f`,
              }}
              animate={prefersReduced ? {} : { opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
          </>
        )}

        <motion.div
          className={`relative rounded-3xl overflow-hidden border border-white/10 bg-black/70 shadow-lg ${tier.borderHover} ${tier.shadowHover}`}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Media */}
          <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-900 to-black">
            <Image
              src={bgSrc}
              alt={creator.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width:768px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Soft tier wash */}
            <motion.div
              className={`absolute inset-0 pointer-events-none ${tier.accentGradient}`}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* Tiny sparkles on hover (clean + subtle) */}
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

            {/* Name + tier */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-30">
              <div className="flex flex-col gap-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white line-clamp-1">
                  {creator.name}
                </h3>
                <p
                  className={`text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.18em] bg-clip-text text-transparent ${tier.tierGradient}`}
                >
                  {tier.label}
                </p>
                {totalFans > 0 && (
                  <p className="text-xs sm:text-sm text-white/70">
                    {formatFans(totalFans)} fans
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative p-4 sm:p-6 bg-black/55 backdrop-blur-xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={isHovered && !prefersReduced ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {platforms.map(([platformKey, value]) => (
                  <motion.button
                    key={String(platformKey)}
                    type="button"
                    whileHover={prefersReduced ? {} : { scale: 1.08, y: -1 }}
                    whileTap={prefersReduced ? {} : { scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(value.url, "_blank", "noopener,noreferrer");
                    }}
                    aria-label={`${creator.name} on ${String(platformKey)}`}
                    className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-zinc-900 border border-white/15 hover:border-white/35 transition-colors duration-200 text-lg sm:text-base"
                  >
                    <SocialIcon platform={platformKey} />
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
        </motion.div>
      </motion.div>
    </Link>
  );
}

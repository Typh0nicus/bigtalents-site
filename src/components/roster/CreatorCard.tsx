"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Creator } from "@/lib/featuredAlgorithm";
import { FaYoutube, FaTwitch, FaDiscord, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

type CreatorTier = Creator["tier"];
type PlatformKey = keyof Creator["platforms"];
type PlatformEntry = [
  PlatformKey,
  NonNullable<Creator["platforms"][PlatformKey]>
];

const TIER_STYLE: Record<
  CreatorTier,
  {
    label: string;
    accentGradient: string;
    borderHover: string;
    shadowHover: string;
    tierGradient: string;
    glowColor: string;
    particleColor: string;
    hasGlow: boolean;
    hasIdleParticles: boolean;
  }
> = {
  elite: {
    label: "Elite Creator",
    accentGradient:
      "bg-gradient-to-br from-[#E8AA39]/0 via-[#E8AA39]/10 to-transparent",
    borderHover: "hover:border-[#E8AA39]/60",
    shadowHover: "hover:shadow-2xl hover:shadow-[#E8AA39]/20",
    tierGradient: "bg-gradient-to-r from-white via-[#FFD700] to-[#E8AA39]",
    glowColor: "#E8AA39",
    particleColor: "#FFD700",
    hasGlow: true,
    hasIdleParticles: true,
  },
  partnered: {
    label: "Partnered Creator",
    accentGradient:
      "bg-gradient-to-br from-purple-500/0 via-purple-500/12 to-transparent",
    borderHover: "hover:border-purple-400/60",
    shadowHover: "hover:shadow-2xl hover:shadow-purple-500/20",
    tierGradient: "bg-gradient-to-r from-white via-purple-400 to-pink-400",
    glowColor: "#a855f7",
    particleColor: "#c084fc",
    hasGlow: true,
    hasIdleParticles: false,
  },
  academy: {
    label: "Academy Creator",
    accentGradient:
      "bg-gradient-to-br from-sky-500/0 via-sky-500/12 to-transparent",
    borderHover: "hover:border-sky-400/60",
    shadowHover: "hover:shadow-2xl hover:shadow-sky-400/18",
    tierGradient: "bg-gradient-to-r from-white via-sky-400 to-cyan-400",
    glowColor: "",
    particleColor: "#38bdf8",
    hasGlow: false,
    hasIdleParticles: false,
  },
};

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

function formatFans(n: number): string {
  if (n < 1000) return n.toLocaleString();
  return compactFormatter.format(n);
}

function SocialIcon(props: { platform: PlatformKey }) {
  const { platform } = props;

  switch (platform) {
    case "youtube":
      return <FaYoutube className="text-red-500" />;
    case "twitch":
      return <FaTwitch className="text-purple-400" />;
    case "tiktok":
      return <SiTiktok className="text-white" />;
    case "discord":
      return <FaDiscord className="text-indigo-400" />;
    case "instagram":
      return <FaInstagram className="text-pink-500" />;
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
  const [isMounted, setIsMounted] = useState(false);
  const tier = TIER_STYLE[creator.tier];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const bgSrc = creator.avatar || "/images/rosters/player-cover.webp";

  const orderedPlatforms: PlatformKey[] = [
    "youtube",
    "twitch",
    "tiktok",
    "instagram",
    "discord",
  ];

  const platforms: PlatformEntry[] = orderedPlatforms
    .map((key): PlatformEntry | null => {
      const value = creator.platforms[key];
      if (!value) return null;
      return [key, value] as PlatformEntry;
    })
    .filter((entry): entry is PlatformEntry => entry !== null);

  const totalFans =
    (creator.platforms.youtube?.subscribers ?? 0) +
    (creator.platforms.twitch?.followers ?? 0) +
    (creator.platforms.tiktok?.followers ?? 0) +
    (creator.platforms.x?.followers ?? 0);

  const sparkleParticles = Array.from({ length: 4 }, (_, i) => ({
    x: (Math.random() - 0.5) * 50,
    y: -15 - Math.random() * 20,
    delay: i * 0.05,
  }));

  type AuraKind = "dot" | "glow" | "streak";
  const eliteAuraParticles = Array.from({ length: 12 }, (_, i) => {
    const kind: AuraKind =
      i % 3 === 0 ? "dot" : i % 3 === 1 ? "glow" : "streak";
    return {
      kind,
      delay: i * 0.3,
      duration: 2.8 + (i % 3) * 0.4,
      offsetX: (Math.random() - 0.5) * 100,
    };
  });

  return (
    <Link href={`/rosters/creators/${creator.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: index * 0.05,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -14 }}
        className="group cursor-pointer relative"
      >
        {creator.tier === "elite" && isMounted && (
          <>
            <div
              className="absolute -inset-2.5 rounded-3xl blur-xl opacity-50 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(232,170,57,0.4) 0%, rgba(255,215,0,0.3) 40%, transparent 70%)`,
              }}
            />
            <div
              className="absolute -inset-1.5 rounded-3xl opacity-60 pointer-events-none"
              style={{
                boxShadow: `0 0 35px 6px rgba(255,215,0,0.4), inset 0 0 30px rgba(232,170,57,0.2)`,
              }}
            />
            <motion.div
              className="absolute -inset-0.5 rounded-3xl opacity-70 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(255,215,0,0.5), rgba(232,170,57,0.3), rgba(255,215,0,0.5))`,
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        )}

        {creator.tier === "partnered" && isMounted && (
          <>
            <motion.div
              className="absolute -inset-1.5 rounded-3xl blur-lg pointer-events-none"
              style={{
                background: `radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)`,
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -inset-0.5 rounded-3xl pointer-events-none"
              style={{
                boxShadow: `0 0 25px rgba(168,85,247,0.4), inset 0 0 20px rgba(168,85,247,0.15)`,
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
          </>
        )}

        <motion.div
          className={`relative rounded-3xl overflow-hidden border border-white/10 bg-black/70 shadow-lg ${tier.borderHover} ${tier.shadowHover}`}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="relative aspect-[4/5] bg-gradient-to-br from-zinc-900 to-black">
            <Image
              src={bgSrc}
              alt={creator.name}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-[1.08]"
              sizes="(max-width:768px) 100vw, 420px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {tier.hasIdleParticles && isMounted && (
              <div className="absolute inset-0 pointer-events-none z-10">
                {eliteAuraParticles.map((p, i) => {
                  let sizeClass = "h-1 w-1";
                  let extraStyle: Record<string, string | number> = {};

                  if (p.kind === "glow") {
                    sizeClass = "h-2 w-2";
                    extraStyle = { filter: "blur(0.5px)" };
                  } else if (p.kind === "streak") {
                    sizeClass = "h-2.5 w-[1.5px]";
                    extraStyle = { borderRadius: 9999 };
                  }

                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: "50%",
                        bottom: "20%",
                        marginLeft: p.offsetX,
                      }}
                      animate={{
                        y: [0, -100],
                        opacity: [0, 0.7, 0],
                        scale: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: p.delay,
                      }}
                    >
                      <div
                        className={sizeClass}
                        style={{
                          background: tier.particleColor,
                          boxShadow:
                            p.kind === "glow"
                              ? `0 0 12px ${tier.particleColor}`
                              : `0 0 6px ${tier.particleColor}`,
                          ...extraStyle,
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}

            <motion.div
              className={`absolute inset-0 pointer-events-none ${tier.accentGradient}`}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />

            <AnimatePresence>
              {isHovered && (
                <>
                  {sparkleParticles.map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-10 left-10 z-20 pointer-events-none"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.4],
                        x: particle.x,
                        y: particle.y,
                        rotate: particle.x * 2,
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: particle.delay,
                        ease: "easeOut",
                      }}
                    >
                      <div
                        className="h-1 w-1 rounded-full"
                        style={{
                          background: tier.particleColor,
                          boxShadow: `0 0 8px ${tier.particleColor}`,
                        }}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white line-clamp-1">
                  {creator.name}
                </h3>
                <p
                  className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] bg-clip-text text-transparent ${tier.tierGradient}`}
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

          <div className="relative p-6 bg-black/55 backdrop-blur-xl overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={isHovered ? { x: ["-100%", "100%"] } : {}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {platforms.map(([platformKey, value]) => (
                  <motion.button
                    key={String(platformKey)}
                    type="button"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(value.url, "_blank", "noopener,noreferrer");
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 border border-white/15 hover:border-white/40 transition-colors duration-200"
                  >
                    <SocialIcon platform={platformKey} />
                  </motion.button>
                ))}
              </div>

              <motion.div
                className="relative text-center"
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.span
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
                    transition: "all 0.3s ease",
                  }}
                >
                  View Profile
                </motion.span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
}

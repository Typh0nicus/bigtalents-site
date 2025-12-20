"use client";

import React, { useState, useEffect, ComponentType, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiExternalLink,
  FiUsers,
  FiTrendingUp,
  FiPlay,
} from "react-icons/fi";
import {
  FaYoutube,
  FaTwitch,
  FaTwitter,
  FaDiscord,
  FaInstagram,
  FaStar,
  FaTiktok,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import type { Creator } from "@/lib/featuredAlgorithm";
import type { Transition } from "framer-motion";

const softSpring = {
  type: "spring",
  stiffness: 220,
  damping: 24,
} satisfies Transition;

const PARTICLE_COUNT = 14;
const ACCENT_HEX = "#D4AF37";
const ACCENT_SOFT = "rgba(212,175,55,0.18)";

// Icon type that safely allows style prop (fixes TS error).
type IconType = ComponentType<{
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}>;

type SocialConfig = {
  icon: IconType;
  label: string;
  colorClass: string;
};

const SOCIAL_CONFIG: Record<string, SocialConfig> = {
  youtube: { icon: FaYoutube, label: "YouTube", colorClass: "text-red-500" },
  twitch: { icon: FaTwitch, label: "Twitch", colorClass: "text-purple-400" },
  tiktok: { icon: SiTiktok, label: "TikTok", colorClass: "text-white" },
  x: { icon: FaTwitter, label: "X (Twitter)", colorClass: "text-sky-400" },
  discord: { icon: FaDiscord, label: "Discord", colorClass: "text-indigo-400" },
  instagram: {
    icon: FaInstagram,
    label: "Instagram",
    colorClass: "text-pink-500",
  },
};

export type CreatorLatestVideo = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  platform: "youtube" | "twitch" | "tiktok";
};

interface CreatorProfileProps {
  creator: Creator;
  latestVideos: CreatorLatestVideo[];
}

type CreatorPlatformStats = {
  url?: string;
  subscribers?: number | null;
  followers?: number | null;
};

interface CreatorWithDiscord extends Creator {
  discordInvite?: string;
}

function getPlatformCount(
  platform: CreatorPlatformStats | null | undefined
): number {
  if (!platform) return 0;
  const raw =
    typeof platform.subscribers === "number"
      ? platform.subscribers
      : typeof platform.followers === "number"
      ? platform.followers
      : 0;
  return Number.isFinite(raw) ? raw : 0;
}

function formatCompactNumber(value: number): string {
  if (!value) return "0";
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

const TIER_META: Record<
  NonNullable<Creator["tier"]>,
  { label: string; dotClass: string; textClass: string }
> = {
  elite: {
    label: "Elite Creator",
    dotClass: "bg-amber-300",
    textClass: "text-amber-200",
  },
  partnered: {
    label: "Partnered Creator",
    dotClass: "bg-indigo-300",
    textClass: "text-indigo-200",
  },
  academy: {
    label: "Academy Creator",
    dotClass: "bg-emerald-300",
    textClass: "text-emerald-200",
  },
};

// Tier color is ONLY used for the star experience.
const STAR_META: Record<
  NonNullable<Creator["tier"]>,
  { hex: string; soft: string }
> = {
  elite: {
    hex: "#D4AF37",
    soft: "rgba(212,175,55,0.22)",
  },
  partnered: {
    hex: "#8B5CF6",
    soft: "rgba(139,92,246,0.18)",
  },
  academy: {
    hex: "#34D399",
    soft: "rgba(52,211,153,0.18)",
  },
};

// Small motion presets to keep polish consistent.
const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};
export default function CreatorProfile({
  creator,
  latestVideos,
}: CreatorProfileProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const tierMeta =
    (creator.tier && TIER_META[creator.tier]) || TIER_META.academy;

  const starMeta =
    (creator.tier && STAR_META[creator.tier]) || STAR_META.academy;

  const isElite = creator.tier === "elite";

  // ✅ EXACT old burst logic (7 particles).
  const starParticles = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        x: (Math.random() - 0.5) * 110,
        y: -30 - Math.random() * 40,
        rotate: Math.random() * 360,
        delay: i * 0.12,
      })),
    []
  );

  const platforms = Object.entries(creator.platforms ?? {}) as [
    string,
    CreatorPlatformStats
  ][];

  const totalReach = platforms.reduce((sum, [, value]) => {
    return sum + getPlatformCount(value);
  }, 0);

  const primaryPlatformKey =
    platforms.find(([key]) => key === "youtube")?.[0] ??
    platforms.find(([key]) => key === "twitch")?.[0] ??
    platforms.find(([key]) => key === "tiktok")?.[0] ??
    platforms[0]?.[0];

  const regionCode = creator.region || null;
  const creatorWithDiscord = creator as CreatorWithDiscord;

  // ✅ Keep the banner stage tight on phones. The card is the hero on mobile.
  const heroHeight = "h-[230px] sm:h-[360px] md:h-[400px] lg:h-[430px]";

  return (
    <div
      className="min-h-screen overflow-x-hidden relative select-none"
      // Extra safety for your "anti-text clicking filter".
      style={{ WebkitUserSelect: "none", userSelect: "none" }}
    >
      {/* Background ambience */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 700px at 18% -8%, rgba(212,175,55,0.05), transparent 55%),
                radial-gradient(1100px 550px at 85% 18%, rgba(255,255,255,0.03), transparent 55%),
                radial-gradient(900px 450px at 50% 105%, rgba(59,130,246,0.04), transparent 55%)
              `,
            }}
          />
          <div className="opacity-20">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px rounded-full"
                style={{
                  left: `${(i * 9) % 100}%`,
                  top: `${(i * 11) % 100}%`,
                  background: ACCENT_HEX,
                }}
                animate={{
                  y: [0, -22, 0],
                  opacity: [0.12, 0.55, 0.12],
                }}
                transition={{
                  duration: 3.2 + (i % 3) * 0.6,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <motion.section
        className={`relative ${heroHeight} group`}
        onHoverStart={() => isMounted && setIsHeroHovered(true)}
        onHoverEnd={() => setIsHeroHovered(false)}
      >
        {/* Banner media only clips itself */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={creator.banner}
            alt={creator.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            draggable={false}
          />

          {/* Base overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/22" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-black/22" />

          {/* Subtle highlight overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(900px 520px at 28% 18%, rgba(212,175,55,0.04), transparent 65%),
                radial-gradient(800px 480px at 78% 30%, rgba(212,175,55,0.028), transparent 70%)
              `,
            }}
            animate={{ opacity: isHeroHovered && isMounted ? 0.5 : 0.22 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          {/* ✅ Star burst - unchanged structure */}
          <AnimatePresence>
            {isHeroHovered && isMounted && (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 p-3.5 sm:p-4 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${starMeta.hex}, #FFD700)`,
                    boxShadow: isElite
                      ? `0 0 38px ${starMeta.soft}, 0 0 90px ${starMeta.soft}`
                      : `0 0 30px ${starMeta.soft}`,
                  }}
                >
                  <FaStar className="text-black text-xl sm:text-2xl" />
                </motion.div>

                {starParticles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 pointer-events-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.05, 0.5],
                      x: particle.x,
                      y: particle.y,
                      rotate: particle.rotate,
                    }}
                    transition={{
                      duration: 1.35,
                      delay: particle.delay,
                      ease: "easeOut",
                    }}
                  >
                    <FaStar
                      className="text-xs"
                      style={{ color: starMeta.hex }}
                    />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* ✅ Desktop-only Back link overlay — safe below navbar */}
        <div className="hidden sm:block absolute left-0 right-0 z-30 top-20 md:top-24">
          <div className="container mx-auto px-4">
            <Link
              href="/creators"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all group/back"
            >
              <FiArrowLeft className="group-hover/back:-translate-x-1 transition-transform" />
              <span className="text-sm sm:text-base">Back to Creators</span>
            </Link>
          </div>
        </div>

        {/* ✅ Desktop hero content (unchanged concept, refined rhythm) */}
        <div className="hidden sm:block absolute bottom-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 pb-6 sm:pb-8">
            <div className="flex flex-row items-end gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.18 }}
                className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-black shadow-2xl group/avatar bg-black/40"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.55)" }}
              >
                <Image
                  src={creator.avatar}
                  alt={creator.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover/avatar:scale-110"
                  sizes="144px"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)",
                  }}
                />
              </motion.div>

              <div className="flex-1 pb-1">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.22 }}
                  className="flex items-center flex-wrap gap-3 mb-2"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-xs text-white/85 backdrop-blur">
                    <motion.span
                      className={`w-1.5 h-1.5 rounded-full ${tierMeta.dotClass}`}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className={tierMeta.textClass}>{tierMeta.label}</span>
                    {regionCode && (
                      <>
                        <span className="w-px h-3 bg-white/15" />
                        <span className="tracking-[0.08em] uppercase text-[11px] text-white/60">
                          {regionCode}
                        </span>
                      </>
                    )}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.26 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]"
                >
                  {creator.name}
                </motion.h1>

                <div className="h-[2px] w-20 md:w-24 rounded-full bg-[#D4AF37] mt-2 mb-3" />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  className="flex flex-wrap items-center gap-3 text-xs text-white/70"
                >
                  {totalReach > 0 && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/55 border border-white/15 backdrop-blur">
                      <FiUsers
                        className="w-3.5 h-3.5"
                        style={{ color: ACCENT_HEX }}
                      />
                      <span>
                        Total reach{" "}
                        <span className="font-semibold text-white">
                          {formatCompactNumber(totalReach)}
                        </span>
                      </span>
                    </div>
                  )}
                  {primaryPlatformKey && SOCIAL_CONFIG[primaryPlatformKey] && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/55 border border-white/15 backdrop-blur">
                      <FiTrendingUp
                        className="w-3.5 h-3.5"
                        style={{ color: ACCENT_HEX }}
                      />
                      <span>
                        Primary{" "}
                        <span className="font-semibold text-white">
                          {SOCIAL_CONFIG[primaryPlatformKey].label}
                        </span>
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE hero: glass card (no Back button) */}
<div className="sm:hidden absolute bottom-3 left-0 right-0 z-20">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 }}
      className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl
                 px-4 py-3.5"
      style={{ boxShadow: "0 14px 40px rgba(0,0,0,0.55)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-white/5"
          style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.45)" }}
        >
          <Image
            src={creator.avatar}
            alt={creator.name}
            fill
            className="object-cover"
            sizes="56px"
            draggable={false}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/80">
              <span className={`w-1.5 h-1.5 rounded-full ${tierMeta.dotClass}`} />
              <span className={tierMeta.textClass}>{tierMeta.label}</span>
            </span>

            {regionCode && (
              <span className="text-[10px] tracking-[0.08em] uppercase text-white/45">
                {regionCode}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white leading-[1.02] truncate">
            {creator.name}
          </h1>
          <div className="h-[2px] w-12 rounded-full bg-[#D4AF37] mt-1.5" />
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-2">
        {totalReach > 0 && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10">
            <FiUsers className="w-3.5 h-3.5" style={{ color: ACCENT_HEX }} />
            <span className="text-[10px] text-white/70">
              Total{" "}
              <span className="font-semibold text-white">
                {formatCompactNumber(totalReach)}
              </span>
            </span>
          </div>
        )}

        {primaryPlatformKey && SOCIAL_CONFIG[primaryPlatformKey] && (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10">
            <FiTrendingUp className="w-3.5 h-3.5" style={{ color: ACCENT_HEX }} />
            <span className="text-[10px] text-white/70">
              Primary{" "}
              <span className="font-semibold text-white">
                {SOCIAL_CONFIG[primaryPlatformKey].label}
              </span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  </div>
</div>

      </motion.section>

      {/* ✅ Mobile-only visual bridge to make flow feel intentional */}
      <div className="sm:hidden container mx-auto px-4">
        <div
          className="h-px my-5 opacity-50"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-7 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto lg:items-start">
          {/* Left: content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {latestVideos.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="card p-4 sm:p-8 border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-3xl font-black flex items-center gap-3">
                    <FiPlay
                      className="shrink-0"
                      style={{ color: ACCENT_HEX }}
                      size={22}
                    />
                    Latest Content
                  </h2>
                  <div className="hidden sm:block h-px flex-1 max-w-[140px] bg-white/10" />
                </div>

                {/* ✅ Mobile polished grid (2-col) */}
                <div className="grid grid-cols-2 gap-3 sm:hidden">
                  {latestVideos.map((video, idx) => (
                    <motion.a
                      key={video.id}
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + idx * 0.04 }}
                      whileTap={{ scale: 0.985 }}
                      className="group"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/25 transition-all">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="50vw"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-2 flex items-end">
                          <span className="text-[10px] font-semibold text-white/90 line-clamp-2">
                            {video.title}
                          </span>
                        </div>
                        <FiExternalLink className="absolute top-2 right-2 text-white/50 w-3.5 h-3.5" />
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* ✅ Desktop/tablet premium grid */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {latestVideos.map((video, idx) => {
                    const platformIcon =
                      video.platform === "youtube" ? (
                        <FaYoutube className="text-red-500" />
                      ) : video.platform === "twitch" ? (
                        <FaTwitch className="text-purple-500" />
                      ) : (
                        <FaTiktok className="text-white" />
                      );

                    return (
                      <motion.a
                        key={video.id}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.18 + idx * 0.06 }}
                        whileHover={{ y: -6 }}
                        whileTap={{ scale: 0.995 }}
                        className="group relative"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-white/30 transition-all duration-300 shadow-lg">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 1024px) 50vw, 33vw"
                            draggable={false}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end p-3 sm:p-4">
                            <div className="w-full space-y-1">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors line-clamp-2">
                                  {video.title}
                                </span>
                                <FiExternalLink className="text-white/50 group-hover:text-white/80 transition-colors shrink-0 w-4 h-4 mt-0.5" />
                              </div>
                              <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/60">
                                <span className="flex items-center gap-1">
                                  {platformIcon}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              boxShadow:
                                "inset 0 0 0 1px rgba(212,175,55,0.12)",
                            }}
                          />
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="card p-4 sm:p-8 border-white/10"
              >
                <h2 className="text-xl sm:text-2xl font-black mb-2">
                  Content coming soon
                </h2>
                <div className="h-[2px] w-14 sm:w-16 rounded-full mb-3 bg-[#D4AF37]" />
                <p className="text-white/60 text-sm sm:text-base">
                  We’ll surface the latest uploads once this creator’s feeds are
                  connected to the content pipeline.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right: connect */}
          <div className="lg:order-last">
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="card p-4 sm:p-6 border-white/10 hover:border-white/20 transition-all duration-500 lg:sticky lg:top-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 sm:h-6 rounded-full bg-[#D4AF37]" />
                <h3 className="text-lg sm:text-xl font-black">Connect</h3>
              </div>

              <div className="space-y-3">
                {platforms.map(([key, value]) => {
                  const cfg = SOCIAL_CONFIG[key];
                  if (!cfg || !value) return null;

                  const stats = value;
                  const Icon = cfg.icon;
                  const count = getPlatformCount(stats);
                  const unit =
                    typeof stats.subscribers === "number"
                      ? "subscribers"
                      : typeof stats.followers === "number"
                      ? "followers"
                      : undefined;

                  return (
                    <SocialLink
                      key={key}
                      href={stats.url ?? "#"}
                      icon={Icon}
                      label={cfg.label}
                      count={count > 0 ? formatCompactNumber(count) : undefined}
                      unit={count > 0 ? unit : undefined}
                    />
                  );
                })}

                {creatorWithDiscord.discordInvite && (
                  <SocialLink
                    href={creatorWithDiscord.discordInvite}
                    icon={FaDiscord}
                    label="Creator Discord"
                  />
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs sm:text-sm text-white/60">
                  Supporting {creator.name} helps Big Talents grow the creator
                  ecosystem and fund more tournaments and content.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
  count,
  unit,
}: {
  href: string;
  icon: IconType;
  label: string;
  count?: string;
  unit?: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 6, scale: 1.02 }}
      whileTap={{ scale: 0.995 }}
      className="relative flex items-center gap-3 p-3 sm:p-3.5 bg-white/5 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/25 group"
      style={{ boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}
    >
      {/* Social icons stay white */}
      <Icon
        size={18}
        className="text-white/85 group-hover:text-white group-hover:scale-110 transition-all shrink-0 sm:w-5 sm:h-5"
      />
      <span className="font-semibold text-sm sm:text-base flex-1 text-white/90">
        {label}
      </span>
      {count && (
        <span className="text-xs sm:text-sm text-white/70 whitespace-nowrap">
          {count}
          {unit ? ` ${unit}` : ""}
        </span>
      )}
      <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-all shrink-0 w-3.5 h-3.5 text-white/60" />
      <span
        className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(212,175,55,0.12)",
        }}
      />
    </motion.a>
  );
}

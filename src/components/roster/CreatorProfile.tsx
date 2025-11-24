"use client";

import React, { useState, useEffect, ComponentType } from "react";
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

const PARTICLE_COUNT = 18;

type SocialConfig = {
  icon: ComponentType<{ size?: number; className?: string }>;
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

/**
 * Shape we expect for individual platform objects inside `creator.platforms`.
 * This avoids `any` while still being flexible with data.
 */
type CreatorPlatformStats = {
  url?: string;
  subscribers?: number | null;
  followers?: number | null;
};

/**
 * Some creators have an extra `discordInvite` not in the base `Creator` type.
 */
interface CreatorWithDiscord extends Creator {
  discordInvite?: string;
}

function getPlatformCount(platform: CreatorPlatformStats | null | undefined): number {
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

export default function CreatorProfile({
  creator,
  latestVideos,
}: CreatorProfileProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const starParticles = Array.from({ length: 7 }, (_, i) => ({
    x: (Math.random() - 0.5) * 110,
    y: -30 - Math.random() * 40,
    rotate: Math.random() * 360,
    delay: i * 0.12,
  }));

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
    platforms[0]?.[0];

  const tierMeta =
    (creator.tier && TIER_META[creator.tier]) || TIER_META.academy;

  const regionCode = creator.region || null;
  const creatorWithDiscord = creator as CreatorWithDiscord;

  return (
    <div className="min-h-screen select-none overflow-x-hidden relative">
      {/* Background */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.08), transparent 50%),
                radial-gradient(1200px 600px at 80% 15%, rgba(168,85,247,0.06), transparent 50%),
                radial-gradient(1000px 500px at 50% 100%, rgba(59,130,246,0.05), transparent 50%)
              `,
            }}
          />
          <div className="opacity-25">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 9) % 100}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.2, 0.9, 0.2],
                }}
                transition={{
                  duration: 3.8 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.22,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <motion.div
        className="relative h-[320px] sm:h-[400px] overflow-hidden group"
        onHoverStart={() => isMounted && setIsHeroHovered(true)}
        onHoverEnd={() => setIsHeroHovered(false)}
      >
        <Image
          src={creator.banner}
          alt={creator.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/25" />

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/6 to-transparent pointer-events-none"
          animate={{ opacity: isHeroHovered && isMounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        <AnimatePresence>
          {isHeroHovered && isMounted && (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-3 sm:p-4 rounded-full shadow-2xl shadow-[#D4AF37]/50"
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
                    scale: [0, 1.1, 0.5],
                    x: particle.x,
                    y: particle.y,
                    rotate: particle.rotate,
                  }}
                  transition={{
                    duration: 1.4,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                >
                  <FaStar className="text-[#D4AF37] text-sm" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Back link */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 container mx-auto px-4">
          <Link
            href="/rosters/creators"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all group/back"
          >
            <FiArrowLeft className="group-hover/back:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Creators</span>
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-5 sm:pb-7">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-black shadow-2xl shadow-[#D4AF37]/30 group/avatar"
            >
              <Image
                src={creator.avatar}
                alt={creator.name}
                fill
                className="object-cover transition-all duration-500 group-hover/avatar:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/25 via-transparent to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
            </motion.div>

            {/* Text + badges + stats */}
            <div className="flex-1 pb-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center flex-wrap gap-2 sm:gap-3 mb-2"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[11px] sm:text-xs text-white/80">
                  <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${tierMeta.dotClass}`}
                    animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
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
                      <span className="tracking-[0.08em] uppercase text-[10px] sm:text-[11px] text-white/60">
                        {regionCode}
                      </span>
                    </>
                  )}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black -mt-0.5 mb-2 bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent"
              >
                {creator.name}
              </motion.h1>

              {/* Quick stats under name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-white/70"
              >
                {totalReach > 0 && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                    <FiUsers className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>
                      Total reach{" "}
                      <span className="font-semibold text-white">
                        {formatCompactNumber(totalReach)}
                      </span>
                    </span>
                  </div>
                )}

                {primaryPlatformKey && SOCIAL_CONFIG[primaryPlatformKey] && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                    <FiTrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
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
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto lg:items-start">
          {/* Latest videos (left) */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {latestVideos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6 sm:p-8 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 flex items-center gap-3">
                  <FiPlay className="text-[#D4AF37]" size={22} />
                  Latest Content
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + idx * 0.06 }}
                        whileHover={{ y: -6 }}
                        className="group relative"
                      >
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-lg group-hover:shadow-[#D4AF37]/25">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-end p-3 sm:p-4">
                            <div className="w-full space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-semibold group-hover:text-[#FFD700] transition-colors line-clamp-2">
                                  {video.title}
                                </span>
                                <FiExternalLink className="text-white/60 group-hover:text-[#FFD700] transition-colors shrink-0 w-4 h-4" />
                              </div>
                              <div className="flex items-center justify-between text-[10px] sm:text-xs text-white/60">
                                <span className="flex items-center gap-1">
                                  {platformIcon}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right sidebar: Connect with numbers only */}
          <div className="lg:order-last">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card p-6 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 lg:sticky lg:top-24"
            >
              <h3 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
                Connect
              </h3>

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
            </motion.div>
          </div>
        </div>
      </div>
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
  icon: ComponentType<{ size?: number; className?: string }>;
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
      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40 group"
    >
      <Icon
        size={18}
        className="group-hover:scale-110 transition-transform shrink-0 sm:w-5 sm:h-5"
      />
      <span className="font-semibold text-sm sm:text-base flex-1">
        {label}
      </span>
      {count && (
        <span className="text-xs sm:text-sm text-white/70 whitespace-nowrap">
          {count}
          {unit ? ` ${unit}` : ""}
        </span>
      )}
      <FiExternalLink className="opacity-0 group-hover:opacity-100 transition-all shrink-0 w-3.5 h-3.5" />
    </motion.a>
  );
}

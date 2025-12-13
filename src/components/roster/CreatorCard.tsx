"use client";

import { useState, useMemo } from "react";
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
            
            {/* Tier Badge - Smaller on mobile */}
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
              <div
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border ${tierConfig.borderColor}`}
              >
                <span
                  className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${tierConfig.gradient} bg-clip-text text-transparent`}
                >
                  {tierConfig.label}
                </span>
              </div>
            </div>

            {/* Stats Overlay - Bottom, more compact on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
              <h3 className="text-base sm:text-2xl font-black text-white mb-0.5 sm:mb-1 line-clamp-1">
                {creator.name}
              </h3>
              {totalFans > 0 && (
                <p className="text-xs sm:text-sm text-white/70 font-medium">
                  {formatFans(totalFans)} followers
                </p>
              )}
            </div>

            {/* Hover Arrow - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-4 right-4 hidden sm:block"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <HiArrowRight className="text-white text-lg" />
              </div>
            </motion.div>
          </div>

          {/* Info Section - More compact on mobile */}
          <div className="relative p-2 sm:p-4 bg-black/40 backdrop-blur-sm border-t border-white/5">
            {/* Platforms */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {platforms.map(({ key, value }) => (
                <button
                  key={String(key)}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (value?.url) window.open(value.url, "_blank", "noopener,noreferrer");
                  }}
                  className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-200"
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

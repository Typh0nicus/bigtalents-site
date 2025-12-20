"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/featuredAlgorithm";
import { CreatorCard } from "@/components/roster/CreatorCard";
import { FaStar, FaTrophy } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { GridOverlay } from "@/components/ui/GridOverlay";

const GOLD = "#D4AF37";

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

function formatCompact(n: number): string {
  if (!Number.isFinite(n) || n <= 0) return "0";
  if (n < 1000) return n.toLocaleString();
  return compactFormatter.format(n);
}

type CreatorWithViews = Creator & {
  totalViews?: number;
};

interface CreatorsClientProps {
  creators: CreatorWithViews[];
}

export function CreatorsClient({ creators }: CreatorsClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  const { sortedCreators, combinedReach, combinedViews, tierGroups } = useMemo(() => {
    const tierOrder: Record<Creator["tier"], number> = {
      elite: 0,
      partnered: 1,
      academy: 2,
    };

    const sorted = [...creators].sort(
      (a, b) => tierOrder[a.tier] - tierOrder[b.tier]
    );

    let reach = 0;
    let views = 0;

    for (const c of sorted) {
      reach +=
        (c.platforms.youtube?.subscribers ?? 0) +
        (c.platforms.twitch?.followers ?? 0) +
        (c.platforms.tiktok?.followers ?? 0) +
        (c.platforms.x?.followers ?? 0);

      views += c.totalViews ?? 0;
    }

    // Group by tier
    const groups = {
      elite: sorted.filter(c => c.tier === "elite"),
      partnered: sorted.filter(c => c.tier === "partnered"),
      academy: sorted.filter(c => c.tier === "academy"),
    };

    return {
      sortedCreators: sorted,
      combinedReach: reach,
      combinedViews: views,
      tierGroups: groups,
    };
  }, [creators]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black text-white antialiased select-none">
      {/* Enhanced gradient background with vibrant accents */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(255,187,0,0.14) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(212,175,55,0.10) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,215,0,0.08) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Refined grid overlay */}
        <GridOverlay opacity={0.03} size={26} />
        
        {/* Gloss blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-black/10 pointer-events-none" />
        {/* Subtle grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section - Redesigned with raised content */}
      <section className="relative z-10 pt-24 lg:pt-32 pb-12 lg:pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-20 relative z-10">
            {/* Star medallion with pulse fade on outer layer and animated star */}
            <motion.div
              className="inline-flex mb-6 sm:mb-7 relative"
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              {/* Pulsing atmospheric glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 60%)`,
                  filter: "blur(30px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />
              
              {/* Outer layer - pulse and fade only */}
              <motion.div
                className="rounded-full p-3.5 sm:p-4 border border-white/10 bg-white/[0.03] backdrop-blur relative z-10"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.04), 0 16px 50px rgba(0,0,0,0.7)",
                }}
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [1, 0.75, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }}
              >
                {/* Inner yellow star - static background, no pulse */}
                <div
                  className="rounded-full p-3 sm:p-3.5"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #FFD700)`,
                    boxShadow: "inset 0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Animated star icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaStar className="text-black text-2xl sm:text-3xl" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Title with enhanced gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-6"
            >
              <span className="block text-white/90">Meet Our</span>
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37]"
              >
                Creators
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12"
            >
              Elite content creators dominating{" "}
              <span className="text-[#FFBB00] font-bold">YouTube, Twitch, and TikTok</span>
            </motion.p>
            {/* Stats with vibrant gradients */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
            >
              <div className="text-center">
                <div className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37] mb-2">
                  {formatCompact(combinedReach)}
                </div>
                <div className="text-sm text-white/50 uppercase tracking-wider">Total Reach</div>
              </div>
              {combinedViews > 0 && (
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37] mb-2">
                    {formatCompact(combinedViews)}
                  </div>
                  <div className="text-sm text-white/50 uppercase tracking-wider">Total Views</div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creator Sections by Tier */}
      <section className="relative z-10 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Elite Tier */}
          {tierGroups.elite.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 border border-[#D4AF37]/30">
                  <FaTrophy className="text-[#D4AF37] text-sm" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Elite Creators
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {tierGroups.elite.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CreatorCard creator={creator} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Partnered Tier */}
          {tierGroups.partnered.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30">
                  <FaStar className="text-purple-400 text-sm" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Partnered Creators
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {tierGroups.partnered.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CreatorCard creator={creator} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Academy Tier */}
          {tierGroups.academy.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-400/30">
                  <HiSparkles className="text-sky-400 text-sm" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    Academy Creators
                  </span>
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {tierGroups.academy.map((creator, index) => (
                  <motion.div
                    key={creator.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CreatorCard creator={creator} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

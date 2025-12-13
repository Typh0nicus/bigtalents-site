"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/featuredAlgorithm";
import { CreatorCard } from "@/components/roster/CreatorCard";
import { FaStar } from "react-icons/fa";
import { FiUsers, FiPlay } from "react-icons/fi";

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

  const { sortedCreators, combinedReach, combinedViews } = useMemo(() => {
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

    return {
      sortedCreators: sorted,
      combinedReach: reach,
      combinedViews: views,
    };
  }, [creators]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Floating icons positions (hugging the edges of the hero, not the title)
  const floatPositions = [
    { left: "7%", top: "30%" },
    { left: "18%", top: "18%" },
    { left: "33%", top: "42%" },
    { left: "63%", top: "20%" },
    { left: "78%", top: "36%" },
    { left: "90%", top: "24%" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white select-none">
      {/* BACKGROUND: aurora + dot grid + vignette */}
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Auroras (stronger gold on the left) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1300px 650px at 15% -10%, rgba(212,175,55,0.26), transparent 60%),
              radial-gradient(1100px 550px at 82% 8%, rgba(139,92,246,0.22), transparent 60%),
              radial-gradient(900px 520px at 10% 55%, rgba(30,64,175,0.18), transparent 65%)
            `,
          }}
        />
        {/* Dot grid – more visible so it doesn't feel like dust */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/80" />
      </motion.div>

      {/* HERO */}
      <section className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-10 md:pb-14 flex items-center justify-center overflow-hidden">
        {/* Floating icons layer (only in hero) */}
        {isMounted && (
          <div className="pointer-events-none absolute inset-0">
            {floatPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={pos}
                animate={{
                  y: [0, -26, 0],
                  opacity: [0.25, 0.6, 0.25],
                  rotate: [0, 200, 360],
                }}
                transition={{
                  duration: 8 + i * 0.7,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <FiPlay className="text-[#D4AF37] text-lg sm:text-xl md:text-2xl drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Star medallion */}
            <motion.div
              className="inline-flex mb-5 sm:mb-6 md:mb-7"
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              <div
                className="rounded-full p-2.5 sm:p-3.5 md:p-4 border border-white/10 bg-white/[0.03] backdrop-blur"
                style={{
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.04), 0 16px 50px rgba(0,0,0,0.7)",
                }}
              >
                <div
                  className="rounded-full p-2.5 sm:p-3 md:p-3.5"
                  style={{
                    background: `linear-gradient(135deg, ${GOLD}, #FFD700)`,
                    boxShadow: `0 0 26px rgba(212,175,55,0.4)`,
                  }}
                >
                  <FaStar className="text-black text-xl sm:text-2xl md:text-3xl" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
              <span className="text-white">OUR </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #FFFFFF, #FFE28A, #D4AF37)",
                }}
              >
                CREATORS
              </span>
            </h1>

            {/* Underline */}
            <div className="mx-auto mt-3 sm:mt-4 mb-4 sm:mb-5 h-[2px] w-12 sm:w-16 md:w-20 rounded-full bg-[#D4AF37]/90" />

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg text-white/75 max-w-3xl mx-auto px-4">
              Big Talents creators across{" "}
              <span className="text-white">YouTube, Twitch, TikTok</span>.
            </p>

            {/* Inline stats */}
            <motion.div
              className="mt-6 sm:mt-7 md:mt-8"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18, ease: "easeOut" }}
            >
              <div className="flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm md:text-base text-white/70">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFD700]">
                  {formatCompact(combinedReach)}
                </span>
                <span className="tracking-wide">combined reach</span>

                {combinedViews > 0 && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFD700]">
                      {formatCompact(combinedViews)}
                    </span>
                    <span className="tracking-wide">views</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* View creators link */}
            <motion.div
              className="mt-6 sm:mt-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            >
              <a
                href="#creators"
                className="inline-flex items-center gap-2 text-white/40 hover:text-[#D4AF37] transition-colors text-xs sm:text-sm"
              >
                <FiUsers className="text-sm" />
                <span>View Creators</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fade into cards */}
      <div className="pointer-events-none absolute inset-x-0 top-[48vh] sm:top-[52vh] md:top-[56vh] h-40 bg-gradient-to-b from-transparent via-black/40 to-black" />

      {/* CREATOR GRID */}
      <section
        id="creators"
        className="relative z-10 pb-16 sm:pb-20 md:pb-24 pt-2 sm:pt-4 md:pt-8"
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-5 md:mb-6 flex items-center justify-between gap-2 sm:gap-3">
              <h2 className="text-[0.65rem] sm:text-[0.7rem] md:text-xs font-medium uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/55">
                Active roster
              </h2>
              <span className="text-[0.65rem] sm:text-[0.7rem] md:text-xs text-white/40">
                {sortedCreators.length} creators
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-8">
              {sortedCreators.map((creator, index) => (
                <motion.div
                  key={creator.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="h-full"
                >
                  <CreatorCard creator={creator} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

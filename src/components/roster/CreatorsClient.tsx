"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { Creator } from "@/lib/featuredAlgorithm";
import { FiUsers, FiPlay } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { CreatorCard } from "@/components/roster/CreatorCard";

const compactFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  compactDisplay: "short",
  maximumFractionDigits: 1,
});

function formatCompact(n: number): string {
  if (n < 1000) return n.toLocaleString();
  return compactFormatter.format(n);
}

// Extend Creator with optional totalViews coming from server
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

      // this is the field we'll compute server-side
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

  return (
    <div className="w-full min-h-screen overflow-hidden bg-black text-white select-none">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.15), transparent 50%),
              radial-gradient(1200px 600px at 80% 10%, rgba(168,85,247,0.2), transparent 50%),
              radial-gradient(1000px 500px at 50% 100%, rgba(139,92,246,0.15), transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.4, 0.1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <FiPlay className="text-[#D4AF37] text-2xl" />
              </motion.div>
            ))}
          </div>
        )}

        <div className="container relative z-10 px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            {/* Star badge like players trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/50 ring-4 ring-[#D4AF37]/20">
                <FaStar className="text-black text-5xl" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                OUR CREATORS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            >
              Content creators representing Big Talents across{" "}
              <span className="text-[#D4AF37]">YouTube, Twitch and TikTok</span>.
            </motion.p>

            {/* REACH + VIEWS LINE */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-white/60 mb-8 text-lg sm:text-xl"
            >
              <span className="text-[#FFD700] font-semibold text-2xl">
                {formatCompact(combinedReach)}
              </span>{" "}
              combined reach
              {combinedViews > 0 && (
                <>
                  <span className="mx-3 text-white/30">•</span>
                  <span className="text-[#FFD700] font-semibold text-2xl">
                    {formatCompact(combinedViews)}
                  </span>{" "}
                  views
                </>
              )}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <a
                href="#creators"
                className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
              >
                <FiUsers /> View Creators
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* CREATOR CARDS */}
      <section
        id="creators"
        className="container mx-auto px-4 pb-24 pt-16 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {sortedCreators.map((creator, index) => (
              <CreatorCard key={creator.id} creator={creator} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

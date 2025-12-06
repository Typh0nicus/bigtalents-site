"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiCalendar, FiGlobe } from "react-icons/fi";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";
import { COMPETITIVE_RESULTS, type TournamentResult } from "@/data/competitiveResults";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type FilterKey = "all" | "lan" | "online";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Events" },
  { key: "lan", label: "LAN" },
  { key: "online", label: "Online" },
];

// Placement styling
function getPlacementStyle(placementNum: number) {
  switch (placementNum) {
    case 1:
      return {
        bg: "from-[#FFD700]/25 to-[#D4AF37]/15",
        border: "border-[#FFD700]/50 hover:border-[#FFD700]/80",
        text: "text-[#FFD700]",
        glow: "shadow-[#FFD700]/30",
        icon: FaTrophy,
        emoji: "🥇",
        badge: "bg-gradient-to-r from-[#FFD700] to-[#D4AF37] text-black",
      };
    case 2:
      return {
        bg: "from-[#C0C0C0]/25 to-[#A8A8A8]/15",
        border: "border-[#C0C0C0]/50 hover:border-[#C0C0C0]/80",
        text: "text-[#C0C0C0]",
        glow: "shadow-[#C0C0C0]/30",
        icon: FaMedal,
        emoji: "🥈",
        badge: "bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] text-black",
      };
    case 3:
      return {
        bg: "from-[#CD7F32]/25 to-[#B87333]/15",
        border: "border-[#CD7F32]/50 hover:border-[#CD7F32]/80",
        text: "text-[#CD7F32]",
        glow: "shadow-[#CD7F32]/30",
        icon: FaMedal,
        emoji: "🥉",
        badge: "bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-black",
      };
    default:
      return {
        bg: "from-white/10 to-white/5",
        border: "border-white/20 hover:border-white/40",
        text: "text-white/70",
        glow: "shadow-white/10",
        icon: FaStar,
        emoji: "",
        badge: "bg-white/20 text-white",
      };
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ResultCard({ result, index }: { result: TournamentResult; index: number }) {
  const style = getPlacementStyle(result.placementNum);
  const Icon = style.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: EASE_OUT 
      }}
      className="group relative h-full flex flex-col select-none"
    >
      {/* Main Card */}
      <div className={`card overflow-hidden h-full flex flex-col backdrop-blur-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl ${style.glow}`}>
        {/* Image/Banner */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {result.image ? (
            <Image
              src={result.image}
              alt={result.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <Icon className="text-6xl text-[#D4AF37] opacity-40" />
            </div>
          )}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Placement Badge - Top Left */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-black ${style.badge} shadow-lg`}>
              {style.emoji} {result.placement}
            </span>
          </div>

          {/* Event Type Badge - Top Right */}
          <div className="absolute top-3 right-3">
            <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              result.eventType === "lan"
                ? "bg-[#D4AF37]/90 text-black"
                : "bg-black/70 text-white/90 border border-white/20"
            } backdrop-blur-md shadow-lg`}>
              {result.eventType}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/[0.02]">
          {/* Tournament Name */}
          <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
            {result.name}
          </h3>

          {/* Meta information */}
          <div className="flex flex-col gap-2.5 mb-4">
            <div className="flex items-center gap-2.5 text-white/70 group-hover:text-white/90 transition-colors duration-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                <FiCalendar className="text-[#D4AF37]" size={16} />
              </div>
              <span className="text-sm font-medium">{formatDate(result.date)}</span>
            </div>
            
            {result.region && (
              <div className="flex items-center gap-2.5 text-white/70 group-hover:text-white/90 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                  <FiGlobe className="text-[#D4AF37]" size={16} />
                </div>
                <span className="text-sm font-medium">{result.region}</span>
              </div>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* External Links */}
          <div className="flex gap-2 pt-4 border-t border-white/5">
            {result.liquipedia && (
              <a
                href={result.liquipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 text-xs py-2.5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-200 inline-flex items-center justify-center gap-1.5 font-medium"
              >
                Liquipedia <FiExternalLink size={12} />
              </a>
            )}
            {result.matcherino && (
              <a
                href={result.matcherino}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline flex-1 text-xs py-2.5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-200 font-medium"
              >
                Matcherino
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
}

export default function TournamentsPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredResults = useMemo(() => {
    let results = [...COMPETITIVE_RESULTS];

    // Filter by event type
    if (filter !== "all") {
      results = results.filter((r) => r.eventType === filter);
    }

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return results;
  }, [filter]);

  return (
    <div className="relative min-h-screen">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -10%, rgba(212,175,55,0.08), transparent 60%),
              radial-gradient(1200px 600px at 80% 10%, rgba(224,184,79,0.05), transparent 60%),
              radial-gradient(1000px 500px at 50% 100%, rgba(212,175,55,0.04), transparent 60%)
            `,
          }}
        />

        {/* Floating Trophy Particles */}
        {isMounted && (
          <div className="opacity-20">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 8) % 100}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.15, 0.4, 0.15],
                }}
                transition={{
                  duration: 7 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <FaTrophy className="text-[#D4AF37]" size={i % 2 === 0 ? 10 : 6} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/40">
                <FaTrophy className="text-black text-3xl md:text-4xl" />
              </div>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
              <span className="text-white">Competition</span>{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Record
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/60 mb-8 leading-relaxed max-w-xl mx-auto">
              BGT&apos;s competitive placements and achievements in Brawl Stars esports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative pb-20">
        <div className="container px-4 sm:px-6">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  filter === f.key
                    ? "bg-[#D4AF37] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="text-white/40 text-sm ml-2">
              {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"}
            </span>
          </motion.div>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredResults.map((result, index) => (
                <ResultCard key={result.id} result={result} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
                <FaTrophy className="text-4xl text-white/20" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No Results Found</h3>
              <p className="text-white/60 mb-6">Try adjusting your filters</p>
              <button
                onClick={() => setFilter("all")}
                className="btn btn-primary rounded-xl"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

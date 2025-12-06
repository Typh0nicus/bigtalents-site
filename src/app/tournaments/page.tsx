"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiCalendar, FiAward, FiArrowRight } from "react-icons/fi";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";
import { COMPETITIVE_RESULTS, type TournamentResult } from "@/data/competitiveResults";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const PARTICLE_COUNT = 18;

type FilterKey = "all" | "lan" | "online";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Events" },
  { key: "lan", label: "LAN" },
  { key: "online", label: "Online" },
];

// Placement styling - more subtle colors
function getPlacementStyle(placementNum: number) {
  switch (placementNum) {
    case 1:
      return {
        text: "text-[#FFD700]",
        icon: FaTrophy,
        label: "1st Place",
      };
    case 2:
      return {
        text: "text-[#C0C0C0]",
        icon: FaMedal,
        label: "2nd Place",
      };
    case 3:
      return {
        text: "text-[#CD7F32]",
        icon: FaMedal,
        label: "3rd Place",
      };
    default:
      return {
        text: "text-white/70",
        icon: FaStar,
        label: `Top ${placementNum}`,
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
  const [isHovered, setIsHovered] = useState(false);
  const style = getPlacementStyle(result.placementNum);
  const Icon = style.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.08,
        ease: EASE_OUT 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div 
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-[#D4AF37]/30"
        animate={isHovered ? { y: -8, scale: 1.01 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* Image/Banner */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            {result.image ? (
              <Image
                src={result.image}
                alt={result.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index < 3}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black">
                <Icon className="text-6xl text-[#D4AF37] opacity-30" />
              </div>
            )}
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Shine effect on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="shine"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div
                  className="h-full w-[60%] bg-white/25"
                  style={{
                    transform: "skewX(-18deg)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom badges on image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            {/* Placement badge */}
            <span className={`inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${style.text}`}>
              <Icon size={10} />
              {style.label}
            </span>

            {/* Event type badge */}
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-sm ${
              result.eventType === "lan"
                ? "bg-[#D4AF37]/90 text-black border border-[#D4AF37]/50"
                : "bg-black/70 text-white/80 border border-white/15"
            }`}>
              {result.eventType}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Tournament Name */}
          <h3 className="font-semibold text-base sm:text-lg text-white line-clamp-2 transition-colors duration-150 group-hover:text-white mb-3 leading-tight">
            {result.name}
          </h3>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/60 mb-4">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="text-[#D4AF37]" size={12} />
              <span>{formatDate(result.date)}</span>
            </div>
            {result.prizeWon && (
              <div className="flex items-center gap-1.5">
                <FiAward className="text-[#D4AF37]" size={12} />
                <span className="text-[#D4AF37] font-medium">${result.prizeWon.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* View Details CTA */}
          <div className="flex items-center gap-1.5 text-[#D4AF37] opacity-80 transition group-hover:opacity-100">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
              View Details
            </span>
            <FiArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* External Links - hover reveal */}
        <AnimatePresence>
          {isHovered && (result.liquipedia || result.matcherino) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-white/10"
            >
              <div className="flex gap-2 p-4">
                {result.liquipedia && (
                  <a
                    href={result.liquipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    Liquipedia <FiExternalLink size={10} />
                  </a>
                )}
                {result.matcherino && (
                  <a
                    href={result.matcherino}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    Matcherino <FiExternalLink size={10} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
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

  const totalEvents = COMPETITIVE_RESULTS.length;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white select-none">
      {/* Enhanced Background - Positions style */}
      <motion.div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.08), transparent 50%),
              radial-gradient(1200px 600px at 80% 15%, rgba(139,92,246,0.06), transparent 50%),
              radial-gradient(1000px 500px at 50% 100%, rgba(15,23,42,0.92), transparent 50%)
            `,
          }}
        />

        {/* Floating Particles - like positions */}
        {isMounted && (
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${(i * 6.66) % 100}%`,
                  top: `${(i * 8.33) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.9, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Hero Section - Positions style */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="container relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Icon with glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: EASE_OUT,
              }}
              className="inline-flex mb-6 relative"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-2xl blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative p-3.5 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-2xl shadow-2xl shadow-[#D4AF37]/40 ring-2 ring-[#D4AF37]/20">
                <FaTrophy className="w-8 h-8 text-black" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Competition Record
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed max-w-2xl mx-auto"
            >
              BGT&apos;s competitive placements and achievements in Brawl Stars esports.
            </motion.p>

            {/* Stats row - like positions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-white/60">
                  <span className="text-[#D4AF37] font-bold">{totalEvents}</span>{" "}
                  Events
                </span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="text-white/50">
                <span className="text-[#D4AF37] font-bold">
                  {COMPETITIVE_RESULTS.filter(r => r.eventType === "lan").length}
                </span>{" "}
                LAN Tournaments
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* Results Section */}
      <section className="relative z-10 container mx-auto px-4 pb-32 pt-4">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-2 mb-10"
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
        </motion.div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <motion.div 
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredResults.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </motion.div>
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
      </section>
    </div>
  );
}

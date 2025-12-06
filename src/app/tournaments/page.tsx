"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiCalendar, FiAward } from "react-icons/fi";
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

function formatPrize(prize: number) {
  // Format like "3k+" for 3021, "180+" for 182
  if (prize >= 1000) {
    const k = Math.floor(prize / 1000);
    return `${k}k+`;
  }
  const rounded = Math.floor(prize / 10) * 10;
  return `${rounded}+`;
}

function ResultCard({ result, index }: { result: TournamentResult; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false); // For mobile
  const style = getPlacementStyle(result.placementNum);
  const Icon = style.icon;
  
  // Combined state for showing links (hover on desktop, tap on mobile)
  const showLinks = isHovered || isTapped;

  const handleTap = () => {
    // Toggle on tap for mobile
    setIsTapped(prev => !prev);
  };

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
      onClick={handleTap}
      className="group relative cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/20">
        {/* Image/Banner */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={showLinks ? { scale: 1.03 } : { scale: 1 }}
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
                <Icon className="text-5xl sm:text-6xl text-[#D4AF37] opacity-30" />
              </div>
            )}
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Shine effect on hover */}
          <AnimatePresence>
            {showLinks && (
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
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between gap-2">
            {/* Placement badge */}
            <span className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/15 bg-black/70 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] backdrop-blur-sm ${style.text}`}>
              <Icon size={9} className="sm:hidden" />
              <Icon size={10} className="hidden sm:block" />
              {style.label}
            </span>

            {/* Event type badge - glassy yellowish for LAN */}
            <span className={`rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] backdrop-blur-sm ${
              result.eventType === "lan"
                ? "bg-[#D4AF37]/15 text-[#FFD700] border border-[#D4AF37]/30"
                : "bg-black/70 text-white/80 border border-white/15"
            }`}>
              {result.eventType}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Tournament Name */}
          <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white line-clamp-2 transition-colors duration-150 group-hover:text-white mb-2 sm:mb-3 leading-tight">
            {result.name}
          </h3>

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-white/60">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <FiCalendar className="text-[#D4AF37]" size={11} />
              <span>{formatDate(result.date)}</span>
            </div>
            {result.prizeWon && (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <FiAward className="text-[#D4AF37]" size={11} />
                <span className="text-[#D4AF37] font-medium">${formatPrize(result.prizeWon)}</span>
              </div>
            )}
          </div>

          {/* External Links - slide down on hover/tap */}
          <AnimatePresence>
            {showLinks && (result.liquipedia || result.matcherino) && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 pt-1">
                  {result.liquipedia && (
                    <a
                      href={result.liquipedia}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      Liquipedia <FiExternalLink size={9} className="sm:hidden" /><FiExternalLink size={10} className="hidden sm:block" />
                    </a>
                  )}
                  {result.matcherino && (
                    <a
                      href={result.matcherino}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-[11px] font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200"
                    >
                      Matcherino <FiExternalLink size={9} className="sm:hidden" /><FiExternalLink size={10} className="hidden sm:block" />
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="min-h-screen relative overflow-hidden bg-black text-white select-none"
    >
      {/* Background with floating trophies - absolute not fixed so it doesn't follow scroll */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -10%, rgba(212,175,55,0.12), transparent 60%),
              radial-gradient(1200px 600px at 80% 10%, rgba(139,92,246,0.06), transparent 60%),
              radial-gradient(1000px 500px at 50% 100%, rgba(212,175,55,0.06), transparent 60%)
            `,
          }}
        />

        {/* Floating Trophy Particles - Bigger and better distributed */}
        {isMounted && (
          <div className="opacity-25">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${(i * 5) % 100}%`,
                  top: `${(i * 7) % 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.sin(i) * 15, 0],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 360],
                  scale: 1,
                }}
                transition={{
                  duration: 8 + (i % 3),
                  repeat: Infinity,
                  delay: 0.5 + i * 0.1,
                  ease: "easeInOut",
                }}
              >
                <FaTrophy className="text-[#D4AF37]" size={i % 3 === 0 ? 16 : i % 3 === 1 ? 12 : 8} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Hero Section - Raised a bit */}
      <section className="relative pt-28 pb-10 md:pt-36 md:pb-14 overflow-visible">
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Original style trophy badge - rounded-full with proper glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/50">
                <FaTrophy className="text-black text-3xl sm:text-4xl" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight"
            >
              <span className="text-white">Competition</span>{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Record
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
              className="text-sm sm:text-base md:text-lg text-white/70 mb-6 leading-relaxed max-w-2xl mx-auto px-4"
            >
              BGT&apos;s competitive placements and achievements in Brawl Stars esports.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
              className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm"
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
      </section>

      {/* Results Section */}
      <section className="relative z-10 container mx-auto px-4 pb-24 sm:pb-32">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                filter === f.key
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Results Grid - added extra bottom margin for card expansion space */}
        {filteredResults.length > 0 ? (
          <motion.div 
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.6,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {filteredResults.map((result, index) => (
              <ResultCard key={result.id} result={result} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 sm:py-20"
          >
            <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-white/5 rounded-full mb-4 sm:mb-6">
              <FaTrophy className="text-3xl sm:text-4xl text-white/20" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">No Results Found</h3>
            <p className="text-white/60 mb-4 sm:mb-6 text-sm sm:text-base">Try adjusting your filters</p>
            <button
              onClick={() => setFilter("all")}
              className="btn btn-primary rounded-xl text-sm sm:text-base"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}

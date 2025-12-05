"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FiExternalLink, FiFilter, FiCalendar, FiGlobe, FiAward, FiChevronDown } from "react-icons/fi";
import { FaTrophy, FaMedal, FaStar } from "react-icons/fa";
import Link from "next/link";
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
        bg: "bg-gradient-to-br from-[#FFD700]/20 to-[#D4AF37]/20",
        border: "border-[#FFD700]/40 hover:border-[#FFD700]/60",
        text: "text-[#FFD700]",
        glow: "shadow-[#FFD700]/20",
        icon: FaTrophy,
        emoji: "🥇",
      };
    case 2:
      return {
        bg: "bg-gradient-to-br from-[#C0C0C0]/20 to-[#A8A8A8]/20",
        border: "border-[#C0C0C0]/40 hover:border-[#C0C0C0]/60",
        text: "text-[#C0C0C0]",
        glow: "shadow-[#C0C0C0]/20",
        icon: FaMedal,
        emoji: "🥈",
      };
    case 3:
      return {
        bg: "bg-gradient-to-br from-[#CD7F32]/20 to-[#B87333]/20",
        border: "border-[#CD7F32]/40 hover:border-[#CD7F32]/60",
        text: "text-[#CD7F32]",
        glow: "shadow-[#CD7F32]/20",
        icon: FaMedal,
        emoji: "🥉",
      };
    default:
      return {
        bg: "bg-white/5",
        border: "border-white/10 hover:border-white/20",
        text: "text-white/70",
        glow: "shadow-white/5",
        icon: FaStar,
        emoji: "",
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

// Stats calculation
function calculateStats(results: TournamentResult[]) {
  const totalEvents = results.length;
  const bestPlacement = Math.min(...results.map((r) => r.placementNum));
  const totalPrize = results.reduce((sum, r) => sum + (r.prizeWon ?? 0), 0);
  const lanEvents = results.filter((r) => r.eventType === "lan").length;
  
  return {
    totalEvents,
    bestPlacement: bestPlacement === 1 ? "1st" : bestPlacement === 2 ? "2nd" : bestPlacement === 3 ? "3rd" : `Top ${bestPlacement}`,
    totalPrize,
    lanEvents,
  };
}

function ResultCard({ result, index }: { result: TournamentResult; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const style = getPlacementStyle(result.placementNum);
  const Icon = style.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${style.bg} ${style.border} ${style.glow}`}
      >
        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${style.bg} ${style.border} border`}>
                <Icon className={`text-xl ${style.text}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-black ${style.text}`}>
                    {style.emoji} {result.placement}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      result.eventType === "lan"
                        ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                        : "bg-white/10 text-white/70 border border-white/20"
                    }`}
                  >
                    {result.eventType}
                  </span>
                </div>
                <p className="text-sm text-white/50">{result.game}</p>
              </div>
            </div>
          </div>

          {/* Tournament Name */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-2">
            {result.name}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60 mb-4">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="text-[#D4AF37]" />
              <span>{formatDate(result.date)}</span>
            </div>
            {result.region && (
              <div className="flex items-center gap-1.5">
                <FiGlobe className="text-[#D4AF37]" />
                <span>{result.region}</span>
              </div>
            )}
            {result.prizeWon && (
              <div className="flex items-center gap-1.5">
                <FiAward className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] font-semibold">${result.prizeWon.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {result.liquipedia && (
              <a
                href={result.liquipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-200"
              >
                Liquipedia <FiExternalLink size={12} />
              </a>
            )}
            {result.matcherino && (
              <a
                href={result.matcherino}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-200"
              >
                Matcherino <FiExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

function StatsBar({ stats }: { stats: ReturnType<typeof calculateStats> }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const statItems = [
    { label: "Events Competed", value: stats.totalEvents.toString(), icon: FaTrophy },
    { label: "Best Placement", value: stats.bestPlacement, icon: FaMedal },
    { label: "LAN Events", value: stats.lanEvents.toString(), icon: FiGlobe },
    ...(stats.totalPrize > 0
      ? [{ label: "Prize Money", value: `$${stats.totalPrize.toLocaleString()}`, icon: FiAward }]
      : []),
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
    >
      {statItems.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, delay: idx * 0.1, ease: EASE_OUT }}
          className="relative group"
        >
          <div className="card p-5 text-center border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10">
            <motion.div
              className="inline-flex p-2.5 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/10 rounded-xl mb-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <stat.icon className="text-[#D4AF37] text-lg" />
            </motion.div>
            <div className="text-2xl md:text-3xl font-black text-white mb-1 bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-xs text-white/60 font-medium uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 select-none"
    >
      <span className="text-xs sm:text-sm uppercase tracking-wider font-medium">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>
    </motion.div>
  );
}

export default function TournamentsPage() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortBy, setSortBy] = useState<"date" | "placement">("date");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
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

    // Sort
    if (sortBy === "date") {
      results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      results.sort((a, b) => a.placementNum - b.placementNum);
    }

    return results;
  }, [filter, sortBy]);

  const stats = useMemo(() => calculateStats(COMPETITIVE_RESULTS), []);

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 700px at 20% -10%, rgba(212,175,55,0.12), transparent 60%),
                radial-gradient(1200px 600px at 80% 10%, rgba(224,184,79,0.08), transparent 60%),
                radial-gradient(1000px 500px at 50% 100%, rgba(212,175,55,0.06), transparent 60%)
              `,
            }}
          />

          {/* Floating Trophy Particles */}
          {isMounted && (
            <div className="opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, Math.sin(i) * 15, 0],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <FaTrophy className="text-[#D4AF37]" size={i % 2 === 0 ? 12 : 8} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="container relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/50">
                <FaTrophy className="text-black text-4xl" />
              </div>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="text-white">Competition</span>{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Record
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto">
              BGT&apos;s journey through competitive Brawl Stars. Tracking our placements, achievements, and growth as an organization.
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/matcherinos"
                className="btn btn-outline rounded-xl px-6 py-3 text-base hover:bg-[#D4AF37]/10 transition-all"
              >
                View Hosted Events Archive
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6">
          {/* Stats Bar */}
          <StatsBar stats={stats} />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <FiFilter className="text-white/40" />
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
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "placement")}
              className="rounded-xl border border-white/15 bg-black px-4 py-2 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-200"
            >
              <option value="date" className="bg-black">
                Sort by Date
              </option>
              <option value="placement" className="bg-black">
                Sort by Placement
              </option>
            </select>
          </motion.div>

          {/* Results count */}
          <p className="text-white/40 text-sm mb-6">
            Showing {filteredResults.length} {filteredResults.length === 1 ? "result" : "results"}
          </p>

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

"use client";

import { useMemo, useState } from "react";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import type { Variants } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function parseWhen(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(
    s.replace("GMT+1", "GMT+0100").replace("GMT", "GMT+0000")
  );
  return Number.isNaN(t) ? 0 : t;
}

type SortKey = "date" | "title" | "prize";
type FilterKey = "all" | "upcoming" | "past";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "title", label: "Title" },
  { key: "prize", label: "Prize" },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
];

const gridStagger: Variants = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE_OUT },
  },
};

export default function TournamentsPage() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("date");
  const [dir, setDir] = useState<"desc" | "asc">("desc");
  const [filter, setFilter] = useState<FilterKey>("all");

  const totalPrize = useMemo(
    () => TOURNAMENTS
      .filter(t => t.archived)
      .reduce((acc, t) => acc + (t.prizeUsd ?? 0), 0),
    []
  );

  const filteredTournaments = useMemo(() => {
    const s = q.trim().toLowerCase();
    
    // Apply status filter
    let tournaments = filter === "all" 
      ? TOURNAMENTS 
      : filter === "upcoming"
      ? TOURNAMENTS.filter(t => !t.archived)
      : TOURNAMENTS.filter(t => t.archived);

    // Apply search
    if (s) {
      tournaments = tournaments.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          (t.date?.toLowerCase().includes(s) ?? false)
      );
    }

    // Sort tournaments
    tournaments = [...tournaments].sort((a, b) => {
      switch (sort) {
        case "title": {
          const A = a.title.toLowerCase();
          const B = b.title.toLowerCase();
          return A === B ? 0 : A < B ? -1 : 1;
        }
        case "prize": {
          const A = a.prizeUsd ?? -Infinity;
          const B = b.prizeUsd ?? -Infinity;
          return A - B;
        }
        case "date":
        default: {
          const A = parseWhen(a.date);
          const B = parseWhen(b.date);
          return A - B;
        }
      }
    });

    if (dir === "desc") {
      tournaments.reverse();
    }

    return tournaments;
  }, [q, sort, dir, filter]);

  const hasResults = filteredTournaments.length > 0;

  return (
    <div className="relative min-h-screen">
      {/* BGT Background System with Master Image */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Master background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('/images/background/bgt-master-bg.png')`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
          }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />
        
        {/* Gold corner glows */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 85% 5%, rgba(255,187,0,0.06), transparent 50%),
              radial-gradient(ellipse 600px 400px at 15% 95%, rgba(212,175,55,0.03), transparent 50%)
            `,
          }}
        />
      </div>
      
      <motion.section
        className="container py-20 select-none relative z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      >
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.25, ease: EASE_OUT }}
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FFBB00] via-[#FFD700] to-[#D4AF37]">
              Tournaments
            </span>
          </h1>
          <p className="text-white/60 mb-6">
            Total prizes awarded:{" "}
            <span className="text-[#D4AF37] font-bold">
              ${(totalPrize + 13 + 30 + 30 + 50).toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
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
            {filteredTournaments.length} {filteredTournaments.length === 1 ? "tournament" : "tournaments"}
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              placeholder="Search tournaments..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-transparent pl-10 pr-10 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-200"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <FiX size={18} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl border border-white/15 bg-black px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37] transition-colors duration-200"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-black">
                  Sort by {s.label}
                </option>
              ))}
            </select>

            <button
              aria-label="Toggle sort direction"
              onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="rounded-xl border border-white/15 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors duration-200 font-bold"
              title={`Direction: ${dir.toUpperCase()}`}
            >
              {dir === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {!hasResults ? (
        <motion.div
          className="mt-14 rounded-xl border border-white/10 bg-white/[0.02] p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: EASE_OUT }}
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
            <FiSearch className="text-4xl text-white/30" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No tournaments found</h3>
          <p className="text-white/60 mb-6">Try adjusting your filters or search query</p>
          <button
            className="btn btn-primary rounded-xl"
            onClick={() => {
              setQ("");
              setSort("date");
              setDir("desc");
              setFilter("all");
            }}
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridStagger}
          initial="hidden"
          animate="show"
        >
          {filteredTournaments.map((t, index) => (
            <motion.div key={t.slug} variants={itemUp}>
              <TournamentCard t={t} index={index} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
    </div>
  );
}

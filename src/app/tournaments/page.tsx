"use client";

import { useMemo, useState } from "react";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useParticipants, keyFromMatcherino } from "@/hooks/useParticipants";

// ---- easing ---------------------------------------------------------------
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// simple date parsing
function parseWhen(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(
    s.replace("GMT+1", "GMT+0100").replace("GMT", "GMT+0000")
  );
  return Number.isNaN(t) ? 0 : t;
}

type SortKey = "date" | "title" | "prize";
const SORTS: { key: SortKey; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "title", label: "Title" },
  { key: "prize", label: "Prize" },
];

// animation configs (typed, and using tuple easing)
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

  const total = useMemo(
    () => TOURNAMENTS.reduce((acc, t) => acc + (t.prizeUsd ?? 0), 0),
    []
  );

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = !s
      ? TOURNAMENTS
      : TOURNAMENTS.filter(
          (t) =>
            t.title.toLowerCase().includes(s) ||
            (t.date?.toLowerCase().includes(s) ?? false)
        );

    list = [...list].sort((a, b) => {
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

    if (dir === "desc") list.reverse();
    return list;
  }, [q, sort, dir]);

  // Build a list of URLs for visible tournaments and fetch participants
  const urls = useMemo(
    () => filtered.map((t) => t.url).filter(Boolean),
    [filtered]
  );
  const pMap = useParticipants(urls);

  return (
    <motion.section
      className="container py-14"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE_OUT }}
    >
      {/* Header / controls */}
      <motion.div
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.25, ease: EASE_OUT }}
      >
        <div>
          <h1 className="h2">Tournaments</h1>
          <p className="caption mt-2">
            Total prizes awarded: $
            {total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="caption">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-black">
                  {s.label}
                </option>
              ))}
            </select>

            <button
              aria-label="Toggle sort direction"
              onClick={() => setDir((d) => (d === "asc" ? "desc" : "asc"))}
              className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
              title={`Direction: ${dir.toUpperCase()}`}
            >
              {dir === "asc" ? "↑" : "↓"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              placeholder="Search by title or date…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
            <a href="https://discord.gg/bgt" className="btn btn-outline rounded-xl">
              Join Big Talents
            </a>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {filtered.length === 0 ? (
        <motion.div
          className="mt-14 rounded-xl border border-white/10 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3, ease: EASE_OUT }}
        >
          <div className="h3">No tournaments match that search.</div>
          <p className="caption mt-2">Try a different keyword or clear your filters.</p>
          <button
            className="btn btn-primary mt-5 rounded-xl"
            onClick={() => {
              setQ("");
              setSort("date");
              setDir("desc");
            }}
          >
            Reset
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8"
          variants={gridStagger}
          initial="hidden"
          animate="show"
        >
          {filtered.map((t) => {
            const k = keyFromMatcherino(t.url);
            const participants = k ? pMap[k] ?? null : null;
            return (
              <motion.div key={t.slug} variants={itemUp}>
                <TournamentCard t={t} participants={participants} />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.section>
  );
}

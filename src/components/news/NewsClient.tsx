"use client";

import { useMemo, useState } from "react";
import { NEWS } from "@/data/news";
import { motion, type Variants } from "framer-motion";
import { NewsCard } from "./NewsCard";

// animation configs (typed + safe easing tuple)
const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, // "easeOut"-like curve
  },
};

export default function NewsClient() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const set = new Set<string>();
    NEWS.forEach((n) => n.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = NEWS;
    if (tag !== "All") list = list.filter((n) => n.tags?.includes(tag));
    if (s) {
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(s) ||
          (n.excerpt?.toLowerCase().includes(s) ?? false)
      );
    }
    // newest first
    return [...list].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [q, tag]);

  return (
    <motion.section
      className="container py-14"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} // TS-safe
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        <div>
          <h1 className="h2">News & Announcements</h1>
          <p className="caption mt-2">
            Tournament recaps, updates, and community info.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = tag === t;
              return (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={
                    "rounded-xl border px-3 py-1 text-sm transition-all " +
                    (active
                      ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black"
                      : "border-white/15 hover:border-[color:var(--gold)]/60")
                  }
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <input
              placeholder="Search news…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/10"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <motion.div
          className="mt-14 rounded-xl border border-white/10 p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="h3">No posts yet.</div>
          <p className="caption mt-2">Try another tag or clear the search.</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={gridStagger}
          initial="hidden"
          animate="show"
        >
          {filtered.map((n) => (
            <motion.div key={n.slug} variants={itemUp}>
              <NewsCard item={n} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

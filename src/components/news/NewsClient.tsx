"use client";

import { useMemo, useState } from "react";
import { NEWS } from "@/data/news";
import { motion, type Variants } from "framer-motion";
import { NewsCard } from "./NewsCard";
import { FiSearch, FiX } from "react-icons/fi";

const gridStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function NewsClient() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Categories = first tag only (Esports / Community / whatever you define as primary)
  const allCategories = useMemo(() => {
    const categorySet = new Set<string>();
    NEWS.forEach((item) => {
      const primary = item.tags?.[0];
      if (primary) categorySet.add(primary);
    });
    return ["All", ...Array.from(categorySet).sort()];
  }, []);

  const filteredNews = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    let filtered = [...NEWS];

    // Filter by primary category (first tag)
    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.tags?.[0] === selectedCategory);
    }

    // Filter by search query (title, excerpt, any tag)
    if (searchTerm) {
      filtered = filtered.filter((item) => {
        const inTitle = item.title.toLowerCase().includes(searchTerm);
        const inExcerpt = item.excerpt
          ? item.excerpt.toLowerCase().includes(searchTerm)
          : false;
        const inTags = item.tags
          ? item.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm)
            )
          : false;

        return inTitle || inExcerpt || inTags;
      });
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [query, selectedCategory]);

  return (
    <motion.section
      className="container pt-32 pb-20 px-4 overflow-x-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.25 }}
      >
        <div className="max-w-2xl">
          <h1 className="h1 mb-4">
            News &{" "}
            <span className="text-[color:var(--gold)]">Updates</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Tournament recaps, roster announcements, creator news, and
            everything happening around Big Talents.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 py-3 w-full sm:w-64 rounded-xl border border-white/15 bg-white/5 text-sm outline-none focus:border-[color:var(--gold)] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Category filters (Esports / Community / etc – first tag only) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.25 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {allCategories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                  : "border-white/15 text-white/80 hover:border-[color:var(--gold)]/50 hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          );
        })}
      </motion.div>

      {/* Results */}
      {filteredNews.length === 0 ? (
        <motion.div
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-xl font-bold mb-2">No articles found</h3>
          <p className="text-white/60 mb-6">
            Try adjusting your search or switching categories.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("All");
            }}
            className="btn btn-outline rounded-xl px-6 py-3"
          >
            Clear filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          variants={gridStagger}
          initial="hidden"
          animate="show"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((item) => (
              <motion.div key={item.slug} variants={itemUp}>
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

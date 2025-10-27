"use client";

import { useMemo, useState } from "react";
import { NEWS } from "@/data/news";
import { motion, type Variants } from "framer-motion";
import { NewsCard } from "./NewsCard";
import { FiSearch, FiX } from "react-icons/fi";

const gridStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
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
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    NEWS.forEach((item) => item.tags?.forEach((tag) => tagSet.add(tag)));
    return ["All", ...Array.from(tagSet).sort()];
  }, []);

  const filteredNews = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    let filtered = NEWS;

    // Filter by tag
    if (selectedTag !== "All") {
      filtered = filtered.filter((item) => item.tags?.includes(selectedTag));
    }

    // Filter by search query
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm) ||
          (item.excerpt?.toLowerCase().includes(searchTerm) ?? false) ||
          (item.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ?? false)
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [query, selectedTag]);

  // Separate featured and regular news
  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

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
          <h1 className="h1 mb-4">News & <span className="text-[color:var(--gold)]">Updates</span></h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Stay updated with tournament results, player achievements, community announcements, 
            and the latest from the Big Talents ecosystem.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
            <input
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 pr-10 py-3 w-full sm:w-64 rounded-xl border border-white/15 bg-white/5 text-sm outline-none focus:border-[color:var(--gold)] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tag filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.25 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {allTags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-[color:var(--gold)] bg-[color:var(--gold)] text-black"
                  : "border-white/15 hover:border-[color:var(--gold)]/50 hover:bg-white/5"
              }`}
            >
              {tag}
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
          <p className="text-white/60 mb-6">Try adjusting your search or selecting a different tag.</p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedTag("All");
            }}
            className="btn btn-outline rounded-xl px-6 py-3"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div className="space-y-12">
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <motion.div
              variants={gridStagger}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-xl font-bold mb-6">Featured</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredNews.slice(0, 2).map((item) => (
                  <motion.div key={item.slug} variants={itemUp}>
                    <NewsCard item={item} featured />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Regular News */}
          {regularNews.length > 0 && (
            <motion.div
              variants={gridStagger}
              initial="hidden"
              animate="show"
            >
              {featuredNews.length > 0 && <h2 className="text-xl font-bold mb-6">Latest News</h2>}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularNews.map((item) => (
                  <motion.div key={item.slug} variants={itemUp}>
                    <NewsCard item={item} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.section>
  );
}

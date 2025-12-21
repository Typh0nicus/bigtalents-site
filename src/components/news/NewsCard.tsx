"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  content?: string; // for building summaries if no excerpt
  featured?: boolean; // kept for compatibility, only used for priority
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getCategory(tags?: string[]): string {
  if (!tags || tags.length === 0) return "Update";

  const primary = tags[0]?.toLowerCase();
  if (primary === "esports") return "Esports";
  if (primary === "community") return "Community";

  // fallback to first tag if it’s something like "Announcement"
  return tags[0] ?? "Update";
}

function buildSummary(item: NewsItem): string | null {
  if (item.excerpt && item.excerpt.trim().length > 0) {
    return item.excerpt.trim();
  }

  if (item.content) {
    const plain = item.content
      .replace(/[#>*`]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!plain) return null;
    if (plain.length <= 190) return plain;
    return plain.slice(0, 187) + "…";
  }

  return null;
}

export function NewsCard({
  item,
  featured = false, // only used for image priority
}: {
  item: NewsItem;
  featured?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const summary = buildSummary(item);
  const category = getCategory(item.tags);
  const imageSrc = item.image ?? "/images/news/news-placeholder.webp";

  return (
    <Link
      href={`/news/${item.slug}`}
      className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      aria-label={`Read: ${item.title}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        whileHover={{ y: -6, scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-black/70 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors duration-300 hover:border-[#FFD700]/60"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {/* IMAGE HEADER */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div
            className="h-full w-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={featured}
            />
          </motion.div>

          {/* dark gradient, same vibe as HomeNews */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

          {/* shine sweep on hover */}
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
                  className="h-full w-[60%] bg-white/35"
                  style={{
                    transform: "skewX(-18deg)",
                    filter: "blur(4px)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* category + date row */}
          <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center rounded-full bg-black/70 border border-white/15 px-2.5 py-1 uppercase tracking-[0.16em] font-semibold text-[10px] text-white/80">
              {category}
            </span>
            <span className="rounded-full bg-black/60 px-2 py-1 text-[11px] text-white/70 font-medium">
              {formatDate(item.date)}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Title + summary block gets a min-height so cards align better */}
          <div className="space-y-1.5 min-h-[4.5rem]">
            <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 transition-colors duration-150 group-hover:text-[#FFD700]">
              {item.title}
            </h3>

            {summary && (
              <p className="text-xs sm:text-sm text-white/70 line-clamp-3">
                {summary}
              </p>
            )}
          </div>

          {/* Bottom row sticks to bottom for equal-height feel */}
          <div className="mt-auto flex items-center justify-between pt-1 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-[#FFD700]/85">
            <span className="font-semibold">Read Article</span>
            <span
              aria-hidden
              className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#FFD700]/60 bg-[#FFD700]/10 text-[11px] group-hover:translate-x-0.5 transition-transform duration-150"
            >
              →
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

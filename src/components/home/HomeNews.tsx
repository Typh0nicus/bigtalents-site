"use client";

import { useState } from "react";
import { NEWS, type NewsItem } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
    if (plain.length <= 160) return plain;
    return plain.slice(0, 157) + "…";
  }

  return null;
}

// smoother, springy hover for the whole card
const cardVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 18px 40px -24px rgba(0,0,0,0.8)",
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 26px 60px -30px rgba(0,0,0,0.95)",
  },
  tap: {
    scale: 0.99,
    y: -2,
  },
} as const;

export function HomeNews() {
  const latestNews: NewsItem[] = [...NEWS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);

  if (!latestNews.length) return null;

  return (
    <section className="relative pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 select-none">
      {/* subtle background: dark on top, prestige glow rising from the bottom */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {/* same grain as hero / featured */}
        <div
          className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* gold band sits at the bottom, hero fades into clean black above */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 md:h-56"
          style={{
            background:
              "radial-gradient(120% 200% at 50% 100%, rgba(212,175,55,0.055), transparent 65%)",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 md:mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
                Featured News
              </span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-white/70 max-w-xl">
              The latest stories from our roster, events, and the Big Talents
              project.
            </p>
          </div>

          <div className="flex md:justify-end">
            <Link
              href="/news"
              className="btn btn-outline btn-sm group border-[#FFD700]/30 hover:border-[#FFD700]/60 hover:text-white"
            >
              <span className="text-sm font-semibold">View all news</span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 text-[#FFD700]" />
            </Link>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {latestNews.map((item, idx) => (
            <NewsCard key={item.slug} item={item} priority={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item, priority }: { item: NewsItem; priority?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const primaryTag = item.tags?.[0] ?? "Update";
  const summary = buildSummary(item);
  const imageSrc = item.image ?? "/images/news/news-placeholder.webp";

  const cardVariants = {
    rest: {
      y: 0,
      scale: 1,
      borderColor: "rgba(255,255,255,0.08)",
    },
    hover: {
      y: -4,
      scale: 1.01,
      borderColor: "rgba(212,175,55,0.3)",
    },
    tap: {
      scale: 0.99,
      y: -2,
    },
  } as const;

  return (
    <Link
      href={`/news/${item.slug}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/80 rounded-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.article
        className="relative rounded-2xl overflow-hidden bg-black/70 border transition-all duration-300"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
        variants={cardVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="tap"
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 0.9,
        }}
        onHoverStart={() => {
          // Apply gold glow on hover via inline style
          const article = document.querySelector(`[data-news-slug="${item.slug}"]`);
          if (article instanceof HTMLElement) {
            article.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(255,187,0,0.08)';
          }
        }}
        onHoverEnd={() => {
          const article = document.querySelector(`[data-news-slug="${item.slug}"]`);
          if (article instanceof HTMLElement) {
            article.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
          }
        }}
        data-news-slug={item.slug}
      >
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={imageSrc}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority={priority}
            />
          </motion.div>

          {/* vignette / subtle gold lift */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: isHovered
                ? "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.28), rgba(212,175,55,0.08), transparent)"
                : "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.15), transparent)",
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />

          {/* Shine on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="shine"
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ x: "-140%", opacity: 0 }}
                animate={{ x: "140%", opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
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

          {/* Tag + date pill on image */}
          <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center rounded-full bg-black/70 border border-white/15 px-2.5 py-1 uppercase tracking-[0.16em] font-semibold text-[10px] text-white/80">
              {primaryTag}
            </span>
            <span className="text-white/70 font-medium bg-black/60 rounded-full px-2 py-1">
              {formatDate(item.date)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 pb-4 flex flex-col gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 group-hover:text-[#FFD700] transition-colors duration-150">
            {item.title}
          </h3>

          {summary && (
            <p className="text-xs sm:text-sm text-white/70 line-clamp-2">
              {summary}
            </p>
          )}

          <div className="mt-2 flex items-center gap-1.5 text-[#FFD700] opacity-85 group-hover:opacity-100 transition">
            <span className="text-[10px] sm:text-xs uppercase font-semibold tracking-[0.18em]">
              Read Story
            </span>
            <FiArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

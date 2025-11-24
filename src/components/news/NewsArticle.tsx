"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { NEWS, type NewsItem } from "@/data/news";
import { NewsCard } from "@/components/news/NewsCard";

function getPrimaryCategory(article: NewsItem): string {
  if (!article.tags || article.tags.length === 0) return "Update";

  const lowered = article.tags.map((t) => t.toLowerCase());
  if (lowered.includes("esports")) return "Esports";
  if (lowered.includes("community")) return "Community";

  // never show "Announcement" as the big badge
  return "Update";
}

function getSecondaryTags(article: NewsItem, primary: string): string[] {
  if (!article.tags) return [];
  const banned = new Set([
    primary.toLowerCase(),
    "announcement",
    "update",
  ]);
  return article.tags.filter((t) => !banned.has(t.toLowerCase()));
}

/**
 * Lightweight markdown-ish renderer:
 * - ## Heading 2
 * - ### Heading 3
 * - - List item
 * - --- or *** → <hr />
 * - **bold** in paragraphs & list items
 * - ![Alt](src) → <figure> + <img> + caption
 */
function buildArticleHtml(content: string): string {
  const lines = content.split("\n");
  const htmlParts: string[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item) => `<li>${item}</li>`).join("");
    htmlParts.push(`<ul>${items}</ul>`);
    listBuffer = [];
  };

  const boldify = (text: string) =>
    text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  for (const raw of lines) {
    const line = raw.trim();

    // Blank line → close any open list
    if (line === "") {
      flushList();
      continue;
    }

    // Horizontal rule
    if (/^[-*]{3,}$/.test(line)) {
      flushList();
      htmlParts.push("<hr />");
      continue;
    }

    // Image
    if (line.startsWith("![")) {
      flushList();
      const match = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (match) {
        const alt = match[1].trim();
        const src = match[2].trim();
        const caption = alt;

        htmlParts.push(`
          <figure class="my-10 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <img src="${src}" alt="${alt}" class="w-full h-auto object-cover" />
            ${
              caption
                ? `<figcaption class="mt-3 px-4 pb-4 text-sm text-white/60">${caption}</figcaption>`
                : ""
            }
          </figure>
        `);
        continue;
      }
    }

    // Headings
    if (line.startsWith("## ")) {
      flushList();
      const text = boldify(line.slice(3).trim());
      htmlParts.push(`<h2>${text}</h2>`);
      continue;
    }
    if (line.startsWith("### ")) {
      flushList();
      const text = boldify(line.slice(4).trim());
      htmlParts.push(`<h3>${text}</h3>`);
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      const itemText = boldify(line.slice(2).trim());
      listBuffer.push(itemText);
      continue;
    }

    // Default paragraph
    const paragraph = boldify(line);
    flushList();
    htmlParts.push(`<p>${paragraph}</p>`);
  }

  flushList();
  return htmlParts.join("");
}

export default function NewsArticle({
  article,
  moreArticles,
}: {
  article: NewsItem;
  moreArticles?: NewsItem[];
}) {
  const readingTime = article.content
    ? Math.ceil(article.content.split(/\s+/).length / 200)
    : 3;

  const primaryCategory = getPrimaryCategory(article);
  const secondaryTags = getSecondaryTags(article, primaryCategory);

  const fallbackMore =
    moreArticles && moreArticles.length > 0
      ? moreArticles
      : NEWS.filter((n) => n.slug !== article.slug).slice(0, 3);

  return (
    <div className="relative min-h-screen py-24 overflow-x-hidden">
      {/* Background: black with subtle gold glows, no blue */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1200px 700px at 50% 0%, rgba(212,175,55,0.09), transparent 60%),
              radial-gradient(900px 600px at 50% 100%, rgba(212,175,55,0.04), transparent 70%),
              linear-gradient(to bottom, #0c0b02ff, #020202ff)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.008] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10 max-w-4xl px-4 sm:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-[#D4AF37] transition-colors duration-200 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Back to News</span>
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 rounded-2xl bg-black/60 border border-white/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl p-6 sm:p-8 lg:p-10"
        >
          {/* Category + secondary tags */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FFD700]">
              <span>{primaryCategory}</span>
            </div>

            {secondaryTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {secondaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] rounded-full border border-white/10 bg-white/[0.03] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <FiCalendar size={16} />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <FiClock size={16} />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-black/40"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg sm:text-xl text-white/80 leading-relaxed font-medium border-l-4 border-[#D4AF37] pl-5 py-2"
            >
              {article.excerpt}
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-li:text-white/80 prose-li:mb-2 prose-li:marker:text-[#D4AF37]
              prose-hr:my-10 prose-hr:border-white/10
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10
              prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70"
          >
            {article.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: buildArticleHtml(article.content),
                }}
              />
            ) : (
              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  Full article content coming soon. Check back later for the
                  complete story.
                </p>
              </div>
            )}
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="pt-8 mt-10 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2">
                  Enjoyed this article?
                </h3>
                <p className="text-white/60 text-sm">
                  Share it with your friends and community.
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    article.title
                  )}&url=${encodeURIComponent(
                    `https://bigtalents.gg/news/${article.slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-white/20 text-sm font-semibold text-white/80 hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all duration-300"
                >
                  Share on X
                </a>
                <a
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#D4AF37] text-black text-sm font-semibold hover:bg-[#FFD700] transition-colors duration-200"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </motion.div>
        </motion.article>

        {/* More News */}
        {fallbackMore.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-16"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl sm:text-2xl font-black">
                More from Big Talents
              </h2>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-3 transition-all duration-200 group text-sm font-semibold"
              >
                <span>View all news</span>
                <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {fallbackMore.map((item) => (
                <NewsCard key={item.slug} item={item} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

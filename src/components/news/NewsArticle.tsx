"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiClock } from "react-icons/fi";
import { NewsItem } from "@/data/news";

export default function NewsArticle({ article }: { article: NewsItem }) {
  const readingTime = article.content
    ? Math.ceil(article.content.split(/\s+/).length / 200)
    : 3;

  return (
    <div className="min-h-screen py-20 overflow-x-hidden">
      <div className="container max-w-4xl">
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

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-semibold bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden"
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-white/80 leading-relaxed font-medium border-l-4 border-[#D4AF37] pl-6 py-2"
            >
              {article.excerpt}
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-black prose-headings:text-white
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-bold
              prose-ul:my-6 prose-li:text-white/80 prose-li:mb-2
              prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-white/70"
          >
            {article.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .split("\n")
                    .map((line) => {
                      if (line.startsWith("## "))
                        return `<h2>${line.slice(3)}</h2>`;
                      if (line.startsWith("### "))
                        return `<h3>${line.slice(4)}</h3>`;
                      if (line.startsWith("- "))
                        return `<li>${line.slice(2)}</li>`;
                      if (line.includes("**"))
                        return `<p>${line.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        )}</p>`;
                      if (line.trim() === "") return "";
                      return `<p>${line}</p>`;
                    })
                    .join(""),
                }}
              />
            ) : (
              <div className="space-y-6">
                <p className="text-white/80 leading-relaxed">
                  Full article content coming soon. Check back later for the complete story!
                </p>
              </div>
            )}
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-8 mt-12 border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Enjoyed this article?</h3>
                <p className="text-white/60 text-sm">
                  Share it with your friends and community!
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
                  className="btn btn-outline px-6 py-3 rounded-xl hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white transition-all duration-300"
                >
                  Share on X
                </a>
                <a
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-6 py-3 rounded-xl"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </motion.div>
        </motion.article>

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <h2 className="text-2xl font-black mb-6">More News</h2>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-3 transition-all duration-200 group"
          >
            <span>View all news</span>
            <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

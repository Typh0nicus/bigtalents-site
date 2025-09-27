"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
};

export function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--gold)]/50 focus-within:border-[color:var(--gold)] ${
        featured ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <Link
        href={`/news/${item.slug}`}
        className="block p-4 sm:p-5 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
        aria-label={`Read: ${item.title}`}
      >
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className={`relative w-full ${featured ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}>
            <Image
              src={item.image ?? "/images/news/placeholder.jpg"}
              alt={item.title}
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              priority={featured}
            />
          </div>
          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {item.featured && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[color:var(--gold)] text-black rounded-full text-xs font-bold">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className={featured ? 'grid gap-4 lg:grid-cols-2' : ''}>
          <div>
            <h3 className={`font-semibold group-hover:text-[color:var(--gold)] transition-colors ${
              featured ? 'text-xl lg:text-2xl' : 'text-lg'
            }`}>
              {item.title}
            </h3>
            
            <p className="caption mt-1 text-white/60">
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {item.excerpt && (
            <div className={featured ? '' : 'mt-3'}>
              <p className={`text-white/80 line-clamp-3 ${
                featured ? 'text-base leading-relaxed' : 'text-sm'
              }`}>
                {item.excerpt}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/10 px-2 py-0.5 text-xs text-white/70 group-hover:border-[color:var(--gold)]/30 transition-colors"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="rounded-lg border border-white/10 px-2 py-0.5 text-xs text-white/50">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </Link>
    </motion.article>
  );
}

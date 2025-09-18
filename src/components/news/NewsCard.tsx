"use client";

import Link from "next/link";
import Image from "next/image";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;            // ISO or human date
  excerpt?: string;
  image?: string;          // e.g. "/images/news/xyz.jpg"
  tags?: string[];
};

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 backdrop-blur-sm
                 transition-colors duration-200 hover:border-[color:var(--gold)]/50 focus-within:border-[color:var(--gold)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <Link
        href={`/news/${item.slug}`}
        className="block outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-xl"
        aria-label={`Read: ${item.title}`}
      >
        {/* 16:9 media with hover micro-zoom */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={item.image ?? "/images/news/placeholder.jpg"}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              priority={false}
            />
          </div>
          {/* gentle readability gradient */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.00),rgba(0,0,0,.06))]"
          />
        </div>

        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="caption mt-1 text-white/60">
          {new Date(item.date).toLocaleDateString()}
        </p>

        {item.excerpt && (
          <p className="mt-3 text-sm text-white/80 line-clamp-3">{item.excerpt}</p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-white/10 px-2 py-0.5 text-xs text-white/70"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

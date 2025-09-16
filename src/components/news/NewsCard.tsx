"use client";

import Link from "next/link";
import { type NewsItem } from "@/data/news";

export function NewsCard({ item }: { item: NewsItem }) {
  const href = item.href ?? `/news/${item.slug}`;

  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden border border-white/10 hover:border-[color:var(--gold)]/50 transition-colors"
      target={item.href ? "_blank" : undefined}
    >
      {/* Image / fallback */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className="h-full w-full bg-gradient-to-br from-white/5 to-white/10"
          />
        )}

        {/* top-right tag */}
        {item.tags?.length ? (
          <div className="pointer-events-none absolute right-2 top-2 flex gap-1">
            {item.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-lg bg-black/60 px-2 py-0.5 text-xs text-white/85 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="caption text-white/60">
          {new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold">
          {item.title}
        </h3>
        {item.excerpt ? (
          <p className="caption mt-2 line-clamp-3 text-white/70">{item.excerpt}</p>
        ) : null}

        <div className="mt-3 flex items-center gap-2 text-sm text-[color:var(--gold)]">
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            Read more
          </span>
          <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

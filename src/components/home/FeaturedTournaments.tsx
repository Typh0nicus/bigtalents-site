"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

type TItem = {
  title: string;
  date: string;
  region: "NA" | "EU";
  prize?: string;
  image?: string;
  registerUrl?: string;
  detailsUrl?: string;
};

const ITEMS: TItem[] = [
  {
    title: "Silver Talent League #1",
    date: "Coming Soon",
    region: "EU",
    prize: "$???",
    image: "/images/logo/wordmark.webp",
    registerUrl: "https://matcherino.com",
    detailsUrl: "/tournaments/stl1",
  },
  {
    title: "Wildcard Weekend #4",
    date: "Coming Soon",
    region: "NA",
    prize: "$???",
    image: "/images/logo/wordmark.webp",
    registerUrl: "https://matcherino.com",
    detailsUrl: "/tournaments/ww4",
  },
  {
    title: "Wildcard Weekend #5",
    date: "Coming Soon",
    region: "EU",
    prize: "$???",
    image: "/images/logo/wordmark.webp",
    registerUrl: "https://matcherino.com",
    detailsUrl: "/tournaments/ww5",
  },
];

export function FeaturedTournaments() {
  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="h2">Featured Tournaments</h2>
          <p className="mt-2 text-white/75">Upcoming brackets.</p>
        </div>
        <a
          href="/tournaments"
          className="hidden sm:inline-flex btn btn-outline rounded-xl"
          aria-label="View all tournaments"
        >
          View all
        </a>
      </div>

      {/* Mobile: horizontal snap rail  •  Desktop: 3-up grid */}
      <div className="mt-8 -mx-4 px-4 overflow-x-auto md:overflow-visible md:mx-0 md:px-0">
        <ul className="flex gap-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-6">
          {ITEMS.map((it, idx) => (
            <li
              key={`${it.title}-${idx}`}
              className="snap-start md:snap-none min-w-[85%] sm:min-w-[60%] md:min-w-0"
            >
              <motion.article
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
                className="card overflow-hidden h-full flex flex-col"
              >
                {/* Media */}
                <div className="relative w-full aspect-[16/9]">
                  {it.image ? (
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                  ) : (
                    <div className="skel w-full h-full" />
                  )}

                  {/* Badges on media */}
                  <div className="absolute left-3 top-3 flex items-center gap-2">
                    <span className="rounded-full border border-white/25 bg-black/40 backdrop-blur px-2 py-0.5 text-xs font-semibold">
                      {it.region}
                    </span>
                  </div>
                  {it.prize && (
                    <div className="absolute right-3 top-3">
                      <span className="rounded-full bg-[color:var(--gold)] text-black px-2.5 py-0.5 text-xs font-bold shadow-soft/20">
                        {it.prize}
                      </span>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.00),rgba(0,0,0,.06))]"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="caption text-white/75">{it.date}</div>
                  <h3 className="mt-1 text-lg font-semibold leading-snug">{it.title}</h3>

                  {/* CTAs */}
                  <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-2">
                    {it.registerUrl && (
                      <a
                        href={it.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary w-full rounded-xl"
                        aria-label={`Register for ${it.title}`}
                      >
                        Register <FiExternalLink className="ml-1 -mr-1" />
                      </a>
                    )}
                    {it.detailsUrl && (
                      <a
                        href={it.detailsUrl}
                        className="btn btn-outline w-full rounded-xl"
                        aria-label={`View details for ${it.title}`}
                      >
                        View details
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            </li>
          ))}
        </ul>
      </div>

      {/* Secondary “View all” for mobile */}
      <div className="mt-6 sm:hidden">
        <a href="/tournaments" className="btn btn-outline w-full rounded-xl">
          View all tournaments
        </a>
      </div>
    </section>
  );
}

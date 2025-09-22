"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Tournament } from "@/data/tournaments";
import { FiExternalLink } from "react-icons/fi";

export function TournamentCard({
  t,
  participants,
}: {
  t: Tournament;
  participants?: number | null; // NEW: passed from the page
}) {
  const img = t.image ?? `/images/tournaments/${t.slug}.png`;
  const hasMatcherino = !!t.url && t.url !== "#";
  const hasLiqui = !!t.liquipedia;

  return (
    <motion.article
      className="group card overflow-hidden h-full flex flex-col shadow-soft focus-within:border-[color:var(--gold)]"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    >
      {/* Media (16:9) with subtle overlay and hover zoom */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={img}
          alt={t.title}
          fill
          priority={false}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.00),rgba(0,0,0,.06))]"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta row */}
        <div className="text-sm text-white/70 flex items-center gap-3">
          <span className="rounded-full border border-white/20 px-2 py-0.5">BGT</span>
          {t.date && <span>{t.date}</span>}
        </div>

        {/* Title */}
        <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>

        {/* Prize + players (show players only when fetched) */}
        {(typeof t.prizeUsd === "number" || typeof participants === "number") && (
          <div className="mt-1 caption text-white/85">
            {typeof t.prizeUsd === "number" && (
              <>Prize: ${t.prizeUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}</>
            )}
            {typeof t.prizeUsd === "number" && typeof participants === "number" && (
              <span className="mx-2">•</span>
            )}
            {typeof participants === "number" && <>Players: {participants}</>}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {hasMatcherino ? (
            <a
              className="btn btn-primary w-full"
              href={t.url!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${t.title} on Matcherino`}
            >
              Open on Matcherino
            </a>
          ) : (
            <span
              className="btn btn-outline w-full cursor-default select-none"
              aria-disabled="true"
            >
              Private Event
            </span>
          )}

          {hasLiqui && (
            <a
              className="btn btn-outline w-full"
              href={t.liquipedia!}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${t.title} on Liquipedia`}
            >
              Liquipedia <FiExternalLink className="ml-1 -mr-1 inline align-[-2px]" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

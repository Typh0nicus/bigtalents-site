"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Tournament } from "@/data/tournaments";

export function TournamentCard({ t }: { t: Tournament }) {
  return (
    <motion.article
      className="group card overflow-hidden h-full flex flex-col"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Image area (uniform height, hover zoom) */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {t.image ? (
          <Image
            src={t.image}
            alt={t.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 bg-[rgba(255,255,255,.05)]" />
        )}
        {/* subtle top-to-bottom gradient for legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.0),rgba(0,0,0,.06))]" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="text-sm text-white/70 flex items-center gap-3">
          <span className="rounded-full border border-white/20 px-2 py-0.5">BGT</span>
          {t.date && <span>{t.date}</span>}
        </div>

        <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>

        {typeof t.prizeUsd === "number" && (
          <div className="mt-1 text-white/85 caption">
            Prize: ${t.prizeUsd.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        )}

        <div className="mt-auto pt-4">
          {t.url === "#" ? (
            <span className="btn btn-outline w-full">Private Event</span>
          ) : (
            <a
              className="btn btn-primary w-full"
              href={t.url}
              target="_blank"
              rel="noreferrer"
            >
              Open on Matcherino
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

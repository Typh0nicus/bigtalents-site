"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiCalendar, FiAward, FiUsers } from "react-icons/fi";
import { Tournament } from "@/data/tournaments";

interface TournamentCardProps {
  t: Tournament;
  featured?: boolean;
  index?: number;
}

export function TournamentCard({ t, featured = false, index = 0 }: TournamentCardProps) {
  const formatPrize = (usd: number) => 
    `$${usd.toLocaleString(undefined, { maximumFractionDigits: 2 })}`; // Include $ in formatting

  const hasMatcherino = !!t.url && t.url !== "#";
  const hasLiqui = !!t.liquipedia;
  const isUpcoming = !t.archived;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card overflow-hidden h-full flex flex-col group"
    >
      {/* Tournament Image/Banner */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {t.image ? (
          <Image
            src={t.image}
            alt={t.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 3}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {t.region ? (
              <span className="text-6xl font-bold text-[var(--gold)] opacity-50">
                {t.region}
              </span>
            ) : (
              <FiAward className="text-6xl text-[var(--gold)] opacity-50" />
            )}
          </div>
        )}
        
        {/* Upcoming badge - top left */}
        {isUpcoming ? (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className="inline-flex px-2 py-1 rounded-full text-white text-xs font-bold bg-[var(--glass-gold)] supports-[backdrop-filter]:backdrop-blur-md ring-1 ring-white/20 shadow-lg shadow-black/20 supports-[backdrop-filter]:backdrop-blur-md backdrop-saturate-150
ring-1 ring-white/25 animate-pulse" >
              UPCOMING
            </span>
          </div>
        ) : (
          /* Region badge for archived tournaments */
          t.region && (
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
              <span className="inline-flex px-2 py-1 rounded-full text-white text-xs font-bold bg-black/35 supports-[backdrop-filter]:backdrop-blur-md ring-1 ring-white/20 shadow-lg shadow-black/25">
                {t.region}
              </span>
            </div>
          )
        )}

        {/* Prize pool - top right - FIXED: Clean text-only design */}
        {t.prizeUsd && t.prizeUsd > 0 && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 bg-black/70 text-white text-xs sm:text-sm rounded-full font-bold shadow-lg">
            <span className="whitespace-nowrap">{formatPrize(t.prizeUsd)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-lg sm:text-xl mb-3 line-clamp-2 transition-colors">
          {t.title}
        </h3>

        {/* Meta information */}
        <div className="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-5 text-sm">
          {t.date && (
            <div className="flex items-center gap-2 text-white/80">
              <FiCalendar className="text-[var(--gold)] flex-shrink-0" size={16} />
              <span className="truncate">{t.date}</span>
            </div>
          )}
          
          {t.participants && (
            <div className="flex items-center gap-2 text-white/80">
              <FiUsers className="text-[var(--gold)] flex-shrink-0" size={16} />
              <span>{t.participants} teams</span>
            </div>
          )}
        </div>

        {/* CTAs - Improved mobile layout */}
        <div className={`mt-auto pt-4 flex flex-col gap-2 ${hasLiqui ? 'sm:grid sm:grid-cols-2 sm:gap-2' : ''}`}>
          {hasMatcherino ? (
            <a
              className="btn btn-primary w-full text-sm sm:text-base py-2.5 sm:py-3"
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${t.title} on Matcherino`}
            >
              <span className="hidden sm:inline">Open on Matcherino</span>
              <span className="sm:hidden">Matcherino</span>
            </a>
          ) : (
            <span
              className="btn btn-outline w-full cursor-default select-none text-sm sm:text-base py-2.5 sm:py-3"
              aria-disabled="true"
            >
              Private Event
            </span>
          )}

          {hasLiqui && (
            <a
              className="btn btn-outline w-full text-sm sm:text-base py-2.5 sm:py-3"
              href={t.liquipedia}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${t.title} on Liquipedia`}
            >
              <span className="flex items-center justify-center gap-1">
                Liquipedia <FiExternalLink className="inline align-[-2px] w-3 h-3 sm:w-4 sm:h-4" />
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

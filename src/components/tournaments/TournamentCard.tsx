"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiExternalLink, FiCalendar, FiAward, FiUsers, FiDollarSign } from "react-icons/fi";
import { Tournament } from "@/data/tournaments";

interface TournamentCardProps {
  t: Tournament;
  featured?: boolean;
  index?: number;
}

export function TournamentCard({ t, featured = false, index = 0 }: TournamentCardProps) {
  const formatPrize = (usd: number) => 
    usd.toLocaleString(undefined, { maximumFractionDigits: 2 }); // Removed $ here since we add it in the badge

  const hasMatcherino = !!t.url && t.url !== "#";
  const hasLiqui = !!t.liquipedia;

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
        
        {/* Region badge - top left - NO BLUR */}
        {t.region && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full font-bold shadow-lg">
              {t.region}
            </span>
          </div>
        )}

        {/* Prize pool - top right - WITH BLUR */}
        {t.prizeUsd && t.prizeUsd > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm rounded-full font-bold shadow-lg">
            <FiDollarSign size={14} />
            ${formatPrize(t.prizeUsd)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-bold text-xl mb-3 line-clamp-2 transition-colors">
          {t.title}
        </h3>

        {/* Meta information */}
        <div className="flex flex-col gap-3 mb-5 text-sm">
          {t.date && (
            <div className="flex items-center gap-2 text-white/80">
              <FiCalendar className="text-[var(--gold)] flex-shrink-0" size={16} />
              <span>{t.date}</span>
            </div>
          )}
          
          {t.participants && (
            <div className="flex items-center gap-2 text-white/80">
              <FiUsers className="text-[var(--gold)] flex-shrink-0" size={16} />
              <span>{t.participants} teams</span>
            </div>
          )}
        </div>

        {/* CTAs - YOUR ORIGINAL BUTTON STRUCTURE */}
        <div className={`mt-auto pt-4 grid gap-2 ${hasLiqui ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {hasMatcherino ? (
            <a
              className="btn btn-primary w-full"
              href={t.url}
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
              href={t.liquipedia}
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

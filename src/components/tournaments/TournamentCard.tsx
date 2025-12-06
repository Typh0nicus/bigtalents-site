"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiExternalLink, FiCalendar, FiAward, FiUsers, FiArrowRight } from "react-icons/fi";
import { Tournament } from "@/data/tournaments";

interface TournamentCardProps {
  t: Tournament;
  index?: number;
}

export function TournamentCard({ t, index = 0 }: TournamentCardProps) {
  const formatPrize = (usd: number) => 
    `$${usd.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

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
      className="group relative h-full flex flex-col select-none"
    >
      {/* Main Card */}
      <div className="card overflow-hidden h-full flex flex-col backdrop-blur-xl hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D4AF37]/10">
        {/* Tournament Image/Banner - Clickable */}
        <Link href={`/matcherinos/${t.slug}`} className="block relative aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
          {t.image ? (
            <Image
              src={t.image}
              alt={t.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {t.region ? (
                <span className="text-6xl font-bold text-[#D4AF37] opacity-50">
                  {t.region}
                </span>
              ) : (
                <FiAward className="text-6xl text-[#D4AF37] opacity-50" />
              )}
            </div>
          )}
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status badge - Animated */}
          {isUpcoming ? (
            <motion.div 
              className="absolute top-3 left-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold bg-[#D4AF37]/90 backdrop-blur-md ring-1 ring-white/30 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                UPCOMING
              </span>
            </motion.div>
          ) : (
            t.region && (
              <div className="absolute top-3 left-3">
                <span className="inline-flex px-3 py-1.5 rounded-full text-white text-xs font-bold bg-black/60 backdrop-blur-md ring-1 ring-white/20 shadow-lg">
                  {t.region}
                </span>
              </div>
            )
          )}

          {/* Prize pool - Glowing on hover */}
          {t.prizeUsd && t.prizeUsd > 0 && (
            <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/70 backdrop-blur-md text-white text-sm rounded-full font-bold shadow-lg ring-1 ring-[#D4AF37]/20 group-hover:ring-[#D4AF37]/50 transition-all duration-300">
              <span className="whitespace-nowrap group-hover:text-[#D4AF37] transition-colors duration-300">{formatPrize(t.prizeUsd)}</span>
            </div>
          )}
        </Link>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/[0.02]">
          {/* Title - Clickable */}
          <Link href={`/matcherinos/${t.slug}`}>
            <h3 className="font-bold text-xl mb-4 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer leading-tight">
              {t.title}
            </h3>
          </Link>

          {/* Meta information - Enhanced */}
          <div className="flex flex-col gap-3 mb-5">
            {t.date && (
              <div className="flex items-center gap-2.5 text-white/70 group-hover:text-white/90 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                  <FiCalendar className="text-[#D4AF37]" size={16} />
                </div>
                <span className="text-sm truncate font-medium">{t.date}</span>
              </div>
            )}
            
            {t.participants && (
              <div className="flex items-center gap-2.5 text-white/70 group-hover:text-white/90 transition-colors duration-200">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-colors duration-200">
                  <FiUsers className="text-[#D4AF37]" size={16} />
                </div>
                <span className="text-sm font-medium">{t.participants} teams</span>
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Link 
              href={`/matcherinos/${t.slug}`}
              className="btn btn-primary w-full text-center inline-flex items-center justify-center gap-2 group/btn hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all duration-300"
            >
              {isUpcoming ? "View Details" : "View Bracket"}
              <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* External Links - Sleek bottom section */}
        {(hasMatcherino || hasLiqui) && (
          <div className="px-5 pb-5 pt-2 flex gap-2 border-t border-white/5">
            {hasMatcherino && (
              <a
                className="btn btn-outline flex-1 text-xs py-2.5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-200 font-medium"
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${t.title} on Matcherino`}
              >
                Matcherino
              </a>
            )}

            {hasLiqui && (
              <a
                className="btn btn-outline flex-1 text-xs py-2.5 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-200 inline-flex items-center justify-center gap-1.5 font-medium"
                href={t.liquipedia}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${t.title} on Liquipedia`}
              >
                Liquipedia <FiExternalLink size={12} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.article>
  );
}

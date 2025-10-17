'use client';

import { FiUsers, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface TournamentStatsProps {
  participants?: number;
  prizePool?: number;
  region?: 'NA' | 'EU';
}

const statCards = [
  { icon: FiUsers, label: 'Teams Competed', key: 'participants' as const },
  { icon: FiDollarSign, label: 'Total Prize Pool', key: 'prizePool' as const },
  { icon: FiMapPin, label: 'Tournament Region', key: 'region' as const },
  { icon: FiClock, label: 'Format Type', key: 'format' as const }
];

export function TournamentStats({ participants, prizePool, region }: TournamentStatsProps) {
  const getValue = (key: string) => {
    switch (key) {
      case 'participants':
        return participants || null;
      case 'prizePool':
        return prizePool ? `$${prizePool.toLocaleString()}` : null;
      case 'region':
        return region === 'EU' ? 'Europe' : region === 'NA' ? 'North America' : null;
      case 'format':
        return 'Single Elimination';
      default:
        return null;
    }
  };

  const visibleCards = statCards.filter(card => getValue(card.key));

  return (
    <div className="container px-4 sm:px-6 pt-20 sm:pt-32 pb-12 sm:pb-20">
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">
          Tournament Overview
        </h2>
        <p className="text-white/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Comprehensive stats and information about this competitive event
        </p>
      </motion.div>

      {/* FIXED: Mobile-first grid with proper spacing */}
      <div className={`grid gap-3 sm:gap-4 lg:gap-6 ${
        visibleCards.length === 4 ? 'grid-cols-2 lg:grid-cols-4' :
        visibleCards.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
        visibleCards.length === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        'grid-cols-1'
      }`}>
        {visibleCards.map((stat, i) => {
          const Icon = stat.icon;
          const value = getValue(stat.key);
          
          return (
            <motion.div
              key={stat.key}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.12] hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/10 select-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Icon Container - Smaller on mobile */}
              <motion.div 
                className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl mb-3 sm:mb-4 transition-all duration-300 group-hover:bg-[#D4AF37]/20"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="text-[#D4AF37] text-lg sm:text-xl lg:text-2xl" />
              </motion.div>

              {/* Label - Smaller text on mobile */}
              <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-wider mb-1 sm:mb-2 font-semibold">
                {stat.label}
              </p>

              {/* Value - FIXED: Responsive sizing with proper line-height and word-break */}
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight break-words">
                {value}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

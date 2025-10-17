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
    <div className="container px-6 pt-32 pb-20">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Tournament Overview
        </h2>
        <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
          Comprehensive stats and information about this competitive event
        </p>
      </motion.div>

      <div className={`grid gap-6 ${
        visibleCards.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
        visibleCards.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
        visibleCards.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
        'grid-cols-1'
      }`}>
        {visibleCards.map((stat, i) => {
          const Icon = stat.icon;
          const value = getValue(stat.key);
          
          return (
            <motion.div
              key={stat.key}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.12] hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/10 select-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {/* Icon Container with Rotation */}
              <motion.div 
                className="inline-flex items-center justify-center w-14 h-14 bg-[#D4AF37]/10 rounded-xl mb-4 transition-all duration-300 group-hover:bg-[#D4AF37]/20"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="text-[#D4AF37] text-2xl" />
              </motion.div>

              {/* Label */}
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2 font-semibold">
                {stat.label}
              </p>

              {/* Value - FIXED: Added line-height and padding to prevent clipping */}
              <p className="text-3xl md:text-4xl font-black text-white pb-1 leading-[1.2]">
                {value}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

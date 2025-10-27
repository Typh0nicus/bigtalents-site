// src/components/rosters/RosterHero.tsx
"use client";
import { motion } from "framer-motion";
import { FiUsers, FiClock } from "react-icons/fi";

interface RosterHeroProps {
  activeCount: number;
  comingSoonCount: number;
}

export function RosterHero({ activeCount, comingSoonCount }: RosterHeroProps) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm text-[#D4AF37] px-5 py-2.5 rounded-full text-sm font-bold mb-8 border border-[#D4AF37]/30"
        >
          <FiUsers className="w-4 h-4" />
          <span>Official Roster</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          <span className="block mb-2">Meet Our</span>
          <span className="block bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
            Creators & Teams
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Talented content creators, streamers, and competitive players representing the{" "}
          <span className="text-[#D4AF37] font-semibold">Big Talents</span> brand across North America and Europe.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 mb-8"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-2xl blur-xl group-hover:bg-[#D4AF37]/30 transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 group-hover:border-[#D4AF37]/50 transition-all duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-[#D4AF37] mb-2">
                {activeCount}
              </div>
              <div className="text-sm text-white/60 font-semibold uppercase tracking-wider">
                Active Members
              </div>
            </div>
          </div>

          <div className="h-20 w-px bg-white/10" />

          <div className="relative group">
            <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl group-hover:bg-white/20 transition-all duration-300" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 group-hover:border-white/30 transition-all duration-300">
              <div className="flex items-center gap-2 text-4xl sm:text-5xl font-bold text-white/50 mb-2">
                <FiClock className="w-8 h-8" />
                <span>{comingSoonCount}</span>
              </div>
              <div className="text-sm text-white/60 font-semibold uppercase tracking-wider">
                Coming Soon
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

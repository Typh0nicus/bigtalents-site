// src/app/rosters/page.tsx
"use client";
import { motion } from "framer-motion";
import { FiUsers, FiClock, FiBell } from "react-icons/fi";
import Link from "next/link";

export default function RostersPage() {
  return (
    <main className="relative min-h-screen select-none overflow-x-hidden">
      {/* Background - matching your Hero component style */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1400px 800px at 15% -10%, rgba(212,175,55,0.08), transparent 50%),
            radial-gradient(1200px 600px at 85% 10%, rgba(224,184,79,0.05), transparent 50%),
            radial-gradient(800px 600px at 50% 100%, rgba(212,175,55,0.03), transparent 50%)
          `
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.008] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Content - Added more top padding */}
      <div className="relative z-10 container mx-auto px-4 pt-40 pb-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="block text-white mb-2">Our</span>
            <span className="block bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Roster</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed px-4">
            Talented creators and players representing Big Talents across competitive tournaments.
          </p>
        </motion.div>

        {/* Coming Soon State */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Card */}
          <div className="card p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 opacity-30 pointer-events-none"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15), transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(212,175,55,0.15), transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.15), transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <FiUsers className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]" />
              </motion.div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <FiClock className="w-4 h-4 text-[#D4AF37]" />
                </motion.div>
                <span className="text-sm font-bold text-[#D4AF37]">Coming Soon</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
                Roster Announcements
                <br />
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">In Progress</span>
              </h2>

              {/* Description */}
              <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed px-4">
                We&apos;re carefully selecting and onboarding talented creators and competitive players. 
                Official announcements will be made across our social channels.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto btn btn-primary rounded-2xl px-8 py-4 text-lg shadow-2xl hover:shadow-[#D4AF37]/40 inline-flex items-center justify-center gap-2 backdrop-blur-sm transition-all duration-300"
                  >
                    <FiBell className="w-5 h-5" />
                    Get Notified
                  </motion.button>
                </Link>

                <Link href="/creator-program" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto btn btn-outline rounded-2xl px-8 py-4 text-lg hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-sm"
                  >
                    Creator Program
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          >
            {[
              { label: "4,600+ Teams", desc: "Community participation" },
              { label: "$6,900+ Awarded", desc: "Prize pools distributed" },
              { label: "NA & EU", desc: "Regional coverage" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4, borderColor: "rgba(212,175,55,0.3)" }}
                className="card p-6 text-center transition-all duration-300"
              >
                <div className="text-xl font-bold text-white mb-1">{stat.label}</div>
                <div className="text-sm text-white/60">{stat.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

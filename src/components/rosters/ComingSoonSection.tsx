// src/components/rosters/ComingSoonSection.tsx
"use client";
import { motion } from "framer-motion";
import { FiClock, FiBell, FiStar, FiUsers, FiZap } from "react-icons/fi";
import Link from "next/link";

export function ComingSoonSection() {
  return (
    <section className="py-20 sm:py-24 md:py-28 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 backdrop-blur-sm text-[#D4AF37] px-4 py-2.5 rounded-full text-sm font-semibold mb-6 border border-[#D4AF37]/20">
            <FiClock className="w-4 h-4 animate-pulse" />
            <span>Coming Soon</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Official Roster Reveals
            <br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] bg-clip-text text-transparent">
              In Progress
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            We&apos;re carefully selecting and onboarding talented creators and competitive teams.
            <br className="hidden sm:block" />
            Official announcements will be made across our social channels.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left column: Content features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {/* Feature 1: Content Creators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:bg-white/[0.08]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiStar className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    Content Creators
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    Talented streamers, video creators, and community builders who embody the Big Talents spirit
                  </p>
                </div>
              </motion.div>

              {/* Feature 2: Competitive Teams */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:bg-white/[0.08]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiUsers className="w-7 h-7 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    Competitive Teams
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    Elite teams and individual players representing Big Talents in major tournaments
                  </p>
                </div>
              </motion.div>

              {/* Feature 3: Community Leaders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-300 hover:bg-white/[0.08]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-400/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FiZap className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    Community Leaders
                  </h3>
                  <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    Influential figures who drive engagement and foster the competitive esports ecosystem
                  </p>
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="group btn btn-primary inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <FiBell className="w-5 h-5 group-hover:animate-pulse" />
                <span>Get Notified</span>
              </Link>
              
              <Link
                href="/creator-program"
                className="btn btn-outline inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300"
              >
                <span>Learn More</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column: Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/10 to-[#D4AF37]/5 rounded-3xl p-8 sm:p-12 border border-[#D4AF37]/20 overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-500">
              {/* Animated decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-4 right-4 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl"
              />
              
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-4 left-4 w-20 h-20 bg-[#D4AF37]/20 rounded-full blur-xl"
              />

              {/* Content */}
              <div className="text-center relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#D4AF37]/30 to-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:shadow-xl group-hover:shadow-[#D4AF37]/20 transition-all duration-300"
                >
                  <FiUsers className="w-12 h-12 sm:w-14 sm:h-14 text-[#D4AF37]" />
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  Applications
                  <br />
                  Opening Soon
                </h3>

                {/* Description */}
                <p className="text-white/60 mb-8 text-base leading-relaxed">
                  Be the first to know when creator and team applications go live. 
                  Join our Discord to stay updated.
                </p>

                {/* Notification box */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 group-hover:border-[#D4AF37]/30 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-semibold">
                    <FiBell className="w-5 h-5 animate-pulse" />
                    <span className="text-sm sm:text-base">Notifications via Discord</span>
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      className="w-2 h-2 rounded-full bg-[#D4AF37]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

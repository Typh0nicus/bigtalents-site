"use client";

import { motion } from "framer-motion";
import { FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

export function PlayersComingSoon() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bgt-bg-master" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(1000px 500px at 50% 50%, rgba(212,175,55,0.06), transparent 70%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold-vibrant/20 blur-3xl rounded-full" />
              <div className="relative bg-black/40 border border-gold-vibrant/30 rounded-full p-8">
                <FiUsers className="w-16 h-16 text-gold-vibrant" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
              Player Profiles <br />
              <span className="text-gradient-gold">Coming Soon</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/60 mb-12 text-center max-w-2xl mx-auto"
          >
            We're building comprehensive profiles for our competitive players.
            <br className="hidden sm:block" />
            Check back soon to meet the roster.
          </motion.p>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: FiUsers, label: "Active Players", value: "Coming Soon" },
              { icon: FiTrendingUp, label: "Win Rate", value: "Coming Soon" },
              { icon: FiAward, label: "Championships", value: "Coming Soon" }
            ].map((stat, i) => (
              <div key={i} className="bg-black/40 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
                <stat.icon className="w-8 h-8 text-gold-vibrant mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-white/40 mb-6">
              In the meantime, check out our content creators
            </p>
            <a href="/creators" className="btn btn-primary btn-lg">
              View Creators
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FiLock } from "react-icons/fi";

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
        <div className="max-w-3xl mx-auto text-center">
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
                <FiLock className="w-16 h-16 text-gold-vibrant" />
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
              Roster <span className="text-gradient-gold">Locked</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          >
            Our competitive roster is under wraps until the official announcement.
            <br className="hidden sm:block" />
            Stay tuned for the reveal.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="/creators" className="btn btn-primary btn-lg">
              View Creators
            </a>
            <a href="/news" className="btn btn-outline btn-lg">
              Latest News
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

export function BottomCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Soft background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(800px 280px at 50% -10%, rgba(212,175,55,.10), transparent 70%)",
        }}
      />

      <div className="container relative text-center">
        {/* Heading */}
        <motion.h2
          className="h2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          Join the BGT Community
        </motion.h2>
        <motion.p
          className="mt-2 text-white/70 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          Follow us for updates, tournament announcements, and behind-the-scenes content.
        </motion.p>

        {/* Social buttons */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <a
            href="https://discord.gg/bgt"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary flex items-center gap-2 rounded-xl px-6 py-3 text-base md:text-lg hover:scale-[1.05] transition-all"
          >
            <FaDiscord className="text-xl" />
            Discord
          </a>
          <a
            href="https://x.com/bgtalents"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex items-center gap-2 rounded-xl px-6 py-3 text-base md:text-lg hover:scale-[1.05] transition-all"
          >
            <FaTwitter className="text-xl" />
            @bgtalents
          </a>
          <a
            href="https://instagram.com/bigtalents_org"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline flex items-center gap-2 rounded-xl px-6 py-3 text-base md:text-lg hover:scale-[1.05] transition-all"
          >
            <FaInstagram className="text-xl" />
            bigtalents_org
          </a>
        </motion.div>
      </div>
    </section>
  );
}

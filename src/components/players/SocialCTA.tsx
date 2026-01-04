"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaDiscord } from "react-icons/fa";

const SOCIALS = [
  {
    icon: FaTwitter,
    href: "https://x.com/bgtalents",
    label: "Twitter",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-500/10",
  },
  {
    icon: FaDiscord,
    href: "https://discord.gg/bgt",
    label: "Discord",
    color: "hover:text-indigo-400",
    bg: "hover:bg-indigo-500/10",
  },
];

export function SocialCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="relative py-12 md:py-16 text-center"
    >
      {/* Follow text */}
      <p className="text-white/70 uppercase tracking-wider font-bold text-sm mb-6">
        Follow for the reveal
      </p>

      {/* Social buttons */}
      <div className="flex items-center justify-center gap-4">
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex aspect-square h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm ring-1 ring-white/10 hover:ring-[#D4AF37]/30 ${s.color} ${s.bg}`}
              style={{
                boxShadow: "none",
                transition: "all 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(212,175,55,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={s.label}
            >
              <Icon size={24} />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}

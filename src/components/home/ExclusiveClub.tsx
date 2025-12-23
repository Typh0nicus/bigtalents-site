"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaTwitch, FaWikipediaW } from "react-icons/fa";
import { FiArrowRight, FiStar, FiUsers, FiZap } from "react-icons/fi";
import { useState } from "react";

/* ======================= Types ======================= */
type Member = {
  name: string;
  image: string;
  blurb: string;
  youtube?: string;
  twitch?: string;
  wiki?: string;
};

type Benefit = {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>; 
};


/* ======================= Data ======================= */
const MEMBERS: Member[] = [
  {
    name: "Boss",
    image: "/images/club/boss.jpg",
    blurb: "2024 World Champion",
    youtube: "https://www.youtube.com/@BosS__BS",
    twitch: "https://www.twitch.tv/boss__bs",
    wiki: "https://liquipedia.net/brawlstars/BosS",
  },
  {
    name: "Angelboy",
    image: "/images/club/angelboy.png",
    blurb: "Multiple Worlds Finalist • #1 Global Ranked",
    youtube: "https://www.youtube.com/@angelboybs",
    wiki: "https://liquipedia.net/brawlstars/Angelboy",
  },

  {
    name: "Vital Shark",
    image: "/images/club/vital_shark.jpg",
    blurb: "1.2M YouTube",
    youtube: "https://www.youtube.com/@VITALxSHARK",
  },
  {
    name: "Sniper",
    image: "/images/club/sniperbs_.jpg",
    blurb: "Professional Player • 800K YouTube",
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  },
];

const BENEFITS: Benefit[] = [
  { icon: FiZap, title: "Pro insights", desc: "Learn from world champions" },
  { icon: FiUsers, title: "Real-time games", desc: "Play alongside the elite" },
  { icon: FiStar, title: "Private club chat", desc: "Direct access to pros" },
];

// Deterministic particle positions
const PARTICLE_POSITIONS = Array.from({ length: 15 }, (_, i) => ({
  left: (i * 6.66) % 100,
  top: (i * 9.23) % 100,
}));

/* ======================= Sub-Components ======================= */
function MemberCard({ member, index }: { member: Member; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative card overflow-hidden group select-none"
    >
      {/* Hover particles - subtle */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {PARTICLE_POSITIONS.slice(0, 6).map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-[#D4AF37]"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.2, 0],
                y: [0, -30],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Subtle gold border on hover */}
        <motion.div
          className="absolute inset-0 border border-[#D4AF37]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="p-4 relative z-10">
        <h4 className="font-bold text-sm group-hover:text-[#D4AF37] transition-colors duration-200">
          {member.name}
        </h4>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">{member.blurb}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {member.youtube && (
            <motion.a
              href={member.youtube}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-red-400 hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-200"
              aria-label={`${member.name} on YouTube`}
            >
              <FaYoutube size={14} />
            </motion.a>
          )}
          {member.twitch && (
            <motion.a
              href={member.twitch}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-purple-400 hover:border-purple-400/50 hover:bg-purple-500/10 transition-all duration-200"
              aria-label={`${member.name} on Twitch`}
            >
              <FaTwitch size={14} />
            </motion.a>
          )}
          {member.wiki && (
            <motion.a
              href={member.wiki}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 transition-all duration-200"
              aria-label={`${member.name} on Liquipedia`}
            >
              <FaWikipediaW size={14} />
            </motion.a>
          )}
        </div>
      </div>

      {/* Subtle card glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.article>
  );
}

/* ======================= Main Component ======================= */
export function ExclusiveClub() {
  const firstRow = MEMBERS.slice(0, 4);
  const secondRow = MEMBERS.slice(4);

  return (
    <section className="relative overflow-hidden select-none">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(1200px 600px at 20% -10%, rgba(212,175,55,.12), transparent 60%), radial-gradient(1000px 500px at 80% 10%, rgba(224,184,79,.08), transparent 60%)',
              'radial-gradient(1200px 600px at 80% -10%, rgba(212,175,55,.12), transparent 60%), radial-gradient(1000px 500px at 20% 10%, rgba(224,184,79,.08), transparent 60%)',
              'radial-gradient(1200px 600px at 20% -10%, rgba(212,175,55,.12), transparent 60%), radial-gradient(1000px 500px at 80% 10%, rgba(224,184,79,.08), transparent 60%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 opacity-20">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-[#D4AF37] rounded-full"
              style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 2.5 + (i % 3),
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Title with FIXED badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              BGT Elite Club
            </h2>
            
            {/* FIXED: Subtle badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="rounded-full bg-[#D4AF37] px-2 py-0.5 text-[10px] font-black text-black uppercase">
                Limited
              </span>
              <span className="text-xs font-semibold text-white whitespace-nowrap">Only 3 fans at a time</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl"
          >
            Play, chat, and level up with esports <span className="text-[#D4AF37] font-semibold">world champions</span> and top creators. 
            Get real-time games, insider insights, and private club chat access with the best players in the world.
          </motion.p>

          {/* Benefits */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {BENEFITS.map((benefit, i) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  className="relative group rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#D4AF37]/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/30 transition-colors duration-300">
                      <IconComponent className="text-[#D4AF37] text-base" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">{benefit.title}</div>
                      <div className="text-sm text-white/60">{benefit.desc}</div>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-[#D4AF37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-black text-white mb-1">
                Membership Options
              </h3>
              <p className="text-sm text-white/60">Choose your access level</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/club"
                className="text-sm font-semibold text-[#D4AF37] hover:text-[#FFD700] inline-flex items-center gap-1.5 transition-colors duration-200 group"
              >
                View Full Club
                <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="https://discord.gg/bgt?utm_source=site&utm_medium=exclusive_club&utm_campaign=apply"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative btn btn-primary rounded-2xl px-10 py-5 text-lg shadow-2xl hover:shadow-[#D4AF37]/40 transition-all duration-300 inline-flex items-center justify-center gap-2.5 overflow-hidden group"
            >
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              
              <FaDiscord className="relative z-10 group-hover:scale-110 transition-transform duration-200" size={20} />
              <span className="relative z-10 font-bold">Apply on Discord</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="btn btn-outline rounded-2xl px-10 py-5 text-lg hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 font-semibold"
              >
                Business / Media
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Members Section */}
        <div className="mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-black mb-3">
              Train with <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Legends</span>
            </h3>
            <p className="text-white/70 text-lg">World champions, top global players, and biggest creators</p>
          </motion.div>

          <div className="space-y-8">
            {/* First Row - 4 members */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl">
                {firstRow.map((member, i) => (
                  <MemberCard key={member.name} member={member} index={i} />
                ))}
              </div>
            </div>

            {/* Second Row - 3 members centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl">
                {secondRow.map((member, i) => (
                  <MemberCard key={member.name} member={member} index={i + 4} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-sm text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Availability limited. Access rotates as seats open. Content creator &amp; pro lineup subject to change.
        </motion.p>
      </div>
    </section>
  );
}

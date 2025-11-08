"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaTwitch, FaWikipediaW, FaCrown, FaStar } from "react-icons/fa";
import { FiExternalLink, FiUsers, FiGlobe } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const PARTICLE_COUNT = 15;

const PARTICLE_POSITIONS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: (i * 6.66) % 100,
  top: (i * 8.33) % 100,
}));

const CLUB_INFO = {
  name: "BGT (Big Talents)",
  tag: "#2GP8899V8",
  description: "The most exclusive Brawl Stars club",
  region: "🇩🇪 Germany",
  brawlifyUrl: "https://brawlify.com/stats/club/2GP8899V8",
};

const CLUB_STATS = [
  { icon: FiUsers, value: "Many", label: "World-Class Members" },
  { icon: FaCrown, value: "1", label: "World Champion" },
  { icon: FiGlobe, value: "2M+", label: "Combined Reach" },
];

const ELITE_MEMBERS = [
  {
    name: "HMB | Boss",
    image: "/images/club/boss.jpg",
    title: "World Champion",
    mainAchievement: "2024 BSC World Champion",
    achievements: ["BSC 2024 World Champion", "International Champion"],
    youtube: "https://www.youtube.com/@BosS__BS",
    twitch: "https://www.twitch.tv/boss__bs",
    wiki: "https://liquipedia.net/brawlstars/BosS",
  },
  {
    name: "TTM | Angelboy",
    image: "/images/club/angelboy.png",
    title: "Worlds Finalist",
    mainAchievement: "Worlds Finalist",
    achievements: ["Worlds Finalist", "#1 Global Ranked"],
    youtube: "https://www.youtube.com/@angelboybs",
    wiki: "https://liquipedia.net/brawlstars/Angelboy",
  },
  {
    name: "Vital Shark",
    image: "/images/club/vital_shark.jpg",
    title: "Content Creator",
    mainAchievement: "1.2M YouTube",
    achievements: ["1.2M YouTube", "Top Creator"],
    youtube: "https://www.youtube.com/@VITALxSHARK",
  },
  {
    name: "Sniperbs_",
    image: "/images/club/sniperbs_.jpg",
    title: "Professional Player",
    mainAchievement: "800K YouTube",
    achievements: ["Professional Player", "800K YouTube"],
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  },
];

const MEMBERSHIP_TIERS = [
  {
    name: "Daily Access",
    price: "$3.99",
    duration: "24 hours",
    features: ["Club chat access", "Spectate games", "Community events", "Insider insights"],
  },
  {
    name: "Weekly Access",
    price: "$19.99",
    duration: "7 days",
    features: ["Everything in Daily", "Priority queue", "Weekly events", "Extended access"],
    popular: true,
  },
  {
    name: "Monthly VIP",
    price: "$69.99",
    duration: "30 days",
    features: ["Everything in Weekly", "VIP status", "Monthly events", "Maximum access"],
  },
];

export default function ClubClient() {
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.1), transparent 50%),
              radial-gradient(1200px 600px at 80% 15%, rgba(168,85,247,0.06), transparent 50%),
              radial-gradient(1000px 500px at 50% 100%, rgba(59,130,246,0.05), transparent 50%)
            `,
          }}
        />

        {!prefersReduced && isMounted && (
          <div className="absolute inset-0 opacity-25">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                animate={{ y: [0, -40, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 4 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div style={{ opacity, scale }} className="container relative z-10 text-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: isMounted ? 1 : 0, rotate: isMounted ? 0 : -180 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex mb-8"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/30">
                <FaCrown className="text-black text-4xl" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Talents</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Train with world champions and elite players. Limited access club for serious players only.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto"
            >
              {CLUB_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isMounted ? 1 : 0, scale: isMounted ? 1 : 0.8 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="text-[#D4AF37] text-3xl mx-auto mb-3" />
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMounted ? { scale: 1.05 } : {}}
                whileTap={isMounted ? { scale: 0.95 } : {}}
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              >
                <FaDiscord /> Join Elite Club
              </motion.a>

              <motion.a
                href={CLUB_INFO.brawlifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMounted ? { scale: 1.05 } : {}}
                whileTap={isMounted ? { scale: 0.95 } : {}}
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              >
                <FiExternalLink /> View Stats
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="container py-20 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
                Meet the Legends
              </span>
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl">World-class players and creators</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {ELITE_MEMBERS.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} isMounted={isMounted} />
          ))}
        </div>
      </section>

      <section className="container py-20 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Access
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Flexible membership for every level of commitment</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {MEMBERSHIP_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={tier.popular ? { y: -16, scale: 1.02 } : { y: -8 }}
              className="group relative"
            >
              {tier.popular && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/30 via-[#FFD700]/20 to-[#D4AF37]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              <div
                className={`relative h-full card p-8 transition-all duration-500 flex flex-col ${
                  tier.popular
                    ? "border-[#D4AF37]/50 bg-gradient-to-b from-black to-[#D4AF37]/5 scale-[1.02] shadow-2xl shadow-[#D4AF37]/30"
                    : "border-white/15 bg-gradient-to-b from-white/5 to-white/[0.02] hover:border-[#D4AF37]/30"
                }`}
              >
                {tier.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.6, type: "spring" }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  >
                    <div className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] rounded-full text-black text-sm font-black shadow-lg shadow-[#D4AF37]/40 whitespace-nowrap">
                      ⭐ MOST POPULAR
                    </div>
                  </motion.div>
                )}

                <div className="text-center mb-8 pt-2">
                  <h3 className="text-2xl font-black mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                  </div>
                  <div className="text-sm text-white/50 font-medium">per {tier.duration}</div>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.08 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <motion.div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#FFD700]" whileHover={{ scale: 1.5 }} />
                      <span className="text-white/85 font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    tier.popular
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black shadow-lg shadow-[#D4AF37]/30 hover:shadow-xl hover:shadow-[#D4AF37]/40"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-[#D4AF37]/40"
                  }`}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-white/50 text-sm mt-12"
        >
          Limited availability • Longer periods = cheaper prices
        </motion.p>
      </section>

      <section className="container py-24 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Join?</h2>

          <p className="text-xl text-white/70 mb-8">Limited slots available. Apply now for exclusive access.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
            >
              <FaDiscord /> Apply Now
            </motion.a>

            <Link href="/contact" className="btn btn-outline rounded-2xl px-8 py-4 text-lg">
              Business Inquiries
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function MemberCard({
  member,
  index,
  isMounted,
}: {
  member: (typeof ELITE_MEMBERS)[number];
  index: number;
  isMounted: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => isMounted && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -12 }}
      className="group"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/15">
        <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent pointer-events-none"
            animate={{ opacity: isHovered && isMounted ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <div className="absolute bottom-3 left-3 flex gap-2 z-10">
            {member.youtube && (
              <a
                href={member.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on YouTube`}
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all border border-white/20"
              >
                <FaYoutube size={16} />
              </a>
            )}
            {member.twitch && (
              <a
                href={member.twitch}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on Twitch`}
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-purple-400 hover:bg-purple-500 hover:text-white transition-all border border-white/20"
              >
                <FaTwitch size={16} />
              </a>
            )}
            {member.wiki && (
              <a
                href={member.wiki}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on Liquipedia`}
                className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all border border-white/20"
              >
                <FaWikipediaW size={16} />
              </a>
            )}
          </div>

          <div className="absolute top-3 right-3 z-10">
            <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md text-[#D4AF37] rounded-lg text-xs font-bold border border-[#D4AF37]/40">
              {member.title}
            </div>
          </div>
        </div>

        <div className="p-6 bg-black/50 backdrop-blur-xl">
          <h3 className="text-lg font-black mb-1 group-hover:text-[#D4AF37] transition-colors">{member.name}</h3>
          <p className="text-sm text-[#D4AF37] font-semibold mb-3">{member.mainAchievement}</p>

          <div className="space-y-2 pt-3 border-t border-white/10">
            {member.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-2">
                <FaStar className="text-[#D4AF37] text-xs flex-shrink-0 mt-1" />
                <span className="text-xs text-white/80">{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaYoutube,
  FaTwitch,
  FaWikipediaW,
  FaCrown,
} from "react-icons/fa";
import { FiExternalLink, FiUsers, FiGlobe, FiCheck } from "react-icons/fi";
import { useState, useEffect, useRef, useMemo } from "react";
import { GridOverlay } from "@/components/ui/GridOverlay";

/* --------------------------------- Utils --------------------------------- */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatUSD(amount: number) {
  return `$${amount.toFixed(2)}`;
}

/* --------------------------------- Data ---------------------------------- */

const CLUB_INFO = {
  name: "BGT (Big Talents)",
  tag: "#2GP8899V8",
  description: "Elite training club for high-level Brawl Stars players",
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
    name: "Boss",
    image: "/images/club/boss.jpg",
    title: "World Champion",
    mainAchievement: "2024 BSC World Champion",
    achievements: ["2025 World Runner-Up"],
    youtube: "https://www.youtube.com/@BosS__BS",
    twitch: "https://www.twitch.tv/boss__bs",
    wiki: "https://liquipedia.net/brawlstars/BosS",
  },
  {
    name: "Angelboy",
    image: "/images/club/angelboy.png",
    title: "Professional Player",
    mainAchievement: "Multiple Worlds Finalist",
    achievements: ["#1 Global Ranked"],
    youtube: "https://www.youtube.com/@angelboybs",
    wiki: "https://liquipedia.net/brawlstars/Angelboy",
  },
  {
    name: "Rup",
    image: "/images/club/rup.png",
    title: "Professional Coach",
    mainAchievement: "World Finals Coach",
    achievements: ["LCQ Player"],
  },
  {
    name: "Dorian",
    image: "/images/club/dorian.jpg",
    title: "Professional Coach",
    mainAchievement: "World Finals Coach",
  },
  {
    name: "Vital Shark",
    image: "/images/club/vital_shark.jpg",
    title: "Content Creator",
    mainAchievement: "1.2M YouTube",
    achievements: ["Top Creator"],
    youtube: "https://www.youtube.com/@VITALxSHARK",
  },
  {
    name: "Sniper",
    image: "/images/club/sniperbs_.jpg",
    title: "Professional Player",
    mainAchievement: "800K YouTube",
    achievements: ["Pro-level competitor"],
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  },
  {
    name: "Radan",
    image: "/images/creators/radanbs.jpg",
    title: "Ladder Master",
    mainAchievement: "Top 4 Trophies",
    achievements: ["230K Followers"],
    youtube: "https://www.youtube.com/@radanbs",
  },
];

const ACCESS_PASSES = [
  {
    name: "24h Pass",
    price: 3.99,
    duration: "24 hours",
    tagline: "Short-term access for focused sessions",
    features: [
      "Club chat access",
      "Scrim spectating",
      "Community events",
      "Basic coaching touchpoints",
    ],
  },
  {
    name: "7-Day Pass",
    price: 19.99,
    duration: "7 days",
    tagline: "Best for active weeks and event prep",
    features: [
      "Everything in 24h",
      "Priority queue",
      "Weekly training blocks",
      "Extended VOD discussions",
    ],
  },
  {
    name: "30-Day Pass",
    price: 69.99,
    duration: "30 days",
    tagline: "Full month of structured improvement",
    features: [
      "Everything in 7-Day",
      "Monthly training cycles",
      "Advanced strategy sessions",
      "Highest access tier",
    ],
  },
];

/* ------------------------------ Background ------------------------------- */

const PARTICLE_COUNT = 14;
const PARTICLE_POSITIONS = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  left: (i * 7.14) % 100,
  top: (i * 9.23) % 100,
}));

/* --------------------------------- Page ---------------------------------- */

export default function ClubClient() {
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white select-none">
      {/* Background */}
      <motion.div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 85% 5%, rgba(255,187,0,0.08), transparent 50%),
              radial-gradient(ellipse 600px 400px at 15% 95%, rgba(212,175,55,0.04), transparent 50%)
            `,
          }}
        />
        
        {/* BGT Grid overlay */}
        <GridOverlay />

        {!prefersReduced && isMounted && (
          <div className="absolute inset-0 opacity-25">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                animate={{ y: [0, -36, 0], opacity: [0.15, 0.7, 0.15] }}
                transition={{
                  duration: 4.2 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.18,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <motion.div
          style={{ opacity, scale }}
          className="container relative z-10 text-center px-4 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 26 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -160 }}
              animate={{ scale: isMounted ? 1 : 0, rotate: isMounted ? 0 : -160 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
              className="inline-flex mb-8"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/25">
                <FaCrown className="text-black text-4xl" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 18 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight"
            >
              Elite{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Club
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE_OUT }}
              className="text-lg sm:text-xl md:text-2xl text-white/75 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Train with proven champions and top-tier creators. A high-standards
              environment built for competitive growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 18 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
              className="grid grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-3xl mx-auto"
            >
              {CLUB_STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: isMounted ? 1 : 0, scale: isMounted ? 1 : 0.92 }}
                  transition={{ delay: 0.65 + idx * 0.08 }}
                  className="text-center"
                >
                  <stat.icon className="text-[#D4AF37] text-3xl mx-auto mb-3" />
                  <div className="text-3xl font-black text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 14 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMounted ? { scale: 1.03 } : {}}
                whileTap={isMounted ? { scale: 0.98 } : {}}
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              >
                <FaDiscord /> Join Club
              </motion.a>

              <motion.a
                href={CLUB_INFO.brawlifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMounted ? { scale: 1.03 } : {}}
                whileTap={isMounted ? { scale: 0.98 } : {}}
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
              >
                <FiExternalLink /> Club Stats
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* LEGENDS */}
      <section className="container py-20 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black">
              <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
                Legends
              </span>
            </h2>
          </div>
          <p className="text-white/70 text-lg max-w-2xl">
            A curated lineup of champions, pros, and top creators.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {ELITE_MEMBERS.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              isMounted={isMounted}
            />
          ))}
        </div>
      </section>

      {/* ACCESS / PRICING */}
      <section className="container py-20 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Access{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Passes
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 max-w-6xl mx-auto">
          {ACCESS_PASSES.map((tier, i) => (
            <AccessCard key={tier.name} tier={tier} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-center text-white/45 text-xs sm:text-sm mt-10"
        >
          Availability may vary based on competitive schedule and event load.
        </motion.p>
      </section>

      {/* CTA */}
      <section className="container py-24 px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Train?
          </h2>

          <p className="text-xl text-white/70 mb-8">
            Join the environment where practice stays serious and standards stay high.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://discord.gg/bgt"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center gap-2"
            >
              <FaDiscord /> Apply / Join
            </motion.a>

            <Link
              href="/contact"
              className="btn btn-outline rounded-2xl px-8 py-4 text-lg"
            >
              Business Inquiries
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ------------------------------- MemberCard ------------------------------ */

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

  const uniqueAchievements = useMemo(() => {
    const all = [member.mainAchievement, ...(member.achievements ?? [])].filter(Boolean);
    return Array.from(new Set(all));
  }, [member.mainAchievement, member.achievements]);

  const primaryLine = uniqueAchievements.slice(0, 2).join(" • ");
  const chips = uniqueAchievements.slice(2, 5);

  const showSocials = isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: EASE_OUT }}
      onHoverStart={() => isMounted && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="group"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-400 shadow-lg hover:shadow-2xl hover:shadow-white/5">
        {/* Subtle gold wash on hover (reduced) */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.06] via-transparent to-transparent" />
        </div>

        <div className="relative aspect-[4/5] bg-gradient-to-br from-[#14141c] to-[#070707]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

          {/* Title badge */}
          <div className="absolute top-3 right-3 z-10">
            <div className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-[#FFD700] rounded-lg text-[10px] sm:text-xs font-bold border border-[#D4AF37]/25">
              {member.title}
            </div>
          </div>

          {/* Socials - appear on hover */}
          <AnimatePresence>
            {showSocials && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                className="absolute bottom-3 left-3 flex gap-2 z-10"
              >
                {member.youtube && (
                  <a
                    href={member.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on YouTube`}
                    className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-red-400 hover:bg-white/15 transition-all border border-white/15"
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
                    className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-purple-400 hover:bg-white/15 transition-all border border-white/15"
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
                    className="p-2.5 bg-white/10 backdrop-blur-md rounded-lg text-[#D4AF37] hover:bg-white/15 transition-all border border-white/15"
                  >
                    <FaWikipediaW size={16} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text block */}
        <div className="p-6 bg-black/45 backdrop-blur-xl">
          <h3 className="text-lg font-black mb-1 group-hover:text-white transition-colors">
            {member.name}
          </h3>

          {primaryLine && (
            <p className="text-sm text-[#D4AF37] font-semibold mb-3">
              {primaryLine}
            </p>
          )}

          {chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {chips.map((ach) => (
                <span
                  key={ach}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-white/75 tracking-wide"
                >
                  {ach}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------- AccessCard ------------------------------ */

function AccessCard({
  tier,
  index,
}: {
  tier: (typeof ACCESS_PASSES)[number];
  index: number;
}) {
  const prefersReduced = useReducedMotion();

  // Soft “value hint” without naming a winner
  const perDay =
    tier.duration.includes("24")
      ? tier.price
      : tier.duration.includes("7")
      ? tier.price / 7
      : tier.duration.includes("30")
      ? tier.price / 30
      : null;

  // Badge that keeps the style but removes the duplicate time mention
  const badgeLabel = useMemo(() => {
    if (tier.duration.includes("24")) return "ENTRY";
    if (tier.duration.includes("7")) return "STANDARD";
    if (tier.duration.includes("30")) return "FULL";
    return "ACCESS";
  }, [tier.duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: EASE_OUT }}
      className="relative group"
    >
      {/* Subtle ring glow - reduced gold */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
        animate={
          prefersReduced
            ? {}
            : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }
        }
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{
          background:
            "linear-gradient(90deg, rgba(212,175,55,0.12), rgba(168,85,247,0.08), rgba(212,175,55,0.12))",
        }}
      />

      <motion.div
        whileHover={prefersReduced ? {} : { y: -6 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className={cn(
          "relative h-full rounded-2xl border backdrop-blur-xl overflow-hidden flex flex-col",
          "bg-gradient-to-b from-white/[0.04] to-white/[0.01]",
          "border-white/10 hover:border-white/20",
          "shadow-lg hover:shadow-2xl hover:shadow-white/5"
        )}
      >
        {/* Very light accent wash */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.05] via-transparent to-purple-500/[0.04]" />
        </div>

        <div className="p-8 relative z-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-black tracking-tight">
                {tier.name}
              </h3>
              <p className="text-xs sm:text-sm text-white/55 mt-1">
                {tier.tagline}
              </p>
            </div>

            {/* Badge: style stays, redundancy goes */}
            <div className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-semibold text-white/60 tracking-[0.12em]">
              {badgeLabel}
            </div>
          </div>

          <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-black bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              {formatUSD(tier.price)}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[10px] text-white/45">
              {tier.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            {perDay && (
              <span className="text-[10px] text-white/40">
                ~{formatUSD(perDay)} / day
              </span>
            )}
          </div>

          <ul className="space-y-3">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/[0.06] border border-white/10">
                  <FiCheck className="text-[#D4AF37]" size={10} />
                </span>
                <span className="text-sm text-white/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* No per-card CTA button.
            The global "Ready to Train?" section is the only CTA. */}
      </motion.div>
    </motion.div>
  );
}

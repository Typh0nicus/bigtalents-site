"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaTwitch, FaWikipediaW } from "react-icons/fa";
import { FiCheck, FiArrowRight } from "react-icons/fi";

/* ======================= Types ======================= */
type Member = {
  name: string;
  image: string;
  blurb: string;
  youtube?: string;
  twitch?: string;
  wiki?: string;
};

/* ======================= Data ======================= */
const MEMBERS: Member[] = [
  {
    name: "HMB | Boss",
    image: "/images/club/boss.jpg",
    blurb: "2024 World Champion",
    youtube: "https://www.youtube.com/@BosS__BS",
    twitch: "https://www.twitch.tv/boss__bs",
    wiki: "https://liquipedia.net/brawlstars/BosS",
  },
  {
    name: "TTM | Angelboy",
    image: "/images/club/angelboy.png",
    blurb: "Top-1 Ranked • Worlds Finalist",
    youtube: "https://www.youtube.com/@angelboybs",
    wiki: "https://liquipedia.net/brawlstars/Angelboy",
  },
  {
    name: "ELV | DiegoGamer",
    image: "/images/club/diego.webp",
    blurb: " NA Pro Player • Worlds Finalist",
    youtube: "https://www.youtube.com/@DiegogamerCR_",
    twitch: "https://www.twitch.tv/diegogamercr",
    wiki: "https://liquipedia.net/brawlstars/Diegogamer",
  },
  {
    name: "Hyra",
    image: "/images/club/hyra.jpg",
    blurb: "Top-1 Ladder • 200K trophies • 1.9M Youtube",
    youtube: "https://www.youtube.com/@Hyra",
  },
  {
    name: "Heretics Trebor",
    image: "/images/club/trebor.jpg",
    blurb: "Pro Player • 1.75M YouTube • 725K Twitch",
    youtube: "https://www.youtube.com/@TreborBS",
    twitch: "https://www.twitch.tv/trebor",
    wiki: "https://liquipedia.net/brawlstars/Trebor",
  },
  {
    name: "Vital Shark",
    image: "/images/club/vital_shark.jpg",
    blurb: "1.2M YouTube",
    youtube: "https://www.youtube.com/@VITALxSHARK",
  },
  {
    name: "Sniper BS",
    image: "/images/club/sniperbs_.jpg",
    blurb: "Pro Player • 800K Youtube",
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  },
];

/* ======================= Component ======================= */
export function ExclusiveClub() {
  // Split
  const firstRow = MEMBERS.slice(0, 4); // First members
  const secondRow = MEMBERS.slice(4);   // Remaining members

  return (
    <section className="relative overflow-hidden">
      {/* Ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px 600px at 15% -10%, rgba(212,175,55,.12), transparent 60%), 
            radial-gradient(1000px 500px at 85% 10%, rgba(224,184,79,.08), transparent 60%),
            radial-gradient(800px 400px at 50% 100%, rgba(212,175,55,.06), transparent 50%)
          `,
        }}
      />

      <div className="container relative z-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {/* Title row with Limited badge */}
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="h2 bg-gradient-to-r from-white to-[color:var(--gold)] bg-clip-text text-transparent">
              BGT Elite Club
            </h2>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-white/85 backdrop-blur">
              <span className="rounded-full bg-[color:var(--gold)]/20 px-2 py-0.5 text-[11px] font-bold text-[color:var(--gold)]">
                Limited
              </span>
              <span>Only 3 fans can join at a time</span>
            </span>
          </div>

          <p className="lead mt-4 text-white/85 max-w-2xl">
            Play, chat, and level up with esports world champions and top creators. Get real-time games,
            insider insights, and private club chat access with the best players in the world.
          </p>

          {/* Benefits */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Pro insights", desc: "Learn from world champions" },
              { title: "Real-time games", desc: "Play alongside the elite" },
              { title: "Private club chat", desc: "Direct access to pros" },
            ].map((b: { title: string; desc: string }, i: number) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--gold)]/20 mt-0.5">
                  <FiCheck className="text-[color:var(--gold)] text-sm" />
                </span>
                <div>
                  <div className="font-medium text-white">{b.title}</div>
                  <div className="text-sm text-white/70">{b.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing — floating cards */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Membership Options</h3>
                <p className="text-xs text-white/60">Choose your access level</p>
              </div>
              <Link
                href="/club"
                className="text-sm text-[color:var(--gold)] hover:text-[color:var(--gold)]/80 inline-flex items-center gap-1 transition-colors"
              >
                View Full Club <FiArrowRight />
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { period: "Daily", price: "4.99", duration: "24 hours" },
                { period: "Weekly", price: "29.99", duration: "7 days", popular: true },
                { period: "Monthly", price: "99.99", duration: "30 days" },
              ].map(
                (
                  tier: { period: string; price: string; duration: string; popular?: boolean },
                  idx: number
                ) => (
                  <motion.div
                    key={tier.period}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className={`relative rounded-xl border p-5 text-center shadow-sm ${
                      tier.popular ? "border-[color:var(--gold)]/40 bg-white/[0.04]" : "border-white/15 bg-white/[0.03]"
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--gold)] px-3 py-0.5 text-xs font-bold text-black">
                        POPULAR
                      </div>
                    )}
                    <div className="mb-1 text-sm font-bold text-[color:var(--gold)]">{tier.period}</div>
                    <div className="text-[26px] font-extrabold leading-tight text-white">${tier.price}</div>
                    <div className="mt-1 text-[11px] tracking-wide text-white/70">{tier.duration}</div>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <motion.a
              href="https://discord.gg/bgt?utm_source=site&utm_medium=exclusive_club&utm_campaign=apply"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary rounded-2xl px-8 py-4 text-lg shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
            >
              <FaDiscord className="mr-2" /> Apply on Discord
            </motion.a>

            <Link
              href="/contact"
              className="btn btn-outline rounded-2xl px-8 py-4 text-lg hover:bg-[color:var(--gold)] hover:text-black transition-all duration-300"
            >
              Business / Media
            </Link>
          </div>
        </motion.div>

        {/* Members - FIXED: 2-row layout, centralized */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-2"
          >
            Train with <span className="text-[color:var(--gold)]">Legends</span>
          </motion.h3>
          <p className="text-center text-white/70 mb-8">World champions, top global players, and biggest creators</p>

          <div className="space-y-6">
            {/* First Row - 4 members */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl">
                {firstRow.map((m: Member, i: number) => (
                  <motion.article
                    key={m.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.03 }}
                    className="card overflow-hidden group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-sm group-hover:text-[color:var(--gold)] transition-colors">
                        {m.name}
                      </h4>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">{m.blurb}</p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {m.youtube && (
                          <a
                            href={m.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-red-400 hover:border-red-400/50 transition-all text-xs"
                            aria-label={`${m.name} on YouTube`}
                          >
                            <FaYoutube />
                          </a>
                        )}
                        {m.twitch && (
                          <a
                            href={m.twitch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-purple-400 hover:border-purple-400/50 transition-all text-xs"
                            aria-label={`${m.name} on Twitch`}
                          >
                            <FaTwitch />
                          </a>
                        )}
                        {m.wiki && (
                          <a
                            href={m.wiki}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 transition-all text-xs"
                            aria-label={`${m.name} on Wikipedia`}
                          >
                            <FaWikipediaW />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            {/* Second Row - 3 members centered */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl">
                {secondRow.map((m: Member, i: number) => (
                  <motion.article
                    key={m.name}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: (i + 4) * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.03 }}
                    className="card overflow-hidden group"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold text-sm group-hover:text-[color:var(--gold)] transition-colors">
                        {m.name}
                      </h4>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">{m.blurb}</p>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {m.youtube && (
                          <a
                            href={m.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-red-400 hover:border-red-400/50 transition-all text-xs"
                            aria-label={`${m.name} on YouTube`}
                          >
                            <FaYoutube />
                          </a>
                        )}
                        {m.twitch && (
                          <a
                            href={m.twitch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-purple-400 hover:border-purple-400/50 transition-all text-xs"
                            aria-label={`${m.name} on Twitch`}
                          >
                            <FaTwitch />
                          </a>
                        )}
                        {m.wiki && (
                          <a
                            href={m.wiki}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 transition-all text-xs"
                            aria-label={`${m.name} on Wikipedia`}
                          >
                            <FaWikipediaW />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
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
          className="caption mt-12 text-center text-white/50"
        >
          Availability limited. Access rotates as seats open. Content creator &amp; pro lineup subject to change.
        </motion.p>
      </div>
    </section>
  );
}

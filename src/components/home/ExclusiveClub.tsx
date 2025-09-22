// src/components/home/ExclusiveClub.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaDiscord, FaYoutube, FaTwitch, FaWikipediaW } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

/* ======================= Data (easy to edit) ======================= */
type Member = {
  name: string;
  image: string;       // /public path, e.g. /images/club/hyra.jpg
  blurb: string;       // short line under name
  youtube?: string;
  twitch?: string;
  wiki?: string;       // Liquipedia (label will read “Wikipedia” per your ask)
};

const MEMBERS: Member[] = [
  {
    name: "HMB | Boss",
    image: "/images/club/boss.jpg",
    blurb: "2024 BSC World Champion",
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
    name: "Hyra",
    image: "/images/club/hyra.jpg",
    blurb: "Top-1 Ladder • 200K trophies • 1.9M Youtube",
    youtube: "https://www.youtube.com/@Hyra", // (removed trailing dot)
  },
  {
    name: "Trebor",
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
    name: "Sniperbs_",
    image: "/images/club/sniperbs_.jpg",
    blurb: "Pro Player • 800K Youtube",
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  },
];

/* ======================= Component ======================= */
export function ExclusiveClub() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient gold accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 420px at 15% -10%, rgba(212,175,55,.10), transparent 60%), radial-gradient(800px 360px at 95% 0%, rgba(224,184,79,.08), transparent 60%)",
        }}
      />

      <div className="container relative z-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-white/85 backdrop-blur">
            <span className="rounded-full bg-[color:var(--gold)]/20 px-2 py-0.5 text-[11px] font-bold text-[color:var(--gold)]">
              Limited
            </span>
            <span>Only 3 fans can join at a time</span>
          </div>

          <h2 className="h2 mt-3">BGT Elite Club</h2>
          <p className="lead mt-2 text-white/85">
            Play, chat, and level up with esports pros &amp; top creators. You’ll
            get real-time games, insider insights, and private club chat access.
          </p>

          {/* Benefits */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-3 text-sm">
            {["Pro insights", "Real-time games", "Private club chat"].map((b) => (
              <li key={b} className="flex items-center gap-2 text-white/85">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--gold)]/20">
                  <FiCheck className="text-[color:var(--gold)]" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {/* Pricing strip */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs sm:text-sm text-white/80">
            <span className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1.5">
              4.99$/day
            </span>
            <span className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1.5">
              29.99$/week
            </span>
            <span className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-1.5">
              99.99$/month
            </span>
          </div>

          {/* CTA */}
          <div className="mt-6 flex gap-3">
            <a
              href="https://discord.gg/bgt?utm_source=site&utm_medium=exclusive_club&utm_campaign=apply"
              className="btn btn-primary rounded-2xl px-5"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Apply on Discord</span>
              <FaDiscord className="-ml-0.5 mr-1" /> Apply on Discord
            </a>
            <a href="/contact" className="btn btn-outline rounded-2xl px-5">
              Business / Media
            </a>
          </div>
        </motion.div>

        {/* Member grid — compact cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MEMBERS.map((m, i) => (
            <motion.article
              key={m.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.04, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="card overflow-hidden"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  className="object-cover transition-transform duration-300 ease-out hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
                />
              </div>

              <div className="p-3">
                <h3 className="text-base font-semibold">{m.name}</h3>
                <p className="mt-1 text-xs text-white/75">{m.blurb}</p>

                {/* Social / wiki chips (compact) */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {m.youtube && (
                    <a
                      href={m.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/85 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 transition"
                      aria-label={`${m.name} on YouTube`}
                    >
                      <FaYoutube className="inline -mt-0.5" /> <span className="ml-1">YouTube</span>
                    </a>
                  )}
                  {m.twitch && (
                    <a
                      href={m.twitch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/85 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 transition"
                      aria-label={`${m.name} on Twitch`}
                    >
                      <FaTwitch className="inline -mt-0.5" /> <span className="ml-1">Twitch</span>
                    </a>
                  )}
                  {m.wiki && (
                    <a
                      href={m.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/10 px-2 py-1 text-xs text-white/85 hover:text-[color:var(--gold)] hover:border-[color:var(--gold)]/50 transition"
                      aria-label={`${m.name} on Wikipedia`}
                    >
                      <FaWikipediaW className="inline -mt-0.5" />{" "}
                      <span className="ml-1">Wiki</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tiny legal/availability note */}
        <p className="caption mt-6 text-white/55">
          Availability limited. Access rotates as seats open. Content creator &amp; pro lineup subject to change.
        </p>
      </div>
    </section>
  );
}

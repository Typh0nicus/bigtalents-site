"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

// ───────────────────────────── Types ─────────────────────────────
type Region = { name: string; status: "coming-soon" | "active"; note?: string };
type Game = {
  title: string;
  badge?: string;   // e.g., "Mobile", "5v5"
  image?: string;   // e.g., "/images/games/brawl-stars.jpg"
  regions: Region[];
};

// ──────────────────────────── Data ──────────────────────────────
// Place your images at: public/images/games/<file>.jpg (16:9 recommended)
const GAMES: Game[] = [
  {
    title: "Brawl Stars",
    badge: "Mobile",
    image: "/images/games/brawl-stars.webp",
    regions: [
      { name: "EU Roster", status: "coming-soon" },
      { name: "NA Roster", status: "coming-soon" },
    ],
  },
  // Add future titles here, e.g.:
  // {
  //   title: "Clash Royale",
  //   badge: "Mobile",
  //   image: "/images/games/clash-royale.jpg",
  //   regions: [{ name: "EU Roster", status: "coming-soon" }],
  // },
];

// ─────────────────────────── Component ───────────────────────────
export function ComingSoonRosters() {
  return (
    <section className="relative overflow-hidden">
      {/* soft gold ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 320px at 20% -10%, rgba(212,175,55,.10), transparent 60%), radial-gradient(800px 300px at 90% 0%, rgba(224,184,79,.08), transparent 60%)",
        }}
      />

      <div className="container relative z-10 py-20 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="h1">Rosters</h1>
          <p className="mt-3 text-white/80">
            Official BGT rosters —{" "}
            <span className="text-[color:var(--gold)]">coming soon</span>. We’ll
            announce lineups by game with transparent trials and professional ops.
          </p>

        {/* CTAs */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://discord.gg/bgt?utm_source=site&utm_medium=rosters&utm_campaign=join_discord"
              className="btn btn-primary rounded-xl flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <FaDiscord className="text-lg" /> Join Discord
            </a>
            <a
              href="https://x.com/bgtalents"
              className="btn btn-outline rounded-xl flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-lg" /> @bgtalents
            </a>
            <a
              href="https://instagram.com/bigtalents_org"
              className="btn btn-outline rounded-xl flex items-center gap-2"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-lg" /> bigtalents_org
            </a>
          </div>
        </motion.div>

        {/* Game cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game, i) => (
            <motion.article
              key={game.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.25, ease: "easeOut" }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
            >
              {/* Banner with optional image */}
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-white/[0.04]">
                {game.image ? (
                  <>
                    <img
                      src={game.image}
                      alt={`${game.title} banner`}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {/* top gradient for legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </>
                ) : (
                  // fallback shimmer if no image provided
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                )}

                {/* bottom-left badge chip */}
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/45 px-2 py-1 text-xs text-white/85 backdrop-blur">
                  {game.badge ?? "Esports"}
                </div>
              </div>

              {/* Title row */}
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{game.title}</h3>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                  Coming Soon
                </span>
              </div>

              {/* Regions list */}
              <ul className="mt-4 space-y-2">
                {game.regions.map((r) => (
                  <li
                    key={r.name}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm"
                  >
                    <div>
                      <div className="font-medium">{r.name}</div>
                      <div className="text-xs text-white/60">
                        Trials via Discord • Transparent selection
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                      {r.status === "coming-soon" ? "Coming Soon" : "Active"}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Card actions */}
              <div className="mt-5 flex gap-2">
                <a
                  href="https://discord.gg/bgt?utm_source=site&utm_medium=rosters_card&utm_campaign=tryout_pings"
                  className="btn btn-outline rounded-lg px-3 py-2 text-sm"
                  rel="noopener noreferrer"
                >
                  Get Tryout Pings
                </a>
                <a
                  href="mailto:admin@bigtalents.org?subject=Scrim%20or%20Trial%20Request"
                  className="btn btn-outline rounded-lg px-3 py-2 text-sm"
                >
                  Contact Staff
                </a>
              </div>
            </motion.article>
          ))}

          {/* Placeholder for future titles */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.25, ease: "easeOut" }}
            className="rounded-2xl border border-dashed border-white/10 p-5 text-center text-white/60"
          >
            <div className="mb-3 h-44 w-full rounded-xl bg-white/[0.03]" />
            <h3 className="text-lg font-semibold text-white/70">More titles soon</h3>
            <p className="mt-1 text-sm">
              Want to propose a roster? Reach out on Discord.
            </p>
          </motion.article>
        </div>

        {/* Small legal/contact note */}
        <p className="mt-8 text-sm text-white/50">
          Organizations & players interested in BGT rosters: contact{" "}
          <a
            href="mailto:admin@bigtalents.org"
            className="underline decoration-white/30 underline-offset-4 hover:text-[color:var(--gold)]"
          >
            admin@bigtalents.org
          </a>
          .
        </p>
      </div>
    </section>
  );
}

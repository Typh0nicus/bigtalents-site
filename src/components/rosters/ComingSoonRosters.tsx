// src/components/rosters/ComingSoonRosters.tsx
"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram, FaUsers, FaVideo } from "react-icons/fa";
import Image from "next/image";

// ───────────────────────────── Types ─────────────────────────────
type Status = "coming-soon" | "active";

type Section = {
  status: Status;
  note?: string;
};

type Game = {
  title: string;
  badge?: string;     // e.g., "Mobile", "5v5"
  image?: string;     // e.g., "/images/games/brawl-stars.jpg"
  players: Section;   // Players section status + optional note
  creators: Section;  // Content Creators section status + optional note
};

// ──────────────────────────── Data ──────────────────────────────
const GAMES: Game[] = [
  {
    title: "Brawl Stars",
    badge: "Mobile",
    image: "/images/games/brawl-stars.webp",
    players: { status: "coming-soon", note: "Trials will be announced via Discord." },
    creators: { status: "coming-soon", note: "Creator program details coming soon." },
  },
  // Add more titles here in the same shape when ready
];

// Typed easing (no string literals needed)
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Small helpers
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; cls: string }> = {
    "coming-soon": {
      label: "Coming Soon",
      cls: "border-white/15 text-white/75",
    },
    active: {
      label: "Active",
      cls: "border-[color:var(--gold)] text-[color:var(--gold)] bg-[color:var(--gold)]/10",
    },
  };
  const cfg = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.cls}`}
    >
      {cfg.label}
    </span>
  );
}

// ─────────────────────────── Component ───────────────────────────
export default function ComingSoonRosters() {
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
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="max-w-3xl"
        >
          <h1 className="h1">Rosters</h1>
          <p className="mt-3 text-white/80">
            We’re formalizing official BGT rosters and a creator program.{" "}
            <span className="text-[color:var(--gold)]">Both are coming soon</span>.
            Trials, applications, and updates will be posted in Discord.
          </p>

          {/* Global CTAs */}
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
              transition={{ delay: 0.05 * i, duration: 0.25, ease: EASE_OUT }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
            >
              {/* Banner */}
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-white/[0.04]">
                {game.image ? (
                  <>
                    <Image
                      src={game.image}
                      alt={`${game.title} banner`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                      priority={false}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  </>
                ) : (
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
                  Program Building
                </span>
              </div>

              {/* Two clean sections: Players + Content Creators */}
              <div className="mt-4 grid gap-3">
                {/* Players */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaUsers aria-hidden className="text-white/70" />
                      <div className="font-medium">Players</div>
                    </div>
                    <StatusBadge status={game.players.status} />
                  </div>
                  <p className="caption mt-2 text-white/70">
                    {game.players.note ?? "Trials via Discord • Transparent selection"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
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
                </div>

                {/* Content Creators */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaVideo aria-hidden className="text-white/70" />
                      <div className="font-medium">Content Creators</div>
                    </div>
                    <StatusBadge status={game.creators.status} />
                  </div>
                  <p className="caption mt-2 text-white/70">
                    {game.creators.note ?? "Creator program • Applications opening soon"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href="https://discord.gg/bgt?utm_source=site&utm_medium=rosters_card&utm_campaign=creator_interest"
                      className="btn btn-outline rounded-lg px-3 py-2 text-sm"
                      rel="noopener noreferrer"
                    >
                      Register Interest
                    </a>
                    <a
                      href="mailto:admin@bigtalents.org?subject=BGT%20Creator%20Program%20Inquiry"
                      className="btn btn-outline rounded-lg px-3 py-2 text-sm"
                    >
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          {/* Placeholder for future titles */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.25, ease: EASE_OUT }}
            className="rounded-2xl border border-dashed border-white/10 p-5 text-center text-white/60"
          >
            <div className="mb-3 h-44 w-full rounded-xl bg-white/[0.03]" />
            <h3 className="text-lg font-semibold text-white/70">More titles soon</h3>
            <p className="mt-1 text-sm">
              Want to propose a roster or creator partnership? Reach out on Discord.
            </p>
          </motion.article>
        </div>

        {/* Small legal/contact note */}
        <p className="mt-8 text-sm text-white/50">
          Organizations, players, and creators interested in partnering with BGT: contact{" "}
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

// Also export a named version if your page imports named exports:
export { ComingSoonRosters as RosterPage };

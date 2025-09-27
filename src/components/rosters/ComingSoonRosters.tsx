"use client";

import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaUsers, FaVideo } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

// TYPES
type Status = "coming-soon" | "active";

type Section = {
  status: Status;
  note?: string;
  cta?: {
    href: string;
    label: string;
    primary?: boolean;
    external?: boolean;
  };
};

type Game = {
  title: string;
  badge?: string;
  image?: string;
  players: Section;
  creators: Section;
};

// DATA
const GAMES: Game[] = [
  {
    title: "Brawl Stars",
    badge: "Mobile",
    image: "/images/games/brawl-stars.webp",
    players: {
      status: "coming-soon",
      note: "Formal trials will be announced via Discord.",
      cta: {
        href: "https://discord.gg/bgt",
        label: "Get Tryout Pings",
        external: true,
      },
    },
    creators: {
      status: "active",
      note: "Our creator program is actively accepting applications.",
      cta: {
        href: "/creator-program/apply",
        label: "Apply Now",
        primary: true,
      },
    },
  },
];

// Reusable Easing
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Reusable Status Badge Component
function StatusBadge({ status }: { status: Status }) {
  const config = {
    "coming-soon": {
      label: "Coming Soon",
      className: "border-white/15 text-white/75 bg-white/5",
    },
    active: {
      label: "Active",
      className: "border-green-500/30 text-green-400 bg-green-500/10",
    },
  };
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}

// Reusable Program Card Component
function ProgramCard({ icon: Icon, title, section }: { icon: React.ElementType; title: string; section: Section }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon aria-hidden className="text-white/70" />
          <div className="font-medium">{title}</div>
        </div>
        <StatusBadge status={section.status} />
      </div>
      <p className="caption mt-2 text-white/70">{section.note}</p>
      {section.cta && (
        <div className="mt-4">
          <Link
            href={section.cta.href}
            target={section.cta.external ? "_blank" : undefined}
            rel={section.cta.external ? "noopener noreferrer" : undefined}
            className={`btn w-full rounded-lg text-sm ${section.cta.primary ? "btn-primary" : "btn-outline"}`}
          >
            {section.cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}

// MAIN COMPONENT
export default function ComingSoonRosters() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(900px 320px at 20% -10%, rgba(212,175,55,.10), transparent 60%), radial-gradient(800px 300px at 90% 0%, rgba(224,184,79,.08), transparent 60%)",
        }}
      />

      <div className="container relative z-10 py-20 md:py-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className="max-w-3xl"
        >
          <h1 className="h1">Rosters</h1>
          <p className="mt-3 text-white/80">
            We are building official BGT rosters and expanding our creator program.
            <span className="text-[color:var(--gold)]"> Competitive rosters are coming soon</span>.
            All announcements will be made on Discord.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://discord.gg/bgt" target="_blank" rel="noopener noreferrer" className="btn btn-primary rounded-xl flex items-center gap-2">
              <FaDiscord className="text-lg" /> Join Discord
            </a>
            <a href="https://x.com/bgtalents" target="_blank" rel="noopener noreferrer" className="btn btn-outline rounded-xl flex items-center gap-2">
              <FaTwitter className="text-lg" /> @bgtalents
            </a>
          </div>
        </motion.div>

        {/* Game Programs Section */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game, i) => (
            <motion.article
              key={game.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.25, ease: EASE_OUT }}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm"
            >
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-white/[0.04]">
                {game.image ? (
                  <>
                    <Image src={game.image} alt={`${game.title} banner`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                )}
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/45 px-2 py-1 text-xs text-white/85 backdrop-blur">
                  {game.badge}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{game.title}</h3>
              </div>
              <div className="mt-4 grid gap-3">
                <ProgramCard icon={FaUsers} title="Players" section={game.players} />
                <ProgramCard icon={FaVideo} title="Content Creators" section={game.creators} />
              </div>
            </motion.article>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.25, ease: EASE_OUT }}
            className="rounded-2xl border border-dashed border-white/10 p-5 text-center flex flex-col justify-center"
          >
            <h3 className="font-semibold text-white/70">More Titles Coming Soon</h3>
            <p className="mt-1 text-sm text-white/60">
              Want to propose a new game roster? Reach out on Discord.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ComingSoonRosters as RosterPage };

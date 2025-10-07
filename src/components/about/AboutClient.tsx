"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTrophy, FaUsers, FaRocket, FaCalendar, FaDiscord, FaYoutube } from "react-icons/fa";
import { FiArrowRight, FiTarget, FiGlobe, FiAward, FiZap } from "react-icons/fi";

const STATS = [
  { icon: FaTrophy, value: "14+", label: "Tournaments Hosted" },
  { icon: FaUsers, value: "4,600+", label: "Teams Competed" },
  { icon: FaRocket, value: "$6,931", label: "Prizes Awarded" },
  { icon: FaCalendar, value: "7+", label: "Months Running" },
];

const VALUES = [
  {
    icon: FiTarget,
    title: "Player-First",
    description:
      "Every decision we make prioritizes the player experience and competitive integrity.",
  },
  {
    icon: FiGlobe,
    title: "Global Community",
    description:
      "Connecting players across NA & EU regions with inclusive, accessible competitions.",
  },
  {
    icon: FiAward,
    title: "Quality Standards",
    description:
      "Maintaining high standards for tournament organization, production, and player support.",
  },
  {
    icon: FiZap,
    title: "Opportunity-Driven",
    description:
      "Creating competitive opportunities for players of all skill levels to shine.",
  },
];

const HIGHLIGHTS = [
  {
    name: "Proven Tournament Platform",
    description:
      "Successfully organized 14+ competitive tournaments across NA and EU regions with professional production quality and reliable execution.",
    icon: FaTrophy,
  },
  {
    name: "Growing Prize Pools",
    description: "Awarded nearly $7,000 in total prizes with consistently growing prize pools and expanding sponsorship support for our events.",
    icon: FaRocket,
  },
  {
    name: "Thriving Community",
    description:
      "Built an engaged community of 4,600+ competing teams with regular tournaments, active Discord server, and growing creator collaborations.",
    icon: FaUsers,
  },
];

export default function AboutClient() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1200px 600px at 20% -10%, rgba(212,175,55,0.08), transparent 60%),
                radial-gradient(1000px 500px at 80% 10%, rgba(224,184,79,0.06), transparent 60%)
              `,
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="h1 mb-6">
              About <span className="text-[color:var(--gold)]">Big Talents</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              We&apos;re a dedicated tournament organization for competitive Brawl Stars. 
              Since early 2025, we&apos;ve been creating opportunities for players to compete, 
              improve, and showcase their skills in professional-grade tournaments.
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="inline-flex p-3 bg-[color:var(--gold)]/20 rounded-full mb-2">
                    <stat.icon className="text-[color:var(--gold)] text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tournaments" className="btn btn-primary rounded-2xl px-8 py-4 text-lg">
                View Tournaments <FiArrowRight className="ml-2" />
              </Link>
              <Link href="/creator-program" className="btn btn-outline rounded-2xl px-8 py-4 text-lg">
                Join Creator Program
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="h2 mb-6">
                Our <span className="text-[color:var(--gold)]">Story</span>
              </h2>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p>
                  Big Talents was founded with a clear mission: create accessible, high-quality 
                  competitive opportunities for the Brawl Stars community. We believe every player, 
                  regardless of skill level, deserves a chance to compete in well-organized tournaments.
                </p>

                <p>
                  In just 7 months, we&apos;ve organized 14+ major tournaments, bringing together over 
                  4,600 teams from NA and EU regions. With nearly $7,000 awarded in prize pools, 
                  we&apos;ve built a reputation for reliable, professionally-run competitive events.
                </p>

                <p>
                  From weekly grassroots competitions to championship-level events with substantial 
                  prize pools, we&apos;re committed to growing the competitive Brawl Stars scene and 
                  providing consistent opportunities for players to compete and improve.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent border border-[color:var(--gold)]/20">
                <div className="w-full h-full flex items-center justify-center">
                  <FaTrophy className="text-[color:var(--gold)]/30 text-[120px]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">
              Our <span className="text-[color:var(--gold)]">Values</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center p-6"
              >
                <div className="inline-flex p-4 bg-[color:var(--gold)]/20 rounded-full mb-4">
                  <value.icon className="text-[color:var(--gold)] text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">
              What Makes Us <span className="text-[color:var(--gold)]">Different</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our commitment to quality tournaments and community growth sets us apart
            </p>
          </motion.div>

          <div className="grid gap-8 lg:gap-12">
            {HIGHLIGHTS.map((highlight, idx) => (
              <motion.div
                key={highlight.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`grid gap-8 lg:grid-cols-2 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="p-8 rounded-2xl bg-gradient-to-r from-[color:var(--gold)]/5 to-[color:var(--gold)]/10 border border-[color:var(--gold)]/20">
                    <div className="inline-flex p-3 bg-[color:var(--gold)]/20 rounded-full mb-4">
                      <highlight.icon className="text-[color:var(--gold)] text-2xl" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{highlight.name}</h3>
                    <p className="text-white/80 text-lg leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>

                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[color:var(--gold)]/10 to-transparent border border-[color:var(--gold)]/20">
                    <div className="w-full h-full flex items-center justify-center">
                      <highlight.icon className="text-[color:var(--gold)]/20 text-6xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[color:var(--gold)]/5 to-[color:var(--gold)]/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to <span className="text-[color:var(--gold)]">Compete?</span>
            </h2>

            <p className="text-xl text-white/80 mb-8">
              Whether you&apos;re a competitive player looking to test your skills or a content 
              creator wanting to collaborate, join our growing community today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tournaments" className="btn btn-primary rounded-2xl px-8 py-4 text-lg">
                Browse Tournaments
              </Link>
              <Link href="/creator-program" className="btn btn-outline rounded-2xl px-8 py-4 text-lg">
                Creator Program
              </Link>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              <a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-xl text-white/70 hover:text-indigo-400 hover:bg-white/20 transition-all"
                aria-label="Join our Discord"
              >
                <FaDiscord size={24} />
              </a>
              <a
                href="https://youtube.com/@BigTalentsGG"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-xl text-white/70 hover:text-red-400 hover:bg-white/20 transition-all"
                aria-label="Subscribe on YouTube"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

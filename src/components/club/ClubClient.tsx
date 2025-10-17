"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord, FaYoutube, FaTwitch, FaWikipediaW, FaTrophy, FaStar } from "react-icons/fa";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";

const CLUB_INFO = {
  name: "BGT (Big Talents)",
  tag: "#2GP8899V8", 
  description: "The most exclusive Brawl Stars club",
  region: "🇩🇪 Germany",
  brawlifyUrl: "https://brawlify.com/stats/club/2GP8899V8"
};

const ELITE_MEMBERS = [
  {
    name: "HMB | Boss",
    image: "/images/club/boss.jpg",
    title: "World Champion",
    achievements: ["2024 BSC World Champion", "2025 Brawl Cup Champion"],
    description: "The reigning world champion brings unparalleled competitive experience.",
    youtube: "https://www.youtube.com/@BosS__BS",
    twitch: "https://www.twitch.tv/boss__bs",
    wiki: "https://liquipedia.net/brawlstars/BosS",
  },
  {
    name: "TTM | Angelboy", 
    image: "/images/club/angelboy.png",
    title: "Top 1 Global Ranked",
    achievements: ["#1 Global Ranked Player", "Worlds Finalist", "Multiple Season Champion"],
    description: "The pinnacle of ranked gameplay in Brawl Stars.",
    youtube: "https://www.youtube.com/@angelboybs",
    wiki: "https://liquipedia.net/brawlstars/Angelboy",
  },
  {
    name: "Hyra",
    image: "/images/club/hyra.jpg", 
    title: "Trophy Legend",
    achievements: ["200K Trophy Milestone", "1.9M YouTube Subscribers", "Top 1 Ladder All-Time"],
    description: "The ultimate trophy pusher with unmatched dedication across all brawlers.",
    youtube: "https://www.youtube.com/@Hyra",
  },
  {
    name: "ELV | DiegoGamer", 
    image: "/images/club/diego.webp",
    title: "NA Worlds Finalist",
    achievements: ["Top 2 in North America", "Worlds Finalist", "Multiple Finals Champion"],
    description: "Esports Prowess, Unmatched.",
    youtube: "https://www.youtube.com/@DiegogamerCR_",
    twitch: "https://www.twitch.tv/diegogamercr",
    wiki: "https://liquipedia.net/brawlstars/Diegogamer",
  },
  {
    name: "Trebor",
    image: "/images/club/trebor.jpg",
    title: "Pro Player & Creator",
    achievements: ["Professional Esports Player", "1.75M YouTube", "725K Twitch"],
    description: "Master strategist and professional player with deep understanding of competitive play.",
    youtube: "https://www.youtube.com/@TreborBS",
    twitch: "https://www.twitch.tv/trebor", 
    wiki: "https://liquipedia.net/brawlstars/Trebor",
  },
  {
    name: "Vital Shark",
    image: "/images/club/vital_shark.jpg",
    title: "Top Creator",
    achievements: ["1.2M YouTube Subscribers", "Top Content Creator", "Community Builder"],
    description: "Combines high-level gameplay with entertaining content creation.",
    youtube: "https://www.youtube.com/@VITALxSHARK",
  },
  {
    name: "Sniperbs_",
    image: "/images/club/sniperbs_.jpg",
    title: "Professional Player", 
    achievements: ["800K YouTube Subscribers", "Professional Player", "Precision Specialist"],
    description: "Renowned for incredible mechanical skill and precision gameplay.",
    youtube: "https://www.youtube.com/@Sniperbs_",
    wiki: "https://liquipedia.net/brawlstars/Sniper",
  }
];

const MEMBERSHIP_TIERS = [
  {
    name: "Daily Access",
    price: "$3.99",
    duration: "24 hours",
    features: [
      "Club chat access",
      "Spectate games",
      "Community events",
      "Insider insights"
    ]
  },
  {
    name: "Weekly Access", 
    price: "$19.99",
    duration: "7 days",
    features: [
      "Everything in Daily",
      "Priority queue",
      "Weekly events",
      "Extended access"
    ],
    popular: true
  },
  {
    name: "Monthly VIP",
    price: "$69.99", 
    duration: "30 days",
    features: [
      "Everything in Weekly",
      "VIP status",
      "Monthly events",
      "Maximum access"
    ]
  }
];

export default function ClubClient() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 800px at 20% -10%, rgba(212,175,55,0.12), transparent 60%),
                radial-gradient(1200px 600px at 80% 10%, rgba(224,184,79,0.08), transparent 60%),
                radial-gradient(800px 600px at 50% 100%, rgba(212,175,55,0.06), transparent 50%)
              `
            }}
          />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur mb-6">
              <FaTrophy className="text-[color:var(--gold)]" />
              <span className="text-white/85">Most Exclusive Club in The World</span>
            </div>

            <h1 className="h1 mb-6">
              Welcome to <span className="text-[color:var(--gold)]">Talents</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Train with world champions, learn from top global players, and access the biggest 
              creators in Brawl Stars. This is where legends are made.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <motion.a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg"
              >
                <FaDiscord className="mr-2" /> Join Elite Club
              </motion.a>
              
              <motion.a
                href={CLUB_INFO.brawlifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg"
              >
                <FiExternalLink className="mr-2" /> View Club Stats
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elite Members Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Meet the <span className="text-[color:var(--gold)]">Legends</span></h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              World champions, top global players, and biggest creators ready to elevate your game
            </p>
          </motion.div>

          <div className="grid gap-8 lg:gap-12">
            {ELITE_MEMBERS.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`grid gap-8 lg:grid-cols-3 items-center`}
              >
                <div className={i % 2 === 1 ? 'lg:order-3' : ''}>
                  <div className="relative group overflow-hidden">
                    {/* FIXED: Proper hover container with unified scaling */}
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                      {/* FIXED: Overlay now scales with the container */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      
                      {/* Social links positioned over the scaled content */}
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        {member.youtube && (
                          <a
                            href={member.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/70 backdrop-blur-sm rounded-lg text-red-400 hover:bg-red-400 hover:text-white transition-all duration-200"
                          >
                            <FaYoutube />
                          </a>
                        )}
                        {member.twitch && (
                          <a
                            href={member.twitch}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/70 backdrop-blur-sm rounded-lg text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-200"
                          >
                            <FaTwitch />
                          </a>
                        )}
                        {member.wiki && (
                          <a
                            href={member.wiki}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/70 backdrop-blur-sm rounded-lg text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black transition-all duration-200"
                          >
                            <FaWikipediaW />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`lg:col-span-2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                      <div className="inline-flex items-center px-3 py-1 bg-[color:var(--gold)]/20 text-[color:var(--gold)] rounded-full font-medium text-sm">
                        {member.title}
                      </div>
                    </div>

                    <p className="text-white/80 leading-relaxed">
                      {member.description}
                    </p>

                    <div>
                      <h4 className="font-semibold mb-2 text-[color:var(--gold)]">Key Achievements:</h4>
                      <ul className="grid gap-1 sm:grid-cols-2">
                        {member.achievements.map((achievement, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-white/70">
                            <FaStar className="text-[color:var(--gold)] text-xs flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="h2 mb-4">Choose Your <span className="text-[color:var(--gold)]">Access Level</span></h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Flexible membership options for every level of commitment
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">
            {MEMBERSHIP_TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  tier.popular 
                    ? 'border-[color:var(--gold)]/40 bg-gradient-to-b from-[color:var(--gold)]/10 to-[color:var(--gold)]/5 scale-105' 
                    : 'border-white/15 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-[color:var(--gold)] text-black rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-4xl font-bold text-[color:var(--gold)] mb-2">{tier.price}</div>
                  <div className="text-sm text-white/70">per {tier.duration}</div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm">
                      <FiArrowRight className="text-[color:var(--gold)] flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium transition-all ${
                    tier.popular 
                      ? 'bg-[color:var(--gold)] text-black hover:bg-[color:var(--gold)]/90' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Join the <span className="text-[color:var(--gold)]">Elite?</span>
            </h2>
            
            <p className="text-xl text-white/80 mb-8">
              Limited availability. Only 3 fans can access at a time. 
              This is your chance to train with champions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg"
              >
                <FaDiscord className="mr-2" /> Apply Now
              </motion.a>
              
              <Link 
                href="/contact"
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg"
              >
                Business Inquiries
              </Link>
            </div>

            <p className="text-sm text-white/60 mt-6">
              Access rotates as seats open • Content lineup subject to change
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

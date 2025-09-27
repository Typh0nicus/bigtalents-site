"use client";
import { motion } from "framer-motion";
import { FiCheck, FiStar, FiAward, FiUsers } from "react-icons/fi";
import { FaYoutube, FaTwitch } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { AnimatedButton } from "@/components/ui/AnimatedButton";

const TIERS = [
  {
    name: "BGT Academy",
    description: "Entry tier for Supercell Official Creators",
    requirements: "5K+ YouTube or 3K+ Twitch or 15K+ TikTok",
    benefits: [
      "Academy certification", 
      "Private Discord access",
      "Brand asset library",
      "Tournament priority"
    ],
    icon: FiUsers,
    color: "text-blue-400 bg-blue-400/10"
  },
  {
    name: "BGT Partner", 
    description: "Revenue sharing partnership",
    requirements: "35K+ YouTube or 10K+ Twitch or 100K+ TikTok",
    benefits: [
      "Revenue sharing program",
      "Custom UTM tracking", 
      "Exclusive tournaments",
      "Co-marketing opportunities"
    ],
    icon: FiStar,
    color: "text-[var(--gold)] bg-[var(--gold)]/10",
    featured: true
  },
  {
    name: "BGT Elite",
    description: "Premium tier with guaranteed compensation", 
    requirements: "100K+ YouTube or 50K+ Twitch or 500K+ TikTok",
    benefits: [
      "Monthly guaranteed pay",
      "Premium revenue rates",
      "Direct CFO access",
      "Tournament co-hosting"
    ],
    icon: FiAward,
    color: "text-purple-400 bg-purple-400/10"
  }
];

export function CreatorProgram() {
  return (
    <section className="py-24">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-[var(--gold)]/10 text-[var(--gold)] text-sm font-bold rounded-full mb-6"
          >
            Now Open
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-6"
          >
            Creator Program
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto"
          >
            Join the most exclusive creator program in Brawl Stars esports. 
            Earn revenue, access premium tournaments, and grow with BGT.
          </motion.p>
        </div>

        {/* Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {TIERS.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`card p-8 relative ${tier.featured ? 'ring-2 ring-[var(--gold)] shadow-2xl' : ''}`}
              >
                {tier.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--gold)] text-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex p-4 rounded-2xl mb-4 ${tier.color}`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-white/70 mb-4">{tier.description}</p>
                  <div className="text-sm text-[var(--gold)] font-semibold">
                    {tier.requirements}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FiCheck className="text-green-400 flex-shrink-0" size={16} />
                      <span className="text-white/80 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <AnimatedButton
                  as="link"
                  href="/creator-program/apply"
                  variant={tier.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  Apply Now
                </AnimatedButton>
              </motion.div>
            );
          })}
        </div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-xl font-bold mb-4">Requirements</h3>
          <p className="text-white/70 mb-6">
            All content must be Brawl Stars related. Single platform qualification is sufficient. 
            Academy tier requires Supercell Official Creator (T2) status.
          </p>
          <div className="flex justify-center items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <FaYoutube className="text-red-500" />
              <span className="text-sm">YouTube</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTwitch className="text-purple-500" />
              <span className="text-sm">Twitch</span>
            </div>
            <div className="flex items-center gap-2">
              <SiTiktok />
              <span className="text-sm">TikTok</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

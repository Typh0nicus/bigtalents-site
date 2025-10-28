"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FaTrophy, FaUsers, FaRocket, FaCalendar, FaDiscord, FaTwitterSquare, FaTwitter, FaXbox, FaArrowUp } from "react-icons/fa";
import { FiArrowRight, FiTarget, FiGlobe, FiAward, FiZap } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

const PARTICLE_COUNT = 25;

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
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Floating Particles */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Particle Background */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(1400px 700px at 20% -10%, rgba(212,175,55,0.12), transparent 60%),
                  radial-gradient(1200px 600px at 80% 10%, rgba(224,184,79,0.08), transparent 60%),
                  radial-gradient(1000px 500px at 50% 100%, rgba(212,175,55,0.06), transparent 60%)
                `,
              }}
            />
            
            {/* Floating Trophy Particles */}
            <div className="opacity-20">
              {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${(i * 4.5) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, Math.sin(i) * 20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <FaTrophy className="text-[#D4AF37]" size={i % 2 === 0 ? 12 : 8} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div style={{ opacity, scale }} className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex mb-6"
            >
              <div className="p-4 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-2xl shadow-[#D4AF37]/50">
                <FaTrophy className="text-black text-4xl" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-black mb-6">
              About <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Big Talents</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              We&apos;re a dedicated tournament organization for competitive Brawl Stars. 
              Since early 2025, we&apos;ve been creating opportunities for players to compete, 
              improve, and showcase their skills in professional-grade tournaments.
            </p>

            {/* Premium Animated Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
            >
              {STATS.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="card p-6 text-center border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/20">
                    <motion.div 
                      className="inline-flex p-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="text-[#D4AF37] text-2xl" />
                    </motion.div>
                    <div className="text-3xl font-black text-white mb-1 bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tournaments" className="btn btn-primary rounded-2xl px-8 py-4 text-lg group hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all">
                View Tournaments 
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight />
                </motion.span>
              </Link>
              <Link href="/creator-program" className="btn btn-outline rounded-2xl px-8 py-4 text-lg hover:bg-[#D4AF37]/10 transition-all">
                Join Creator Program
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story - Enhanced */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
        
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex mb-4"
              >
                <div className="w-1 h-12 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-black mb-6">
                Our <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Story</span>
              </h2>

              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p className="select-text">
                  Big Talents was founded with a clear mission: create accessible, high-quality 
                  competitive opportunities for the Brawl Stars community. We believe every player, 
                  regardless of skill level, deserves a chance to compete in well-organized tournaments.
                </p>

                <p className="select-text">
                  In just 7 months, we&apos;ve organized 14+ major tournaments, bringing together over 
                  4,600 teams from NA and EU regions. With nearly $7,000 awarded in prize pools, 
                  we&apos;ve built a reputation for reliable, professionally-run competitive events.
                </p>

                <p className="select-text">
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
              className="relative group"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/20">
                <div className="w-full h-full flex items-center justify-center relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"
                  />
                  <FaTrophy className="text-[#D4AF37]/30 text-[120px] relative z-10 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values - Premium Cards */}
      <section className="py-16 md:py-24 bg-white/[0.02] relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Our <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Values</span>
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
                whileHover={{ y: -8 }}
                className="relative group"
              >
                <div className="card p-6 text-center border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 h-full hover:shadow-xl hover:shadow-[#D4AF37]/20">
                  <motion.div 
                    className="inline-flex p-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="text-[#D4AF37] text-2xl" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/70 leading-relaxed select-text">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different - Premium Layout */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              What Makes Us <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Different</span>
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
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className={`grid gap-8 lg:grid-cols-2 items-center ${
                  idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <motion.div 
                  className={idx % 2 === 1 ? "lg:order-2" : ""}
                  whileHover={{ x: idx % 2 === 1 ? 10 : -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card p-8 bg-gradient-to-r from-[#D4AF37]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/20">
                    <motion.div 
                      className="inline-flex p-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/20 rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <highlight.icon className="text-[#D4AF37] text-2xl" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">{highlight.name}</h3>
                    <p className="text-white/80 text-lg leading-relaxed select-text">
                      {highlight.description}
                    </p>
                  </div>
                </motion.div>

                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <motion.div 
                    className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-500 group overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5"
                      />
                      <highlight.icon className="text-[#D4AF37]/20 text-6xl relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA - Premium */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#D4AF37]/5 to-[#D4AF37]/10 relative overflow-hidden">
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(212,175,55,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />

        <div className="container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex mb-6"
            >
              <div className="p-3 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] rounded-full shadow-xl shadow-[#D4AF37]/50">
                <FaTrophy className="text-black text-3xl" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">Compete?</span>
            </h2>

            <p className="text-xl text-white/80 mb-8 select-text">
              Whether you&apos;re a competitive player looking to test your skills or a content 
              creator wanting to collaborate, join our growing community today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tournaments" className="btn btn-primary rounded-2xl px-8 py-4 text-lg hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all">
                Browse Tournaments
              </Link>
              <Link href="/creator-program" className="btn btn-outline rounded-2xl px-8 py-4 text-lg hover:bg-[#D4AF37]/10 transition-all">
                Creator Program
              </Link>
            </div>

            <div className="flex justify-center gap-4">
              <motion.a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="p-4 bg-white/10 rounded-xl text-white/70 hover:text-indigo-400 hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-indigo-400/20"
                aria-label="Join our Discord"
              >
                <FaDiscord size={28} />
              </motion.a>
              <motion.a
                href="https://x.com/bgtalents"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.1 }}
                className="p-4 bg-white/10 rounded-xl text-white/70 hover:text-cyan-400 hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-red-400/20"
                aria-label="Follow our Twitter"
              >
                <FaTwitterSquare size={28} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

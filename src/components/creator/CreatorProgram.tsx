"use client";

import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { FiCheck, FiStar, FiAward, FiUsers, FiZap, FiTrendingUp } from "react-icons/fi";
import { FaYoutube, FaTwitch, FaDiscord } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import Link from "next/link";
import { useState, useEffect } from "react";

const TIERS = [
  {
    name: "BGT Academy",
    tagline: "Learn from the best",
    description: "Foundation tier for emerging creators ready to level up",
    requirements: "5K+ YouTube or 3K+ Twitch or 15K+ TikTok",
    benefits: [
      "Academy Discord role & channels",
      "Brand kit & graphics templates",
      "Tournament casting opportunities",
      "Content feedback sessions",
      "Creator mentorship program"
    ],
    icon: FiUsers,
    color: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    particleColor: "rgba(59, 130, 246, 0.6)"
  },
  {
    name: "BGT Partner",
    tagline: "Grow together",
    description: "Revenue-sharing partnership for established creators",
    requirements: "35K+ YouTube or 10K+ Twitch or 100K+ TikTok",
    benefits: [
      "10-15% revenue share on tournaments",
      "Custom creator code tracking",
      "Early tournament access & perks",
      "Collaborative content opportunities",
      "Monthly creator roundtables"
    ],
    icon: FiStar,
    color: "from-[#D4AF37] to-[#FFD700]",
    iconBg: "bg-[#D4AF37]/10",
    iconColor: "text-[#D4AF37]",
    particleColor: "rgba(212, 175, 55, 0.8)",
    featured: true
  },
  {
    name: "BGT Elite",
    tagline: "Professional partnership",
    description: "Premium tier with guaranteed compensation",
    requirements: "100K+ YouTube or 50K+ Twitch or 500K+ TikTok",
    benefits: [
      "Monthly guaranteed payment",
      "20-25% premium revenue rates",
      "Direct CFO & team access",
      "Co-host major tournaments",
      "Custom integration opportunities"
    ],
    icon: FiAward,
    color: "from-purple-500 to-pink-500",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
    particleColor: "rgba(168, 85, 247, 0.6)"
  }
];

const PLATFORMS = [
  { icon: FaYoutube, name: "YouTube", color: "text-red-500", stat: "Video Content" },
  { icon: FaTwitch, name: "Twitch", color: "text-purple-500", stat: "Live Streams" },
  { icon: SiTiktok, name: "TikTok", color: "text-white", stat: "Short Form" },
];

const PERKS = [
  {
    icon: FiZap,
    title: "Fast-Track Growth",
    description: "Leverage BGT's network to accelerate your channel growth",
    color: "text-yellow-400"
  },
  {
    icon: FiTrendingUp,
    title: "Revenue Sharing",
    description: "Earn from tournament sign-ups and brand partnerships",
    color: "text-green-400"
  },
  {
    icon: FiUsers,
    title: "Elite Network",
    description: "Connect with top Brawl Stars creators and pros",
    color: "text-blue-400"
  }
];

const PARTICLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: (i * 5.26315789) % 100,
  top: (i * 7.89473684) % 100,
}));

function PlatformIcon({ platform, index }: { platform: typeof PLATFORMS[0]; index: number }) {
  const controls = useAnimation();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => {
        controls.start({
          y: -8,
          scale: 1.05,
          rotate: [0, 5, -5, 0]
        });
      }}
      onHoverEnd={() => {
        controls.start({
          y: 0,
          scale: 1,
          rotate: 0
        });
      }}
      animate={controls}
      className="relative group cursor-pointer"
    >
      <div className="flex flex-col items-center gap-3 p-6 bg-white/[0.03] rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300">
        <div className="p-4 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
          <platform.icon className={`${platform.color} text-4xl`} />
        </div>
        <div className="text-center">
          <div className="font-bold text-white mb-1">{platform.name}</div>
          <div className="text-xs text-white/50">{platform.stat}</div>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5 }}
        transition={{ duration: 0.3 }}
        style={{ background: platform.color.replace('text-', 'bg-') }}
      />
    </motion.div>
  );
}

export function CreatorProgram() {
  const [hoveredTier, setHoveredTier] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full min-h-screen select-none overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-32 w-full">
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ y: isMounted ? y : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.12), transparent 50%),
                radial-gradient(1200px 600px at 80% 15%, rgba(168,85,247,0.08), transparent 50%),
                radial-gradient(1000px 500px at 50% 100%, rgba(59,130,246,0.06), transparent 50%)
              `
            }}
          />
          
          {isMounted && (
            <div className="absolute inset-0 opacity-30">
              {PARTICLE_POSITIONS.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="container relative z-10 px-4 w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto w-full"
          >
            {/* Badge with full ring visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isMounted ? 1 : 0, scale: isMounted ? 1 : 0.8 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37]/20 to-purple-500/20 rounded-full mb-8 ring-1 ring-[#D4AF37]/30 backdrop-blur-sm"
            >
              <motion.span 
                className="relative flex h-2.5 w-2.5"
                animate={isMounted ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
              </motion.span>
              <span className="text-sm font-bold bg-gradient-to-r from-[#D4AF37] to-purple-400 bg-clip-text text-transparent">
                Now Accepting Applications
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight px-4">
              <span className="bg-gradient-to-r from-white via-white to-[#D4AF37] bg-clip-text text-transparent">
                Creator Program
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isMounted ? 1 : 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed px-4"
            >
              The most <span className="text-[#D4AF37] font-semibold">exclusive creator program</span> in Brawl Stars esports.
              Grow your audience, earn revenue, and collaborate with the best.
            </motion.p>

            {/* Perks Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ delay: 0.7 }}
              className="grid md:grid-cols-3 gap-6 mb-12 w-full"
            >
              {PERKS.map((perk, i) => (
                <motion.div
                  key={perk.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={isMounted ? { scale: 1.03, y: -5 } : {}}
                  className="relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/5 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    <perk.icon className={`${perk.color} text-2xl`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{perk.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{perk.description}</p>
                  
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>

            {/* Hero CTAs - Fixed container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : 20 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            >
              <motion.div 
                whileHover={isMounted ? { scale: 1.02 } : {}} 
                whileTap={isMounted ? { scale: 0.98 } : {}}
              >
                <Link
                  href="/creator-program/apply"
                  className="btn btn-primary rounded-2xl px-10 py-5 text-lg inline-flex items-center justify-center gap-2 shadow-2xl hover:shadow-[#D4AF37]/40 transition-all duration-300 group"
                >
                  <FiZap className="group-hover:rotate-12 transition-transform duration-300" />
                  Apply Now
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={isMounted ? { scale: 1.02 } : {}} 
                whileTap={isMounted ? { scale: 0.98 } : {}}
              >
                <a
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline rounded-2xl px-10 py-5 text-lg hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <FaDiscord />
                  Join Discord
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="container py-20 px-4 w-full mx-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 px-4">
            Choose Your <span className="bg-gradient-to-r from-[#D4AF37] to-purple-400 bg-clip-text text-transparent">Path</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed px-4">
            Three distinct tiers designed to support creators at every stage of their journey
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
            {TIERS.map((tier, index) => {
              const IconComponent = tier.icon;
              const isHovered = hoveredTier === index;
              
              const tierParticles = Array.from({ length: 12 }, (_, i) => ({
                left: ((index * 17 + i * 23) % 100),
                top: ((index * 13 + i * 19) % 100),
              }));
              
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onHoverStart={() => setHoveredTier(index)}
                  onHoverEnd={() => setHoveredTier(null)}
                  className={`relative group w-full ${tier.featured ? 'lg:scale-105' : ''}`}
                >
                  <motion.div
                    animate={{
                      scale: isHovered && isMounted ? 1.01 : 1,
                      y: isHovered && isMounted ? -4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`relative h-full card p-8 backdrop-blur-xl overflow-hidden ${tier.featured ? 'ring-2 ring-[#D4AF37] shadow-2xl shadow-[#D4AF37]/20' : ''}`}
                  >
                    {/* Particles */}
                    {isHovered && isMounted && (
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {tierParticles.map((pos, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              backgroundColor: tier.particleColor,
                              left: `${pos.left}%`,
                              top: `${pos.top}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                              y: [0, -50],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Icon */}
                    <div className="mb-6 relative z-10">
                      <div className={`inline-flex p-6 rounded-2xl ${tier.iconBg} backdrop-blur-sm relative`}>
                        <IconComponent className={`${tier.iconColor} text-4xl`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6 relative z-10">
                      <h3 className="text-2xl font-black mb-2">{tier.name}</h3>
                      <p className="text-[#D4AF37] text-sm font-bold mb-3">{tier.tagline}</p>
                      <p className="text-white/60 leading-relaxed text-sm mb-4">{tier.description}</p>

                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20 mb-6 max-w-full">
                        <FiCheck className="text-[#D4AF37] flex-shrink-0" size={16} />
                        <p className="text-sm font-semibold text-[#D4AF37]">{tier.requirements}</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3 mb-8 relative z-10">
                      {tier.benefits.map((benefit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + (index * 0.15) + (i * 0.05) }}
                          className="flex items-start gap-3 group/item"
                        >
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                            <FiCheck className="text-green-400" size={12} />
                          </div>
                          <span className="text-white/80 text-sm leading-relaxed">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href="/creator-program/apply"
                      className={`relative w-full inline-block text-center py-3.5 px-6 rounded-xl font-bold transition-all duration-300 overflow-hidden group/btn z-10 ${
                        tier.featured
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black hover:shadow-xl hover:shadow-[#D4AF37]/50'
                          : 'border-2 border-white/20 hover:bg-white/5 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <span className="relative z-20">Apply Now</span>
                      
                      {isMounted && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
                          initial={{ x: '-100%' }}
                          animate={{ x: isHovered ? '100%' : '-100%' }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        />
                      )}
                    </Link>

                    {/* Background gradient on hover */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tier.color} pointer-events-none z-0`}
                      animate={{ opacity: isHovered && isMounted ? 0.05 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="container py-20 px-4 w-full mx-auto overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.2), transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(168,85,247,0.2), transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.2), transparent 50%)',
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-black mb-4">
              Platform <span className="text-[#D4AF37]">Support</span>
            </h3>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              All content must be <span className="text-[#D4AF37] font-semibold">Brawl Stars related</span>. 
              Single platform qualification is sufficient. Academy tier requires Supercell Official Creator (T2) status.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8">
              {PLATFORMS.map((platform, i) => (
                <PlatformIcon key={platform.name} platform={platform} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-24 px-4 overflow-x-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.div
                className="w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl"
                animate={isMounted ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 px-4">
                  Ready to <span className="bg-gradient-to-r from-[#D4AF37] via-purple-400 to-[#D4AF37] bg-clip-text text-transparent">Level Up?</span>
                </h2>
                <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                  Applications are reviewed within <span className="text-[#D4AF37] font-semibold">10 business days</span>. 
                  Join the elite community of BGT creators today.
                </p>
              </motion.div>

              {/* Final CTA Button - Fixed container */}
              <div className="flex justify-center">
                <motion.div
                  whileHover={isMounted ? { scale: 1.02 } : {}}
                  whileTap={isMounted ? { scale: 0.98 } : {}}
                >
                  <Link
                    href="/creator-program/apply"
                    className="btn btn-primary rounded-2xl px-8 sm:px-14 py-5 sm:py-6 text-lg sm:text-xl hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all duration-300 inline-flex items-center gap-3 group"
                  >
                    <FiZap className="group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" size={24} />
                    <span>Start Your Application</span>
                    {isMounted && (
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex-shrink-0"
                      >
                        →
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

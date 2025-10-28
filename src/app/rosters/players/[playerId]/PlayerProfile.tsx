"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiCalendar, FiAward, FiPlay, FiExternalLink } from "react-icons/fi";
import { FaTwitter, FaTwitch, FaYoutube, FaInstagram, FaTrophy } from "react-icons/fa";
import type { TeamMember } from "@/data/players";
import { useState, useEffect, ComponentType } from "react";

const PARTICLE_COUNT = 20;

export default function PlayerProfile({ member }: { member: TeamMember }) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const trophyParticles = Array.from({ length: 6 }, (_, i) => ({
    x: (Math.random() - 0.5) * 100,
    y: -30 - Math.random() * 40,
    rotate: Math.random() * 360,
    delay: i * 0.15
  }));

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Enhanced Particle Background */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.08), transparent 50%),
                radial-gradient(1200px 600px at 80% 15%, rgba(212,175,55,0.05), transparent 50%),
                radial-gradient(1000px 500px at 50% 100%, rgba(212,175,55,0.03), transparent 50%)
              `
            }}
          />
          <div className="opacity-25">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${(i * 6) % 100}%`,
                  top: `${(i * 8) % 100}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.2, 0.9, 0.2],
                }}
                transition={{
                  duration: 3.5 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Hero Section with Trophy Animation */}
      <motion.div 
        className="relative h-[400px] sm:h-[500px] overflow-hidden group"
        onHoverStart={() => isMounted && setIsHeroHovered(true)}
        onHoverEnd={() => setIsHeroHovered(false)}
      >
        <Image
          src={member.coverImage || member.image}
          alt={member.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        
        {/* Golden Overlay on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent pointer-events-none"
          animate={{ opacity: isHeroHovered && isMounted ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Trophy Badge with Particles */}
        <AnimatePresence>
          {isHeroHovered && isMounted && (
            <>
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 180, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-3 sm:p-4 rounded-full shadow-2xl shadow-[#D4AF37]/50"
              >
                <FaTrophy className="text-black text-xl sm:text-2xl" />
              </motion.div>

              {/* Floating Trophy Particles */}
              {trophyParticles.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 pointer-events-none"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.2, 0.6],
                    x: particle.x,
                    y: particle.y,
                    rotate: particle.rotate
                  }}
                  transition={{
                    duration: 1.5,
                    delay: particle.delay,
                    ease: "easeOut"
                  }}
                >
                  <FaTrophy className="text-[#D4AF37] text-sm" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <div className="absolute top-24 sm:top-32 left-0 right-0 container mx-auto px-4">
          <Link
            href="/rosters/players"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all group/back"
          >
            <FiArrowLeft className="group-hover/back:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Back to Players</span>
          </Link>
        </div>

        {/* Player Info */}
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-black shadow-2xl shadow-[#D4AF37]/30 group/avatar"
            >
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                className="object-cover transition-all duration-500 group-hover/avatar:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 via-transparent to-transparent opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500" />
            </motion.div>

            <div className="flex-1 pb-2">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-2 sm:gap-3 mb-2"
              >
                <motion.span 
                  className="text-2xl sm:text-4xl"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {getFlagEmoji(member.countryCode)}
                </motion.span>
                <span className="text-sm sm:text-base text-white/70 font-medium">{member.country}</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent"
              >
                {member.ign}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-base sm:text-xl text-white/80 mb-3 sm:mb-4"
              >
                {member.name}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3"
              >
                {member.type === 'player' ? (
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 text-[#FFD700] rounded-xl text-xs sm:text-sm font-bold border border-[#D4AF37]/40 backdrop-blur-sm">
                    Player
                  </div>
                ) : (
                  member.roles?.map(role => (
                    <div key={role} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#D4AF37]/20 to-[#FFD700]/20 text-[#FFD700] rounded-xl text-xs sm:text-sm font-bold border border-[#D4AF37]/40 backdrop-blur-sm">
                      {role}
                    </div>
                  ))
                )}
                <div className="flex items-center gap-2 text-white/60 text-xs sm:text-sm">
                  <FiCalendar size={14} className="sm:w-4 sm:h-4" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto lg:items-start">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="card p-6 sm:p-8 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
            >
              <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 flex items-center gap-3">
                <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
                About
              </h2>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed select-text">{member.bio}</p>
            </motion.div>

            {/* Achievements Section */}
            {member.achievements && member.achievements.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card p-6 sm:p-8 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 flex items-center gap-3">
                  <FiAward className="text-[#D4AF37]" size={24} />
                  Achievements
                </h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {member.achievements.map((achievement, idx) => (
                    <motion.div
                      key={achievement}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.55 + idx * 0.08 }}
                      className="flex items-start gap-3 p-3 sm:p-4 bg-white/[0.02] border border-white/10 rounded-xl hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all duration-300"
                    >
                      <FaTrophy className="text-[#D4AF37] mt-1 shrink-0" size={14} />
                      <span className="text-white/90 text-sm sm:text-base select-text">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Highlights Section */}
            {member.clips && member.clips.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="card p-6 sm:p-8 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6 flex items-center gap-3">
                  <FiPlay className="text-[#D4AF37]" size={24} />
                  Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {member.clips.map((clip, idx) => (
                    <motion.a
                      key={idx}
                      href={clip.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65 + idx * 0.1 }}
                      whileHover={{ y: -6 }}
                      className="group relative"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/60 transition-all duration-300 shadow-lg group-hover:shadow-[#D4AF37]/20">
                        {clip.thumbnail ? (
                          <Image 
                            src={clip.thumbnail} 
                            alt={clip.title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#D4AF37]/10 to-purple-500/10">
                            <FiPlay className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4AF37]" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-3 sm:p-4">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs sm:text-sm font-semibold group-hover:text-[#FFD700] transition-colors select-text">
                              {clip.title}
                            </span>
                            <FiExternalLink className="text-white/60 group-hover:text-[#FFD700] transition-colors shrink-0 ml-2" size={16} />
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - Social Links */}
          <div className="lg:order-last">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="card p-6 sticky top-24 border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500"
            >
              <h3 className="text-lg sm:text-xl font-black mb-4 flex items-center gap-2">
                <div className="w-1 h-5 sm:h-6 bg-gradient-to-b from-[#D4AF37] to-[#FFD700] rounded-full" />
                Connect
              </h3>
              <div className="space-y-3">
                {member.socials.twitter && (
                  <SocialLink href={member.socials.twitter} icon={FaTwitter} label="Twitter" color="hover:bg-[#1DA1F2]" />
                )}
                {member.socials.twitch && (
                  <SocialLink href={member.socials.twitch} icon={FaTwitch} label="Twitch" color="hover:bg-purple-600" />
                )}
                {member.socials.youtube && (
                  <SocialLink href={member.socials.youtube} icon={FaYoutube} label="YouTube" color="hover:bg-red-600" />
                )}
                {member.socials.instagram && (
                  <SocialLink href={member.socials.instagram} icon={FaInstagram} label="Instagram" color="hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialLink({ href, icon: Icon, label, color }: { href: string; icon: ComponentType<{ size?: number; className?: string }>; label: string; color: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 6, scale: 1.02 }}
      className={`flex items-center gap-3 p-3 bg-white/5 rounded-xl transition-all duration-300 border border-white/10 hover:border-[#D4AF37]/40 ${color} group`}
    >
      <Icon size={18} className="group-hover:scale-110 transition-transform shrink-0 sm:w-5 sm:h-5" />
      <span className="font-semibold text-sm sm:text-base">{label}</span>
      <FiExternalLink className="ml-auto opacity-0 group-hover:opacity-100 transition-all shrink-0" size={14} />
    </motion.a>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

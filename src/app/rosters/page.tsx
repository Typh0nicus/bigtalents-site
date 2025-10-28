"use client";

import { motion } from "framer-motion";
import { FiUsers, FiStar, FiAward } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";

const PARTICLE_POSITIONS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 5.55) % 100,
  top: (i * 8.33) % 100,
}));

const SECTIONS = [
  {
    key: "players",
    title: "Players",
    icon: FiUsers,
    description: "Championship roster featuring elite competitors and coaching staff",
    href: "/rosters/players",
    active: true,
    gradient: "from-[#D4AF37] to-[#FFD700]",
    particleColor: "rgba(212, 175, 55, 0.8)",
    iconColor: "#FFD700",
    hoverBorder: "border-[#D4AF37]/50",
    hoverGlow: "shadow-[#D4AF37]/20",
    buttonBg: "bg-[#D4AF37]",
    buttonHoverBg: "hover:bg-[#FFD700]",
    buttonGlow: "bg-[#D4AF37]"
  },
  {
    key: "creators",
    title: "Creators",
    icon: FiStar,
    description: "Content creators and streamers representing Big Talents",
    href: "/rosters/creators",
    active: false,
    gradient: "from-purple-500 to-pink-500",
    particleColor: "rgba(168, 85, 247, 0.6)",
    iconColor: "#ec4899",
    hoverBorder: "border-pink-500/50",
    hoverGlow: "shadow-pink-500/20",
    buttonBg: "bg-pink-500",
    buttonHoverBg: "hover:bg-pink-400",
    buttonGlow: "bg-pink-500"
  },
  {
    key: "academy",
    title: "Academy",
    icon: FiAward,
    description: "Rising talents developing their competitive skills",
    href: "/rosters/academy",
    active: false,
    gradient: "from-blue-500 to-cyan-500",
    particleColor: "rgba(59, 130, 246, 0.6)",
    iconColor: "#06b6d4",
    hoverBorder: "border-cyan-500/50",
    hoverGlow: "shadow-cyan-500/20",
    buttonBg: "bg-cyan-500",
    buttonHoverBg: "hover:bg-cyan-400",
    buttonGlow: "bg-cyan-500"
  }
];

export default function RostersPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.10), transparent 50%),
              radial-gradient(1200px 600px at 80% 15%, rgba(224,184,79,0.06), transparent 50%),
              radial-gradient(800px 600px at 50% 100%, rgba(212,175,55,0.04), transparent 50%)
            `
          }}
        />
        
        {isMounted && (
          <div className="absolute inset-0 opacity-25">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <div className="container mx-auto px-4 pt-40 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-[#D4AF37] bg-clip-text text-transparent">Rosters</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Meet the champions, creators, and rising stars of Big Talents
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SECTIONS.map((section, index) => (
            <SectionCard key={section.key} section={section} index={index} isMounted={isMounted} />
          ))}
        </div>
      </div>
    </main>
  );
}

function SectionCard({ section, index, isMounted }: { section: typeof SECTIONS[number]; index: number; isMounted: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const sectionParticles = Array.from({ length: 8 }, (_, i) => ({
    left: ((index * 19 + i * 27) % 100),
    top: ((index * 23 + i * 17) % 100),
  }));

  const CardContent = (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ 
        opacity: 1, 
        y: isHovered && section.active && isMounted ? -8 : 0,
        scale: isHovered && section.active && isMounted ? 1.02 : 1
      }}
      transition={{ 
        opacity: { delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        y: { delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.3 }
      }}
      onHoverStart={() => section.active && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`card p-8 text-center h-full flex flex-col relative overflow-hidden ${
        section.active 
          ? `cursor-pointer hover:${section.hoverBorder}` 
          : 'opacity-60'
      }`}
    >
      {isHovered && isMounted && section.active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sectionParticles.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: section.particleColor,
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -60],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.12,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <div className="mb-6 relative z-10">
        <motion.div 
          className={`inline-flex p-6 rounded-2xl backdrop-blur-sm mb-4 transition-all duration-500 ${
            isHovered && section.active 
              ? `bg-white/10 shadow-lg ${section.hoverGlow}` 
              : 'bg-white/5'
          }`}
          animate={isHovered && isMounted && section.active ? { 
            rotate: [0, -8, 8, 0],
            scale: 1.1
          } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <section.icon 
            className="w-10 h-10" 
            style={{ color: section.iconColor }}
          />
        </motion.div>
        <h2 className={`text-2xl md:text-3xl font-black mb-3 bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
          {section.title}
        </h2>
        <p className="text-white/70 leading-relaxed">{section.description}</p>
      </div>

      <div className="mt-auto relative z-10">
        <div className={`relative inline-block px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
          section.active 
            ? `${section.buttonBg} text-black ${section.buttonHoverBg} hover:scale-105` 
            : 'bg-white/10 text-white/50'
        }`}>
          {section.active ? 'View Roster' : 'Coming Soon'}
          
          {section.active && isHovered && (
            <div 
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-3 ${section.buttonGlow} blur-lg opacity-60 rounded-full`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );

  return section.active ? (
    <Link href={section.href}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
}

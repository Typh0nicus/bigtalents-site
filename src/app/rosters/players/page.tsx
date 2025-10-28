"use client";

import { TEAM_MEMBERS } from "@/data/players";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";
import { useState, useEffect } from "react";

const PARTICLE_POSITIONS = Array.from({ length: 15 }, (_, i) => ({
  left: (i * 6.66) % 100,
  top: (i * 8.33) % 100,
}));

export default function PlayersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const players = TEAM_MEMBERS.filter(m => m.type === 'player');
  const staff = TEAM_MEMBERS.filter(m => m.type === 'staff');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden relative">
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
              radial-gradient(1400px 700px at 20% -5%, rgba(212,175,55,0.1), transparent 50%),
              radial-gradient(1200px 600px at 80% 15%, rgba(168,85,247,0.06), transparent 50%),
              radial-gradient(1000px 500px at 50% 100%, rgba(59,130,246,0.05), transparent 50%)
            `
          }}
        />
        
        {isMounted && (
          <div className="absolute inset-0 opacity-25 pointer-events-none">
            {PARTICLE_POSITIONS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      <div className="container mx-auto px-4 pt-32 pb-24 relative z-10">
        <Link 
          href="/rosters"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Rosters</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              Players
            </span>
          </h1>
          <p className="text-white/60 text-lg">Championship roster and staff</p>
        </motion.div>

        <div className="max-w-7xl mx-auto space-y-20">
          {players.length > 0 && (
            <section>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-black mb-8 text-white/80"
              >
                Players
              </motion.h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {players.map((player, index) => (
                  <PlayerCard key={player.id} member={player} index={index} isMounted={isMounted} />
                ))}
              </div>
            </section>
          )}

          {staff.length > 0 && (
            <section>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-black mb-8 text-white/80"
              >
                Staff
              </motion.h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {staff.map((member, index) => (
                  <StaffCard key={member.id} member={member} index={index} isMounted={isMounted} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

function PlayerCard({ member, index, isMounted }: { member: typeof TEAM_MEMBERS[number]; index: number; isMounted: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const trophyParticles = Array.from({ length: 5 }, (_, i) => ({
    x: (Math.random() - 0.5) * 60,
    y: -20 - Math.random() * 30,
    rotate: Math.random() * 360,
    delay: i * 0.1
  }));

  return (
    <Link href={`/rosters/players/${member.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => isMounted && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -12 }}
        className="group cursor-pointer"
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/15">
          
          {/* Trophy Badge on Hover */}
          <AnimatePresence>
            {isHovered && isMounted && (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-4 left-4 z-20 bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-3 rounded-full shadow-lg shadow-[#D4AF37]/50"
                >
                  <FaTrophy className="text-black text-xl" />
                </motion.div>

                {/* Floating Trophy Particles */}
                {trophyParticles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-4 left-4 z-10 pointer-events-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0.5],
                      x: particle.x,
                      y: particle.y,
                      rotate: particle.rotate
                    }}
                    transition={{
                      duration: 1.2,
                      delay: particle.delay,
                      ease: "easeOut"
                    }}
                  >
                    <FaTrophy className="text-[#D4AF37] text-xs" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent pointer-events-none"
              animate={{ opacity: isHovered && isMounted ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <motion.span 
                  className="text-2xl"
                  animate={isHovered && isMounted ? { scale: 1.15, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {getFlagEmoji(member.countryCode)}
                </motion.span>
                <span className="text-xs text-white/70 font-medium">{member.country}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{member.ign}</h3>
              <p className="text-white/70 text-xs sm:text-sm font-medium mt-1">{member.name}</p>
            </div>
          </div>

          <div className="relative p-6 bg-black/50 backdrop-blur-xl overflow-hidden">
            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={isHovered && isMounted ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="relative text-center"
              animate={isHovered && isMounted ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="text-xs font-bold uppercase tracking-widest transition-all duration-500"
                style={{
                  backgroundImage: isHovered ? 'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)' : 'none',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                  WebkitTextFillColor: isHovered ? 'transparent' : 'white',
                }}
              >
                View Profile
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function StaffCard({ member, index, isMounted }: { member: typeof TEAM_MEMBERS[number]; index: number; isMounted: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/rosters/players/${member.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onHoverStart={() => isMounted && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -12 }}
        className="group cursor-pointer"
      >
        <div className="relative rounded-3xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/15">
          
          <div className="relative aspect-[4/5] bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0a]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent pointer-events-none"
              animate={{ opacity: isHovered && isMounted ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end max-w-[70%]">
              {member.roles?.map((role, idx) => (
                <motion.span 
                  key={role}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#D4AF37] text-xs font-bold rounded-lg border border-[#D4AF37]/30"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <motion.span 
                  className="text-2xl"
                  animate={isHovered && isMounted ? { scale: 1.15, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {getFlagEmoji(member.countryCode)}
                </motion.span>
                <span className="text-xs text-white/70 font-medium">{member.country}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">{member.ign}</h3>
              <p className="text-white/70 text-xs sm:text-sm font-medium mt-1">{member.name}</p>
            </div>
          </div>

          <div className="relative p-6 bg-black/50 backdrop-blur-xl overflow-hidden">
            {/* Animated Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={isHovered && isMounted ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <motion.div 
              className="relative text-center"
              animate={isHovered && isMounted ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="text-xs font-bold uppercase tracking-widest transition-all duration-500"
                style={{
                  backgroundImage: isHovered ? 'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)' : 'none',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: isHovered ? 'text' : 'unset',
                  WebkitTextFillColor: isHovered ? 'transparent' : 'white',
                }}
              >
                View Profile
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

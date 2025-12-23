// src/components/positions/PositionsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  STAFF_ROLE_LIST,
  type StaffRoleConfig,
  type StaffCategory,
} from "@/data/staffRoles";
import { FiArrowRight } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

const PARTICLE_COUNT = 18;

const CATEGORY_COLORS: Record<StaffCategory, string> = {
  Community: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "Creators & Talent":
    "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "Content & Design":
    "from-orange-500/20 to-red-500/20 border-orange-500/30",
  "Partnerships & Operations":
    "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
};

export default function PositionsClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openRoles = STAFF_ROLE_LIST.filter((r) => r.open).length;
  const categories = Array.from(
    new Set(STAFF_ROLE_LIST.map((r) => r.category)),
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white select-none">
      {/* BGT Background System with Master Image */}
      <motion.div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMounted ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Master background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('/images/background/bgt-master-bg.png')`,
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 70%, transparent 100%)',
          }}
        />
        
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black" />
        
        {/* BGT gold corner glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 800px 600px at 85% 5%, rgba(255,187,0,0.06), transparent 50%),
              radial-gradient(ellipse 600px 400px at 15% 95%, rgba(212,175,55,0.03), transparent 50%)
            `,
          }}
        />
        
        {/* Gloss blur overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.015] via-transparent to-black/10 pointer-events-none" />

        {isMounted && (
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-px bg-[#D4AF37] rounded-full"
                style={{
                  left: `${(i * 6.66) % 100}%`,
                  top: `${(i * 8.33) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.9, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {isMounted &&
          categories.map((cat, i) => (
            <motion.div
              key={cat}
              className={`absolute px-3 py-1.5 rounded-full bg-gradient-to-r ${
                CATEGORY_COLORS[cat as StaffCategory]
              } backdrop-blur-sm border text-xs font-semibold opacity-20 pointer-events-none hidden sm:block`}
              style={{
                left: `${12 + i * 23}%`,
                top: `${42 + (i % 2) * 12}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {cat}
            </motion.div>
          ))}
        
        {/* Mobile-friendly centered floaties */}
        {isMounted &&
          categories.slice(0, 2).map((cat, i) => (
            <motion.div
              key={`mobile-${cat}`}
              className={`absolute px-2 py-1 rounded-full bg-gradient-to-r ${
                CATEGORY_COLORS[cat as StaffCategory]
              } backdrop-blur-sm border text-[10px] font-semibold opacity-15 pointer-events-none sm:hidden`}
              style={{
                left: `${20 + i * 40}%`,
                top: `${35 + (i % 2) * 15}%`,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {cat}
            </motion.div>
          ))}

        <div className="container relative z-10 px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Shield emblem - clean style */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-flex mb-6 relative"
            >
              {/* Subtle atmospheric glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle, rgba(255,187,0,0.15) 0%, transparent 60%)`,
                  filter: "blur(25px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.6, 1],
                }}
              />

              <div className="relative p-3.5 bg-gradient-to-br from-[#FFBB00] to-[#D4AF37] rounded-2xl shadow-lg">
                <FaShieldAlt className="w-8 h-8 text-black" />
              </div>
            </motion.div>

            {/* Heading with vibrant gradient */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-[#FFBB00] to-[#FFD700] bg-clip-text text-transparent">
                Join the Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed max-w-2xl mx-auto"
            >
              Help build Big Talents behind the scenes, from keeping the
              community safe to supporting creators and running operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center gap-6 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/60">
                  <span className="text-emerald-400 font-bold">
                    {openRoles}
                  </span>{" "}
                  Open Positions
                </span>
              </div>
              <div className="w-px h-4 bg-white/10" />
              <div className="text-white/50">
                <span className="text-[#D4AF37] font-bold">
                  {categories.length}
                </span>{" "}
                Departments
              </div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* POSITIONS GRID */}
      <section className="relative z-10 container mx-auto px-4 pb-32 pt-4">
        <motion.div
          className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {STAFF_ROLE_LIST.map((role, index) => (
            <PositionCard key={role.id} role={role} index={index} />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function PositionCard({ role }: { role: StaffRoleConfig; index: number }) {
  const isOpen = role.open;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-xl hover:border-[#D4AF37]/30 transition-all duration-500 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
        animate={isHovered ? { x: ["100%", "200%"] } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <div className="relative p-6 sm:p-7 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <motion.div
            className="text-3xl"
            animate={
              isHovered ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            {role.iconEmoji}
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            <motion.span
              className={`text-[10px] tracking-[0.2em] uppercase font-bold transition-colors ${
                isOpen ? "text-emerald-400" : "text-white/30"
              }`}
              animate={isOpen && isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isOpen ? "Open" : "Closed"}
            </motion.span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] text-white/60 tracking-[0.14em] uppercase mb-4 w-fit group-hover:border-[#D4AF37]/30 transition-colors">
          {role.category}
        </div>

        <div className="mb-6 flex-1">
          <h2 className="text-xl font-bold mb-2 text-white group-hover:text-[#D4AF37] transition-colors duration-300">
            {role.title}
          </h2>
          <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/70 transition-colors">
            {role.shortDescription}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors">
          {isOpen ? (
            <Link
              href={{ pathname: "/positions/apply", query: { role: role.id } }}
              className="relative overflow-hidden group/btn inline-flex items-center justify-center gap-2 w-full text-sm font-semibold px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
            >
              <span className="relative z-10">Apply Now</span>
              <FiArrowRight className="relative z-10 text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </Link>
          ) : (
            <div className="inline-flex items-center justify-center w-full px-4 py-3 rounded-xl border border-white/5 text-xs text-white/30 cursor-not-allowed">
              Applications Closed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaStar } from "react-icons/fa";
import { FiUsers, FiChevronDown } from "react-icons/fi";
import type { BracketData, Placement } from "@/types/bracket";

interface TournamentBracketProps {
  tournamentSlug: string;
  isLive: boolean;
}

const PLACEMENT_CONFIG = {
  1: { color: "text-[#FFD700]", bgColor: "bg-[#FFD700]/5", borderColor: "border-[#FFD700]/20", title: "🥇 Champion" },
  2: { color: "text-[#C0C0C0]", bgColor: "bg-[#C0C0C0]/5", borderColor: "border-[#C0C0C0]/20", title: "🥈 Runner-up" },
  3: { color: "text-[#CD7F32]", bgColor: "bg-[#CD7F32]/5", borderColor: "border-[#CD7F32]/20", title: "🥉 Semi-Finalist" },
};

export function TournamentBracket({ tournamentSlug, isLive = false }: TournamentBracketProps) {
  const [data, setData] = useState<BracketData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`/api/matcherinos/${tournamentSlug}/bracket`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch bracket data');
        }

        const bracketData = await res.json();
        console.log("🎯 Bracket data received:", bracketData);
        
        setData(bracketData);
      } catch (err) {
        console.error("❌ Bracket fetch error:", err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tournamentSlug]);

  if (loading) {
    return (
      <div className="container px-4 sm:px-6 py-20">
        <div className="text-center py-20">
          <motion.div
            className="inline-block w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white/60 mt-4 text-base sm:text-lg">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error || !data || !data.placements || data.placements.length === 0) {
    return <EmptyState />;
  }

  // Get top 4 unique placements
  const top4 = data.placements.slice(0, 4);
  const first = top4.find(p => p.place === 1);
  const second = top4.find(p => p.place === 2);
  const thirds = top4.filter(p => p.place === 3);

  return (
    <div className="container px-4 sm:px-6 py-12 sm:py-20 select-none">
      <motion.div 
        className="text-center mb-12 sm:mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Final Standings</h2>
        <p className="text-white/60 mb-8 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
          Congratulations to all teams who competed in this tournament
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* MOBILE LAYOUT - Vertical List */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* 1st Place */}
          {first && (
            <div className="flex justify-center">
              <PlacementCard placement={first} config={PLACEMENT_CONFIG[1]} delay={0.1} isFirst isMobile />
            </div>
          )}
          {/* 2nd Place */}
          {second && (
            <div className="flex justify-center">
              <PlacementCard placement={second} config={PLACEMENT_CONFIG[2]} delay={0.2} isMobile />
            </div>
          )}
          {/* 3rd Place(s) */}
          {thirds.map((third, idx) => (
            <div key={third.teamId} className="flex justify-center">
              <PlacementCard placement={third} config={PLACEMENT_CONFIG[3]} delay={0.3 + idx * 0.1} isSemi isMobile />
            </div>
          ))}
        </div>

        {/* DESKTOP LAYOUT - Podium */}
        <div className="hidden md:flex items-end justify-center gap-4 sm:gap-6">
          {/* 4th Place - Left Semi-Finalist */}
          {thirds[1] && (
            <div className="flex justify-center w-full md:w-auto md:mb-8">
              <PlacementCard placement={thirds[1]} config={PLACEMENT_CONFIG[3]} delay={0.4} isSemi />
            </div>
          )}
          {/* 2nd Place - Silver */}
          {second && (
            <div className="flex justify-center w-full md:w-auto md:mb-4">
              <PlacementCard placement={second} config={PLACEMENT_CONFIG[2]} delay={0.2} />
            </div>
          )}
          {/* 1st Place - Gold */}
          {first && (
            <div className="flex justify-center w-full md:w-auto">
              <PlacementCard placement={first} config={PLACEMENT_CONFIG[1]} delay={0.1} isFirst />
            </div>
          )}
          {/* 3rd Place - Right Semi-Finalist */}
          {thirds[0] && (
            <div className="flex justify-center w-full md:w-auto md:mb-8">
              <PlacementCard placement={thirds[0]} config={PLACEMENT_CONFIG[3]} delay={0.3} isSemi />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface PlacementCardProps {
  placement: Placement;
  config: typeof PLACEMENT_CONFIG[1];
  delay: number;
  isFirst?: boolean;
  isSemi?: boolean;
  isMobile?: boolean;
}

function PlacementCard({ placement, config, delay, isFirst, isSemi, isMobile }: PlacementCardProps) {
  const [showMembers, setShowMembers] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mobile uses consistent sizing, desktop uses podium sizing
  const cardSize = isMobile
    ? "w-full max-w-md p-6 sm:p-8"
    : isFirst 
      ? "w-full md:w-80 p-8 sm:p-10" 
      : isSemi 
        ? "w-full md:w-56 p-5 sm:p-6" 
        : "w-full md:w-64 p-6 sm:p-8";
      
  const iconSize = isMobile
    ? "w-16 h-16 sm:w-20 sm:h-20"
    : isFirst 
      ? "w-20 h-20 sm:w-28 sm:h-28" 
      : isSemi 
        ? "w-14 h-14 sm:w-16 sm:h-16" 
        : "w-16 h-16 sm:w-20 sm:h-20";
      
  const iconTextSize = isMobile
    ? "text-3xl sm:text-4xl"
    : isFirst 
      ? "text-4xl sm:text-5xl" 
      : isSemi 
        ? "text-2xl sm:text-3xl" 
        : "text-3xl sm:text-4xl";
      
  const titleSize = isMobile
    ? "text-base sm:text-lg"
    : isFirst 
      ? "text-lg sm:text-xl" 
      : isSemi 
        ? "text-sm sm:text-base" 
        : "text-base sm:text-lg";
      
  const nameSize = isMobile
    ? "text-xl sm:text-2xl"
    : isFirst 
      ? "text-2xl sm:text-3xl md:text-4xl" 
      : isSemi 
        ? "text-lg sm:text-xl" 
        : "text-xl sm:text-2xl";
      
  const hasMembers = placement.members && placement.members.length > 0;

  return (
    <motion.div
      className={`relative ${cardSize} ${config.bgColor} backdrop-blur-xl border ${config.borderColor} rounded-2xl text-center transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-white/[0.08] hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/5`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Trophy with Hover Effects */}
      <div className="relative">
        <div className={`mx-auto ${iconSize} ${config.bgColor} rounded-full flex items-center justify-center mb-4 relative`}>
          <motion.div
            animate={isHovered ? { 
              rotate: 360,
              scale: 1.15,
              y: -5
            } : {
              rotate: 0,
              scale: 1,
              y: 0
            }}
            transition={{ 
              rotate: { duration: 0.6, ease: "easeInOut" },
              scale: { duration: 0.3 },
              y: { duration: 0.3 }
            }}
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                y: [0, -5, 0, -3, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaTrophy className={`${iconTextSize} ${config.color}`} />
            </motion.div>
          </motion.div>

          {/* Sparkles - only show on first place */}
          {isFirst && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: i === 0 ? '-8px' : i === 1 ? 'calc(100% + 4px)' : '-4px',
                    right: i === 0 ? '-8px' : 'auto',
                    left: i === 1 ? '-8px' : i === 2 ? '-12px' : 'auto'
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                >
                  <FaStar className="text-[#FFD700] text-xs" />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>

      <h3 className={`${titleSize} font-bold ${config.color} mb-3`}>
        {config.title}
      </h3>

      <p className={`${nameSize} font-black text-white mb-2 break-words leading-tight`}>
        {placement.teamName}
      </p>

      {placement.prize && (
        <p className="text-xs sm:text-sm text-white/60 font-semibold mb-3">
          {placement.prize}
        </p>
      )}

      {/* Team Members Dropdown */}
      {hasMembers && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors group"
          >
            <FiUsers className="text-sm group-hover:scale-110 transition-transform" />
            <span>{showMembers ? 'Hide' : 'Show'} Team Roster</span>
            <motion.div
              animate={{ rotate: showMembers ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <FiChevronDown className="text-sm" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showMembers && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-2 overflow-hidden"
              >
                {placement.members?.map((member: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: idx * 0.05 }}
                    className="text-xs text-white/70 px-3 py-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5"
                  >
                    {member}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/3 to-[#D4AF37]/0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="container px-4 sm:px-6 py-20">
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full mb-6">
          <FiUsers className="text-4xl sm:text-5xl text-white/20" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Results Coming Soon</h3>
        <p className="text-white/60 text-sm sm:text-base px-4">Tournament standings will be displayed here once the event concludes.</p>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiClock } from "react-icons/fi";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

/* ======================= Utilities ======================= */
function parseWhen(s?: string): number {
  if (!s) return 0;
  
  const dateStr = s
    .replace("GMT+1", "+01:00")
    .replace("GMT", "+00:00");
  
  const parsed = Date.parse(dateStr);
  
  if (Number.isNaN(parsed)) {
    const cleanDateStr = dateStr.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*/, '');
    const altParsed = Date.parse(cleanDateStr);
    return Number.isNaN(altParsed) ? 0 : altParsed;
  }
  
  return parsed;
}

/* ======================= Empty State Component ======================= */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full text-center py-16 select-none"
    >
      <div className="max-w-md mx-auto">
        <motion.div 
          className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiClock className="w-10 h-10 text-white/40" />
        </motion.div>
        <h3 className="text-xl font-bold mb-3 text-white">No Upcoming Tournaments</h3>
        <p className="text-white/60 mb-6 text-sm">
          Check back soon for new tournament announcements and registration details
        </p>
        <Link 
          href="/tournaments"
          className="btn btn-outline rounded-xl inline-block hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
        >
          View Past Tournaments
        </Link>
      </div>
    </motion.div>
  );
}

/* ======================= Main Component ======================= */
export function FeaturedTournaments() {
  const featuredTournaments = useMemo(() => {
    const upcomingTournaments = TOURNAMENTS.filter(t => !t.archived);

    if (upcomingTournaments.length === 0) return [];

    return upcomingTournaments
      .sort((a, b) => parseWhen(a.date) - parseWhen(b.date))
      .slice(0, 3);
  }, []);

  return (
    <section className="relative py-16 md:py-24 select-none">
      {/* Background Effects */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(1000px 500px at 20% -10%, rgba(212,175,55,.06), transparent 60%), 
            radial-gradient(800px 400px at 80% 10%, rgba(224,184,79,.04), transparent 60%)
          `,
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {featuredTournaments.length > 0 && (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-white/85 backdrop-blur mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
              </span>
              <span>Upcoming Competitions</span>
            </div>
          )}
          
          <h2 className="h2 mb-4">
            Featured <span className="text-[#D4AF37]">Tournaments</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Join the most competitive Brawl Stars tournaments and prove your skills on the biggest stages
          </p>
        </motion.div>

        {/* Tournament Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTournaments.length > 0 ? (
            featuredTournaments.map((tournament, index) => (
              <motion.div
                key={tournament.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <TournamentCard t={tournament} index={index} />
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* CTA Section */}
        {featuredTournaments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link 
              href="/tournaments"
              className="btn btn-outline rounded-xl inline-block hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300"
            >
              View All Tournaments
            </Link>
            
            <p className="text-white/60 text-sm mt-4">
              More tournaments available • Register now to secure your spot
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

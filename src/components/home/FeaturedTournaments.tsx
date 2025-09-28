"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  
  let dateStr = s;
  
  if (dateStr.includes("GMT+1")) {
    dateStr = dateStr.replace("GMT+1", "+01:00");
  } else if (dateStr.includes("GMT")) {
    dateStr = dateStr.replace("GMT", "+00:00");
  }
  
  const parsed = Date.parse(dateStr);
  
  if (Number.isNaN(parsed)) {
    const cleanDateStr = dateStr.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*/, '');
    const altParsed = Date.parse(cleanDateStr);
    return Number.isNaN(altParsed) ? 0 : altParsed;
  }
  
  return parsed;
}

export function FeaturedTournaments() {
  const featuredTournaments = useMemo(() => {
    console.log("=== FeaturedTournaments Debug ===");
    
    // Get tournaments marked as upcoming (archived: false)
    const upcomingTournaments = TOURNAMENTS.filter(t => !t.archived);
    console.log("Upcoming tournaments found:", upcomingTournaments.map(t => ({
      title: t.title,
      date: t.date,
      archived: t.archived
    })));

    if (upcomingTournaments.length > 0) {
      const sorted = upcomingTournaments
        .sort((a, b) => parseWhen(a.date) - parseWhen(b.date))
        .slice(0, 3);
      
      console.log("Returning:", sorted.map(t => t.title));
      return sorted;
    }
    
    console.log("No upcoming tournaments, returning empty array");
    return [];
  }, []);

  return (
    <section className="relative py-16 md:py-24">
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
          <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs tracking-wide text-white/85 backdrop-blur mb-4">
            <span className="rounded-full bg-[color:var(--gold)]/20 px-2 py-0.5 text-[11px] font-bold text-[color:var(--gold)]">
              LIVE
            </span>
            <span>Upcoming Competitions</span>
          </div>
          
          <h2 className="h2 mb-4">Featured <span className="text-[color:var(--gold)]">Tournaments</span></h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">No Upcoming Tournaments</h3>
                <p className="text-white/60 mb-6">Check back soon for new tournament announcements!</p>
                <Link 
                  href="/tournaments"
                  className="btn btn-outline rounded-xl"
                >
                  View All Tournaments
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section - FIXED: Professional button styling */}
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
              className="btn btn-outline rounded-xl"
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

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { TOURNAMENTS } from "@/data/tournaments"; // Import TOURNAMENTS array directly
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(s.replace("GMT+1", "GMT+0100").replace("GMT", "GMT+0000"));
  return Number.isNaN(t) ? 0 : t;
}

export function FeaturedTournaments() {
  const featuredTournaments = useMemo(() => {
    const now = Date.now();
    
    // Get upcoming tournaments (not archived and future dates)
    const upcoming = TOURNAMENTS.filter(t => {
      if (t.archived) return false; // Skip archived tournaments
      const tournamentDate = parseWhen(t.date);
      return tournamentDate > now; // Only future tournaments
    });

    // Sort by date (soonest first) and take top 3
    return upcoming
      .sort((a, b) => parseWhen(a.date) - parseWhen(b.date))
      .slice(0, 3);
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
                <TournamentCard 
                  t={tournament} // Use 't' prop as expected by TournamentCard
                />
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
                  className="btn btn-outline rounded-2xl px-6 py-3"
                >
                  View All Tournaments
                </Link>
              </div>
            </motion.div>
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
              className="btn btn-primary rounded-2xl px-8 py-4 text-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
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

"use client";
import { useMemo } from "react";
import { TOURNAMENTS } from "@/data/tournaments"; // Direct import, no getFeaturedTournaments
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(s.replace("GMT+1", "GMT+0100").replace("GMT", "GMT+0000"));
  return Number.isNaN(t) ? 0 : t;
}

export function FeaturedSlice() {
  const featured = useMemo(() => {
    const now = Date.now();
    
    // Filter for upcoming tournaments (not archived and future dates)
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
    <section className="container py-10 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <h2 className="h2">Featured Tournaments</h2>
        <a href="/tournaments" className="btn btn-outline">See All</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {featured.length > 0 ? (
          featured.map((t) => (
            <TournamentCard key={t.slug} t={t} /> // Use 't' prop correctly
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-white/60">No upcoming tournaments at the moment.</p>
            <p className="text-white/40 text-sm mt-2">Check back soon for new tournament announcements!</p>
          </div>
        )}
      </div>
    </section>
  );
}

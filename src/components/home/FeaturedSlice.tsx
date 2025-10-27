"use client";
import { useMemo } from "react";
import Link from "next/link";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  
  const dateStr = s;
  let cleanDateStr = dateStr;
  if (dateStr.includes("GMT+1")) {
    cleanDateStr = dateStr.replace("GMT+1", "+01:00");
  } else if (dateStr.includes("GMT")) {
    cleanDateStr = dateStr.replace("GMT", "+00:00");
  }
  
  const parsed = Date.parse(cleanDateStr);
  
  if (Number.isNaN(parsed)) {
    const altDateStr = cleanDateStr.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*/, '');
    const altParsed = Date.parse(altDateStr);
    return Number.isNaN(altParsed) ? 0 : altParsed;
  }
  
  return parsed;
}

export function FeaturedSlice() {
  const featured = useMemo(() => {
    const upcomingByFlag = TOURNAMENTS.filter(t => !t.archived);
    
    if (upcomingByFlag.length > 0) {
      const sorted = upcomingByFlag
        .sort((a, b) => parseWhen(a.date) - parseWhen(b.date))
        .slice(0, 3);
      
      return sorted;
    }
    
    const archived = TOURNAMENTS
      .filter(t => t.archived)
      .sort((a, b) => parseWhen(b.date) - parseWhen(a.date))
      .slice(0, 3);
    
    return archived;
  }, []);

  return (
    <section className="container py-10 md:py-14 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <h2 className="h2 text-center sm:text-left">Featured Tournaments</h2>
        <Link href="/tournaments" className="btn btn-outline self-center sm:self-auto">
          See All
        </Link>
      </div>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {featured.length > 0 ? (
          featured.map((t, index) => (
            <TournamentCard key={t.slug} t={t} featured={true} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 rounded-xl border border-white/10">
            <p className="text-white/60 text-lg mb-2">No upcoming tournaments at the moment.</p>
            <p className="text-white/40 text-sm">Check back soon for new tournament announcements!</p>
          </div>
        )}
      </div>
    </section>
  );
}

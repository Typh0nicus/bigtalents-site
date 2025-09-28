"use client";
import { useMemo } from "react";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  
  // Handle various date formats more robustly
  let dateStr = s;
  
  // Convert timezone formats to standard ISO format
  if (dateStr.includes("GMT+1")) {
    dateStr = dateStr.replace("GMT+1", "+01:00");
  } else if (dateStr.includes("GMT")) {
    dateStr = dateStr.replace("GMT", "+00:00");
  }
  
  // Try to parse the date
  const parsed = Date.parse(dateStr);
  
  // If parsing failed, try alternative parsing
  if (Number.isNaN(parsed)) {
    // Try removing day names and parsing again
    const cleanDateStr = dateStr.replace(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s*/, '');
    const altParsed = Date.parse(cleanDateStr);
    return Number.isNaN(altParsed) ? 0 : altParsed;
  }
  
  return parsed;
}

export function FeaturedSlice() {
  const featured = useMemo(() => {
    console.log("=== FeaturedSlice Debug ===");
    console.log("Current date:", new Date().toISOString());
    console.log("All tournaments:", TOURNAMENTS.map(t => ({
      title: t.title,
      date: t.date,
      archived: t.archived,
      parsedDate: new Date(parseWhen(t.date)).toISOString()
    })));
    
    // Always prioritize tournaments marked as upcoming first
    const upcomingByFlag = TOURNAMENTS.filter(t => !t.archived);
    console.log("Tournaments marked as upcoming (archived: false):", upcomingByFlag.map(t => ({
      title: t.title,
      date: t.date,
      parsedDate: parseWhen(t.date) ? new Date(parseWhen(t.date)).toISOString() : 'Invalid date'
    })));
    
    if (upcomingByFlag.length > 0) {
      // Sort upcoming tournaments by date and take first 3
      const sorted = upcomingByFlag
        .sort((a, b) => parseWhen(a.date) - parseWhen(b.date))
        .slice(0, 3);
      
      console.log("Returning upcoming tournaments:", sorted.map(t => t.title));
      return sorted;
    }
    
    // Fallback: Get most recent archived tournaments
    const archived = TOURNAMENTS
      .filter(t => t.archived)
      .sort((a, b) => parseWhen(b.date) - parseWhen(a.date))
      .slice(0, 3);
    
    console.log("No upcoming tournaments found, showing recent archived:", archived.map(t => t.title));
    return archived;
  }, []);

  console.log("FeaturedSlice final result:", featured.length, "tournaments");

  return (
    <section className="container py-10 md:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <h2 className="h2 text-center sm:text-left">Featured Tournaments</h2>
        <a href="/tournaments" className="btn btn-outline self-center sm:self-auto">See All</a>
      </div>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

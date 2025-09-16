"use client";
import { useMemo } from "react";
import { TOURNAMENTS } from "@/data/tournaments";
import { TournamentCard } from "@/components/tournaments/TournamentCard";

function parseWhen(s?: string): number {
  if (!s) return 0;
  const t = Date.parse(s.replace("GMT+1", "GMT+0100").replace("GMT", "GMT+0000"));
  return Number.isNaN(t) ? 0 : t;
}

export function FeaturedSlice() {
  const featured = useMemo(() => {
    return [...TOURNAMENTS]
      .sort((a, b) => parseWhen(b.date) - parseWhen(a.date))
      .slice(0, 3);
  }, []);

  return (
    <section className="container py-10 md:py-14">
      <div className="flex items-end justify-between gap-4">
        <h2 className="h2">Featured Tournaments</h2>
        <a href="/tournaments" className="btn btn-outline">See All</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {featured.map((t) => (
          <TournamentCard key={t.slug} t={t} />
        ))}
      </div>
    </section>
  );
}

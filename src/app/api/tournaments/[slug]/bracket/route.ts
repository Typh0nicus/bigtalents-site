import { NextRequest, NextResponse } from "next/server";
import { TOURNAMENTS } from "@/data/tournaments";
import { parseMatcherino } from "@/lib/parseMatcherino";
import type { BracketData } from "@/types/bracket";

const cache = new Map<string, { data: BracketData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tournament = TOURNAMENTS.find(t => t.slug === slug);
  if (!tournament) {
    return NextResponse.json({ success: false, error: "Tournament not found" }, { status: 404 });
  }

  // Return cache if fresh
  const cached = cache.get(slug);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json({ success: true, data: cached.data, cached: true });
  }

  try {
    if (!tournament.matcherinoId) {
      throw new Error("Missing matcherinoId");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/matcherino/${tournament.matcherinoId}`, {
      cache: "no-store"
    });
    if (!res.ok) throw new Error(`Matcherino API failed: ${res.status}`);
    const json = await res.json();
    const bracketData = parseMatcherino(json);
    cache.set(slug, { data: bracketData, timestamp: Date.now() });
    return NextResponse.json({ success: true, data: bracketData, cached: false });
  } catch (error) {
    console.error(`Bracket API error for ${slug}:`, error);
    // Fallback to mock bracket
    const mock: BracketData = {
      matches: [],
      participants: [],
      metadata: {
        tournamentId: tournament.slug,
        title: tournament.title,
        bracketType: "single",
        totalRounds: 1,
        isLive: !tournament.archived,
        lastUpdated: new Date().toISOString()
      }
    };
    return NextResponse.json({ success: true, data: mock, fallback: true });
  }
}

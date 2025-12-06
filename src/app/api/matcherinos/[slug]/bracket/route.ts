// src/app/api/matcherinos/[slug]/bracket/route.ts
import { NextRequest, NextResponse } from "next/server";
import { TOURNAMENTS } from "@/data/tournaments";
import { parseMatcherino } from "@/lib/parseMatcherino";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tour = TOURNAMENTS.find((t) => t.slug === slug);
  if (!tour) {
    return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
  }
  const id = tour.matcherinoId;
  if (!id) {
    return NextResponse.json({ placements: [], participants: [] });
  }

  // Fetch the full bracket
  const res = await fetch(
    `https://api.matcherino.com/__api/brackets?bountyId=${id}&id=0&isAdmin=false`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    console.error("Bracket fetch failed:", res.status);
    return NextResponse.json({ placements: [], participants: [] });
  }

  const data = await res.json();
  const bracket = parseMatcherino(data);
  return NextResponse.json(bracket, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

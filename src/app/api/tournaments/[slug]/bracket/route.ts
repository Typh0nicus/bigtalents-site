import { NextRequest, NextResponse } from "next/server";
import { TOURNAMENTS } from "@/data/tournaments";
import { parseMatcherino } from "@/lib/parseMatcherino";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // FIXED: Await params in Next.js 15
    const { slug } = await params;
    console.log(`📡 Bracket API called for slug: ${slug}`);

    const tournament = TOURNAMENTS.find((t) => t.slug === slug);

    if (!tournament) {
      console.error(`❌ Tournament not found: ${slug}`);
      return NextResponse.json(
        { error: "Tournament not found" },
        { status: 404 }
      );
    }

    if (!tournament.matcherinoId) {
      console.error(`❌ Missing matcherinoId for: ${slug}`);
      return NextResponse.json(
        { error: "Missing matcherinoId" },
        { status: 400 }
      );
    }

    console.log(`✅ Fetching matcherino data for ID: ${tournament.matcherinoId}`);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/matcherino/${tournament.matcherinoId}`,
      {
        cache: "no-store",
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        }
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Matcherino API error:`, errorText);
      throw new Error(`Matcherino API failed: ${res.status}`);
    }

    const matcherinoData = await res.json();
    console.log(`📦 Matcherino data received, parsing...`);

    const bracketData = parseMatcherino(matcherinoData);
    console.log(`✅ Parsed bracket data:`, {
      placements: bracketData.placements?.length || 0,
      participants: bracketData.participants?.length || 0,
    });

    return NextResponse.json(bracketData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    // FIXED: Get slug safely
    const resolvedParams = await params;
    const slug = resolvedParams?.slug || 'unknown';
    console.error(`Bracket API error for ${slug}:`, error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch bracket data" },
      { status: 500 }
    );
  }
}

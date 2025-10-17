import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = `https://api.matcherino.com/__api/bounties/findById?id=${id}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error(`Matcherino API returned ${res.status} for ID ${id}`);
      return NextResponse.json({ error: "Tournament not found" }, { status: 404 });
    }
    const json = await res.json();
    return NextResponse.json(json.body || json);
  } catch (err) {
    console.error("Matcherino API error:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

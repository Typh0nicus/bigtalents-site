import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const url = `https://matcherino.com/supercell/tournaments/${id}/bracket/bracket`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch bracket page: ${res.status}`);
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let bracketData: any = null;
    
    $('script').each((_, el) => {
      const scriptText = $(el).html() || '';
      
      if (scriptText.includes('__INITIAL_STATE__') || scriptText.includes('bracketData')) {
        try {
          const jsonMatch = scriptText.match(/__INITIAL_STATE__\s*=\s*(\{[\s\S]*?\});/) ||
                           scriptText.match(/bracketData\s*=\s*(\{[\s\S]*?\});/) ||
                           scriptText.match(/window\.bracket\s*=\s*(\{[\s\S]*?\});/);
          
          if (jsonMatch) {
            bracketData = JSON.parse(jsonMatch[1]);
          }
        } catch (e) {
          console.error('Failed to parse bracket JSON:', e);
        }
      }
    });

    if (bracketData) {
      return NextResponse.json(bracketData);
    }

    return NextResponse.json({ error: "Could not extract bracket data from page" }, { status: 404 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Matcherino scraping error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

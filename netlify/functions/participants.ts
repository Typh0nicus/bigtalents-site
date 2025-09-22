// netlify/functions/participants.ts
import type { Handler, HandlerEvent, HandlerResponse } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const TTL_MS = 1000 * 60 * 60 * 12; // 12h cache

type KeyIn = { kind: "id" | "slug"; value: string };
type CountRec = { count: number | null; ts: number };

const jsonOK = (body: unknown, extra: Record<string, string> = {}): HandlerResponse => ({
  statusCode: 200,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    ...extra,
  },
  body: JSON.stringify(body),
});

const jsonErr = (statusCode: number, msg: string): HandlerResponse => ({
  statusCode,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ error: msg }),
});

const store = getStore({ name: "participants" });

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const q = event.queryStringParameters || {};
    const inputs: KeyIn[] = [];

    if (q.id) inputs.push({ kind: "id", value: String(q.id) });
    if (q.slug) inputs.push({ kind: "slug", value: String(q.slug) });
    if (q.ids) {
      String(q.ids)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((v) => inputs.push({ kind: "id", value: v }));
    }
    if (q.slugs) {
      String(q.slugs)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((v) => inputs.push({ kind: "slug", value: v }));
    }

    if (inputs.length === 0) {
      return jsonErr(400, "Provide ?id=… or ?slug=… (or ids/slugs comma-separated).");
    }

    const results: Record<string, number | null> = {};

    await Promise.all(
      inputs.map(async (k) => {
        const cacheKey = k.kind === "id" ? `id:${k.value}` : `slug:${k.value}`;

        // 1) Try cache
        const cached = await store.get(cacheKey);
        if (cached) {
          try {
            const rec = JSON.parse(cached) as CountRec;
            if (rec && typeof rec.ts === "number" && Date.now() - rec.ts < TTL_MS) {
              results[cacheKey] = typeof rec.count === "number" ? rec.count : null;
              return;
            }
          } catch {
            // fall through
          }
        }

        // 2) Fetch live
        const url =
          k.kind === "id"
            ? `https://matcherino.com/supercell/tournaments/${k.value}/overview`
            : `https://matcherino.com/t/${k.value}/overview`;

        const count = await fetchParticipants(url);

        // 3) Save to blobs (no options object; some versions don’t accept contentType)
        const rec: CountRec = { count, ts: Date.now() };
        await store.set(cacheKey, JSON.stringify(rec));

        results[cacheKey] = count;
      })
    );

    return jsonOK({ results });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return jsonErr(500, `Internal error: ${msg}`);
  }
};

// Heuristics over the HTML to find a participant count
async function fetchParticipants(url: string): Promise<number | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; BGT/1.0; +https://bigtalents.org)",
        accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    if (!res.ok) return null;

    const html = await res.text();
    const patterns = [
      /Participants[^0-9]{0,12}(\d{1,5})/i,
      /Entrants[^0-9]{0,12}(\d{1,5})/i,
      /"participants"\s*:\s*(\d{1,5})/i,
      /"entrants"\s*:\s*(\d{1,5})/i,
      /"numParticipants"\s*:\s*(\d{1,5})/i,
    ];
    for (const rx of patterns) {
      const m = html.match(rx);
      if (m?.[1]) {
        const n = parseInt(m[1], 10);
        if (Number.isFinite(n)) return n;
      }
    }
    return null;
  } catch {
    return null;
  }
}

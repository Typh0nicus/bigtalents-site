// netlify/edge-functions/track.ts
import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  // Respect Do Not Track
  if (req.headers.get("DNT") === "1") {
    return new Response(null, { status: 204 });
  }

  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const { path, ref } = (body ?? {}) as { path?: string; ref?: string };
  if (typeof path !== "string") {
    return new Response("Bad Request", { status: 400 });
  }

  // Basic event payload
  const ua = req.headers.get("user-agent") || "";
  const country = (req as any).cf?.country || null;

  const evt = {
    ts: new Date().toISOString(),
    path,
    ref: typeof ref === "string" ? ref : null,
    ua,
    country,
    ipHash: await hash(req.headers.get("x-forwarded-for") || ""),
  };

  // Write each event as a unique object (no append API on set()).
  const key = `events/${Date.now()}-${(crypto as any).randomUUID?.() || Math.random().toString(36).slice(2)}.json`;

  const store = getStore("analytics");
  await store.set(key, JSON.stringify(evt), {
    metadata: { path, country: country ?? undefined },
    // onlyIfNew: true // (optional) avoid collisions if you ever re-use keys
  });

  return new Response(null, { status: 204 });
};

async function hash(input: string) {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

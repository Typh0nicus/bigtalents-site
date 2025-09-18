// netlify/edge-functions/track.ts
import { getStore } from "https://edge.netlify.com/blobs@0.4.1";

export default async (req: Request) => {
  // Respect Do Not Track
  const dnt = req.headers.get("DNT");
  if (dnt === "1") return new Response(null, { status: 204 });

  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  const { path, ref } = body ?? {};
  if (typeof path !== "string") return new Response("Bad Request", { status: 400 });

  const ua = req.headers.get("user-agent") || "";
  const cf = (req as any).cf || {};
  const country = cf.country || null;

  const evt = {
    ts: new Date().toISOString(),
    path,
    ref: typeof ref === "string" ? ref : null,
    ua,
    country,
    ipHash: await hash(req.headers.get("x-forwarded-for") || ""), // rough IP hash (not reversible)
  };

  const store = getStore({ name: "analytics" });
  // append JSONL
  await store.append("events.jsonl", new TextEncoder().encode(JSON.stringify(evt) + "\n"));

  return new Response(null, { status: 204 });
};

async function hash(input: string) {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

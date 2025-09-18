// netlify/functions/contact.ts
import type { Handler, HandlerEvent } from "@netlify/functions";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const RESEND_TO = "admin@bigtalents.org";
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || "";

// crude per-IP rate limit (resets per cold start)
const BUCKET: Record<string, { count: number; ts: number }> = {};
const WINDOW_MS = 60_000;
const LIMIT = 5;

export const handler: Handler = async (event: HandlerEvent) => {
  const method = (event.httpMethod || "GET").toUpperCase();

  switch (method) {
    case "OPTIONS":
      return { statusCode: 204, headers: cors(), body: "" };
    case "POST":
      break;
    default:
      return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}") as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
      _hp?: string; // honeypot
      _ts?: number; // timestamp
    };

    // Honeypot & timing
    if (body._hp && body._hp.trim() !== "") {
      return { statusCode: 204, headers: cors(), body: "" };
    }
    const now = Date.now();
    if (!body._ts || now - body._ts < 1200) {
      return { statusCode: 400, headers: cors(), body: "Slow down." };
    }

    // Validate
    if (!body.name || !body.email || !body.message) {
      return { statusCode: 400, headers: cors(), body: "Missing fields" };
    }
    if (body.message.length > 5000) {
      return { statusCode: 400, headers: cors(), body: "Message too long" };
    }

    // Rate limit
    const ipHeader =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"] ||
      "anon";
    const ip = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader;
    const bucket = BUCKET[ip] || { count: 0, ts: now };
    if (now - bucket.ts > WINDOW_MS) {
      bucket.count = 0;
      bucket.ts = now;
    }
    bucket.count += 1;
    BUCKET[ip] = bucket;
    if (bucket.count > LIMIT) {
      return { statusCode: 429, headers: cors(), body: "Too many requests" };
    }

    const payload = {
      name: String(body.name),
      email: String(body.email),
      subject: String(body.subject || ""),
      message: String(body.message),
      when: new Date().toISOString(),
      ua: event.headers["user-agent"] || "",
    };

    // Discord (optional)
    if (DISCORD_WEBHOOK) {
      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `**New contact message**`,
          embeds: [
            {
              title: "BGT Contact",
              fields: [
                { name: "Name", value: payload.name, inline: true },
                { name: "Email", value: payload.email, inline: true },
                ...(payload.subject
                  ? [{ name: "Subject", value: payload.subject, inline: true }]
                  : []),
                { name: "Message", value: payload.message.slice(0, 1900) }
              ],
              timestamp: payload.when
            }
          ]
        })
      });
    }

    // Resend (optional)
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "BGT Website <no-reply@bigtalents.org>",
          to: [RESEND_TO],
          subject: `Contact: ${payload.name}${
            payload.subject ? ` — ${payload.subject}` : ""
          }`,
          text: `New contact message

Name: ${payload.name}
Email: ${payload.email}
When: ${payload.when}
Subject: ${payload.subject}

${payload.message}
          `
        })
      });
    }

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true }) };
  } catch {
    return { statusCode: 500, headers: cors(), body: "Server error" };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

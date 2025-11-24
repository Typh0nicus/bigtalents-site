import { NextRequest, NextResponse } from "next/server";

// Put your Discord Webhook URL here (move to env for security!)
const DISCORD_WEBHOOK_URL = process.env.DISCORD_APPLICATION_WEBHOOK_URL as string;

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Minimal anti-abuse
    if (!data.name || !data.roleId || !data.email) {
      return NextResponse.json({ error: "Bad submission" }, { status: 400 });
    }

    // Compose Discord embed
    const embed = {
      title: `New Staff Application: ${data.roleTitle || data.roleId}`,
      color: 0xD4AF37, // gold
      fields: [
        { name: "Name / IGN", value: data.name, inline: true },
        { name: "Age", value: data.age || "-", inline: true },
        { name: "Discord", value: data.discord || "-", inline: true },
        { name: "Email", value: data.email || "-", inline: true },
        { name: "Region/Timezone", value: data.country || "-", inline: true },
        { name: "Availability", value: data.availability || "-", inline: false },
      ],
      timestamp: new Date().toISOString(),
    };

    // Add extra Q&A fields
    if (data.answers && typeof data.answers === "object") {
      for (const [q, a] of Object.entries(data.answers)) {
        embed.fields.push({
          name: `Q: ${q}`,
          value: a ? String(a) : "-",
          inline: false
        });
      }
    }

    // Build the webhook payload
    const payload = {
      username: "BGT App Bot",
      avatar_url: "https://i.imgur.com/1VQ4ZpK.png",
      embeds: [embed]
    };

    const resp = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      return NextResponse.json({ error: "Failed to send to Discord" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

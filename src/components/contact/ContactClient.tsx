// src/components/contact/ContactClient.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
      _hp: String(fd.get("_hp") || ""),            // honeypot
      _ts: Number(fd.get("_ts") || Date.now()),    // timestamp
    };

    // quick client-side sanity (better UX)
    if (!payload.name || !payload.email || !payload.message) {
      setStatus("err");
      setMsg("Please fill your name, email, and message.");
      return;
    }
    if (payload.message.length > 5000) {
      setStatus("err");
      setMsg("Message is too long (limit 5000 characters).");
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("ok");
        setMsg("Thanks! We’ll get back to you shortly.");
        form.reset();
        // refresh timestamp so next submit isn't rejected by timing check
        const ts = form.querySelector<HTMLInputElement>('input[name="_ts"]');
        if (ts) ts.value = String(Date.now());
      } else {
        const text = await res.text().catch(() => "");
        setStatus("err");
        setMsg(text || "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again later.");
    }
  }

  return (
    <section className="container py-16 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="max-w-2xl"
      >
        <h1 className="h2">Contact Big Talents</h1>
        <p className="lead mt-3 text-white/80">
          For the fastest replies on player questions, join our Discord.
        </p>
      </motion.div>

      {/* Grid: Methods + Form */}
      <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
        {/* Column: Methods */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.28, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 p-6"
        >
          <h2 className="h4">How to reach us</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="rounded-xl border border-white/10 p-4">
              <div className="font-semibold text-white">Players & Support</div>
              <div className="mt-1 text-white/70">
                Join our Discord for event questions, check-ins, and support.
              </div>
              <a
                href="https://discord.gg/bgt?utm_source=site&utm_medium=contact_card&utm_campaign=join_discord"
                className="btn btn-outline mt-3 rounded-xl"
                rel="noopener noreferrer"
              >
                Join Discord
              </a>
            </li>

            <li className="rounded-xl border border-white/10 p-4">
              <div className="font-semibold text-white">
                Partnerships & Business
              </div>
              <div className="mt-1 text-white/70">
                Collaborations, sponsorships, tournament partnerships.
              </div>
              <a
                href="mailto:partnerships@bigtalents.org"
                className="btn btn-outline mt-3 rounded-xl"
              >
                partnerships@bigtalents.org
              </a>
            </li>

            <li className="rounded-xl border border-white/10 p-4">
              <div className="font-semibold text-white">General Inquiries</div>
              <div className="mt-1 text-white/70">
                Media, press, or anything else.
              </div>
              <a
                href="mailto:contact@bigtalents.org"
                className="btn btn-outline mt-3 rounded-xl"
              >
                contact@bigtalents.org
              </a>
            </li>

            <li className="rounded-xl border border-white/10 p-4">
              <div className="font-semibold text-white">Follow</div>
              <div className="mt-1 text-white/70">
                Get updates and announcements.
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href="https://x.com/bgtalents"
                  className="btn btn-outline rounded-xl"
                  rel="noopener noreferrer"
                >
                  X / Twitter
                </a>
                <a
                  href="https://instagram.com/bigtalents_org"
                  className="btn btn-outline rounded-xl"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Column: Functional Form (Netlify Function) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.28, ease: EASE_OUT }}
          className="rounded-2xl border border-white/10 p-6"
        >
          <h2 className="h4">Send a message</h2>

          <form onSubmit={onSubmit} className="mt-5 space-y-4" noValidate>
            {/* timing + honeypot */}
            <input type="hidden" name="_ts" value={Date.now()} />
            <p className="hidden" aria-hidden>
              <label>
                Leave this field empty: <input name="_hp" autoComplete="off" />
              </label>
            </p>

            <div>
              <label htmlFor="name" className="caption text-white/80">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                autoComplete="name"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="email" className="caption text-white/80">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="none"
                inputMode="email"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="subject" className="caption text-white/80">
                Subject (optional)
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="Sponsorship, press, etc."
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                autoComplete="off"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="message" className="caption text-white/80">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Tell us a bit more…"
                rows={6}
                className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-[color:var(--gold)]"
                suppressHydrationWarning
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="btn btn-primary rounded-xl"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
              <a
                href="mailto:contact@bigtalents.org"
                className="btn btn-outline rounded-xl"
              >
                Open in Email App
              </a>
            </div>

            {/* status messages (a11y live region) */}
            <div className="min-h-[1.25rem]" aria-live="polite">
              {status === "ok" && (
                <p className="text-green-400 text-sm">{msg}</p>
              )}
              {status === "err" && (
                <p className="text-red-400 text-sm">{msg || "Something went wrong. Try again later."}</p>
              )}
            </div>

            <p className="caption mt-2 text-white/60">
              By submitting, you agree to being contacted about your inquiry.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Footnote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.28, ease: EASE_OUT }}
        className="mt-10 text-center text-sm text-white/50"
      >
        Global esports community, operating across NA & EU.
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactClient() {
  return (
    <section className="container py-16 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
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
          transition={{ delay: 0.1, duration: 0.28, ease: "easeOut" }}
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
                href="https://discord.gg/bgt"
                className="btn btn-outline mt-3 rounded-xl"
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
                >
                  X / Twitter
                </a>
                <a
                  href="https://instagram.com/bigtalents_org"
                  className="btn btn-outline rounded-xl"
                >
                  Instagram
                </a>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Column: Netlify Form */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.28, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 p-6"
        >
          <h2 className="h4">Send a message</h2>

          <form
            name="contact"
            method="POST"
            action="/contact/thanks"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="mt-5 space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out: <input name="bot-field" />
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
              <button type="submit" className="btn btn-primary rounded-xl">
                Send Message
              </button>
              <a
                href="mailto:contact@bigtalents.org"
                className="btn btn-outline rounded-xl"
              >
                Open in Email App
              </a>
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
        transition={{ delay: 0.25, duration: 0.28 }}
        className="mt-10 text-center text-sm text-white/50"
      >
        Global esports community, operating across NA & EU.
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function AboutBGT() {
  return (
    <section className="container py-14 md:py-18">
      <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr] md:items-start">
        {/* Left: copy + actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <h2 className="h2">What is BGT?</h2>
          <p className="mt-3 text-white/80">
            BGT is a community-driven esports organizer. We host clean, on-time
            tournaments with formats players actually want, and we pay out fast.
            No fluff — just competitive integrity and polish.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tournaments" className="btn btn-primary rounded-xl">
              Join the Next Bracket
            </Link>
            <Link href="/about" className="btn btn-outline rounded-xl">
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Right: bullets */}
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.28, ease: "easeOut" }}
          className="rounded-2xl border border-white/10 p-5 text-white/85"
        >
          <li className="mb-3">• Clear rules, transparent comms</li>
          <li className="mb-3">• NA &amp; EU coverage, zero drama</li>
          <li className="mb-3">• Professional streams &amp; assets</li>
          <li>• Smooth ops from check-in to finals</li>
        </motion.ul>
      </div>
    </section>
  );
}

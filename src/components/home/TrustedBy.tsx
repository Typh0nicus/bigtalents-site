"use client";

import { motion } from "framer-motion";

export function TrustedBy() {
  return (
    <section className="container py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="text-center"
      >
        <h3 className="h4">Trusted By</h3>

        <div className="mt-6 flex items-center justify-center">
          <img
            src="/images/logo/matcherino.png"
            alt="Matcherino"
            className="h-10 w-auto opacity-90 md:h-12"
            loading="lazy"
          />
        </div>

        {/* subtle caption (optional) */}
        {/* <p className="caption mt-3 text-white/60">Operations & payouts powered by Matcherino</p> */}
      </motion.div>
    </section>
  );
}

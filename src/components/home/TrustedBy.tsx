// src/components/home/TrustedBy.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function TrustedBy() {
  return (
    <section className="container py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} // smooth ease-out
        className="text-center"
      >
        <h3 className="h4">Trusted By</h3>

        <div className="mt-6 flex items-center justify-center">
          <a
            href="https://matcherino.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Matcherino"
            className="inline-block"
          >
            {/* Responsive logo: keeps your visual size (h-10 md:h-12) */}
            <div className="relative h-10 w-[180px] md:h-12 md:w-[220px]">
              <Image
                src="/images/logo/matcherino.png" // keep your existing asset path
                alt="Matcherino"
                fill
                className="object-contain opacity-90"
                sizes="(max-width: 768px) 180px, 220px"
                priority={false}
              />
            </div>
          </a>
        </div>

        {/* subtle caption (optional) */}
        {/*
        <p className="caption mt-3 text-white/60">
          Operations & payouts powered by Matcherino
        </p>
        */}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { GiftBoxCard } from "./GiftBoxCard";

export function GiftBoxGrid() {
  return (
    <div className="relative py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="container mx-auto px-4"
      >
        {/* Grid layout - row on desktop, column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {[0, 1, 2].map((index) => (
            <GiftBoxCard key={index} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

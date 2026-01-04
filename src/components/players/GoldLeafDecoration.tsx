"use client";

import { motion } from "framer-motion";

export function GoldLeafDecoration() {
  return (
    <>
      {/* Top left corner flourish */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -20 }}
        animate={{ opacity: 0.2, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-8 left-8 md:top-16 md:left-16 pointer-events-none hidden md:block"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 10 Q30 30 10 50 Q20 40 30 30 Q40 20 50 10"
            stroke="url(#goldGradientTopLeft)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M10 10 Q20 40 10 70 Q15 50 20 40 Q30 25 40 10"
            stroke="url(#goldGradientTopLeft)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="goldGradientTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Top right corner flourish */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: -20 }}
        animate={{ opacity: 0.2, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-8 right-8 md:top-16 md:right-16 pointer-events-none hidden md:block"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M110 10 Q90 30 110 50 Q100 40 90 30 Q80 20 70 10"
            stroke="url(#goldGradientTopRight)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M110 10 Q100 40 110 70 Q105 50 100 40 Q90 25 80 10"
            stroke="url(#goldGradientTopRight)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="goldGradientTopRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Bottom decorative elements - small gold dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-16 left-1/4 pointer-events-none hidden lg:block"
      >
        <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 1.1 }}
        className="absolute bottom-24 right-1/4 pointer-events-none hidden lg:block"
      >
        <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
      </motion.div>
    </>
  );
}

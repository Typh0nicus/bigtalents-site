"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiUsers } from "react-icons/fi";

export default function ComingSoonPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Link 
          href="/rosters"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <FiArrowLeft />
          <span>Back to Rosters</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="card p-12">
            <FiUsers className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h1 className="text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Announcements will be made on our social channels
            </p>
            <Link
              href="/rosters"
              className="inline-block px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#FFD700] transition-colors"
            >
              Back to Rosters
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

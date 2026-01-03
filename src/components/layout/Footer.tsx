"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      {/* Tiered dark surfaces */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-surface-1)] via-[var(--bg-surface-2)] to-[var(--bg-surface-3)] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 dotted-grid opacity-30 pointer-events-none" />
      
      <div className="container relative">
        <div className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link href="/" className="inline-block mb-6 group">
                  <Image
                    src="/images/logo/bgt-logo.png"
                    alt="Big Talents"
                    width={150}
                    height={38}
                    className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>
                
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md leading-relaxed">
                  Premier competitive esports organization fielding championship rosters, hosting high-level events, and building the future of Brawl Stars esports.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://discord.gg/bgt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-surface hover:bg-white/10 rounded-xl text-white/70 hover:text-[var(--gold)] transition-all duration-200 border hover:border-[var(--border-gold)]/30 hover:shadow-glow-gold-sm"
                    aria-label="Discord"
                  >
                    <FaDiscord size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://x.com/bgtalents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-surface hover:bg-white/10 rounded-xl text-white/70 hover:text-[var(--gold)] transition-all duration-200 border hover:border-[var(--border-gold)]/30 hover:shadow-glow-gold-sm"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://instagram.com/bigtalents_org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass-surface hover:bg-white/10 rounded-xl text-white/70 hover:text-[var(--gold)] transition-all duration-200 border hover:border-[var(--border-gold)]/30 hover:shadow-glow-gold-sm"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid gap-8 sm:grid-cols-3"
              >
                {/* Quick Links */}
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "Achievements", href: "/achievements" },
                      { label: "Rosters", href: "/rosters" },
                      { label: "Creator Program", href: "/creator-program" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[var(--gold)] transition-colors duration-200 flex items-center group text-sm"
                        >
                          <span>{link.label}</span>
                          <FiArrowRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "About", href: "/about" },
                      { label: "Contact", href: "/contact" },
                      { label: "Brand Guidelines", href: "/brand-guidelines" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[var(--gold)] transition-colors duration-200 flex items-center group text-sm"
                        >
                          <span>{link.label}</span>
                          <FiArrowRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Community */}
                <div>
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Community</h3>
                  <ul className="space-y-3">
                    {[
                      { label: "Discord Server", href: "https://discord.gg/bgt", external: true },
                      { label: "Twitter", href: "https://x.com/bgtalents", external: true },
                      { label: "Instagram", href: "https://instagram.com/bigtalents_org", external: true },
                    ].map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-[var(--gold)] transition-colors duration-200 flex items-center group text-sm"
                        >
                          <span>{link.label}</span>
                          <FiArrowRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/50 text-sm">
            © 2025 Big Talents. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white/80 transition-colors">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

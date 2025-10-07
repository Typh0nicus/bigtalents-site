"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-sm border-t border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      
      <div className="container relative">
        <div className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Brand Column */}
            <div className="lg:col-span-2">
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
                
                <p className="text-white/80 text-lg mb-6 max-w-md">
                  Join the premier esports organization where legends are born and champions are made.
                </p>

                {/* Newsletter Signup */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[color:var(--gold)]/50 focus:bg-white/10 transition-all"
                    suppressHydrationWarning={true}
                  />
                  <button className="btn btn-primary rounded-lg px-6">
                    Subscribe
                  </button>
                </div>

                <p className="text-white/50 text-sm mb-8">
                  Get tournament updates, exclusive content, and insider news delivered to your inbox.
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href="https://discord.gg/bgt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-[color:var(--gold)] transition-all duration-200"
                    aria-label="Discord"
                  >
                    <FaDiscord size={20} />
                  </a>
                  <a
                    href="https://x.com/bgtalents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-[color:var(--gold)] transition-all duration-200"
                    aria-label="Twitter"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href="https://instagram.com/bigtalents_org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-[color:var(--gold)] transition-all duration-200"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="https://youtube.com/@bigtalents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-[color:var(--gold)] transition-all duration-200"
                    aria-label="YouTube"
                  >
                    <FaYoutube size={20} />
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Navigation Column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1"
              >
                {/* Quick Links */}
                <div>
                  <h3 className="font-bold text-white mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "Tournaments", href: "/tournaments" },
                      { label: "Club", href: "/club" },
                      { label: "News", href: "/news" },
                      { label: "Creator Program", href: "/creator-program" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors duration-200 flex items-center group"
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
                  <h3 className="font-bold text-white mb-4">Company</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "About", href: "/about" },
                      { label: "Contact", href: "/contact" },
                      { label: "Brand Guidelines", href: "/brand-guidelines" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors duration-200 flex items-center group"
                        >
                          <span>{link.label}</span>
                          <FiArrowRight className="ml-1 text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
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

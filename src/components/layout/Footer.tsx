"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaDiscord, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

// Clean, consistent type definition
type FooterLink = {
  href: string;
  label: string;
  external?: boolean; // Optional, defaults to false for internal links
};

const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/brand-guidelines", label: "Brand Guidelines" },
    { href: "/careers", label: "Careers" }
  ] as FooterLink[],
  tournaments: [
    { href: "/tournaments", label: "Browse Tournaments" },
    { href: "/tournaments/schedule", label: "Schedule" },
    { href: "/tournaments/results", label: "Results" },
    { href: "/tournaments/rules", label: "Rules" }
  ] as FooterLink[],
  creators: [
    { href: "/creator-program", label: "Creator Program" },
    { href: "/rosters/creators", label: "Our Creators" },
    { href: "/creator-program/apply", label: "Apply Now" },
    { href: "https://discord.gg/bgt", label: "Creator Discord", external: true }
  ] as FooterLink[],
  community: [
    { href: "/club", label: "BGT Elite Club" },
    { href: "/rosters", label: "Rosters" },
    { href: "/news", label: "News" },
    { href: "https://discord.gg/bgt", label: "Join Discord", external: true }
  ] as FooterLink[]
};

const SOCIAL_LINKS = [
  { 
    href: "https://discord.gg/bgt", 
    label: "Discord", 
    icon: FaDiscord, 
    color: "hover:text-indigo-400" 
  },
  { 
    href: "https://x.com/bgtalents", 
    label: "Twitter", 
    icon: FaTwitter, 
    color: "hover:text-blue-400" 
  },
  { 
    href: "https://instagram.com/bigtalents_org", 
    label: "Instagram", 
    icon: FaInstagram, 
    color: "hover:text-pink-400" 
  },
  { 
    href: "https://youtube.com/@BigTalentsGG", 
    label: "YouTube", 
    icon: FaYoutube, 
    color: "hover:text-red-400" 
  }
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(1000px 400px at 50% 0%, rgba(212,175,55,.06), transparent 60%)"
        }}
      />

      <div className="container relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/" className="inline-block mb-6 group">
                  <Image
                    src="/images/logo/bgt-logo.png"
                    alt="Big Talents"
                    width={140}
                    height={35}
                    className="h-9 w-auto transition-transform duration-200 group-hover:scale-105"
                  />
                </Link>

                <p className="text-white/70 leading-relaxed mb-6 max-w-md">
                  The premier destination for competitive Brawl Stars esports. 
                  Where big talents meet bigger stages through professional tournaments, 
                  creator development, and elite community excellence.
                </p>

                {/* Newsletter Signup */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[color:var(--gold)]/50 focus:bg-white/10 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 bg-[color:var(--gold)] text-black rounded-lg font-medium hover:bg-[color:var(--gold)]/90 transition-colors flex items-center gap-2"
                  >
                    <span className="hidden sm:inline">Subscribe</span>
                    <FiArrowRight />
                  </motion.button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-2.5 bg-white/5 border border-white/10 rounded-lg text-white/70 ${social.color} hover:bg-white/10 transition-all`}
                        aria-label={social.label}
                      >
                        <IconComponent size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Company Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="font-bold text-white mb-4">Company</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Tournaments Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-bold text-white mb-4">Tournaments</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.tournaments.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Creators Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="font-bold text-white mb-4">Creators</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.creators.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Community Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="font-bold text-white mb-4">Community</h3>
                <ul className="space-y-3">
                  {FOOTER_LINKS.community.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/70 hover:text-[color:var(--gold)] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-white/60">
              <p>&copy; {new Date().getFullYear()} Big Talents. All rights reserved.</p>
              <Link href="/privacy" className="hover:text-[color:var(--gold)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[color:var(--gold)] transition-colors">
                Terms of Service
              </Link>
            </div>
            
            <div className="text-sm text-white/60">
              Made with <span className="text-[color:var(--gold)]">♥</span> for the Brawl Stars community
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

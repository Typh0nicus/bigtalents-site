"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiDownload, FiCheck, FiX, FiEye, FiType } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi"; // Use this instead of FiPalette

const BRAND_COLORS = [
  { name: "Primary Gold", hex: "#D4AF37", rgb: "rgb(212, 175, 55)" },
  { name: "Light Gold", hex: "#E0B84F", rgb: "rgb(224, 184, 79)" },
  { name: "Dark Gold", hex: "#B8941C", rgb: "rgb(184, 148, 28)" },
  { name: "White", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
  { name: "Dark Background", hex: "#0A0A0A", rgb: "rgb(10, 10, 10)" },
];

const LOGO_VARIANTS = [
  { name: "Primary Logo", file: "bgt-logo.png", description: "Main logo for all applications" },
  { name: "White Logo", file: "bgt-logo-white.png", description: "For dark backgrounds" },
  { name: "Gold Logo", file: "bgt-logo-gold.png", description: "For light backgrounds" },
  { name: "Icon Only", file: "bgt-icon.png", description: "Square format for social media" },
];

const DO_DONT = {
  do: [
    "Use official logo files only",
    "Maintain proper spacing around logo",
    "Use approved color combinations",
    "Keep logo readable at all sizes",
    "Follow typography guidelines",
  ],
  dont: [
    "Alter or modify the logo",
    "Use low-resolution images",
    "Place logo on busy backgrounds",
    "Change logo colors arbitrarily",
    "Stretch or distort the logo",
  ],
};

export default function BrandGuidelinesClient() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1000px 500px at 20% -10%, rgba(212,175,55,0.06), transparent 60%),
                radial-gradient(800px 400px at 80% 10%, rgba(224,184,79,0.04), transparent 60%)
              `,
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="h1 mb-6">
              Brand <span className="text-[color:var(--gold)]">Guidelines</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Official guidelines for using Big Talents branding, logos, and assets.
              These resources ensure consistent representation across all platforms.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/15 rounded-2xl text-sm text-white/70">
              <FiEye />
              <span>For partners, creators, and media use</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4">
              Logo <span className="text-[color:var(--gold)]">Downloads</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              High-resolution logo files in various formats for different use cases
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {LOGO_VARIANTS.map((logo, idx) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="card p-6 text-center"
              >
                <div className="aspect-square bg-white/5 rounded-xl mb-4 flex items-center justify-center">
                  <Image
                    src={`/images/logo/${logo.file}`}
                    alt={logo.name}
                    width={120}
                    height={120}
                    className="max-w-[80px] max-h-[80px] object-contain"
                  />
                </div>

                <h3 className="font-semibold mb-2">{logo.name}</h3>
                <p className="text-sm text-white/70 mb-4">{logo.description}</p>

                <button className="w-full btn btn-outline rounded-xl py-2 text-sm">
                  <FiDownload className="mr-2" />
                  Download PNG
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <a
              href="/downloads/bgt-logo-pack.zip"
              className="btn btn-primary rounded-2xl px-8 py-4 text-lg"
              download
            >
              <FiDownload className="mr-2" />
              Download Complete Logo Pack
            </a>
          </motion.div>
        </div>
      </section>

      {/* Colors */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <HiOutlineColorSwatch className="text-[color:var(--gold)]" />
              <h2 className="h2">
                Brand <span className="text-[color:var(--gold)]">Colors</span>
              </h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our signature color palette that defines the Big Talents identity
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {BRAND_COLORS.map((color, idx) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div
                  className="w-full aspect-square rounded-2xl mb-4 border border-white/20"
                  style={{ backgroundColor: color.hex }}
                />
                <h3 className="font-semibold mb-1">{color.name}</h3>
                <p className="text-sm text-white/70 font-mono">{color.hex}</p>
                <p className="text-xs text-white/50 font-mono">{color.rgb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <FiType className="text-[color:var(--gold)]" />
              <h2 className="h2">Typography</h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Font families and text styles for consistent brand communication
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-xl font-bold mb-6">Primary Font</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-[color:var(--gold)] mb-2">Inter Bold</div>
                  <p className="text-white/70">Used for headings and important text</p>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">Inter Semibold</div>
                  <p className="text-white/70">For subheadings and emphasis</p>
                </div>
                <div>
                  <div className="text-base mb-2">Inter Regular</div>
                  <p className="text-white/70">Body text and general content</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <h3 className="text-xl font-bold mb-6">Usage Guidelines</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-2">
                  <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Use Inter for all digital applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Maintain proper hierarchy with font weights</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Ensure sufficient contrast for readability</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                  <span>Use gold color sparingly for emphasis</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Do’s and Don’ts */}
      <section className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4">Usage Guidelines</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Essential do&apos;s and don&apos;ts for maintaining brand consistency
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <FiCheck className="text-green-400 text-xl" />
                <h3 className="text-xl font-bold text-green-400">Do</h3>
              </div>
              <ul className="space-y-3">
                {DO_DONT.do.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80">
                    <FiCheck className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <FiX className="text-red-400 text-xl" />
                <h3 className="text-xl font-bold text-red-400">Don&apos;t</h3>
              </div>
              <ul className="space-y-3">
                {DO_DONT.dont.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-white/80">
                    <FiX className="text-red-400 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-white/80 mb-8">
              Have questions about brand usage or need custom assets?
              Our team is here to help ensure proper brand representation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:brand@bigtalents.gg"
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg"
              >
                Email Brand Team
              </a>
              <a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg"
              >
                <FaDiscord className="mr-2" />
                Discord Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

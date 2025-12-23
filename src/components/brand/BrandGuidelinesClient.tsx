"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiDownload,
  FiCheck,
  FiX,
  FiEye,
  FiType,
  FiCopy,
  FiInfo,
  FiMaximize2,
  FiGrid,
} from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { GridOverlay } from "@/components/ui/GridOverlay";

const BRAND_CONTACT_EMAIL = "support@bigtalents.org";

/* --------------------------------- Data ---------------------------------- */

const BRAND_COLORS = [
  { name: "Primary Gold", hex: "#D4AF37", rgb: "rgb(212, 175, 55)" },
  { name: "Light Gold", hex: "#E0B84F", rgb: "rgb(224, 184, 79)" },
  { name: "Dark Gold", hex: "#B8941C", rgb: "rgb(184, 148, 28)" },
  { name: "White", hex: "#FFFFFF", rgb: "rgb(255, 255, 255)" },
  { name: "Dark Background", hex: "#0A0A0A", rgb: "rgb(10, 10, 10)" },
];

const LOGO_VARIANTS = [
  {
    name: "Primary Mark (Gold)",
    file: "bgt-logo.png",
    description:
      "Our flagship hero logo for high-impact visuals, announcements, and main brand presence.",
  },
  {
    name: "Simple Mark",
    file: "bgt-logo-simple.png",
    description:
      "Reduced-detail version for UI, small sizes, overlays, and everyday brand utility.",
  },
];

const DO_DONT = {
  do: [
    "Use official logo files only",
    "Maintain proper spacing around the mark",
    "Use approved color combinations",
    "Keep the logo readable at all sizes",
    "Prefer the Simple Mark for small UI",
  ],
  dont: [
    "Alter or redraw the logo",
    "Use low-resolution exports",
    "Place the mark on busy textures",
    "Change colors outside the palette",
    "Stretch, skew, or add heavy effects",
  ],
};

const LOGO_RULES = [
  {
    icon: FiMaximize2,
    title: "Clear Space",
    text:
      "Keep clear space around the logo equal to the height of the ‘T’ stem at minimum.",
  },
  {
    icon: FiGrid,
    title: "Minimum Size",
    text:
      "Use the Simple Mark below ~64px height in UI to preserve readability.",
  },
  {
    icon: FiInfo,
    title: "Backgrounds",
    text:
      "Prefer flat or softly graded backgrounds. Avoid high-contrast noise behind the mark.",
  },
];

/* --------------------------------- Utils --------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

/* --------------------------------- Page ---------------------------------- */

export default function BrandGuidelinesClient() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [isPacking, setIsPacking] = useState(false);
  const [packError, setPackError] = useState<string | null>(null);

  const logoUrls = useMemo(
    () => LOGO_VARIANTS.map((l) => `/images/logo/${l.file}`),
    []
  );

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 900);
    } catch {
      // silent fail
    }
  };

  const handleDownloadPack = async () => {
    setPackError(null);
    setIsPacking(true);

    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      await Promise.all(
        LOGO_VARIANTS.map(async (logo) => {
          const url = `/images/logo/${logo.file}`;
          const res = await fetch(url);
          if (!res.ok) return;
          const blob = await res.blob();
          zip.file(logo.file, blob);
        })
      );

      const content = await zip.generateAsync({ type: "blob" });
      const blobUrl = URL.createObjectURL(content);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "bgt-logo-pack.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(blobUrl);
    } catch {
      setPackError(
        "Pack download failed. Make sure your logo files exist in /public/images/logo/."
      );
    } finally {
      setIsPacking(false);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <GridOverlay />
      </div>
      {/* ------------------------------- Hero ------------------------------- */}
      <section className="relative py-16 sm:py-20 md:py-32">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1000px 500px at 20% -10%, rgba(212,175,55,0.08), transparent 60%),
                radial-gradient(900px 450px at 80% 10%, rgba(224,184,79,0.06), transparent 60%),
                radial-gradient(1000px 600px at 50% 100%, rgba(10, 10, 10, 0.05), transparent 60%)
              `,
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="h1 mb-6 select-none">
              Brand{" "}
              <span className="text-[color:var(--gold)]">Guidelines</span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Official reference for using Big Talents branding, marks, and colors.
              Keep everything consistent across competitive, creator, and partner
              touchpoints.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/15 rounded-2xl text-sm text-white/70 select-none">
              <FiEye />
              <span>For partners, creators, and media use</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------------------- Logos ------------------------------ */}
      <section className="py-14 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4 select-none">
              Logo <span className="text-[color:var(--gold)]">Assets</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Two official marks: the premium Gold Primary for high-impact visuals,
              and the Simple Mark for daily UI and small-size use.
            </p>
          </motion.div>

          {/* Centered, compact grid */}
          <div className="sm:hidden grid grid-cols-2 gap-3">
            {LOGO_VARIANTS.map((logo, idx) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: idx * 0.08, duration: 0.4, ease: EASE }}
                className="card p-4 text-center"
              >
                <div className="aspect-square bg-white/5 rounded-xl mb-3 flex items-center justify-center p-3">
                  <Image
                    src={`/images/logo/${logo.file}`}
                    alt={logo.name}
                    width={140}
                    height={140}
                    className="object-contain w-auto h-auto max-w-[90px] max-h-[90px]"
                    priority={idx === 0}
                  />
                </div>
                <h3 className="text-sm font-semibold mb-1 select-none">
                  {logo.name}
                </h3>
                <a
                  href={`/images/logo/${logo.file}`}
                  download
                  className="mt-3 btn btn-outline rounded-lg py-2 text-xs inline-flex items-center justify-center w-full"
                >
                  <FiDownload className="mr-2" />
                  Download PNG
                </a>
              </motion.div>
            ))}
          </div>

          <div className="hidden sm:grid grid-cols-2 gap-6 w-fit mx-auto justify-items-center">
            {LOGO_VARIANTS.map((logo, idx) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE }}
                className="card p-6 text-center w-[270px] sm:w-[300px]"
              >
                <div className="aspect-square bg-white/5 rounded-xl mb-4 flex items-center justify-center p-6">
                  <Image
                    src={`/images/logo/${logo.file}`}
                    alt={logo.name}
                    width={180}
                    height={180}
                    className="object-contain w-auto h-auto max-w-[150px] max-h-[150px]"
                    priority={idx === 0}
                  />
                </div>

                <h3 className="font-semibold mb-2 select-none">{logo.name}</h3>
                <p className="text-sm text-white/70 mb-4">
                  {logo.description}
                </p>

                <a
                  href={`/images/logo/${logo.file}`}
                  download
                  className="w-full btn btn-outline rounded-xl py-2 text-sm inline-flex items-center justify-center"
                >
                  <FiDownload className="mr-2" />
                  Download PNG
                </a>
              </motion.div>
            ))}
          </div>

          {/* Pack download (client-generated ZIP) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-6 sm:mt-10"
          >
            <button
              type="button"
              onClick={handleDownloadPack}
              disabled={isPacking}
              className={cn(
                "btn btn-primary rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg inline-flex items-center justify-center select-none w-full max-w-xs sm:w-auto",
                isPacking && "opacity-70 cursor-not-allowed"
              )}
            >
              <FiDownload className="mr-2" />
              {isPacking ? "Preparing Pack..." : "Download Logo Pack"}
            </button>

            <div className="mt-3 text-xs text-white/45">
              Pack includes the Primary Gold mark and the Simple mark.
            </div>

            {packError && (
              <div className="mt-2 text-xs text-red-300">
                {packError}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* -------------------------- Logo Usage Rules -------------------------- */}
      <section className="py-14 md:py-20 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-10"
          >
            <h2 className="h2 mb-3 select-none">
              Logo <span className="text-[color:var(--gold)]">Usage</span>
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Quick rules to keep the mark clean across web, social, and event
              materials.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {LOGO_RULES.map((rule, i) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                className="card p-5 sm:p-6"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 mb-4">
                  <rule.icon className="text-[color:var(--gold)]" />
                </div>
                <h3 className="font-semibold mb-2 select-none">{rule.title}</h3>
                <p className="text-sm text-white/70">{rule.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ Colors ------------------------------ */}
      <section className="py-14 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 select-none">
              <HiOutlineColorSwatch className="text-[color:var(--gold)]" />
              <h2 className="h2">
                Brand <span className="text-[color:var(--gold)]">Colors</span>
              </h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              The core palette that defines the Big Talents visual identity.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {BRAND_COLORS.map((color, idx) => (
              <motion.div
                key={color.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: EASE }}
                className="text-center group"
              >
                <div className="relative">
                  <div
                    className="w-full aspect-square rounded-2xl mb-4 border border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />

                  <button
                    type="button"
                    onClick={() => handleCopy(color.hex)}
                    className="absolute bottom-6 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/50 backdrop-blur px-2.5 py-1 text-[10px] font-semibold text-white/80 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity select-none"
                    aria-label={`Copy ${color.name} hex`}
                    title="Copy HEX"
                  >
                    <FiCopy size={11} />
                    {copiedHex === color.hex ? "Copied" : "Copy"}
                  </button>
                </div>

                <h3 className="font-semibold mb-1 select-none">{color.name}</h3>
                <p className="text-sm text-white/70 font-mono">{color.hex}</p>
                <p className="text-xs text-white/50 font-mono">{color.rgb}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------- Typography ---------------------------- */}
      <section className="py-14 md:py-24 bg-white/[0.02]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 select-none">
              <FiType className="text-[color:var(--gold)]" />
              <h2 className="h2">Typography</h2>
            </div>
            <p className="text-white/70 max-w-2xl mx-auto">
              Outfit is the official type family for consistent, modern brand
              communication across BGT platforms.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="card p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-6 select-none">Primary Font</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-[color:var(--gold)] mb-2 select-none">
                    Outfit Bold
                  </div>
                  <p className="text-white/70">
                    Used for headings and high-importance moments.
                  </p>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2 select-none">
                    Outfit Semibold
                  </div>
                  <p className="text-white/70">
                    Best for UI sections, cards, and structured highlights.
                  </p>
                </div>
                <div>
                  <div className="text-base mb-2 select-none">Outfit Regular</div>
                  <p className="text-white/70">
                    Body text across editorial and informational pages.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="card p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold mb-6 select-none">Usage Guidelines</h3>
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
                  <span>Use gold sparingly for emphasis</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --------------------------- Do / Don't --------------------------- */}
      <section className="py-14 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4 select-none">Brand Integrity</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Fast reference rules for keeping the BGT identity clean and consistent.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-6 select-none">
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08 }}
              className="card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-6 select-none">
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

      {/* ------------------------------ Contact ------------------------------ */}
      <section className="py-14 md:py-24 bg-white/[0.02]">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4 select-none">Need Help?</h2>
            <p className="text-white/80 mb-8">
              Questions about brand usage, creator assets, or partner deliverables?
              Reach us here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${BRAND_CONTACT_EMAIL}`}
                className="btn btn-primary rounded-2xl px-8 py-4 text-lg"
              >
                Email Support
              </a>
              <a
                href="https://discord.gg/bgt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline rounded-2xl px-8 py-4 text-lg inline-flex items-center justify-center"
              >
                <FaDiscord className="mr-2" />
                Discord Support
              </a>
            </div>

            <div className="mt-4 text-xs text-white/40 select-none">
              {BRAND_CONTACT_EMAIL}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

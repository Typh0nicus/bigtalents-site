"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/rosters", label: "Rosters" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// helper: match path to item (keeps Home strict)
function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  // base styles
  const base =
    "group relative px-3 py-2 text-sm font-medium transition-all duration-[210ms] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform";
  const on = "text-[color:var(--gold)]";
  const off =
    "text-white/80 hover:text-[color:var(--gold)] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(212,175,55,.35)]";

  return (
    <Link href={href} className={`${base} ${active ? on : off}`}>
      {label}
      {/* underline indicator */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-3 -bottom-1 h-[2px] rounded-full bg-[color:var(--gold)] transition-all duration-[210ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          active
            ? "w-1/2 opacity-100"
            : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const items = useMemo(
    () =>
      NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  // Motion variants for overlay and sheet (typed)
  const overlayV: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: prefersReduced ? 0 : 0.18 } },
    exit: { opacity: 0, transition: { duration: prefersReduced ? 0 : 0.12 } },
  };

  const sheetV: Variants = {
    hidden: { y: "-10%", opacity: 0.7 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0 : 0.22,
        // easeOut
        ease: [0.0, 0.0, 0.2, 1.0],
      },
    },
    exit: {
      y: "-8%",
      opacity: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.16,
        // easeIn
        ease: [0.4, 0.0, 1.0, 1.0],
      },
    },
  };

  return (
    // NOT sticky
    <header className="z-50 w-full border-b border-white/10 bg-black">
      <nav className="container flex items-center justify-between py-4">
        {/* Brand / Logo */}
        <Link href="/" aria-label="Big Talents Home" className="flex items-center gap-2">
          <Image
            src="/images/logo/bgt-logo.png"
            alt="BGT Logo"
            width={120}
            height={48}
            priority={false}
            className="h-10 w-auto md:h-12 transition-transform duration-[210ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-105"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {items.map((item) => (
            <DesktopLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.active}
            />
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-[color:var(--gold)] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle Menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="inline-block align-middle text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={overlayV}
            />

            {/* Top sheet */}
            <motion.div
              className="fixed left-0 right-0 top-0 z-50 md:hidden"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={sheetV}
            >
              <div className="mx-3 mt-[calc(env(safe-area-inset-top)+10px)] rounded-2xl border border-white/12 bg-black/92 backdrop-blur-md shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2"
                    aria-label="Big Talents Home"
                  >
                    <Image
                      src="/images/logo/bgt-logo.png"
                      alt="BGT Logo"
                      width={110}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                  <button
                    className="rounded-lg border border-white/12 px-3 py-1.5 text-sm text-white/85 hover:text-[color:var(--gold)]"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                  >
                    Close ✕
                  </button>
                </div>

                <nav id="mobile-menu" className="grid gap-1 px-2 pb-3 pt-1">
                  {items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`mx-2 rounded-xl px-4 py-3 text-base font-medium transition-all ${
                        item.active
                          ? "bg-white/[0.06] text-[color:var(--gold)]"
                          : "text-white/90 hover:bg-white/[0.06] hover:text-[color:var(--gold)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="h-3" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/* --------------------------- Nav model --------------------------- */
const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/rosters", label: "Rosters" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/* --------------------------- Desktop link --------------------------- */
function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  const base =
    "group relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out";
  const on = "text-[color:var(--gold)]";
  const off =
    "text-white/80 hover:text-[color:var(--gold)] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(212,175,55,.35)]";
  return (
    <Link href={href} className={`${base} ${active ? on : off}`}>
      {label}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-3 -bottom-1 h-[2px] rounded-full bg-[color:var(--gold)] transition-all duration-200 ease-in-out ${
          active
            ? "w-1/2 opacity-100"
            : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

/* ------------------------------ Navbar ------------------------------ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const items = useMemo(
    () =>
      NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const cls = "no-scroll";
    if (open) document.documentElement.classList.add(cls);
    return () => document.documentElement.classList.remove(cls);
  }, [open]);

  // Slower, smoother dropdown
  const panelVariants = {
    hidden: { opacity: 0, y: -8, scaleY: 0.9, transformOrigin: "top" as const },
    show: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transition: { duration: prefersReduced ? 0 : 0.34, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: -6,
      scaleY: 0.95,
      transition: { duration: prefersReduced ? 0 : 0.22, ease: EASE },
    },
  };

  return (
    <header className="relative z-50 w-full border-b border-white/10 bg-black">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" aria-label="Big Talents Home" className="flex items-center gap-2">
          <Image
            src="/images/logo/bgt-logo.png"
            alt="BGT Logo"
            width={120}
            height={40}
            className="h-10 w-auto md:h-12"
            priority={false}
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

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white/85 hover:text-[color:var(--gold)] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="mobile-nav"
          aria-expanded={open}
        >
          <span className="inline-block align-middle text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile dropdown + scrim */}
      <AnimatePresence>
        {open && (
          <>
            {/* Scrim (no blur) */}
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/55 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: prefersReduced ? 0 : 0.2 } }}
              exit={{ opacity: 0, transition: { duration: prefersReduced ? 0 : 0.16 } }}
            />
            {/* Panel under the bar (no blur) */}
            <motion.div
              id="mobile-nav"
              role="menu"
              className="mobile-panel absolute left-0 right-0 top-full z-[60] border-b border-white/10 bg-black md:hidden"
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="container py-3">
                <ul className="flex flex-col">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`nav-link block rounded-lg px-2 py-3 text-base ${
                          item.active
                            ? "text-[color:var(--gold)] bg-white/[0.04]"
                            : "text-white/85 hover:text-[color:var(--gold)] hover:bg-white/[0.03]"
                        }`}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

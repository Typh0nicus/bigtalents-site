"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
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

/* ----------------------- Desktop link (unchanged) ----------------------- */
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

/* ----------------------- Navbar ----------------------- */
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

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock/unlock background scroll at the <html> level
  useEffect(() => {
    if (open) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev;
      };
    }
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // for accessible association (button → region)
  const regionId = "mobile-menu";

  return (
    <header className="z-50 w-full border-b border-white/10 bg-black/95">
      <nav className="container flex items-center justify-between py-4">
        {/* Brand / Logo */}
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

        {/* Desktop nav (unchanged) */}
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
          className="md:hidden p-2 text-white/80 transition-colors hover:text-[color:var(--gold)]"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={regionId}
          aria-label="Toggle menu"
        >
          <span className="inline-block align-middle text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {/* Mobile drop-down (slides from top, under the bar) */}
      <AnimatePresence initial={false}>
        {open && (
          <>
            {/* Scrim for outside-click close (mobile only) */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: prefersReduced ? 0 : 0.2, ease: EASE },
              }}
              exit={{ opacity: 0, transition: { duration: prefersReduced ? 0 : 0.15, ease: EASE } }}
            />

            {/* The sheet itself — absolutely positioned below header, no logo inside */}
            <motion.div
              id={regionId}
              role="region"
              aria-label="Mobile navigation"
              className="absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-black/95 backdrop-blur-md md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: { duration: prefersReduced ? 0 : 0.28, ease: EASE },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: { duration: prefersReduced ? 0 : 0.22, ease: EASE },
              }}
            >
              <nav className="px-3 py-2">
                <ul className="flex flex-col">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`block rounded-lg px-3 py-3 text-base font-medium transition-all duration-200 ease-in-out ${
                          item.active
                            ? "text-[color:var(--gold)] bg-white/5"
                            : "text-white/85 hover:text-[color:var(--gold)] hover:bg-white/[0.05]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

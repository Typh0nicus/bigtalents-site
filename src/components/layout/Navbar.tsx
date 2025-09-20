"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// --------------------------- Nav model ---------------------------
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

// ----------------------- Drawer animation ------------------------
const easeOut = [0.22, 1, 0.36, 1] as const;

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

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock while open
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  // Focus trap within drawer
  const drawerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const first = drawerRef.current?.querySelector<HTMLElement>(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key !== "Tab" || !drawerRef.current) return;

    const focusables = Array.from(
      drawerRef.current.querySelectorAll<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled"));

    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="z-50 w-full border-b border-white/10 bg-black/90">
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
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="inline-block align-middle text-xl">☰</span>
        </button>
      </nav>

      {/* Mobile drawer + scrim */}
      {open && (
        <>
          {/* Scrim */}
          <motion.button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: prefersReduced ? 0 : 0.18, ease: easeOut } }}
            exit={{ opacity: 0, transition: { duration: 0.14, ease: easeOut } }}
          />

          {/* Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="fixed left-0 top-0 z-50 h-[100dvh] w-[86vw] max-w-[420px] bg-black/95 backdrop-blur-md border-r border-white/10 shadow-soft"
            ref={drawerRef}
            onKeyDown={onKeyDown}
            initial={{ x: "-100%" }}
            animate={{
              x: 0,
              transition: { duration: prefersReduced ? 0 : 0.22, ease: easeOut },
            }}
            exit={{ x: "-100%", transition: { duration: 0.18, ease: easeOut } }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/logo/bgt-logo.png"
                  alt="BGT Logo"
                  width={100}
                  height={32}
                />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-white/80 hover:text-[color:var(--gold)] transition"
              >
                ✕
              </button>
            </div>

            {/* Links */}
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
                          : "text-white/85 hover:text-[color:var(--gold)] hover:bg-white/[0.04] hover:translate-x-[2px]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer (tiny trust lockup, optional) */}
            <div className="mt-auto px-5 py-4 border-t border-white/10 text-xs text-white/55">
              <span className="opacity-80">© {new Date().getFullYear()} Big Talents</span>
            </div>
          </motion.aside>
        </>
      )}
    </header>
  );
}

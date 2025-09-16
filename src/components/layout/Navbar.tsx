"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";

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
    "group relative px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out";
  const on =
    "text-[color:var(--gold)]";
  const off =
    "text-white/80 hover:text-[color:var(--gold)] hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(212,175,55,.35)]";

  return (
    <Link href={href} className={`${base} ${active ? on : off}`}>
      {label}
      {/* underline indicator */}
      <span
        aria-hidden
        className={`pointer-events-none absolute left-3 -bottom-1 h-[2px] rounded-full bg-[color:var(--gold)] transition-all duration-200 ease-in-out ${
          active ? "w-1/2 opacity-100" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  return (
    // NOT sticky anymore: removed `sticky top-0`
    <header className="z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <nav className="container flex items-center justify-between py-4">
        {/* Brand / Logo */}
        <Link href="/" aria-label="Big Talents Home" className="flex items-center gap-2">
          <img
            src="/images/logo/bgt-logo.png"
            alt="BGT Logo"
            className="h-10 w-auto md:h-12 transition-transform duration-200 ease-in-out hover:scale-105"
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
        >
          {/* simple hamburger/close */}
          <span className="inline-block align-middle text-xl">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 py-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 text-base font-medium transition-all duration-200 ease-in-out ${
                  item.active
                    ? "text-[color:var(--gold)]"
                    : "text-white/80 hover:text-[color:var(--gold)] hover:scale-105"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

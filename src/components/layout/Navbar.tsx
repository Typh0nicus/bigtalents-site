"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaDiscord, FaTwitter, FaInstagram } from "react-icons/fa";

// Type for navigation items
type NavItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
  special?: boolean; // For Club styling
};

// Navigation model with dropdowns (for mobile)
const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/tournaments", label: "Tournaments" },
  { 
    href: "/rosters", 
    label: "Rosters",
    dropdown: [
      { href: "/rosters/creators", label: "Creators" },
      { href: "/rosters/players", label: "Players" }
    ]
  },
  { href: "/club", label: "Club", special: true },
  { 
    href: "/creator-program", 
    label: "Creator Program",
    dropdown: [
      { href: "/creator-program", label: "Overview" },
      { href: "/creator-program/apply", label: "Apply Now" }
    ]
  },
  { 
    href: "/company", 
    label: "Company",
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/brand-guidelines", label: "Brand Guidelines" }
    ]
  }
];

// Desktop layout - Left side (farthest to closest to logo)
const LEFT_NAV_ITEMS: NavItem[] = [
  { 
    href: "/company", 
    label: "Company",
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/brand-guidelines", label: "Brand Guidelines" }
    ]
  },
  { 
    href: "/creator-program", 
    label: "Creator Program",
    dropdown: [
      { href: "/creator-program", label: "Overview" },
      { href: "/creator-program/apply", label: "Apply Now" }
    ]
  },
  { href: "/news", label: "News" }
];

// Desktop layout - Right side (closest to farthest from logo)
const RIGHT_NAV_ITEMS: NavItem[] = [
  { href: "/tournaments", label: "Tournaments" },
  { 
    href: "/rosters", 
    label: "Rosters",
    dropdown: [
      { href: "/rosters/creators", label: "Creators" },
      { href: "/rosters/players", label: "Players" }
    ]
  },
  { href: "/club", label: "Club", special: true }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// Enhanced desktop link with dropdown support and special Club styling
function DesktopLink({
  href,
  label,
  active,
  dropdown,
  special = false,
}: {
  href: string;
  label: string;
  active: boolean;
  dropdown?: { href: string; label: string }[];
  special?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  // Different styling for Club
  const baseClasses = special 
    ? "group relative px-3 py-2 text-sm font-bold transition-all duration-200 ease-out flex items-center gap-1 uppercase tracking-wide border border-[var(--gold)] rounded-lg bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20"
    : "group relative px-4 py-3 text-sm font-bold transition-all duration-200 ease-out flex items-center gap-1 uppercase tracking-wide";
  
  const activeClasses = special 
    ? "text-[var(--gold)]"
    : "text-[var(--gold)]";
    
  const inactiveClasses = special
    ? "text-[var(--gold)] hover:text-[var(--gold)]"
    : "text-white/90 hover:text-[var(--gold)]";

  return (
    <div 
      className="relative"
      onMouseEnter={() => dropdown && setIsOpen(true)}
      onMouseLeave={() => dropdown && setIsOpen(false)}
    >
      <Link
        href={href}
        className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
        aria-expanded={dropdown ? isOpen : undefined}
      >
        {label}
        {dropdown && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <FiChevronDown size={12} />
          </motion.div>
        )}
        
        {/* Underline effect - only for non-special items */}
        {!special && (
          <motion.div
            className="absolute left-4 -bottom-1 h-0.5 bg-[var(--gold)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: active || isOpen ? "calc(100% - 2rem)" : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </Link>

      {/* Dropdown Menu - SMOOTHER ANIMATION */}
      <AnimatePresence>
        {dropdown && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50"
          >
            {dropdown.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-white/90 hover:text-[var(--gold)] hover:bg-white/10 rounded-lg transition-all duration-150"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Enhanced mobile menu with animations
function MobileMenu({ 
  isOpen, 
  onClose, 
  items 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: (NavItem & { active: boolean })[]
}) {
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: prefersReduced ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Image
                src="/images/logo/bgt-logo.png"
                alt="BGT"
                width={80}
                height={20}
                className="h-5 w-auto"
              />
              <button
                onClick={onClose}
                className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <motion.nav className="flex flex-col p-6 space-y-2">
              {items.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block px-4 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                      item.special 
                        ? 'text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/30' 
                        : item.active 
                          ? 'text-[var(--gold)] bg-[var(--gold)]/10 border border-[var(--gold)]/20' 
                          : 'text-white/85 hover:text-[var(--gold)] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Mobile dropdown items */}
                  {item.dropdown && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={onClose}
                          className="block px-4 py-2 text-sm text-white/60 hover:text-[var(--gold)] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* Social Links & CTA */}
            <motion.div 
              variants={itemVariants}
              className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <a
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </a>
                <a
                  href="https://x.com/bgtalents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://instagram.com/bigtalents_org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              </div>
              
              <Link
                href="/tournaments"
                onClick={onClose}
                className="block w-full text-center py-3 bg-[var(--gold)] text-black font-bold rounded-xl hover:bg-[var(--gold-600)] transition-colors"
              >
                View Tournaments
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  // Track scroll position for navbar styling
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const leftItems = useMemo(
    () =>
      LEFT_NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  const rightItems = useMemo(
    () =>
      RIGHT_NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  const items = useMemo(
    () =>
      NAV_ITEMS.map((it) => ({
        ...it,
        active: isActive(pathname ?? "/", it.href),
      })),
    [pathname]
  );

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        duration: prefersReduced ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container flex items-center justify-center py-4 relative">
        {/* Left Navigation - Close to logo */}
        <div className="hidden lg:flex items-center absolute right-1/2 mr-20">
          {leftItems.reverse().map((item) => (
            <DesktopLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.active}
              dropdown={item.dropdown}
              special={item.special}
            />
          ))}
        </div>

        {/* Centered Logo */}
        <Link href="/" className="flex items-center gap-3 group z-10">
          <Image
            src="/images/logo/bgt-logo.png"
            alt="Big Talents"
            width={120}
            height={30}
            priority
            className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Right Navigation - Close to logo */}
        <div className="hidden lg:flex items-center absolute left-1/2 ml-20">
          {rightItems.map((item) => (
            <DesktopLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.active}
              dropdown={item.dropdown}
              special={item.special}
            />
          ))}
        </div>
        
        {/* Social Icons - Far right edge */}
        <div className="hidden lg:flex items-center absolute right-0 gap-2">
          <a
            href="https://discord.gg/bgt"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
            aria-label="Discord"
          >
            <FaDiscord size={18} />
          </a>
          <a
            href="https://x.com/bgtalents"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://instagram.com/bigtalents_org"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram size={18} />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden absolute right-0 p-2 text-white/85 hover:text-[var(--gold)] transition-colors"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <FiMenu size={24} />
        </button>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} />
      </nav>
    </motion.header>
  );
}

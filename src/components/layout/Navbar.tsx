"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaDiscord, FaTwitter, FaInstagram, FaCrown } from "react-icons/fa";

// Type for navigation items
type NavItem = {
  href: string;
  label: string;
  dropdown?: { href: string; label: string }[];
  special?: boolean; // For Club styling
  preventNavigation?: boolean; // For dropdowns only
};

// Navigation model - MOBILE ORDER: Home, Tournaments, Club, News, Creator Program, Company
const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/club", label: "Club", special: true },
  { href: "/news", label: "News" },
  { 
    href: "/creator-program", 
    label: "Creator Program",
    preventNavigation: true,
    dropdown: [
      { href: "/creator-program/overview", label: "Overview" },
      { href: "/creator-program/apply", label: "Apply Now" }
    ]
  },
  { 
    href: "/company", 
    label: "Company",
    preventNavigation: true,
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/brand-guidelines", label: "Brand Guidelines" }
    ]
  }
];

// FIXED: Desktop layout - Left side (CORRECT ORDER: Creator Program closest, Company, News farthest)
const LEFT_NAV_ITEMS: NavItem[] = [
  { 
    href: "/creator-program", 
    label: "Creator Program",
    preventNavigation: true,
    dropdown: [
      { href: "/creator-program/overview", label: "Overview" },
      { href: "/creator-program/apply", label: "Apply Now" }
    ]
  },
  { 
    href: "/company", 
    label: "Company",
    preventNavigation: true,
    dropdown: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/brand-guidelines", label: "Brand Guidelines" }
    ]
  },
  { href: "/news", label: "News" }
];

// Desktop layout - Right side, Rosters as direct link
const RIGHT_NAV_ITEMS: NavItem[] = [
  { href: "/tournaments", label: "Tournaments" },
  { href: "/rosters", label: "Rosters" },
  { href: "/club", label: "Club", special: true }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

// FIXED: Global state for managing single dropdown
let globalOpenDropdown: string | null = null;
const globalSetters: { [key: string]: (isOpen: boolean, isLocked: boolean) => void } = {};

// Enhanced desktop link with hover + click-to-lock functionality
function DesktopLink({
  href,
  label,
  active,
  dropdown,
  special = false,
  preventNavigation = false,
}: {
  href: string;
  label: string;
  active: boolean;
  dropdown?: { href: string; label: string }[];
  special?: boolean;
  preventNavigation?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const prefersReduced = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // FIXED: Register this component for global dropdown management
  useEffect(() => {
    if (dropdown) {
      globalSetters[href] = (open: boolean, locked: boolean) => {
        setIsOpen(open);
        setIsLocked(locked);
      };
      
      return () => {
        delete globalSetters[href];
      };
    }
  }, [href, dropdown]);

  // FIXED: Close other dropdowns when opening this one
  const openThisDropdown = (lock: boolean = false) => {
    if (globalOpenDropdown && globalOpenDropdown !== href && globalSetters[globalOpenDropdown]) {
      globalSetters[globalOpenDropdown](false, false);
    }
    globalOpenDropdown = href;
    setIsOpen(true);
    setIsLocked(lock);
  };

  const closeThisDropdown = () => {
    if (globalOpenDropdown === href) {
      globalOpenDropdown = null;
    }
    setIsOpen(false);
    setIsLocked(false);
  };

  // Hover to show + Click to lock logic
  const handleMouseEnter = useCallback(() => {
    if (!dropdown || isLocked) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    openThisDropdown(false);
  }, [dropdown, isLocked]);

  const handleMouseLeave = useCallback(() => {
    if (!dropdown || isLocked) return;
    timeoutRef.current = setTimeout(() => {
      if (!isLocked) closeThisDropdown();
    }, 150);
  }, [dropdown, isLocked]);

  const handleDropdownEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (!isLocked) closeThisDropdown();
  }, [isLocked]);

  // Click to toggle lock state
  const handleClick = (e: React.MouseEvent) => {
    if (dropdown && preventNavigation) {
      e.preventDefault();
      if (isLocked) {
        closeThisDropdown();
      } else {
        openThisDropdown(true);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        if (globalOpenDropdown === href) {
          closeThisDropdown();
        }
      }
    };

    if (isLocked) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLocked]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Club styling
  const baseClasses = special 
    ? "group relative px-4 py-3 text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2 uppercase tracking-wide border-2 border-[var(--gold)] rounded-xl bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 hover:from-[var(--gold)]/30 hover:via-[var(--gold)]/20 hover:to-[var(--gold)]/30 shadow-lg shadow-[var(--gold)]/20 hover:shadow-xl hover:shadow-[var(--gold)]/30 hover:scale-105"
    : "group relative px-4 py-3 text-sm font-bold transition-all duration-200 ease-out flex items-center gap-1 uppercase tracking-wide";
  
  const activeClasses = special 
    ? "text-[var(--gold)] border-[var(--gold)] bg-gradient-to-r from-[var(--gold)]/30 via-[var(--gold)]/20 to-[var(--gold)]/30 shadow-xl shadow-[var(--gold)]/40 scale-105"
    : "text-[var(--gold)]";
    
  const inactiveClasses = special
    ? "text-[var(--gold)]"
    : "text-white/90 hover:text-[var(--gold)]";

  return (
    <div 
      className="relative dropdown-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {preventNavigation && dropdown ? (
        <button
          onClick={handleClick}
          className={`${baseClasses} ${active ? activeClasses : inactiveClasses} ${isLocked ? 'text-[var(--gold)]' : ''}`}
          aria-expanded={dropdown ? isOpen : undefined}
        >
          {special && <FaCrown className="text-[var(--gold)]" size={14} />}
          {label}
          {dropdown && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown size={12} />
            </motion.div>
          )}
        </button>
      ) : (
        <Link
          href={href}
          className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
          aria-expanded={dropdown ? isOpen : undefined}
        >
          {special && <FaCrown className="text-[var(--gold)]" size={14} />}
          {label}
          {dropdown && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown size={12} />
            </motion.div>
          )}
        </Link>
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

      {/* Dropdown without blur overlay */}
      <AnimatePresence>
        {dropdown && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            {dropdown.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-white/90 hover:text-[var(--gold)] hover:bg-white/10 rounded-lg transition-all duration-150"
                onClick={() => closeThisDropdown()}
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

// Enhanced mobile menu (unchanged)
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
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

  const toggleExpanded = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  const handleMobileClick = (item: NavItem & { active: boolean }, e: React.MouseEvent) => {
    if (item.dropdown && item.preventNavigation) {
      e.preventDefault();
      toggleExpanded(item.href);
    } else if (!item.dropdown) {
      onClose();
    }
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-[101] lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
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

            {/* Scrollable Navigation Container */}
            <div className="flex-1 overflow-y-auto">
              <motion.nav className="flex flex-col p-6 space-y-2">
                {items.map((item) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        {item.preventNavigation && item.dropdown ? (
                          <button
                            onClick={(e) => handleMobileClick(item, e)}
                            className={`flex-1 px-4 py-4 rounded-xl text-lg font-bold transition-all duration-200 text-left ${
                              item.special 
                                ? 'text-[var(--gold)] bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 border-2 border-[var(--gold)]/60 shadow-lg shadow-[var(--gold)]/20' 
                                : item.active 
                                  ? 'text-[var(--gold)] bg-[var(--gold)]/15 border border-[var(--gold)]/50' 
                                  : 'text-white/85 hover:text-[var(--gold)] hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.special && <FaCrown className="text-[var(--gold)]" size={16} />}
                              {item.label}
                            </div>
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={(e) => handleMobileClick(item, e)}
                            className={`flex-1 px-4 py-4 rounded-xl text-lg font-bold transition-all duration-200 ${
                              item.special 
                                ? 'text-[var(--gold)] bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 border-2 border-[var(--gold)]/60 shadow-lg shadow-[var(--gold)]/20' 
                                : item.active 
                                  ? 'text-[var(--gold)] bg-[var(--gold)]/15 border border-[var(--gold)]/50' 
                                  : 'text-white/85 hover:text-[var(--gold)] hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {item.special && <FaCrown className="text-[var(--gold)]" size={16} />}
                              {item.label}
                            </div>
                          </Link>
                        )}
                        
                        {/* Dropdown toggle for items with dropdowns */}
                        {item.dropdown && (
                          <button
                            onClick={() => toggleExpanded(item.href)}
                            className="p-2 ml-2 text-white/60 hover:text-[var(--gold)] transition-colors"
                            aria-expanded={expandedItem === item.href}
                            aria-label={`Toggle ${item.label} menu`}
                          >
                            <motion.div
                              animate={{ rotate: expandedItem === item.href ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronDown size={16} />
                            </motion.div>
                          </button>
                        )}
                      </div>
                      
                      {/* Mobile dropdown items with smooth expand/collapse */}
                      <AnimatePresence>
                        {item.dropdown && expandedItem === item.href && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-2 space-y-1 pb-2">
                              {item.dropdown.map((subItem) => (
                                <motion.div
                                  key={subItem.href}
                                  initial={{ x: 20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  exit={{ x: 20, opacity: 0 }}
                                  transition={{ duration: 0.15, delay: 0.05 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    onClick={onClose}
                                    className="block px-4 py-3 text-sm text-white/60 hover:text-[var(--gold)] hover:bg-white/5 rounded-lg transition-all duration-150"
                                  >
                                    {subItem.label}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.nav>
            </div>

            {/* Footer with only social links, compact design */}
            <motion.div
              variants={itemVariants}
              className="flex-shrink-0 p-4 border-t border-white/10"
            >
              <div className="flex justify-center gap-4">
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
    <motion.nav
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
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* FIXED: Left Navigation with CORRECT ORDER */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end mr-8">
            {leftItems.map((item) => (
              <DesktopLink
                key={item.href}
                {...item}
                preventNavigation={item.preventNavigation}
              />
            ))}
          </div>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo/bgt-logo.png"
              alt="Big Talents"
              width={120}
              height={30}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Right Navigation */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 ml-8">
            {rightItems.map((item) => (
              <DesktopLink
                key={item.href}
                {...item}
                preventNavigation={item.preventNavigation}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
            aria-label="Open menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} />
    </motion.nav>
  );
}

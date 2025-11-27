/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useMotionValueEvent } from "framer-motion";
import { FiMenu, FiX, FiChevronDown, FiStar, FiInfo, FiFileText, FiMail, FiUsers } from "react-icons/fi";
import { FaDiscord, FaTwitter, FaInstagram, FaCrown } from "react-icons/fa";

type NavItem = {
  href: string;
  label: string;
  dropdown?: { 
    href: string; 
    label: string;
    icon?: any;
    description?: string;
  }[];
  special?: boolean;
  preventNavigation?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/club", label: "Club", special: true },
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { 
    href: "/rosters", 
    label: "Rosters",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/rosters/creators", 
        label: "Creators",
        icon: FiUsers,
        description: "Meet our content creators"
      }
    ]
  },
  { 
    href: "/creator-program", 
    label: "Creator Program",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/creator-program/overview", 
        label: "Overview",
        icon: FiInfo,
        description: "Learn about our creator benefits"
      },
      { 
        href: "/creator-program/apply", 
        label: "Apply Now",
        icon: FiStar,
        description: "Join the BGT family"
      }
    ]
  },
  { 
    href: "/company", 
    label: "Company",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/contact", 
        label: "Contact",
        icon: FiMail,
        description: "Get in touch with us"
      },
      { 
        href: "/positions", 
        label: "Positions",
        icon: FiInfo,
        description: "Explore open team positions"
      },
      { 
        href: "/brand-guidelines", 
        label: "Brand Guidelines",
        icon: FiFileText,
        description: "Download our brand assets"
      }
    ]
  },
  { href: "/tournaments", label: "Tournaments" }
];

const LEFT_NAV_ITEMS: NavItem[] = [
  { 
    href: "/creator-program", 
    label: "Creator Program",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/creator-program/overview", 
        label: "Overview",
        icon: FiInfo,
        description: "Learn about our creator benefits"
      },
      { 
        href: "/creator-program/apply", 
        label: "Apply Now",
        icon: FiStar,
        description: "Join the BGT family"
      }
    ]
  },
  { 
    href: "/company", 
    label: "Company",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/contact", 
        label: "Contact",
        icon: FiMail,
        description: "Get in touch with us"
      },
      { 
        href: "/positions", 
        label: "Positions",
        icon: FiInfo,
        description: "Explore open team positions"
      },
      { 
        href: "/brand-guidelines", 
        label: "Brand Guidelines",
        icon: FiFileText,
        description: "Download our brand assets"
      }
    ]
  },
  { href: "/news", label: "News" }
];

const RIGHT_NAV_ITEMS: NavItem[] = [
  { href: "/tournaments", label: "Tournaments" },
  { 
    href: "/rosters", 
    label: "Rosters",
    preventNavigation: true,
    dropdown: [
      { 
        href: "/rosters/creators", 
        label: "Creators",
        icon: FiUsers,
        description: "Meet our content creators"
      }
    ]
  },
  { href: "/club", label: "Club", special: true }
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const globalSetters: { [key: string]: (isOpen: boolean, isLocked: boolean) => void } = {};
let globalOpenDropdown: string | null = null;

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
  dropdown?: { href: string; label: string; icon?: any; description?: string }[];
  special?: boolean;
  preventNavigation?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReduced = useReducedMotion();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (dropdown) {
      globalSetters[href] = (open: boolean, locked: boolean) => {
        setIsOpen(open);
        setIsLocked(locked);
        if (!open) {
          setIsHovered(false);
        }
      };
      
      return () => {
        delete globalSetters[href];
      };
    }
  }, [href, dropdown]);

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
    setIsHovered(false);
  };

  const handleMouseEnter = useCallback(() => {
    if (!dropdown || isLocked) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
    openThisDropdown(false);
  }, [dropdown, isLocked]);

  const handleMouseLeave = useCallback(() => {
    if (!dropdown || isLocked) return;
    setIsHovered(false);
    timeoutRef.current = setTimeout(() => {
      if (!isLocked) closeThisDropdown();
    }, 150);
  }, [dropdown, isLocked]);

  const handleDropdownEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(true);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    setIsHovered(false);
    if (!isLocked) closeThisDropdown();
  }, [isLocked]);

  const handleClick = (e: React.MouseEvent) => {
    if (dropdown && preventNavigation) {
      e.preventDefault();
      if (isLocked) {
        closeThisDropdown();
      } else {
        setIsHovered(true);
        openThisDropdown(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeThisDropdown();
    if ((e.key === 'Enter' || e.key === ' ') && dropdown) {
      e.preventDefault();
      setIsHovered(true);
      openThisDropdown(true);
    }
  };

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
  }, [isLocked, href]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const baseClasses = special 
    ? "group relative px-4 py-3 text-sm font-bold transition-all duration-300 ease-out flex items-center gap-2 uppercase tracking-wide border-2 border-[var(--gold)] rounded-xl bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/10 to-[var(--gold)]/20 hover:from-[var(--gold)]/30 hover:via-[var(--gold)]/20 hover:to-[var(--gold)]/30 shadow-lg shadow-[var(--gold)]/20 hover:shadow-xl hover:shadow-[var(--gold)]/30"
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
      <motion.div
        className="relative"
        whileHover={special ? { scale: 1.05 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {!special && (
          <motion.div
            className="absolute -inset-2 bg-[var(--gold)]/20 blur-xl rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: (isHovered || isOpen) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {preventNavigation && dropdown ? (
          <button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={`relative ${baseClasses} ${active ? activeClasses : inactiveClasses} ${isLocked ? 'text-[var(--gold)]' : ''}`}
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
            onKeyDown={handleKeyDown}
            className={`relative ${baseClasses} ${active ? activeClasses : inactiveClasses}`}
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
      </motion.div>
        
      {!special && (
        <motion.div
          className="absolute left-4 -bottom-1 h-0.5 bg-[var(--gold)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: active || isOpen ? "calc(100% - 2rem)" : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <AnimatePresence>
        {dropdown && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-2 min-w-[280px] max-w-[320px] bg-black/95 backdrop-blur-2xl backdrop-saturate-150 border border-white/20 rounded-xl p-2 shadow-2xl z-[10000]"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            {dropdown.map((item, idx) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="group flex items-start gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all duration-150"
                  onClick={() => closeThisDropdown()}
                >
                  {item.icon && (
                    <item.icon className="text-[var(--gold)] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" size={18} />
                  )}
                  <div className="flex-1">
                    <div className="font-bold text-sm text-white group-hover:text-[var(--gold)] transition-colors">
                      {item.label}
                    </div>
                    {item.description && (
                      <p className="text-xs text-white/50 mt-0.5 leading-tight">{item.description}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
      }
    },
    open: {
      x: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }
    }
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10001] lg:hidden"
            onClick={onClose}
          />

          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-black/95 backdrop-blur-2xl backdrop-saturate-150 border-l border-white/10 z-[10002] lg:hidden flex flex-col shadow-2xl"
          >
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

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <nav className="flex flex-col p-6 space-y-2">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
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
                      
                      {item.dropdown && (
                        <button
                          onClick={() => toggleExpanded(item.href)}
                          className="p-2 ml-2 text-white/60 hover:text-[var(--gold)] transition-colors flex-shrink-0"
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
                            {item.dropdown.map((subItem, subIdx) => (
                              <motion.div
                                key={subItem.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIdx * 0.05 }}
                              >
                                <Link
                                  href={subItem.href}
                                  onClick={onClose}
                                  className="group flex items-start gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-all duration-150"
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="text-[var(--gold)] mt-0.5 flex-shrink-0 text-sm" />
                                  )}
                                  <div>
                                    <div className="text-sm font-medium text-white/80 group-hover:text-[var(--gold)] transition-colors">
                                      {subItem.label}
                                    </div>
                                    {subItem.description && (
                                      <p className="text-xs text-white/40 mt-0.5">{subItem.description}</p>
                                    )}
                                  </div>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="flex-shrink-0 p-4 border-t border-white/10">
              <div className="flex justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://discord.gg/bgt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Discord"
                >
                  <FaDiscord size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://x.com/bgtalents"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://instagram.com/bigtalents_org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/70 hover:text-[var(--gold)] transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </motion.a>
              </div>
            </div>
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
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
    
    if (latest > lastScrollY && latest > 100) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setLastScrollY(latest);
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

  useEffect(() => setIsOpen(false), [pathname]);

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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: isHidden ? -100 : 0,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ 
          duration: prefersReduced ? 0 : 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed top-0 left-0 right-0 z-[9997] border-b transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-2xl backdrop-saturate-150 border-white/10 shadow-2xl shadow-black/50' 
            : 'bg-transparent border-transparent'
        }`}
        style={{ overflow: 'visible' }}
      >
        <div className="container" style={{ overflow: 'visible' }}>
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end mr-8">
              {leftItems.map((item) => (
                <DesktopLink
                  key={item.href}
                  {...item}
                  preventNavigation={item.preventNavigation}
                />
              ))}
            </div>

            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/images/logo/bgt-logo.png"
                  alt="Big Talents"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center space-x-4 flex-1 ml-8">
              {rightItems.map((item) => (
                <DesktopLink
                  key={item.href}
                  {...item}
                  preventNavigation={item.preventNavigation}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} items={items} />
    </>
  );
}

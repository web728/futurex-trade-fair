
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { company } from "@/data/company";

interface NavChild {
  href: string;
  label: string;
  description: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

const navItems: NavItem[] = [
  { href: "/about", label: "About" },
  {
    href: "/exhibitions",
    label: "Exhibitions",
    children: [
      {
        href: "/exhibitions",
        label: "Exhibition Directory",
        description: "Explore global B2B trade shows",
      },
      {
        href: "/conferences",
        label: "Conferences & Summits",
        description: "Industry keynotes and expert dialogues",
      },
    ],
  },
  { href: "/industries", label: "Industries" },
  { href: "/global-presence", label: "Our Presence" },
  { href: "/services", label: "Services" },
  { href: "/participants", label: "Exhibitors" },
  {
    href: "/news",
    label: "Media",
    children: [
      {
        href: "/news",
        label: "News & Press",
        description: "Latest announcements and media coverage",
      },
      {
        href: "/gallery",
        label: "Media Gallery",
        description: "Exhibition photographs and highlights",
      },
      {
        href: "/webinars",
        label: "Virtual Webinars",
        description: "Virtual programming and broadcasts",
      },
    ],
  },
  { href: "/contact", label: "Contact" },
];

const easeEditorial: [number, number, number, number] = [
  0.16, 1, 0.3, 1,
];

const mobileNavVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.5,
      ease: easeEditorial,
      staggerChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.35,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easeEditorial,
    },
  },
};

function isNavActive(
  pathname: string,
  item: NavItem
): boolean {
  if (pathname === item.href) return true;

  if (item.href === "/news" && pathname.startsWith("/news/")) {
    return true;
  }

  return (
    item.children?.some(
      (child) =>
        pathname === child.href ||
        pathname.startsWith(child.href + "/")
    ) ?? false
  );
}

export function Header() {
  const pathname = usePathname() || "/";
  const reducedMotion = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<
    string | null
  >(null);
  const [mobileDropdown, setMobileDropdown] = useState<
    string | null
  >(null);

  const dropdownTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const lastScrollY = useRef(0);

  const whatsappNumber = "919810855697";

  const whatsappMessage = encodeURIComponent(
    "Hello Futurex Team, I am interested in exhibiting at your upcoming trade shows. Please share the stall booking details."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const logoSrc = company.assets.logo;
const companyName = company.brandName || company.legalName || "Futurex Group";


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > 90 &&
        !menuOpen
      ) {
        setVisible(false);
        setActiveDropdown(null);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }

    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: visible ? "0%" : "-100%" }}
        transition={{
          duration: 0.35,
          ease: easeEditorial,
        }}
        className={`fixed top-0 left-0 right-0 z-50 w-full select-none transition-colors duration-300 ${
          scrolled
            ? "bg-[#050608]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-gradient-to-b from-[#050608]/95 via-[#050608]/70 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Futurex Home"
            className="flex items-center shrink-0 group"
          >
            {logoSrc ? (
              <div className="relative h-10 sm:h-12 w-36 sm:w-44">
                <Image
                  src={logoSrc}
                  alt={companyName}
                  fill
                  priority
                  sizes="176px"
                  className="object-contain object-left brightness-110"
                />
              </div>
            ) : (
              <span className="text-xl font-bold tracking-tight text-white">
                FUTUREX
                <span className="text-red-500">.</span>
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.09] px-2 py-1.5 rounded-full backdrop-blur-xl"
          >
            {navItems.map((item) => {
              const isActive = isNavActive(pathname, item);
              const dropdownOpen =
                activeDropdown === item.label;

              if (item.children) {
                return (
                  <div
                    key={item.href}
                    className="relative group py-1"
                    onMouseEnter={() =>
                      handleMouseEnter(item.label)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      className={`relative inline-flex items-center gap-1 px-2.5 py-1 text-[10px] xl:text-[11px] font-mono tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      <span className="relative z-10">
                        {item.label}
                      </span>

                      <ChevronDown
                        size={11}
                        className={`relative z-10 transition-transform ${
                          dropdownOpen
                            ? "rotate-180 text-red-500"
                            : ""
                        }`}
                      />

                      {isActive && (
                        <motion.span
                          layoutId="activeHeaderPill"
                          className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 8,
                            scale: 0.97,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            y: 6,
                            scale: 0.97,
                          }}
                          transition={{
                            duration: 0.18,
                          }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50"
                        >
                          <div className="bg-[#0A0D12]/95 border border-white/10 rounded-2xl shadow-2xl p-2 backdrop-blur-2xl">
                            {item.children.map((child) => {
                              const childActive =
                                pathname === child.href ||
                                pathname.startsWith(
                                  child.href + "/"
                                );

                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() =>
                                    setActiveDropdown(null)
                                  }
                                  className={`group/item flex flex-col gap-1 px-3 py-3 rounded-xl transition-colors ${
                                    childActive
                                      ? "bg-red-600/15"
                                      : "hover:bg-white/[0.06]"
                                  }`}
                                >
                                  <span
                                    className={`flex items-center justify-between text-[11px] font-mono font-medium tracking-wider uppercase ${
                                      childActive
                                        ? "text-red-400"
                                        : "text-white group-hover/item:text-red-400"
                                    }`}
                                  >
                                    {child.label}
                                    <ChevronRight size={12} />
                                  </span>

                                  <span className="text-[10px] text-neutral-400 leading-relaxed">
                                    {child.description}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-2.5 py-1 text-[10px] xl:text-[11px] font-mono tracking-[0.08em] uppercase whitespace-nowrap transition-colors ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">
                    {item.label}
                  </span>

                  {isActive && (
                    <motion.span
                      layoutId="activeHeaderPill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all"
            >
              Exhibit With Us
              <ArrowUpRight size={13} />
            </a>

            <button
              type="button"
              onClick={() => {
                setVisible(true);
                setMenuOpen(true);
              }}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 text-white hover:text-red-500 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            exit="exit"
            variants={
              reducedMotion
                ? {
                    visible: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                  }
                : mobileNavVariants
            }
            className="fixed inset-0 z-[120] bg-[#050608] text-white flex flex-col p-6 sm:p-10 overflow-y-auto"
          >
            {/* Mobile Top Bar */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-300">
                  Futurex Directory
                </span>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-white hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 flex flex-col mt-5"
            >
              {navItems.map((item, index) => {
                const active = isNavActive(pathname, item);
                const expanded =
                  mobileDropdown === item.label;

                const number = String(index + 1).padStart(
                  2,
                  "0"
                );

                return (
                  <motion.div
                    key={item.href}
                    variants={
                      reducedMotion
                        ? undefined
                        : mobileItemVariants
                    }
                    className="border-b border-white/[0.06]"
                  >
                    {item.children ? (
                      <div className="py-2">
                        <button
                          type="button"
                          onClick={() =>
                            setMobileDropdown(
                              expanded ? null : item.label
                            )
                          }
                          aria-expanded={expanded}
                          className="w-full flex items-center justify-between py-3 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-mono text-neutral-500">
                              {number}
                            </span>

                            <span
                              className={`text-lg font-medium ${
                                active || expanded
                                  ? "text-red-500"
                                  : "text-white"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>

                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              expanded
                                ? "rotate-180 text-red-500"
                                : "text-neutral-400"
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.25,
                              }}
                              className="overflow-hidden"
                            >
                              <div className="ml-7 pl-5 py-3 border-l border-white/10 flex flex-col gap-1">
                                {item.children.map(
                                  (child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() =>
                                        setMenuOpen(false)
                                      }
                                      className={`flex items-center justify-between py-3 text-xs font-mono uppercase tracking-wider ${
                                        pathname === child.href ||
                                        pathname.startsWith(
                                          child.href + "/"
                                        )
                                          ? "text-red-400"
                                          : "text-neutral-400 hover:text-white"
                                      }`}
                                    >
                                      {child.label}
                                      <ChevronRight size={13} />
                                    </Link>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between py-4 group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-neutral-500">
                            {number}
                          </span>

                          <span
                            className={`text-lg font-medium ${
                              active
                                ? "text-red-500"
                                : "text-white"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-neutral-500 group-hover:text-red-500"
                        />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Contact Actions */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageSquare size={15} />
                  Exhibit With Us
                </a>

                <Link
                  href="/participants#visitor"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center px-5 py-3 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-wider"
                >
                  Trade Pass Accreditation
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
                <a
                  href="tel:+911140538400"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Phone size={14} className="text-red-500" />
                  +91-11-4053-8400
                </a>

                <a
                  href="mailto:admin@futurextrade.com"
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Mail size={14} className="text-red-500" />
                  admin@futurextrade.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;

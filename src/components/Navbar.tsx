"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChristLogo, ConclaveLogo, FASLogo } from "./Logos";
import { CloseIcon, MenuIcon, ChevronDownIcon } from "./icons";

type NavLink = { label: string; href: string; hash: string | null };
type NavGroup = { label: string; items: NavLink[] };
type NavEntry = NavLink | NavGroup;

function isGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}

/**
 * Grouped into a handful of top-level entries (some are dropdowns) instead
 * of one long flat row - 11 individual links read as clutter at this
 * count. Grouping is by what a visitor is trying to do, not by section
 * order on the homepage.
 */
const NAV_ENTRIES: NavEntry[] = [
  { label: "Home", href: "/", hash: "#home" },
  {
    label: "About",
    items: [
      { label: "About the Conclave", href: "/about", hash: null },
      { label: "Dates", href: "/#dates", hash: "#dates" },
      { label: "Themes", href: "/#themes", hash: "#themes" },
    ],
  },
  {
    label: "Submissions",
    items: [
      { label: "Call for Papers", href: "/#call-for-papers", hash: "#call-for-papers" },
      { label: "Submit Abstract", href: "/submit-paper", hash: null },
    ],
  },
  {
    label: "People",
    items: [
      { label: "Organisers", href: "/#organisers", hash: "#organisers" },
      { label: "List of Scholars", href: "/#scholars", hash: "#scholars" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Proceedings", href: "/proceedings", hash: null },
      { label: "Archive", href: "/archive", hash: null },
    ],
  },
  { label: "Registration", href: "/registration", hash: null },
  { label: "Contact", href: "/#contact", hash: "#contact" },
];

const ALL_LINKS: NavLink[] = NAV_ENTRIES.flatMap((entry) => (isGroup(entry) ? entry.items : entry));

function NavDropdown({
  group,
  isActive,
  onNavigate,
}: {
  group: NavGroup;
  isActive: (link: NavLink) => boolean;
  onNavigate: (link: NavLink) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const groupActive = group.items.some(isActive);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <li ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative inline-flex items-center gap-1 whitespace-nowrap px-2 py-3 text-sm font-semibold transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-brand-green-dark ${
          groupActive ? "text-brand-blue" : "text-gray-700"
        }`}
      >
        {group.label}
        <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute left-0 top-full z-20 mt-1 min-w-[13rem] rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
          {group.items.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                onClick={() => {
                  onNavigate(link);
                  setOpen(false);
                }}
                aria-current={isActive(link) ? "page" : undefined}
                className={`block whitespace-nowrap px-4 py-2 text-sm font-medium no-underline transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-brand-sand/40 hover:text-brand-green-dark ${
                  isActive(link) ? "text-brand-blue" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [activeHash, setActiveHash] = useState("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = ALL_LINKS.map((link) =>
      link.hash ? document.getElementById(link.hash.slice(1)) : null
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveHash(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const handleLinkClick = (link: NavLink) => {
    if (link.hash) setActiveHash(link.hash);
    setMenuOpen(false);
  };

  const isActive = (link: NavLink) =>
    link.hash === null ? pathname === link.href : isHome && activeHash === link.hash;

  return (
    <header
      className={`sticky inset-x-0 top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow duration-300 ease-[var(--ease-smooth)] ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <nav className="px-4">
        <div className="flex h-20 items-center justify-between gap-2 sm:h-24 sm:gap-6">
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2.5 no-underline sm:gap-3"
            aria-label="Young Scholars' Conclave — a collaboration between CHRIST (Deemed to be University) and the Foundation for Agrarian Studies"
          >
            <ChristLogo variant="color" className="h-auto w-28 shrink-0 sm:w-36" />
            <span
              className="shrink-0 text-lg font-light text-brand-gold sm:text-xl"
              aria-hidden="true"
            >
              ×
            </span>
            <FASLogo className="h-auto w-28 shrink-0 sm:w-36" />
            <span className="hidden h-8 w-px shrink-0 bg-gray-200 sm:block sm:h-10" aria-hidden="true" />
            <ConclaveLogo className="hidden shrink-0 sm:flex sm:h-11" />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_ENTRIES.map((entry) =>
              isGroup(entry) ? (
                <NavDropdown
                  key={entry.label}
                  group={entry}
                  isActive={isActive}
                  onNavigate={handleLinkClick}
                />
              ) : (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    onClick={() => handleLinkClick(entry)}
                    aria-current={isActive(entry) ? "page" : undefined}
                    className={`relative inline-flex items-center whitespace-nowrap px-2 py-3 text-sm font-semibold no-underline transition-colors duration-200 ease-[var(--ease-smooth)] after:absolute after:bottom-1 after:left-2 after:right-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-green after:transition-transform after:duration-200 after:ease-[var(--ease-smooth)] hover:text-brand-green-dark hover:after:scale-x-100 ${
                      isActive(entry) ? "text-brand-blue after:scale-x-100" : "text-gray-700"
                    }`}
                  >
                    {entry.label}
                  </Link>
                </li>
              )
            )}
          </ul>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="z-20 block cursor-pointer border-none bg-none p-2 text-gray-600 xl:hidden"
          >
            {menuOpen ? <CloseIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="absolute left-0 top-20 z-10 max-h-[calc(100vh-5rem)] w-full overflow-y-auto bg-white shadow-lg sm:top-24 xl:hidden">
          {NAV_ENTRIES.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="border-b border-gray-200">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileGroup((current) => (current === entry.label ? null : entry.label))
                  }
                  aria-expanded={openMobileGroup === entry.label}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-lg font-medium ${
                    entry.items.some(isActive) ? "text-brand-blue" : "text-gray-700"
                  }`}
                >
                  {entry.label}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openMobileGroup === entry.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileGroup === entry.label && (
                  <div className="bg-brand-sand/20 pb-2">
                    {entry.items.map((link) => (
                      <Link
                        key={link.href + link.label}
                        href={link.href}
                        onClick={() => {
                          handleLinkClick(link);
                          setOpenMobileGroup(null);
                        }}
                        aria-current={isActive(link) ? "page" : undefined}
                        className={`block px-8 py-2.5 text-base no-underline transition-colors hover:text-brand-green-dark ${
                          isActive(link) ? "font-semibold text-brand-blue" : "text-gray-600"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                onClick={() => handleLinkClick(entry)}
                aria-current={isActive(entry) ? "page" : undefined}
                className={`block border-b border-gray-200 px-4 py-3 text-lg font-medium no-underline transition-colors hover:bg-gray-50 ${
                  isActive(entry) ? "text-brand-blue" : "text-gray-700"
                }`}
              >
                {entry.label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}

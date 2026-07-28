"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChristLogo, ConclaveLogo, FASLogo } from "./Logos";
import { CloseIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { label: "Home", href: "/", hash: "#home" },
  { label: "About the Conclave", href: "/about", hash: null as string | null },
  { label: "Dates", href: "/#dates", hash: "#dates" },
  { label: "Themes", href: "/#themes", hash: "#themes" },
  { label: "Call for Papers", href: "/#call-for-papers", hash: "#call-for-papers" },
  { label: "Organisers", href: "/#organisers", hash: "#organisers" },
  { label: "List of Scholars", href: "/#scholars", hash: "#scholars" },
  { label: "Registration", href: "/registration", hash: null as string | null },
  { label: "Contact", href: "/#contact", hash: "#contact" },
  { label: "Proceedings", href: "/proceedings", hash: null as string | null },
  { label: "Archive", href: "/archive", hash: null as string | null },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
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

    const sections = NAV_LINKS.map((link) =>
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

  const handleLinkClick = (link: (typeof NAV_LINKS)[number]) => {
    if (link.hash) setActiveHash(link.hash);
    setMenuOpen(false);
  };

  const isActive = (link: (typeof NAV_LINKS)[number]) =>
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
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => handleLinkClick(link)}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center whitespace-nowrap px-2 py-3 text-sm font-semibold no-underline transition-colors duration-200 ease-[var(--ease-smooth)] after:absolute after:bottom-1 after:left-2 after:right-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-green after:transition-transform after:duration-200 after:ease-[var(--ease-smooth)] hover:text-brand-green-dark hover:after:scale-x-100 ${
                      active ? "text-brand-blue after:scale-x-100" : "text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
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
        <div className="absolute left-0 top-20 z-10 block w-full bg-white shadow-lg sm:top-24 xl:hidden">
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link)}
                aria-current={active ? "page" : undefined}
                className={`block border-b border-gray-200 px-4 py-3 text-lg font-medium no-underline transition-colors hover:bg-gray-50 ${
                  active ? "text-brand-blue" : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

import Link from "next/link";
import { ChristLogo, FASLogo } from "./Logos";
import { SectionAccent } from "./SectionAccent";

const USEFUL_LINKS = [
  { label: "CHRIST (Deemed to be University)", href: "https://christuniversity.in/", external: true },
  { label: "About the Conclave", href: "/about", external: false },
  { label: "Themes", href: "/#themes", external: false },
  { label: "Call for Papers", href: "/#call-for-papers", external: false },
  { label: "Contact", href: "/#contact", external: false },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-linear-to-br from-blue-900 to-blue-950 px-6 py-10 text-white md:px-20"
    >
      <SectionAccent variant="dark" position="top-right" />
      <div className="mx-auto mb-8 grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <ChristLogo variant="white" className="h-auto w-32 sm:w-40" />
            <span className="h-10 w-px shrink-0 bg-white/25" aria-hidden="true" />
            <FASLogo className="h-14 w-auto shrink-0 brightness-0 invert" />
          </div>
          <p className="text-justify text-sm leading-relaxed">
            Young Scholars&rsquo; Conclave 2026, jointly organised by the
            Foundation for Agrarian Studies (FAS) and CHRIST (Deemed to be
            University), Bengaluru &mdash; 1&ndash;3 December 2026
            (alt. 2&ndash;4 December).
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Useful Links</h2>
          <ul className="space-y-2 text-sm">
            {USEFUL_LINKS.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-blue-300 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-blue-300 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 border-t border-brand-gold/30 pt-4 text-xs text-gray-300 md:flex-row">
        <p>&copy; 2026 CHRIST (Deemed to be University). All Rights Reserved.</p>
        <p>Designed and Developed by Aadi R Santhosh and Amaldev M.</p>
      </div>
    </footer>
  );
}

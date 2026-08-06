import Link from "next/link";
import { ChristLogo, ConclaveLogo, FASLogo } from "./Logos";
import { SectionAccent } from "./SectionAccent";

const USEFUL_LINKS = [
  { label: "CHRIST (Deemed to be University)", href: "https://christuniversity.in/", external: true },
  { label: "Foundation for Agrarian Studies", href: "https://fas.org.in/", external: true },
  { label: "About the Conclave", href: "/about/conclave", external: false },
  { label: "Themes", href: "/#themes", external: false },
  { label: "Call for Papers", href: "/#call-for-papers", external: false },
  { label: "Submission Guidelines", href: "/submission-guidelines", external: false },
  { label: "Contact", href: "/#contact", external: false },
  { label: "Privacy Policy", href: "/privacy-policy", external: false },
  { label: "Terms of Service", href: "/terms-of-service", external: false },
];

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-linear-to-br from-blue-900 to-blue-950 px-4 py-8 text-white sm:px-6 md:px-12 lg:px-20"
    >
      <SectionAccent variant="dark" position="top-right" />
      <div className="mx-auto mb-6 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-3 sm:gap-4">
            <ChristLogo variant="white" className="h-auto w-28 sm:w-32 md:w-40" />
            <span className="h-8 w-px shrink-0 bg-white/25 sm:h-10" aria-hidden="true" />
            <FASLogo variant="white" className="h-auto w-28 shrink-0 sm:w-32 md:w-40" />
            <span className="h-8 w-px shrink-0 bg-white/25 sm:h-10" aria-hidden="true" />
            <ConclaveLogo variant="white" className="h-9 shrink-0 sm:h-11" />
          </div>
          <p className="text-justify text-sm leading-relaxed">
            Young Scholars&rsquo; Conclave 2026, jointly organised by the
            Foundation for Agrarian Studies (FAS) and CHRIST (Deemed to be
            University), Bengaluru &mdash; 2&ndash;4 December 2026.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
          <h2 className="mb-3 text-lg font-semibold">Explore the Conclave</h2>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {USEFUL_LINKS.map((link) =>
              link.external ? (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline no-underline hover:text-blue-300"
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

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 border-t border-brand-gold/30 pt-3 text-xs text-gray-300 md:flex-row">
        <p>&copy; 2026 CHRIST (Deemed to be University). All Rights Reserved.</p>
        <p>Designed and Developed by Aadi R Santhosh and Amaldev M.</p>
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";
import type { Theme } from "@/lib/themes";

type ThemeContentProps = {
  theme: Theme;
  index: number;
  pdfHref?: string;
  headingId?: string;
  closeButton?: ReactNode;
};

/**
 * Detail for a selected theme. Renders the official heading and description
 * verbatim from the themes data source. Used inside the modal dialog; the
 * optional `closeButton` sits on the heading row so it never overlaps the
 * text on small screens.
 */
export function ThemeContent({
  theme,
  index,
  pdfHref,
  headingId,
  closeButton,
}: ThemeContentProps) {
  return (
    <div className="rounded-xl border border-brand-gold/40 border-l-4 border-l-brand-gold bg-white p-6 md:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-brand-charcoal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 id={headingId} className="flex-1 text-xl font-bold leading-snug text-brand-blue md:text-2xl">
          {theme.heading}
        </h3>
        {closeButton ? <span className="shrink-0">{closeButton}</span> : null}
      </div>
      <div className="mt-5 space-y-4 md:mt-6">
        {theme.description.map((paragraph, i) => (
          <p key={i} className="text-justify text-base leading-7 text-gray-700">
            {paragraph}
          </p>
        ))}
      </div>
      {pdfHref ? (
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-brand-blue underline underline-offset-4 transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
        >
          Know more
        </a>
      ) : null}
    </div>
  );
}

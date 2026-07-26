import { THEME_PDFS } from "@/lib/conferenceDocs";
import { THEMES } from "@/lib/themes";
import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";

function ThemeCard({
  title,
  index,
  pdfHref,
  delay = 0,
}: {
  title: string;
  index: number;
  pdfHref: string;
  delay?: number;
}) {
  return (
    <div
      className="flex h-full flex-col justify-between rounded-xl border border-gray-200 border-t-4 border-t-brand-green bg-white p-6 shadow-sm transition-[transform,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-md"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-charcoal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-4 text-lg font-bold leading-snug text-brand-blue">{title}</h3>
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
      ) : (
        <span
          className="mt-6 inline-block cursor-not-allowed text-sm font-semibold text-gray-400 underline underline-offset-4"
          aria-disabled="true"
          title="The theme description PDF will be available soon"
        >
          Know more
        </span>
      )}
    </div>
  );
}

export function ThemesSection() {
  return (
    <section
      id="themes"
      className="relative overflow-hidden bg-linear-to-b from-white to-brand-sand/50 py-20 md:py-28"
    >
      <SectionAccent position="top-left" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Eyebrow className="text-center">Themes</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Our Themes
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
          data-aos="fade-up"
        >
          Tentative thematic areas for the Young Scholars&rsquo; Conclave 2026.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {THEMES.map((theme, index) => (
            <div
              key={theme.title}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ThemeCard
                title={theme.title}
                index={index}
                pdfHref={THEME_PDFS[theme.title] ?? ""}
                delay={index * 80}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

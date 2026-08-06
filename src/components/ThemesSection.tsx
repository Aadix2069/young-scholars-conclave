import { THEME_PDFS } from "@/lib/conferenceDocs";
import { THEMES, THEMES_INTRO } from "@/lib/themes";
import { SectionAccent } from "./SectionAccent";
import { ThemeAccordion } from "./themes/ThemeAccordion";

export function ThemesSection() {
  return (
    <section
      id="themes"
      className="relative overflow-hidden bg-linear-to-b from-white to-brand-sand/50 py-20 md:py-28"
    >
      <SectionAccent position="top-left" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Our Themes
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p
          className="mx-auto mt-5 max-w-3xl text-center text-base font-medium leading-7 text-brand-charcoal/80 sm:text-lg"
          data-aos="fade-up"
        >
          A preview of the thematic areas for the Young Scholars&rsquo; Conclave 2026
        </p>

        <div
          className="mx-auto mt-12 max-w-2xl text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <p className="text-base leading-7 text-gray-700 md:text-lg">{THEMES_INTRO.lead}</p>
          <p className="mt-3 text-sm text-gray-500">
            
          </p>
        </div>

        <ThemeAccordion themes={THEMES} pdfByTitle={THEME_PDFS} />

        <div
          className="mx-auto mt-12 max-w-4xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="rounded-2xl border border-brand-sand bg-[linear-gradient(135deg,rgba(241,233,216,0.45),rgba(255,255,255,0.95))] p-6 shadow-[0_10px_30px_rgba(35,74,165,0.08)] ring-1 ring-brand-sand/70 sm:p-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-gold" aria-hidden="true" />
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
                Note
              </span>
            </div>
            <p className="text-justify text-base leading-8 text-gray-700 md:text-lg">
              {THEMES_INTRO.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

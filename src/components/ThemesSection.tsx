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
          className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
          data-aos="fade-up"
        >
          Tentative thematic areas for the Young Scholars&rsquo; Conclave 2026.
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
          className="mx-auto mt-12 max-w-3xl"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <p className="rounded-xl border-l-4 border-brand-gold bg-white/70 px-6 py-5 text-justify text-base leading-7 text-gray-700">
            {THEMES_INTRO.closing}
          </p>
        </div>
      </div>
    </section>
  );
}

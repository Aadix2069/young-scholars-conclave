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

        <div className="mx-auto mt-12 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          <p className="text-justify text-base leading-7 text-gray-700">{THEMES_INTRO.lead}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-brand-gold">
            {THEMES_INTRO.items.map((item) => (
              <li key={item} className="text-justify text-base leading-7 text-gray-700">
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-justify text-base leading-7 text-gray-700">
            {THEMES_INTRO.closing}
          </p>
        </div>

        <ThemeAccordion themes={THEMES} pdfByTitle={THEME_PDFS} />
      </div>
    </section>
  );
}

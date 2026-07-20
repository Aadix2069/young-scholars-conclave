import { CheckBadgeIcon, DocumentIcon, SparklesIcon } from "./icons";
import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";

const MILESTONES = [
  {
    date: "20 September 2026",
    label: "Communication of Acceptance",
    Icon: CheckBadgeIcon,
  },
  {
    date: "10 November 2026",
    label: "Submission of Full Papers",
    Icon: DocumentIcon,
  },
  {
    date: "1–3 Dec 2026 (alt. 2–4 Dec)",
    label: "Conclave Dates",
    Icon: SparklesIcon,
  },
];

export function DatesTimeline() {
  return (
    <section id="dates" className="relative overflow-hidden bg-gray-50 py-16 md:py-24">
      <SectionAccent position="top-right" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Eyebrow className="text-center">Dates</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Important Dates
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
          data-aos="fade-up"
        >
          Key dates for the Young Scholars&rsquo; Conclave 2026.
        </p>

        <div className="relative mt-14 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
          <div
            className="absolute left-8 top-8 bottom-8 w-0.5 bg-brand-blue/20 md:left-0 md:right-0 md:top-8 md:bottom-auto md:h-0.5 md:w-auto"
            aria-hidden="true"
          />

          {MILESTONES.map(({ date, label, Icon }, index) => (
            <div
              key={label}
              className="relative flex items-start gap-4 md:w-1/3 md:flex-col md:items-center md:text-center md:gap-0"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-md ring-4 ring-brand-gold/10 transition-transform duration-200 ease-[var(--ease-smooth)] hover:scale-105">
                <Icon className="h-7 w-7" />
              </div>
              <div className="md:mt-4">
                <p className="text-sm font-semibold text-gray-500">{date}</p>
                <p className="mt-1 max-w-[11rem] font-medium text-gray-700 md:mx-auto">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

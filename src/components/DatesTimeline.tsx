import { CalendarIcon, CheckBadgeIcon, DocumentIcon, MegaphoneIcon, SparklesIcon } from "./icons";
import { SectionAccent } from "./SectionAccent";
import { FULL_PAPER_SUBMISSION_ENABLED } from "@/lib/featureFlags";

/**
 * Conclave milestones in chronological order.
 *
 * `date: null` renders an explicit "To be announced" state.
 */
const MILESTONES: { date: string | null; label: string; Icon: typeof CheckBadgeIcon }[] = [
  {
    date: "05 August 2026",
    label: "Call for Applications",
    Icon: MegaphoneIcon,
  },
  {
    date: "01 September 2026",
    label: "Last Date to Submit Abstract",
    Icon: CalendarIcon,
  },
  {
    date: "30 September 2026",
    label: "Communication of Acceptance",
    Icon: CheckBadgeIcon,
  },
  {
    date: "10 November 2026",
    label: "Submission of Full Papers",
    Icon: DocumentIcon,
  },
  {
    date: "2–4 Dec 2026",
    label: "Conclave Dates",
    Icon: SparklesIcon,
  },
];

const VISIBLE_MILESTONES = FULL_PAPER_SUBMISSION_ENABLED
  ? MILESTONES
  : MILESTONES.filter((m) => m.label !== "Submission of Full Papers");

export function DatesTimeline() {
  return (
    <section id="dates" className="relative overflow-hidden bg-brand-sand/30 py-16 md:py-24">
      <SectionAccent position="top-right" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Important Dates
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
          data-aos="fade-up"
        >
          Key dates for the Young Scholars&rsquo; Conclave 2026.
        </p>

        <div className="relative mt-14 flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-3">
          <div
            className="absolute left-8 top-8 bottom-8 w-0.5 bg-brand-blue/20 md:left-0 md:right-0 md:top-8 md:bottom-auto md:h-0.5 md:w-auto"
            aria-hidden="true"
          />

          {VISIBLE_MILESTONES.map(({ date, label, Icon }, index) => (
            <div
              key={label}
              className={`relative flex items-start gap-4 md:flex-col md:items-center md:text-center md:gap-0 ${
                VISIBLE_MILESTONES.length === MILESTONES.length ? "md:w-1/5" : "md:w-1/4"
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-md ring-4 ring-brand-gold/10 transition-transform duration-200 ease-[var(--ease-smooth)] hover:scale-105">
                <Icon className="h-7 w-7" />
              </div>
              <div className="md:mt-4">
                <p
                  className={
                    date
                      ? "text-sm font-semibold text-gray-500"
                      : "text-sm font-semibold italic text-gray-400"
                  }
                >
                  {date ?? "To be announced"}
                </p>
                <p className="mt-1 max-w-[9rem] font-medium text-gray-700 md:mx-auto">
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

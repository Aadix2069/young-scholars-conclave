import Link from "next/link";
import { SectionAccent } from "./SectionAccent";
import { StyledList } from "./StyledList";

const ELIGIBILITY = [
  "PhD candidates enrolled in recognised universities in India or abroad.",
  "Master’s students with 4–5 years of research experience and at least one publication in a peer-reviewed journal, who intend to register for a PhD programme.",
];

export function CallForPapersSection() {
  return (
    <section
      id="call-for-papers"
      className="relative overflow-hidden bg-linear-to-br from-blue-900 to-blue-950 py-16 md:py-20"
    >
      <SectionAccent variant="dark" position="bottom-left" />
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10" data-aos="fade-up">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Call for Papers
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">
          Applications are invited from young scholars working in the
          fields of agrarian studies, rural development, and allied
          disciplines to participate in the Young Scholars&rsquo; Conclave
          2026.
        </p>
        <StyledList
          items={ELIGIBILITY}
          variant="dark"
          className="mx-auto mt-4 max-w-xl text-left"
        />

        <dl className="mx-auto mt-8 grid max-w-md grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="rounded-lg border border-white/20 bg-white/5 px-5 py-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-amber-300">
              Communication of Acceptance
            </dt>
            <dd className="mt-1 text-base font-semibold text-white">
              30 September 2026
            </dd>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/5 px-5 py-4">
            <dt className="text-xs font-bold uppercase tracking-wide text-amber-300">
              Full Papers Due
            </dt>
            <dd className="mt-1 text-base font-semibold text-white">
               10 November 2026
            </dd>
          </div>
        </dl>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/submit-abstract"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-900 no-underline transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Submit Abstract
          </Link>
          <Link
            href="/submission-guidelines"
            className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3 text-sm font-semibold text-white transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            Submission Guidelines
          </Link>
        </div>
      </div>
    </section>
  );
}

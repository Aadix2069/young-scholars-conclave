import type { ReactNode } from "react";
import Link from "next/link";
import { StyledList } from "../StyledList";
import { FULL_PAPER_SUBMISSION_ENABLED } from "@/lib/featureFlags";

const ABSTRACT_DETAILS = [
  "Title of the paper",
  "Name(s) and institutional affiliation(s) of the author",
  "The thematic area under which the paper is submitted",
];

const REVIEW_PROCESS = [
  "All submissions will undergo a rigorous review process by an academic committee.",
  FULL_PAPER_SUBMISSION_ENABLED
    ? "Authors of selected abstracts will be invited to submit full papers and present their work during the conclave."
    : "Authors of selected abstracts will be invited to present their work during the conclave.",
];

const FULL_PAPER_GUIDELINES = [
  "Length: 6,000\u20138,000 words",
  "Submission deadline: 10 November 2026",
  "Selected papers will be presented in thematic sessions during the conclave.",
];
const REGISTRATION_DETAILS = [
  "Registration fee: Rs. 3,000 per participant.",
  "The registration fee covers participation in all academic sessions, conference materials, and refreshments during the conclave.",
  "Shared accommodation will be available for participants at Rs. 500 per person per day.",
  "A limited number of registration fee waivers will be available for scholars who require financial assistance.",
  "Applicants seeking a fee waiver must submit a separate application along with a brief justification.",
  "Details regarding the application process and deadlines for fee waivers will be communicated to shortlisted participants.",
];
const IMPORTANT_DATES = [
  { activity: "Last date for abstract submission", date: "August 31, 2026" },
  { activity: "Communication of acceptance", date: "September 30, 2026" },
  ...(FULL_PAPER_SUBMISSION_ENABLED
    ? [{ activity: "Deadline for submission of full papers", date: "November 10, 2026" }]
    : []),
  { activity: "Young Scholars\u2019 Conclave", date: "December 2\u20134, 2026" },
];

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div data-aos="fade-up">
      <h3 className="text-2xl font-semibold text-brand-blue">{children}</h3>
      <div className="mt-2 h-1 w-10 rounded-full bg-brand-green" aria-hidden="true" />
    </div>
  );
}

export function SubmissionGuidelines() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <section className="space-y-6" data-aos="fade-up">
        <SectionHeading>Guidelines for Abstract Submission</SectionHeading>
        <p className="text-justify text-base leading-7 text-gray-700">
          Authors are invited to submit an extended abstract of approximately
          500 words. Applicants are required to submit a short CV along with
          their abstract.
        </p>
        <p className="text-justify text-base leading-7 text-gray-700">
          The abstract should clearly include:
        </p>
        <StyledList items={ABSTRACT_DETAILS} className="mt-2" />
        <p className="text-justify text-base leading-7 text-gray-700">
          Authors should indicate the relevant thematic area in both the
          abstract and the email subject line.
        </p>
      </section>

      <section className="space-y-6" data-aos="fade-up">
        <SectionHeading>Important Dates</SectionHeading>
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6 sm:py-4 sm:text-sm"
                >
                  Activity
                </th>
                <th
                  scope="col"
                  className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6 sm:py-4 sm:text-sm"
                >
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {IMPORTANT_DATES.map(({ activity, date }) => (
                <tr
                  key={activity}
                  className="transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-blue-50"
                >
                  <td className="px-3 py-3 text-sm font-medium text-gray-900 sm:px-6 sm:py-4 sm:text-base">
                    {activity}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 sm:whitespace-nowrap sm:px-6 sm:py-4 sm:text-base">
                    {date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6" data-aos="fade-up">
        <SectionHeading>Review Process</SectionHeading>
        <StyledList items={REVIEW_PROCESS} className="mt-2" />
      </section>

      {FULL_PAPER_SUBMISSION_ENABLED && (
        <section className="space-y-6" data-aos="fade-up">
          <SectionHeading>Full Paper Submission</SectionHeading>
          <p className="text-justify text-base leading-7 text-gray-700">
            Authors whose abstracts are accepted will be invited to submit a
            full paper.
          </p>
          <div>
            <p className="font-semibold text-brand-blue">Guidelines</p>
            <StyledList items={FULL_PAPER_GUIDELINES} className="mt-2" />
          </div>
        </section>
      )}

      <section className="space-y-6" data-aos="fade-up">
        <SectionHeading>Registration and Accommodation</SectionHeading>
        <StyledList items={REGISTRATION_DETAILS} className="mt-2" />
      </section>

      <div
        className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
        data-aos="fade-up"
      >
        <Link
          href="/submit-abstract"
          className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white no-underline transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-blue-800"
        >
          Submit Abstract
        </Link>
        {FULL_PAPER_SUBMISSION_ENABLED && (
          <Link
            href="/submit-paper"
            className="inline-flex items-center justify-center rounded-full border-2 border-brand-blue px-8 py-3 text-sm font-semibold text-brand-blue no-underline transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-brand-blue/5"
          >
            Submit Full Paper
          </Link>
        )}
      </div>
    </div>
  );
}

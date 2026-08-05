import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { SubmissionGuidelines } from "@/components/submissions/SubmissionGuidelines";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Submission Guidelines | Young Scholars' Conclave 2026",
  description:
    "Guidelines for abstract and full paper submission for the Young Scholars' Conclave 2026 at CHRIST (Deemed to be University), Bengaluru.",
};

export default function SubmissionGuidelinesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-brand-sand/20 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <h1
            className="mb-3 text-center text-4xl font-extrabold tracking-tight text-brand-blue md:text-5xl"
            data-aos="fade-up"
          >
            Submission Guidelines
          </h1>
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
          <p
            className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            Guidelines for abstract submission, important dates, the review
            process, and full paper submission for the Young Scholars&rsquo;
            Conclave 2026.
          </p>
          <SubmissionGuidelines />
        </div>
      </main>
      <Footer />
    </div>
  );
}

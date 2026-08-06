import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Young Scholars' Conclave 2026",
  description: "Terms of Service for the Young Scholars' Conclave 2026 website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-[linear-gradient(180deg,#faf9f5_0%,#f7f2e8_100%)]">
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-brand-sand bg-white/80 p-8 shadow-sm sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
              Terms of Service
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-brand-blue sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-base leading-8 text-gray-700">
              Effective Date: August 2026
            </p>

            <div className="mt-8 space-y-6 text-base leading-8 text-gray-700">
              <p>
                By accessing or using the Young Scholars Conclave website, you agree to these Terms of Service.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">1. Eligibility</h2>
              <p>
                Users must provide accurate registration information. You are responsible for maintaining the confidentiality of your account credentials.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">2. User Responsibilities</h2>
              <p>
                Users agree not to submit false information, upload malicious software, attempt unauthorized access, harass other participants, violate intellectual property rights, or disrupt the platform.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">3. Research Submissions</h2>
              <p>
                By submitting an abstract or paper, you confirm that the work is your own, you have permission to submit it, it does not infringe another person’s copyright, and the conference may review it for evaluation purposes. Authors retain ownership of their work unless otherwise specified.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">4. Account Suspension</h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">5. Intellectual Property</h2>
              <p>
                All website content, logos, branding, and graphics belong to Young Scholars Conclave or their respective owners. Users may not copy or redistribute website materials without permission.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">6. Disclaimer</h2>
              <p>
                The website is provided on an “as is” and “as available” basis. We do not guarantee uninterrupted availability or error-free operation.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">7. Limitation of Liability</h2>
              <p>
                Young Scholars Conclave shall not be liable for indirect, incidental, or consequential damages arising from use of the website.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">8. Changes</h2>
              <p>
                These Terms may be updated periodically. Continued use of the website constitutes acceptance of the updated Terms.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">9. Governing Law</h2>
              <p>
                These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the competent courts in India.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">10. Contact</h2>
              <p>
                For questions regarding these Terms, please contact us through the official conference contact channel. Email: To be confirmed.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

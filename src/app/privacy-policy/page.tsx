import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Young Scholars' Conclave 2026",
  description: "Privacy Policy for the Young Scholars' Conclave 2026 website.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 bg-[linear-gradient(180deg,#faf9f5_0%,#f7f2e8_100%)]">
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10">
          <div className="rounded-3xl border border-brand-sand bg-white/80 p-8 shadow-sm sm:p-10 lg:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
              Privacy Policy
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-brand-blue sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-base leading-8 text-gray-700">
              Effective Date: August 2026
            </p>

            <div className="mt-8 space-y-6 text-base leading-8 text-gray-700">
              <p>
                Welcome to Young Scholars Conclave. Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your information when you use the Young Scholars Conclave website and related services.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">1. Information We Collect</h2>
              <p>
                When you register or use our platform, we may collect information including your full name, email address, phone number, educational institution, department, country and state, academic information, login credentials, research abstracts or papers, profile information, event registrations, IP address, browser information, and device information.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">2. How We Collect Information</h2>
              <p>
                Information may be collected when you create an account, register for the conference, submit an abstract, upload documents, contact us, subscribe to updates, or browse our website.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">3. Why We Collect Information</h2>
              <p>
                We use your information to manage registrations, authenticate your account, review submitted abstracts, contact participants, generate certificates, improve our website, respond to support requests, prevent fraud or abuse, and comply with legal obligations.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">4. Data Security</h2>
              <p>
                We implement reasonable administrative, technical, and organizational measures to protect your information against unauthorized access, loss, misuse, or disclosure. However, no method of internet transmission is completely secure.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">5. Data Sharing</h2>
              <p>
                We do not sell your personal information. Information may only be shared with conference organizers, review committee members, technical service providers, and legal authorities when required by law.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">6. Your Rights</h2>
              <p>
                You may request to access your information, correct inaccurate information, delete your account, or withdraw consent where applicable. Requests may be submitted through our contact channel.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">7. Cookies</h2>
              <p>
                We may use cookies to maintain login sessions, improve website performance, remember preferences, and analyze website usage.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">8. Data Retention</h2>
              <p>
                Information is retained only for as long as necessary to administer the conference, comply with legal obligations, and maintain academic records where appropriate.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">9. Changes</h2>
              <p>
                We may update this Privacy Policy periodically. Changes become effective once published on this page.
              </p>

              <h2 className="text-xl font-semibold text-brand-blue">10. Contact</h2>
              <p>
                For privacy-related questions, please contact us through the official conference contact channel. Email: To be confirmed.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
// import { RegistrationFees } from "@/components/registration/RegistrationFees";
// import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Registration | Young Scholars' Conclave 2026",
  description:
    "Register for the Young Scholars' Conclave 2026 at CHRIST (Deemed to be University), Bengaluru. Fee amounts to be confirmed.",
};

export default function RegistrationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* <RegistrationFees />
        <div className="container mx-auto px-4 pb-16 md:px-8 md:pb-24 lg:px-12">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-brand-blue sm:text-3xl">
            Register Now
          </h2>
          <RegistrationForm />
        </div> */}
      </main>
      <Footer />
    </div>
  );
}

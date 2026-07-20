import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { RegistrationFees } from "@/components/registration/RegistrationFees";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Registration | Young Scholars' Conclave 2026",
  description:
    "Registration fees and delegate information for the Young Scholars' Conclave 2026 at CHRIST (Deemed to be University), Bengaluru. Fee amounts to be confirmed.",
};

export default function RegistrationPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <RegistrationFees />
      </main>
      <Footer />
    </div>
  );
}

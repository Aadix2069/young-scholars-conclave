import Link from "next/link";
import { SectionAccent } from "./SectionAccent";

export function AboutConclave() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-linear-to-b from-white to-brand-sand/50 py-20 md:py-28"
    >
      <SectionAccent position="top-right" />
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h2
          className="text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          About the Conclave
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p
          className="mt-8 text-justify text-base leading-8 text-gray-700"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Jointly organised by the Foundation for Agrarian Studies (FAS) and
          CHRIST (Deemed to be University), the Young Scholars&rsquo;
          Conclave strives to be a platform for young researchers to
          present their work, engage with senior scholars and subject
          experts, and build enduring academic networks.
        </p>
        <Link
          href="/about/conclave"
          className="mt-6 inline-block text-base font-semibold text-brand-blue underline underline-offset-4 transition-colors duration-200 ease-[var(--ease-smooth)] hover:text-gray-700"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          More details.
        </Link>
      </div>
    </section>
  );
}

import { THEMES } from "@/lib/themes";

const AIMS = [
  "Create a platform for young scholars from across the world working on rural development in the Global South.",
  "Provide young scholars with an opportunity to present their work and receive feedback from their peers to help shape their research.",
  "Facilitate interaction between young scholars and senior scholars working on different aspects of rural India and agrarian studies.",
  "Curate special lectures by experts in the field.",
  "Facilitate a discussion on databases relevant to agrarian studies and rural development.",
  "Foster building long-term academic networks and collaborations among emerging researchers.",
];

export function ConclaveOverview() {
  return (
    <section className="mx-auto mb-20 max-w-5xl px-4 py-16 sm:px-6 lg:px-12">
      <h2
        className="mb-3 text-center text-5xl font-extrabold text-brand-blue"
        data-aos="fade-up"
      >
        Young Scholars' Conclave
      </h2>
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />

      <div className="mx-auto mt-8 max-w-3xl space-y-6" data-aos="fade-up" data-aos-delay="100">
        <p className="text-justify text-base leading-8 text-gray-700">
          The Young Scholars&rsquo; Conclave is a joint initiative of the
          Foundation for Agrarian Studies (FAS), an independent research
          organisation committed to multidisciplinary theoretical and
          empirical inquiry in agrarian studies, and CHRIST (Deemed to be
          University), Bengaluru.
        </p>
        <p className="text-justify text-base leading-8 text-gray-700">
          Drawing on FAS&rsquo;s long-standing engagement with young
          scholars, the conclave seeks to create a platform for emerging
          researchers from India and across the world working on agrarian
          studies and rural development, particularly in the Global South.
          The initiative aims to encourage the exchange of academic
          knowledge, strengthen research, and foster collaboration between
          young scholars and leading experts in the field.
        </p>
        <p className="text-justify text-base leading-8 text-gray-700">
          The inaugural Young Scholars&rsquo; Conclave will be held at
          CHRIST (Deemed to be University), Bangalore, Yeshwanthpur Campus,
          from 2&ndash;4 December 2026.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl" data-aos="fade-up" data-aos-delay="150">
        <h3 className="text-2xl font-semibold text-gray-800">The conclave aims to:</h3>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-gray-700">
          {AIMS.map((aim) => (
            <li key={aim}>{aim}</li>
          ))}
        </ul>
      </div>

      <p
        className="mx-auto mt-10 max-w-3xl text-justify text-base leading-8 text-gray-700"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Barbara Harriss-White, Emeritus Professor of Development Studies,
        University of Oxford, is the Academic Convenor of this conclave.
      </p>

      <div className="mx-auto mt-10 max-w-3xl" data-aos="fade-up" data-aos-delay="250">
        <p className="text-justify text-base leading-8 text-gray-700">
          The conclave will feature research presentations and discussions
          organised around the following broad thematic areas:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-gray-700">
          {THEMES.map((theme) => (
            <li key={theme.title}>{theme.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

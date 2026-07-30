import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";

/**
 * Photographs are supplied by the organising committee. Drop the image into
 * public/people/ and set `photo` to its path (e.g. "/people/jane-doe.jpg").
 * An empty string shows a branded initials circle instead.
 *
 * Both lists are intentionally empty for now (per client request, names
 * to be announced later) - each section shows a "will be updated soon"
 * message instead while empty.
 */
const EXPERTS: { name: string; affiliation: string; photo: string }[] = [];

const SENIOR_SCHOLARS: { name: string; affiliation: string; photo: string }[] = [];

function PersonList({
  people,
}: {
  people: { name: string; affiliation: string; photo: string }[];
}) {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
      {people.map((person, index) => (
        <li
          key={person.name}
          className="flex items-start gap-4 border-b-2 border-brand-gold/20 pb-4"
          data-aos="fade-up"
          data-aos-delay={(index % 4) * 60}
        >
          <PersonAvatar name={person.name} photo={person.photo} className="h-14 w-14" />
          <div>
            <p className="text-lg font-bold text-brand-blue">{person.name}</p>
            <p className="mt-1 text-sm text-gray-500">{person.affiliation}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function OrganisersSection() {
  return (
    <section id="organisers" className="relative overflow-hidden bg-white py-20 md:py-28">
      <SectionAccent position="top-right" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Organisers
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
        <p
          className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
          data-aos="fade-up"
        >
          Jointly organised by the Foundation for Agrarian Studies (FAS) and
          CHRIST (Deemed to be University).
        </p>

        <div
          className="mx-auto mt-12 flex max-w-2xl flex-col items-center rounded-xl border border-brand-gold/40 bg-brand-sand/40 px-6 py-8 text-center"
          data-aos="fade-up"
          data-aos-delay="60"
        >
          <PersonAvatar name="Barbara Harriss-White" photo="" className="h-24 w-24" />
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-brand-blue/70">
            Academic Convenor
          </p>
          <p className="mt-2 text-xl font-bold text-brand-blue">Barbara Harriss-White</p>
          <p className="mt-1 text-sm text-gray-600">
            Emeritus Professor of Development Studies, University of Oxford
            (Wolfson College)
          </p>
        </div>

        <div className="mt-16">
          <h3
            className="text-center text-2xl font-extrabold text-brand-blue sm:text-3xl"
            data-aos="fade-up"
          >
            Experts
          </h3>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            Leading experts from across the world will deliberate on critical
            issues pertaining to the agrarian question and rural development.
          </p>
          {EXPERTS.length === 0 ? (
            <p
              className="mx-auto mt-8 max-w-xl rounded-xl border border-dashed border-brand-gold/40 bg-brand-green/5 px-6 py-8 text-center text-base text-gray-600"
              data-aos="fade-up"
            >
              The list of experts will be updated soon.
            </p>
          ) : (
            <PersonList people={EXPERTS} />
          )}
        </div>

        <div className="mt-16">
          <h3
            className="text-center text-2xl font-extrabold text-brand-blue sm:text-3xl"
            data-aos="fade-up"
          >
            Senior Scholars
          </h3>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            The Conclave will feature senior scholars from universities and
            research institutions across the world to engage with and mentor
            young scholars on diverse aspects of agrarian studies and the
            rural economy.
          </p>
          {SENIOR_SCHOLARS.length === 0 ? (
            <p
              className="mx-auto mt-8 max-w-xl rounded-xl border border-dashed border-brand-gold/40 bg-brand-green/5 px-6 py-8 text-center text-base text-gray-600"
              data-aos="fade-up"
            >
              The list of senior scholars will be updated soon.
            </p>
          ) : (
            <PersonList people={SENIOR_SCHOLARS} />
          )}
        </div>
      </div>
    </section>
  );
}

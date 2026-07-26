import { Eyebrow } from "./Eyebrow";
import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";

/**
 * Photographs are supplied by the organising committee. Drop the image into
 * public/people/ and set `photo` to its path (e.g. "/people/jane-doe.jpg").
 * An empty string shows a branded initials circle instead.
 */
const EXPERTS = [
  { name: "Jayan Jose Thomas", affiliation: "Indian Institute of Technology, Delhi", photo: "" },
  { name: "Jayaraman T", affiliation: "National Institute of Advanced Study, Bengaluru", photo: "" },
  { name: "Jens Lerche", affiliation: "School of Oriental and Asian Studies, UK", photo: "" },
  { name: "John Harris", affiliation: "Simon Fraser University, Canada", photo: "" },
  { name: "Judith Heyer", affiliation: "University of Oxford, UK", photo: "" },
  { name: "Madhura Swaminathan", affiliation: "Indian Statistical Institute, Bengaluru", photo: "" },
  { name: "P. C. Mohanan", affiliation: "Former Chairperson, Kerala State Statistical Commission", photo: "" },
  { name: "R. Ramkumar", affiliation: "Tata Institute of Social Sciences, Mumbai", photo: "" },
  { name: "Surjit Vikraman", affiliation: "National Institute of Rural Development, Hyderabad", photo: "" },
  { name: "Tejal Kanitkar", affiliation: "Indira Gandhi Institute of Development Research, Mumbai", photo: "" },
  { name: "V. K. Ramachandran", affiliation: "Former Professor, Indian Statistical Institute, Bengaluru", photo: "" },
  { name: "Venkatesh Athreya", affiliation: "Former Professor, Bharathidasan University, Tiruchirappalli", photo: "" },
  { name: "Yoshifumi Usami", affiliation: "Osaka Prefecture University, Japan", photo: "" },
];

const SENIOR_SCHOLARS = [
  { name: "Anirban Kundu", affiliation: "CHRIST University, Bengaluru", photo: "" },
  { name: "Aravindan Nagarajan", affiliation: "Azim Premji University, Bengaluru", photo: "" },
  { name: "Arindam Das", affiliation: "Foundation for Agrarian Studies, Bengaluru", photo: "" },
  { name: "Bheemeshwar Reddy", affiliation: "Birla Institute of Technology and Science, Hyderabad", photo: "" },
  { name: "Bineetha P. Bose", affiliation: "CHRIST University, Bengaluru", photo: "" },
  { name: "Deepak Johnson", affiliation: "CHRIST University, Bengaluru", photo: "" },
  { name: "Harshan T. P.", affiliation: "Foundation for Agrarian Studies, Bengaluru", photo: "" },
  { name: "Jayesh M. P.", affiliation: "CHRIST University, Bengaluru", photo: "" },
  { name: "Mihika Chatterjee", affiliation: "University of Bath, UK", photo: "" },
  { name: "Niladri Sekhar Dhar", affiliation: "Bihar Institute of Public Finance and Policy, Patna", photo: "" },
  { name: "Niyati Singaraju", affiliation: "International Rice Research Institute, Hyderabad", photo: "" },
  { name: "Ranjini Basu", affiliation: "RV University, Bengaluru", photo: "" },
  { name: "Sandipan Baksi", affiliation: "Foundation for Agrarian Studies, Bengaluru", photo: "" },
  { name: "Soundarya Iyer", affiliation: "RV University, Bengaluru", photo: "" },
  { name: "Tapas Modak Singh", affiliation: "Foundation for Agrarian Studies, Bengaluru", photo: "" },
  { name: "Vineeth M.", affiliation: "CHRIST University, Bengaluru", photo: "" },
];

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
        <Eyebrow className="text-center">Committee</Eyebrow>
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Organisers
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
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
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
          <p
            className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            Pool of experts under consideration &mdash; a final panel of five
            will be confirmed.
          </p>
          <PersonList people={EXPERTS} />
        </div>

        <div className="mt-16">
          <h3
            className="text-center text-2xl font-extrabold text-brand-blue sm:text-3xl"
            data-aos="fade-up"
          >
            Senior Scholars
          </h3>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-gold" aria-hidden="true" />
          <p
            className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500"
            data-aos="fade-up"
          >
            Pool of senior scholars under consideration &mdash; a final panel
            of eight (four per session) will be confirmed.
          </p>
          <PersonList people={SENIOR_SCHOLARS} />
        </div>
      </div>
    </section>
  );
}

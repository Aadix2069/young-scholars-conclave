import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";

/**
 * Guests of Honour for the Conclave. The organising committee supplies
 * these names and official photographs — add entries here and drop the
 * images into public/people/. While the list is empty the section renders
 * an explicit "to be announced" state rather than placeholder people.
 */
const GUESTS_OF_HONOUR: { name: string; role: string; affiliation: string; photo: string }[] = [
  // { name: "", role: "Guest of Honour", affiliation: "", photo: "/people/guest.jpg" },
];

export function ChiefGuestsSection() {
  return (
    <section id="chief-guests" className="relative overflow-hidden bg-white py-20 md:py-28">
      <SectionAccent position="top-left" />
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Guests of Honour
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />

        {GUESTS_OF_HONOUR.length === 0 ? (
          <p
            className="mx-auto mt-10 max-w-xl rounded-xl border border-dashed border-brand-gold/40 bg-brand-green/5 px-6 py-10 text-center text-base text-gray-600"
            data-aos="fade-up"
          >
            Guests of Honour for the Young Scholars&rsquo; Conclave 2026 will be
            announced by the organising committee.
          </p>
        ) : (
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            {GUESTS_OF_HONOUR.map((guest, index) => (
              <article
                key={guest.name}
                className="flex w-full max-w-xs flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-[transform,box-shadow] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-md"
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >
                <PersonAvatar name={guest.name} photo={guest.photo} className="h-28 w-28" />
                <h3 className="mt-4 text-lg font-bold text-brand-blue">{guest.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-brand-gold">
                  {guest.role}
                </p>
                <p className="mt-2 text-sm text-gray-500">{guest.affiliation}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

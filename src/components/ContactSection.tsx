import { SectionAccent } from "./SectionAccent";
import { PersonAvatar } from "./PersonAvatar";
import { MailIcon, MapPinIcon } from "./icons";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-linear-to-b from-brand-sand/50 to-white py-20 md:py-28"
    >
      <SectionAccent position="bottom-left" />
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <h2
          className="text-center text-3xl font-extrabold text-brand-blue sm:text-4xl"
          data-aos="fade-up"
        >
          Contact Us
        </h2>
        <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div
            className="rounded-xl border border-gray-200 border-t-4 border-t-brand-gold bg-white p-8 shadow-sm"
            data-aos="fade-up"
          >
            <h3 className="text-lg font-bold text-brand-blue">Conclave Venue</h3>
            <p className="mt-4 flex gap-3 text-base text-gray-700">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span>
                <strong>CHRIST (Deemed to be University)</strong>
                <br />
                Central Campus, Dharmaram College Post, Hosur Road,
                <br />
                Bengaluru, Karnataka 560029
              </span>
            </p>
            <p className="mt-5 flex items-center gap-3 text-base text-gray-700">
              <MailIcon className="h-5 w-5 shrink-0 text-brand-green-dark" aria-hidden="true" />
              <span className="italic text-gray-500">Email &mdash; to be confirmed</span>
            </p>
          </div>

          <div
            className="rounded-xl border border-gray-200 border-t-4 border-t-brand-green bg-white p-8 shadow-sm"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-lg font-bold text-brand-blue">Contact Persons</h3>
            <ul className="mt-4 space-y-5">
              <li className="flex items-center gap-4">
                <PersonAvatar name="Harshan T. P." photo="/people/harshan-tp.jpg" className="h-16 w-16" />
                <div>
                  <p className="text-base font-semibold text-gray-800">Dr Harshan T. P.</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Foundation for Agrarian Studies
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <PersonAvatar name="Jayesh M. P." photo="/people/jayesh-mp.jpg" className="h-16 w-16" />
                <div>
                  <p className="text-base font-semibold text-gray-800">Dr Jayesh M. P.</p>
                  <p className="mt-1 text-sm text-gray-500">CHRIST (Deemed To be University)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

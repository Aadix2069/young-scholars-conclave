import Image from "next/image";

export function AboutChristUniversity() {
  return (
    <section className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-12">
      <h2
        className="mb-3 text-center text-5xl font-extrabold text-brand-blue"
        data-aos="fade-up"
      >
        About CHRIST (Deemed to be University)
      </h2>
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-green" aria-hidden="true" />

      <div className="mb-10 mt-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <Image
          alt="CHRIST University Campus"
          src="/christuniversity22-DuZuhDF_.jpg"
          width={936}
          height={526}
          className="w-full rounded-lg shadow-md"
          data-aos="fade-up"
        />
        <Image
          alt="CHRIST University Campus"
          src="/christuniversity11-Cr7lD7SQ.png"
          width={706}
          height={411}
          className="w-full rounded-lg shadow-md"
          data-aos="fade-up"
          data-aos-delay="100"
        />
      </div>
      <p
        className="mx-auto max-w-3xl text-justify text-xl leading-relaxed text-gray-700"
        data-aos="fade-up"
      >
        CHRIST (Deemed to be University) is a Deemed to be University
        declared under Section 3 of the UGC Act 1956, with its Central
        Campus at Dharmaram College Post, Hosur Road, Bengaluru, Karnataka
        560029. It is a NAAC &lsquo;A+&rsquo; accredited university offering
        multi-disciplinary programmes in Arts, Sciences, Social Sciences,
        Commerce, Management, Education, Law, Engineering, and Architecture,
        with premises and campuses at multiple locations in Bangalore,
        along with off-campuses at Delhi-NCR and Pune-Lavasa.
        <br />
        <br />
        The university provides a conducive environment for academic
        conferences, seminars, and conclaves, with state-of-the-art
        facilities including lecture halls, seminar rooms, and computer
        labs for presentations, discussions, and hands-on sessions. Hosting
        events such as the Young Scholars&rsquo; Conclave reflects its
        ongoing commitment to research, mentorship, and academic
        collaboration.
      </p>
    </section>
  );
}

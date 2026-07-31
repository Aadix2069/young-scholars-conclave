export function AboutFAS() {
  return (
    <section className="mx-auto mb-20 max-w-5xl px-4 py-16 sm:px-6 lg:px-12">
      <h2
        className="mb-3 text-center text-5xl font-extrabold text-brand-green"
        data-aos="fade-up"
      >
        FAS
      </h2>
      <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-brand-blue" aria-hidden="true" />

      <div className="mx-auto mt-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
        <p className="text-lg leading-8 text-gray-800 text-justify">
          The Foundation for Agrarian Studies (FAS) is an independent
          research organisation committed to multidisciplinary theoretical
          and empirical enquiry in agrarian studies. In practice, FAS is a
          network of academic and other scholars and researchers from
          institutions across India and the globe, committed to advancing
          knowledge on the agrarian question and rural society. The
          Foundation is known for collaborating with, mentoring, and
          building networks of young scholars working in the field of
          agrarian studies and on socio-economic life in rural India since
          its inception. It regularly organises academic events that
          provide young researchers the opportunity to present their
          research, receive constructive feedback, and engage with leading
          scholars in the field.
        </p>
        <p className="mt-6 text-base leading-8 text-gray-700 text-justify">
          To know more about FAS, please visit:{" "}
          <a
            href="https://fas.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-blue underline underline-offset-4 hover:text-brand-green-dark"
          >
            fas.org.in
          </a>
          .
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";

const FEES = [
  { category: "UG/PG Students" },
  { category: "Research Scholars" },
  { category: "Faculty members" },
  { category: "Professionals" },
];

export function RegistrationFees() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h1
        className="mb-3 text-center text-4xl font-extrabold tracking-tight text-brand-blue md:text-5xl"
        data-aos="fade-up"
      >
        Conclave Registration Fees
      </h1>
      <div className="mx-auto mb-8 h-1 w-12 rounded-full bg-brand-green md:mb-10" aria-hidden="true" />
      <p
        className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray-500"
        data-aos="fade-up"
      >
        Fee amounts will be announced closer to the Conclave.
      </p>

      <div
        className="relative mb-10 overflow-x-auto rounded-lg border border-gray-200 shadow-xl"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6 sm:py-4 sm:text-sm"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 sm:px-6 sm:py-4 sm:text-sm"
              >
                Fee (INR)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {FEES.map(({ category }) => (
              <tr
                key={category}
                className="transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-blue-50"
              >
                <td className="px-3 py-3 text-sm font-medium text-gray-900 sm:whitespace-nowrap sm:px-6 sm:py-4 sm:text-base">
                  {category}
                </td>
                <td className="px-3 py-3 text-sm text-gray-700 sm:whitespace-nowrap sm:px-6 sm:py-4 sm:text-base">
                  <span className="inline-flex items-center whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-xs">
                    To be announced
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6 text-base text-blue-800 shadow-md"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <p className="text-justify">
          <strong className="text-blue-900">Note:</strong> Accommodation,
          GST, and financial-aid details will be added here once confirmed.
          This block reserves the layout for that content.
        </p>
      </div>

      <div
        className="mt-12 flex flex-col items-center justify-center gap-4 text-center md:mt-16 md:flex-row md:gap-8"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Link
          href="/submit-paper"
          className="inline-block rounded-lg bg-linear-to-b from-blue-700 to-brand-blue px-8 py-4 text-lg font-bold text-white no-underline shadow-lg transition duration-200 ease-[var(--ease-smooth)] hover:scale-105 hover:from-blue-800 hover:to-blue-900 active:scale-95"
        >
          Submit a Paper
        </Link>
      </div>
      <p className="mt-4 text-center text-sm text-gray-500" data-aos="fade-up" data-aos-delay="350">
        To register as a delegate, fill in the form below.
      </p>
    </div>
  );
}

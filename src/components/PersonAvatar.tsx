import Image from "next/image";

/**
 * Photo slot for a person card.
 *
 * Pass `photo` as a path under /public (e.g. "/people/jane-doe.jpg") to show
 * the real photograph. Leave it as an empty string and a branded initials
 * circle is shown instead — so official photographs can be dropped in later
 * without any layout change.
 */
export function PersonAvatar({
  name,
  photo,
  className = "h-16 w-16",
}: {
  name: string;
  photo: string;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={`Photograph of ${name}`}
        width={256}
        height={256}
        className={`${className} shrink-0 rounded-full object-cover ring-2 ring-brand-gold/30`}
      />
    );
  }

  const initials = name
    .split(/\s+/)
    .filter((part) => /[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span
      className={`${className} flex shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-sm font-bold text-brand-green-dark ring-2 ring-brand-gold/30`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

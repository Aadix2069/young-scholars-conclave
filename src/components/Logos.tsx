import Image from "next/image";

type LogoProps = {
  className?: string;
};

/** Official CHRIST University logo lockup (seal + wordmark). */
export function ChristLogo({
  className,
  variant = "color",
}: LogoProps & { variant?: "color" | "white" }) {
  return variant === "white" ? (
    <Image
      src="/christWhite-CUMzRuJy.webp"
      alt="CHRIST (Deemed to be University)"
      width={1202}
      height={386}
      className={className}
      priority
    />
  ) : (
    <Image
      src="/christlogo-CRTORwOj.jpeg"
      alt="CHRIST (Deemed to be University)"
      width={1145}
      height={363}
      className={className}
      priority
    />
  );
}

/**
 * Foundation for Agrarian Studies organisational logo.
 *
 * Rasterized from the source SVG (public/fas-logo.svg, since removed) via
 * sharp - the original SVG fetched fine (200 OK) but browsers reported
 * naturalWidth/naturalHeight 0 and never painted it, a decode failure tied
 * to that file's specific SVG content rather than anything in this
 * component. The PNG preserves the same transparent background and 1024x688
 * (~1.49:1) aspect ratio as the source.
 *
 * `preload` - without it, next/image defaults to loading="lazy"
 * (IntersectionObserver-gated); every other logo on the site (ChristLogo,
 * the hero photos) is above-the-fold and already loads eagerly, which is
 * why only this one showed naturalWidth 0 in verification - not a broken
 * file, a missing eager-load hint on an always-visible header/footer mark.
 */
export function FASLogo({ className }: LogoProps) {
  return (
    <Image
      src="/fas-logo.png"
      alt="Foundation for Agrarian Studies"
      width={1024}
      height={688}
      preload
      className={className}
    />
  );
}

/**
 * Young Scholars' Conclave collaborative conference logo.
 *
 * The organisers are still finalising this mark. To integrate it once
 * supplied: save the transparent PNG to public/conclave-logo.png and set
 * CONCLAVE_LOGO_SRC below to "/conclave-logo.png". Until then a typographic
 * wordmark occupies the same slot, so no layout change is needed when the
 * real logo arrives.
 */
const CONCLAVE_LOGO_SRC = "";

export function ConclaveLogo({
  className,
  variant = "color",
}: LogoProps & { variant?: "color" | "white" }) {
  if (CONCLAVE_LOGO_SRC) {
    return (
      <Image
        src={CONCLAVE_LOGO_SRC}
        alt="Young Scholars' Conclave"
        width={512}
        height={512}
        className={className}
        preload
      />
    );
  }

  return (
    <span
      className={`flex flex-col justify-center leading-none ${className ?? ""}`}
      aria-label="Young Scholars' Conclave"
    >
      <span
        className={`whitespace-nowrap text-sm font-black uppercase tracking-tight sm:text-lg ${
          variant === "white" ? "text-white" : "text-brand-blue"
        }`}
      >
        Young Scholars&rsquo;
      </span>
      <span className="whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.25em] text-brand-green sm:text-xs">
        Conclave
      </span>
    </span>
  );
}

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

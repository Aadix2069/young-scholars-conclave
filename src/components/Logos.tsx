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

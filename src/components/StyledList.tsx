import { ArrowRightIcon } from "./icons";

/**
 * Icon-marker list used in place of plain browser bullets wherever body
 * copy has a list (About Conclave's aims, Call for Papers' eligibility) -
 * a default `list-disc` reads as a Word-document artifact next to the
 * rest of the site's styled components.
 */
export function StyledList({
  items,
  variant = "light",
  className = "",
}: {
  items: string[];
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              isDark ? "bg-white/15 text-brand-gold" : "bg-brand-green/15 text-brand-green-dark"
            }`}
            aria-hidden="true"
          >
            <ArrowRightIcon className="h-3 w-3" />
          </span>
          <span
            className={`text-base leading-7 ${isDark ? "text-white/85" : "text-gray-700"}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

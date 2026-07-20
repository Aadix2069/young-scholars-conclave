type SectionAccentProps = {
  variant?: "light" | "dark";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const POSITION_CLASSES: Record<NonNullable<SectionAccentProps["position"]>, string> = {
  "top-right": "-top-24 -right-24",
  "top-left": "-top-24 -left-24",
  "bottom-right": "-bottom-24 -right-24",
  "bottom-left": "-bottom-24 -left-24",
};

/**
 * Single-hue radial glow anchored to a section corner. Renders behind the
 * section's own content (negative z-index) but on top of its background
 * gradient. Parent section needs `relative overflow-hidden`.
 */
export function SectionAccent({
  variant = "light",
  position = "top-right",
}: SectionAccentProps) {
  const color =
    variant === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(29, 57, 143, 0.06)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 h-96 w-96 rounded-full ${POSITION_CLASSES[position]}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}
    />
  );
}

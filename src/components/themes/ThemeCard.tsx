import { ChevronDownIcon } from "../icons";

type ThemeCardProps = {
  title: string;
  index: number;
  isOpen: boolean;
  buttonId: string;
  ariaControls: string;
  onClick: () => void;
};

/**
 * Interactive theme card. The entire card is a button so it works with
 * keyboard (Enter/Space) and announces its expanded state to screen
 * readers via aria-expanded / aria-controls.
 */
export function ThemeCard({
  title,
  index,
  isOpen,
  buttonId,
  ariaControls,
  onClick,
}: ThemeCardProps) {
  return (
    <button
      type="button"
      id={buttonId}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={ariaControls}
      onClick={onClick}
      className={`flex h-full w-full cursor-pointer flex-col justify-between rounded-xl border border-gray-200 border-t-4 bg-white p-6 text-left shadow-sm transition-[transform,box-shadow,border-color,background-color] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${
        isOpen ? "border-t-brand-gold border-brand-gold bg-brand-sand/20" : "border-t-brand-green"
      }`}
    >
      <div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-brand-charcoal">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mt-4 block text-lg font-bold leading-snug text-brand-blue">{title}</span>
      </div>
      <span className="mt-6 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold text-brand-blue">Know more</span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-brand-gold transition-transform duration-300 ease-[var(--ease-smooth)] ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </span>
    </button>
  );
}

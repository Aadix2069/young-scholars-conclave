"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import type { Theme } from "@/lib/themes";
import { ThemeCard } from "./ThemeCard";
import { ThemeDialog } from "./ThemeDialog";

type ThemeAccordionProps = {
  themes: Theme[];
  pdfByTitle: Record<string, string>;
};

/**
 * Client-side interactive themes list. Clicking a card opens an accessible
 * modal dialog (ThemeDialog) presenting the theme's official details. The
 * card grid itself never shifts or reflows.
 */
export function ThemeAccordion({ themes, pdfByTitle }: ThemeAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);
  const close = useCallback(() => setOpenIndex(null), []);

  const openTheme = openIndex !== null ? themes[openIndex] : null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {themes.map((theme, index) => (
          <div
            key={theme.title}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ThemeCard
              title={theme.title}
              index={index}
              isOpen={openIndex === index}
              buttonId={`theme-button-${index}`}
              ariaControls={`theme-dialog-${index}`}
              accent={theme.accent}
              onToggle={toggle}
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {openTheme && openIndex !== null && (
          <ThemeDialog
            key={openIndex}
            theme={openTheme}
            index={openIndex}
            pdfHref={pdfByTitle[openTheme.title] ?? ""}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

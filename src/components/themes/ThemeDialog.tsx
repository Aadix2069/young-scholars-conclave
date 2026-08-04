"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Theme } from "@/lib/themes";
import { DURATIONS, EASE_SMOOTH } from "@/lib/motion";
import { CloseIcon } from "../icons";
import { ThemeContent } from "./ThemeContent";

type ThemeDialogProps = {
  theme: Theme;
  index: number;
  pdfHref?: string;
  onClose: () => void;
};

/**
 * Accessible modal dialog that presents a theme's official details.
 * Handles Escape-to-close, backdrop click, focus trapping, focus restore
 * to the triggering card, and background scroll locking.
 */
export function ThemeDialog({ theme, index, pdfHref, onClose }: ThemeDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headingId = `theme-dialog-heading-${index}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    const focusables = dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  const closeButton = (
    <button
      ref={closeButtonRef}
      type="button"
      aria-label="Close theme details"
      onClick={onClose}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-brand-blue shadow-sm transition-colors duration-200 ease-[var(--ease-smooth)] hover:bg-brand-sand hover:text-brand-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2"
    >
      <CloseIcon className="h-4 w-4" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <motion.button
        type="button"
        aria-label="Close theme details"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: DURATIONS.base, ease: EASE_SMOOTH }}
        className="absolute inset-0 cursor-pointer bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: DURATIONS.slow, ease: EASE_SMOOTH }}
        className="relative w-full max-w-3xl"
      >
        <div className="max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl">
          <ThemeContent
            theme={theme}
            index={index}
            pdfHref={pdfHref}
            headingId={headingId}
            closeButton={closeButton}
          />
        </div>
      </motion.div>
    </div>
  );
}

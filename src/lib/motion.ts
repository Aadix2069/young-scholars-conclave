import type { Variants } from "framer-motion";

/**
 * Shared motion primitives. One easing curve (matching the site's
 * --ease-smooth token and the aos-* keyframes) and a small set of
 * variants so every framer-motion animation feels like one system.
 */

export const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

export const DURATIONS = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATIONS.base, ease: EASE_SMOOTH },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATIONS.base, ease: EASE_SMOOTH },
  },
};

export const scaleFadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: DURATIONS.slow, ease: EASE_SMOOTH },
  },
};

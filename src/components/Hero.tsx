"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { ConclaveCountdown } from "./ConclaveCountdown";
import { HeroSlideshow } from "./HeroSlideshow";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex h-[85vh] min-h-[600px] w-full items-end overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <HeroSlideshow />
      </div>

      {/* Bottom-anchored gradient, not a flat tint: the top ~40% of each
          photo stays clear so the images actually read, darkening only
          where the text sits at the bottom for contrast. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none relative z-10 w-full px-4 pb-10 text-center text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:pb-14 md:pb-16"
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={container}
      >
        <motion.div variants={fadeUp}>
          <p className="mb-2 text-sm font-semibold text-white/90 sm:text-base">
            Foundation for Agrarian Studies &amp; CHRIST (Deemed to be University)
          </p>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Young Scholars&rsquo; Conclave
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm italic text-white/85 sm:text-base">
            &ldquo;Studying the Countryside in the Global South in the
            Twenty-First Century&rdquo;
          </p>
          <p className="mt-2 text-lg text-white/90 sm:text-xl md:text-2xl">
            2&ndash;4 December 2026 &middot; Bengaluru
          </p>
        </motion.div>

        <motion.div className="pointer-events-auto mt-6" variants={fadeUp}>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-base font-semibold text-white no-underline transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            Register Now
            <ArrowRightIcon className="animate-nudge-x h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="pointer-events-auto mt-8 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-12"
          variants={fadeUp}
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-sm font-semibold text-white/90 sm:text-base">
              Conclave Starts In
            </h3>
            <ConclaveCountdown />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white/90 sm:text-base">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
            </span>
            Full Papers Due 10 November 2026
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

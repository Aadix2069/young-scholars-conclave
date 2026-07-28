"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChristLogo, FASLogo } from "./Logos";
import { ArrowRightIcon } from "./icons";
import { ConclaveCountdown } from "./ConclaveCountdown";
import { HeroSlideshow } from "./HeroSlideshow";

const EASE_SMOOTH = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_SMOOTH } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex h-[85vh] w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <HeroSlideshow />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-center text-white"
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={container}
      >
        <motion.div className="pointer-events-auto absolute left-4 top-4 z-10" variants={fadeRight}>
          <ChristLogo variant="white" className="h-auto w-36 sm:w-48" />
        </motion.div>

        <motion.div className="pointer-events-auto absolute right-4 top-4 z-10" variants={fadeLeft}>
          <FASLogo variant="white" className="h-auto w-36 sm:w-48" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="mb-3 text-sm font-semibold text-white sm:text-base">
            Foundation for Agrarian Studies &amp; CHRIST (Deemed to be University)
          </p>
          <h1 className="mb-3 text-15xl font-bold leading-tight opacity-90 sm:text-4xl md:text-6xl">
            Young Scholars&rsquo; Conclave
          </h1>
          <p className="mb-2 text-base italic opacity-90 sm:text-lg md:text-2xl">
            Studying the Countryside in the Global South in the Twenty-First Century
          </p>
          <p className="text-lg opacity-90 sm:text-xl md:text-2xl">
            1&ndash;3 December 2026 (alt. 2&ndash;4 December) &middot; Bengaluru
          </p>
        </motion.div>

        <motion.div className="pointer-events-auto mt-8" variants={fadeUp}>
          <Link
            href="/registration"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-base font-semibold text-white no-underline transition-[transform,background] duration-200 ease-[var(--ease-smooth)] hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950"
          >
            Register Now
            <ArrowRightIcon className="animate-nudge-x h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="pointer-events-auto mt-10 flex w-full flex-col items-center gap-6 px-4 sm:flex-row sm:justify-center sm:gap-16 md:absolute md:inset-x-0 md:bottom-8 md:mt-0"
          variants={fadeUp}
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
              Conclave Starts In
            </h3>
            <ConclaveCountdown />
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-white sm:text-base">
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

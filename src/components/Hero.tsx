"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRightIcon } from "./icons";
import { ConclaveCountdown } from "./ConclaveCountdown";
import { HeroSlideshow } from "./HeroSlideshow";
import { EASE_SMOOTH } from "@/lib/motion";
import { FULL_PAPER_SUBMISSION_ENABLED } from "@/lib/featureFlags";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-[600px] w-full overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full">
        <HeroSlideshow />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex h-full flex-col justify-between px-4 pt-16 pb-10 text-center text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_16px_rgba(0,0,0,0.8)] sm:pt-20 sm:pb-14 md:pt-24 md:pb-16 lg:pt-28 xl:pt-32"
        initial={reduceMotion ? "visible" : "hidden"}
        animate="visible"
        variants={container}
      >
        {/* ================= TITLE ================= */}<motion.div
  variants={fadeUp}
  className="mx-auto -mt-8 sm:-mt-10 md:-mt-12 lg:-mt-16 xl:-mt-20 max-w-5xl"
>
  <p className="mb-3 text-sm font-semibold text-white/90 sm:text-base">
    Foundation for Agrarian Studies &amp; CHRIST (Deemed to be University)
  </p>

  <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-[1.1] sm:text-5xl md:text-[3.4rem] lg:text-[4rem]">
  Young Scholars&rsquo; Conclave
  <br className="hidden md:block" />
  <span className="block md:inline text-5xl"> on Rural Transformation</span>
</h1>

  <p className="mx-auto mt-3 max-w-3xl text-sm italic text-white/85 sm:text-base md:text-lg">
    &ldquo;Studying the Countryside in the
    Twenty-First Century&rdquo;
  </p>

  <p className="mt-3 text-lg text-white/90 sm:text-xl md:text-2xl">
    2&ndash;4 December 2026 &middot; Bengaluru
  </p>
</motion.div>

        {/* ================= BUTTON + COUNTDOWN ================= */}
        <div className="pb-2">
         

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

            {FULL_PAPER_SUBMISSION_ENABLED && (
              <div className="flex items-center gap-2 text-sm font-semibold text-white/90 sm:text-base">
                <span
                  className="relative flex h-2.5 w-2.5 shrink-0"
                  aria-hidden="true"
                >
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>
                Full Papers Due 10 November 2026
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CONCLAVE_START = new Date("2026-12-02T10:00:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = Math.max(0, CONCLAVE_START - now);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

const BASKERVILLE_FONT =
  '"Baskerville Old Face", "Baskerville", "Baskerville SemiBold", "Garamond", serif';

/**
 * Animates an individual digit moving vertically without container backgrounds.
 * Scaled up to h-9 / w-4 (sm:h-10 / sm:w-5) and text-xl (sm:text-2xl).
 */
function SingleDigit({ char }: { char: string }) {
  return (
    <div className="relative h-9 w-4 overflow-hidden sm:h-10 sm:w-5">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={char}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-white sm:text-2xl"
          style={{ fontFamily: BASKERVILLE_FONT }}
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * Splits a two-digit number into individual animated characters.
 */
function AnimatedNumber({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");
  const digits = formatted.split("");

  return (
    <div className="flex items-center justify-center">
      {digits.map((digit, index) => (
        <SingleDigit key={index} char={digit} />
      ))}
    </div>
  );
}

function TimeBlock({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <AnimatedNumber value={value} />
      <span
        className="mt-1 text-[11px] uppercase tracking-widest text-neutral-400 sm:text-xs"
        style={{ fontFamily: BASKERVILLE_FONT }}
      >
        {label}
      </span>
    </div>
  );
}

export function ConclaveCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hasStarted =
    isMounted &&
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (hasStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 text-base text-emerald-400 sm:text-lg"
        style={{ fontFamily: BASKERVILLE_FONT }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        The Conclave Has Started
      </motion.div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-3 sm:gap-4"
      aria-live="polite"
    >
      <TimeBlock value={timeLeft.days} label="Days" />

      <span
        className="pb-4 text-sm text-neutral-500 sm:text-base"
        style={{ fontFamily: BASKERVILLE_FONT }}
      >
        :
      </span>

      <TimeBlock value={timeLeft.hours} label="Hours" />

      <span
        className="pb-4 text-sm text-neutral-500 sm:text-base"
        style={{ fontFamily: BASKERVILLE_FONT }}
      >
        :
      </span>

      <TimeBlock value={timeLeft.minutes} label="Mins" />

      <span
        className="pb-4 text-sm text-neutral-500 sm:text-base"
        style={{ fontFamily: BASKERVILLE_FONT }}
      >
        :
      </span>

      <TimeBlock value={timeLeft.seconds} label="Secs" />
    </div>
  );
}
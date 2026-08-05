"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CONCLAVE_START = new Date("2026-12-02T09:00:00").getTime();

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

function AnimatedNumber({ value }: { value: number }) {
  return (
    <div className="relative h-14 w-16 overflow-hidden sm:h-16 sm:w-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{
            y: 60,
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          exit={{
            y: -60,
            opacity: 0,
            scale: 1.08,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 flex items-center justify-center text-4xl font-black tracking-tight text-white sm:text-5xl"
          style={{
            fontFamily:
              'Impact, Haettenschweiler, "Arial Black", sans-serif',
            textShadow:
              "0 3px 10px rgba(0,0,0,.55), 0 8px 24px rgba(0,0,0,.35)",
          }}
        >
          {String(value).padStart(2, "0")}
        </motion.div>
      </AnimatePresence>
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
    <div className="flex min-w-[72px] flex-col items-center sm:min-w-[90px]">
      <AnimatedNumber value={value} />

      <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-white/80 sm:text-xs">
        {label}
      </span>
    </div>
  );
}

export function ConclaveCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const update = () => {
      setTimeLeft(calculateTimeLeft());
    };

    update();

    // Update four times per second for better synchronization.
    const interval = setInterval(update, 250);

    return () => clearInterval(interval);
  }, []);

  const hasStarted =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (hasStarted) {
    return (
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-bold text-white md:text-2xl"
      >
        🎉 The Conclave Has Started
      </motion.span>
    );
  }

  return (
    <motion.div
      layout
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6"
      aria-live="polite"
    >
      <TimeBlock value={timeLeft.days} label="Days" />

      <span className="pb-6 text-3xl font-bold text-white/70 sm:text-4xl">
        :
      </span>

      <TimeBlock value={timeLeft.hours} label="Hours" />

      <span className="pb-6 text-3xl font-bold text-white/70 sm:text-4xl">
        :
      </span>

      <TimeBlock value={timeLeft.minutes} label="Minutes" />

      <span className="pb-6 text-3xl font-bold text-white/70 sm:text-4xl">
        :
      </span>

      <TimeBlock value={timeLeft.seconds} label="Seconds" />
    </motion.div>
  );
}
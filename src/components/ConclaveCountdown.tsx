"use client";

import { useEffect, useState } from "react";

const CONCLAVE_START = "2026-12-01T00:00:00";
const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function ConclaveCountdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(CONCLAVE_START).getTime();
    const compute = () => {
      setDays(Math.max(0, Math.ceil((target - Date.now()) / MS_PER_DAY)));
    };
    compute();
    const id = setInterval(compute, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-lg font-semibold text-white sm:text-xl md:text-2xl" aria-live="polite">
      {days === null
        ? "Conclave Starts Soon"
        : days === 0
        ? "The Conclave Starts Today"
        : `${days} ${days === 1 ? "Day" : "Days"}`}
    </span>
  );
}

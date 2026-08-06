"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-out-cubic",
      once: false,
      mirror: true,
      offset: 60,
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return null;
}

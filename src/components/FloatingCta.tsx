"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightIcon } from "./icons";

export function FloatingCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = pathname === "/registration";

  useEffect(() => {
    if (hidden) return;

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden]);

  if (hidden) return null;

  return (
    <Link
      href="/registration"
      className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-linear-to-b from-blue-800 to-blue-900 px-5 py-3 text-sm font-semibold text-white no-underline shadow-lg transition-[opacity,transform,background] duration-300 ease-[var(--ease-smooth)] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      Register Now
      <ArrowRightIcon className="animate-nudge-x h-4 w-4" />
    </Link>
  );
}

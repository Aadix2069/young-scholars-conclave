"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Hero slides. To add more later: drop the image into public/hero/ and
 * append an entry here with its path.
 */
const HERO_SLIDES: { src: string; alt: string; delayMs: number }[] = [
  {
    src: "/hero/conference-hall-8.jpeg",
    alt: "Attendees at a past CHRIST Economics Department conference",
    delayMs: 3000,
  },
  {
    src: "/hero/conference-hall-9.jpeg",
    alt: "Delegates seated in discussion at a conference session",
    delayMs: 3000,
  },
  {
    src: "/hero/conference-hall-11.jpeg",
    alt: "Delegates seated in discussion at a conference session",
    delayMs: 7000,
  },
];
const FADE_DURATION_MS = 1200;

/**
 * Custom crossfade slideshow, not Swiper's `effect="fade"`: that option
 * combined with `loop` has a documented bug (see prior HeroSlideshow.tsx
 * history) where its CSS transition never fires a `transitionend` event,
 * permanently stuck Swiper's internal `animating` flag at true after the
 * first autoplay cycle and silently disabling further transitions. Rather
 * than fight that, this stacks every slide absolutely and crossfades
 * opacity directly - simple, and immune to that failure mode since there's
 * no Swiper loop/effect machinery involved at all.
 */
export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % HERO_SLIDES.length) + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current = setTimeout(() => goTo(index + 1), HERO_SLIDES[index].delayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index, paused, goTo]);

  return (
    <div
      className="absolute inset-0 h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity ease-[var(--ease-smooth)]"
          style={{
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_DURATION_MS}ms`,
          }}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      <div
        className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2"
        role="tablist"
        aria-label="Hero slideshow navigation"
      >
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ease-[var(--ease-smooth)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 ${
              i === index ? "w-6 bg-brand-gold" : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

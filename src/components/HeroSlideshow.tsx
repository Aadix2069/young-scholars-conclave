"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Hero slides.
 *
 * Two real conference photos are already in public/hero/ (added directly to
 * the repo) and are wired in below. The remaining three categories are
 * still awaited from the organising committee — to integrate them, drop
 * each image into public/hero/ and set that entry's `src` to its path.
 * Entries with an empty `src` render a branded gradient panel captioned
 * with the shot that belongs there, so the slideshow is fully functional
 * and correctly laid out before the rest of the photos arrive — no layout
 * change is needed when swapping them in.
 */
const HERO_SLIDES: { src: string; alt: string; caption: string }[] = [
  {
    src: "",
    alt: "Representatives of the Foundation for Agrarian Studies and CHRIST University in discussion",
    caption: "FAS × CHRIST collaboration",
  },
  {
    src: "",
    alt: "CHRIST (Deemed to be University) campus, Bengaluru",
    caption: "CHRIST University campus",
  },
  {
    src: "/hero/conference-hall-1.jpg",
    alt: "Delegates seated at the Young Scholars' Conclave conference hall",
    caption: "Conference venue",
  },
  {
    src: "/hero/conference-hall-2.jpg",
    alt: "Attendees at a past Young Scholars' Conclave session",
    caption: "Young scholars presenting",
  },
  {
    src: "",
    alt: "Rural agrarian landscape in the Global South",
    caption: "Agrarian landscapes",
  },
];

export function HeroSlideshow() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination, A11y]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      navigation
      pagination={{ clickable: true }}
      a11y={{ enabled: true }}
      loop
      speed={1200}
      grabCursor
      className="hero-swiper absolute inset-0 h-full w-full"
    >
      {HERO_SLIDES.map((slide) => (
        <SwiperSlide key={slide.caption}>
          {slide.src ? (
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              preload
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full w-full items-end justify-start bg-linear-to-br from-brand-green-dark via-brand-blue to-brand-gold/80 p-8"
              role="img"
              aria-label={slide.alt}
            >
              <span className="rounded-full bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm">
                {slide.caption}
              </span>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

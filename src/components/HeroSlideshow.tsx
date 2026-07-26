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
 * Only the 2 real conference photos currently supplied are shown for now
 * (per request, rather than mixing in branded placeholder panels for the
 * categories not yet received). To add more later: drop the image into
 * public/hero/ and append an entry here with its path.
 */
const HERO_SLIDES: { src: string; alt: string }[] = [
  {
    src: "/hero/conference-hall-1.jpg",
    alt: "Delegates seated at the Young Scholars' Conclave conference hall",
  },
  {
    src: "/hero/conference-hall-2.jpg",
    alt: "Attendees at a past Young Scholars' Conclave session",
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
        <SwiperSlide key={slide.src}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

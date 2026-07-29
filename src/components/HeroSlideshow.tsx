"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Hero slides. To add more later: drop the image into public/hero/ and
 * append an entry here with its path.
 */
const HERO_SLIDES: { src: string; alt: string }[] = [
  {
    src: "/hero/conference-hall-2.jpg",
    alt: "Attendees at a past CHRIST Economics Department conference",
  },
  {
    src: "/hero/conference-hall-6.jpeg",
    alt: "Organising committee and delegates group photo",
  },
  {
    src: "/hero/conference-hall-7.jpeg",
    alt: "Delegates seated in discussion at a conference session",
  },
];

export function HeroSlideshow() {
  return (
    <Swiper
      // effect="fade" was removed: combined with loop, its CSS transition
      // never fired a transitionend event in testing, which permanently
      // stuck Swiper's internal `animating` flag at true after the first
      // autoplay transition - silently disabling navigation and swipe/drag
      // from that point on. The default slide transition doesn't have this
      // failure mode with loop.
      //
      // Prev/Next arrow buttons removed per admin feedback (unclickable in
      // practice) - autoplay, pagination dots, and touch/drag swipe remain.
      modules={[Autoplay, Pagination, A11y]}
      autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
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

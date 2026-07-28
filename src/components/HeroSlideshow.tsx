"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Hero slides. To add more later: drop the image into public/hero/ and
 * append an entry here with its path.
 */
const HERO_SLIDES: { src: string; alt: string }[] = [
  {
    src: "/hero/conference-hall-1.jpg",
    alt: "Delegates seated at a CHRIST Economics Department conference session",
  },
  {
    src: "/hero/conference-hall-2.jpg",
    alt: "Attendees at a past CHRIST Economics Department conference",
  },
  {
    src: "/hero/conference-hall-3.jpeg",
    alt: "Faculty and delegates in discussion around a conference table",
  },
  {
    src: "/hero/conference-hall-5.jpeg",
    alt: "Committee members in a planning meeting",
  },
  {
    src: "/hero/conference-hall-6.jpeg",
    alt: "Organising committee and delegates group photo",
  },
  {
    src: "/hero/conference-hall-7.jpeg",
    alt: "Delegates seated in discussion at a conference session",
  },
  {
    src: "/hero/christ-campus-1.png",
    alt: "CHRIST (Deemed to be University) Yeshwanthpur campus building",
  },
  {
    src: "/hero/christ-campus-2.jpg",
    alt: "CHRIST (Deemed to be University) main campus entrance",
  },
];

export function HeroSlideshow() {
  return (
    <Swiper
      // effect="fade" was removed: combined with loop, its CSS transition
      // never fired a transitionend event in testing, which permanently
      // stuck Swiper's internal `animating` flag at true after the first
      // autoplay transition - silently disabling the nav arrows, pagination,
      // and swipe/drag from that point on. The default slide transition
      // doesn't have this failure mode with loop.
      modules={[Autoplay, Navigation, Pagination, A11y]}
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

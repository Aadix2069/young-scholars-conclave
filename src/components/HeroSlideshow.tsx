"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

/**
 * Hero photo slideshow. Add real event photos to public/hero/ and list
 * them here in display order. Each entry needs the /hero/-relative path
 * and descriptive alt text (accessibility — these replace what used to be
 * a muted decorative video, so alt text should describe the actual photo).
 */
const HERO_SLIDES: { src: string; alt: string }[] = [
  // { src: "/hero/fas-christ-meeting.jpg", alt: "FAS and CHRIST University representatives at a planning meeting" },
  // { src: "/hero/christ-campus.jpg", alt: "CHRIST University Bengaluru campus building" },
  // { src: "/hero/conference-hall.jpg", alt: "Conference hall set up for the Young Scholars' Conclave" },
  // { src: "/hero/scholars-presenting.jpg", alt: "Young scholars presenting research at a past conclave" },
  // { src: "/hero/agrarian-landscape.jpg", alt: "Agrarian landscape representative of the conclave's research focus" },
];

export function HeroSlideshow() {
  if (HERO_SLIDES.length === 0) {
    // No photos supplied yet - render a solid brand-colored background
    // instead of an empty/broken slideshow.
    return <div className="absolute inset-0 h-full w-full bg-brand-blue" />;
  }

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      speed={1200}
      className="absolute inset-0 h-full w-full"
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

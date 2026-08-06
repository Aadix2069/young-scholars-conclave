"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useInView, type Variants } from "framer-motion";
import { scaleFadeIn, EASE_SMOOTH } from "@/lib/motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE_SMOOTH },
  },
};

const hoverVariants: Variants = {
  rest: { y: 0, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)" },
  hover: {
    y: -4,
    boxShadow: "0 32px 64px -20px rgba(0, 0, 0, 0.25)",
    transition: { duration: 0.3, ease: EASE_SMOOTH },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
  exit: { opacity: 0, transition: { duration: 0.2, ease: EASE_SMOOTH } },
};

const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: EASE_SMOOTH },
  },
};

export function PosterShowcase() {
  const reduceMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useInView({ once: true, margin: "-100px" });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setIsModalOpen(false);
  };

  const openModal = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.type === "click" || (e.type === "keydown" && (e as React.KeyboardEvent).key === "Enter")) {
      setIsModalOpen(true);
    }
  };

  return (
    <section
      id="poster-showcase"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
      aria-labelledby="poster-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={reduceMotion ? "visible" : "hidden"}
          animate={ref ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center"
        >
          <motion.div
            variants={cardVariants}
            className="relative inline-block cursor-pointer group"
            role="button"
            tabIndex={0}
            onClick={openModal}
            onKeyDown={openModal}
            aria-label="View conference poster in full size"
            whileHover={reduceMotion ? undefined : hoverVariants}
            whileTap={{ scale: 0.99 }}
          >
            <div className="relative rounded-xl overflow-hidden border border-brand-blue/10 bg-white shadow-lg">
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-brand-green/5"
                aria-hidden="true"
              />
              <Image
                src="/ysc_poster.jpeg"
                alt="Young Scholars' Conclave on Rural Transformation - 2-4 December 2026, Bengaluru. Jointly organised by Foundation for Agrarian Studies and CHRIST (Deemed to be University)."
                fill
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/AB//2Q=="
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
                  <p className="text-sm font-medium uppercase tracking-wider">Click to enlarge</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">
                Conference Poster
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {isModalOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onKeyDown={handleKeyDown}
          onClick={handleBackdropClick}
        >
          <motion.div
            variants={modalContentVariants}
            className="relative max-w-4xl w-full rounded-xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2
                id="modal-title"
                className="text-lg font-semibold text-gray-900"
              >
                Young Scholars' Conclave Poster
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2"
                aria-label="Close poster preview"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Image
              src="/ysc_poster.jpeg"
              alt="Young Scholars' Conclave on Rural Transformation - 2-4 December 2026, Bengaluru. Jointly organised by Foundation for Agrarian Studies and CHRIST (Deemed to be University). Full conference poster with all details."
              width={1200}
              height={1697}
              className="w-full h-auto object-contain"
              priority
              sizes="100vw"
            />
            <div className="px-4 py-3 text-center border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-700 font-mono text-xs">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
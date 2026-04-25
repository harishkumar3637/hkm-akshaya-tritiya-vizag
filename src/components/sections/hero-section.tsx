"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import type { HeroContent } from "@/data/events/types";
import { ResponsivePoster } from "@/components/ui/responsive-poster";

type HeroSectionProps = {
  content: HeroContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % content.posters.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [content.posters.length, shouldReduceMotion]);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--heroBackground)]">
      <div className="h-[60vh] min-h-[320px] w-full sm:h-[66vh] lg:h-[72vh]">
        <div className="relative h-full overflow-hidden border-b border-[color-mix(in_srgb,var(--decorativeAccent)_20%,transparent)] bg-[var(--heroBackground)] shadow-[0_20px_48px_color-mix(in_srgb,var(--shadowColor)_92%,transparent)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(255,213,138,0.18),transparent_68%)]" />

          <div className="relative h-full w-full">
            {content.posters.map((poster, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={poster.desktopSrc}
                  initial={false}
                  animate={
                    shouldReduceMotion
                      ? { opacity: isActive ? 1 : 0 }
                      : {
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 1.035,
                        }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0.15 : 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                  aria-hidden={!isActive}
                >
                  <ResponsivePoster
                    src={poster.mobileSrc}
                    alt={poster.alt}
                    mode="cover"
                    className="aspect-auto h-full min-h-0 rounded-none border-0 bg-transparent shadow-none md:hidden"
                  />
                  <ResponsivePoster
                    src={poster.desktopSrc}
                    alt={poster.alt}
                    mode="cover"
                    className="hidden aspect-auto h-full min-h-0 rounded-none border-0 bg-transparent shadow-none md:block"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 sm:pb-5">
            <div className="flex items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--heroOverlay)_55%,transparent)] px-3 py-2 backdrop-blur-sm">
              {content.posters.map((poster, index) => (
                <span
                  key={poster.desktopSrc}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === activeIndex ? "w-7 bg-[var(--decorativeAccent)]" : "w-2 bg-white/40"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

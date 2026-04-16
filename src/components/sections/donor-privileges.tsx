"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { DonorPrivilegesContent } from "@/data/events/types";

type DonorPrivilegesProps = {
  content: DonorPrivilegesContent;
};

export function DonorPrivileges({ content }: DonorPrivilegesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.carouselItems.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [autoplay, content.carouselItems.length]);

  const goToSlide = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  const movePrevious = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + content.carouselItems.length) % content.carouselItems.length);
  };

  const moveNext = () => {
    setAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % content.carouselItems.length);
  };

  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-4 text-[#a1672e]">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#a1672e]/30" />
          <div className="text-3xl">{"\u22EF \u2726 \u22EF"}</div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#a1672e]/30" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#fde9bf] shadow-sm ring-1 ring-black/5 sm:aspect-[16/11] lg:min-h-[420px]">
              {content.carouselItems.map((item, index) => (
                <motion.div
                  key={`${item.src}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex justify-center pb-6">
                    <div className="rounded-full bg-black/70 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                      {item.label}
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                type="button"
                onClick={movePrevious}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-sm transition hover:bg-white/40"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={moveNext}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white shadow-sm transition hover:bg-white/40"
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex justify-center gap-2">
              {content.carouselItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all ${
                    index === currentIndex ? 'h-2.5 w-10 bg-[#8b3a1f]' : 'h-2.5 w-2.5 bg-[#d4a574]/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#6e2918] sm:text-4xl">
                {content.title}
              </h2>
            </div>
            <div className="space-y-4">
              {content.privileges.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fde9bf] text-sm font-semibold text-[#6e2918]">
                    {index + 1}
                  </span>
                  <p className="text-base leading-7 text-[#4e3725]">{item}</p>
                </div>
              ))}
            </div>
            <div>
              <a href="#donation-form">
                <Button size="lg" className="rounded-full bg-[#8b3a1f] px-8 py-3 text-white hover:bg-[#6b2a15]">
                  {content.donateLabel}
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-[#a1672e]">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#a1672e]/30" />
          <div className="text-3xl">{"\u22EF \u2726 \u22EF"}</div>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#a1672e]/30" />
        </div>
      </div>
    </section>
  );
}

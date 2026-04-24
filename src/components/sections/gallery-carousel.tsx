"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { GalleryContent } from "@/data/events/types";

type GalleryCarouselProps = {
  content: GalleryContent;
};

function getCardClass(index: number, activeIndex: number, total: number) {
  const offset = (index - activeIndex + total) % total;

  if (offset === 0) {
    return "z-30 scale-100 opacity-100";
  }

  if (offset === 1) {
    return "z-20 translate-x-[24%] scale-[0.86] opacity-70 md:translate-x-[29%]";
  }

  if (offset === total - 1) {
    return "z-20 -translate-x-[24%] scale-[0.86] opacity-70 md:-translate-x-[29%]";
  }

  return "z-10 scale-[0.72] opacity-0";
}

export function GalleryCarousel({ content }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (content.items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % content.items.length);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [content.items.length]);

  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(183,28,44,0.18),transparent_30%),linear-gradient(135deg,#8f0f26_0%,#a5152f_48%,#8f0f26_100%)] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-4xl font-bold text-white sm:text-5xl">{content.title}</h2>

        <div className="mt-8">
          <div className="relative mx-auto flex h-[180px] items-center justify-center sm:h-[240px] lg:h-[290px]">
            {content.items.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`absolute aspect-[16/10] w-[58%] overflow-hidden rounded-[24px] border border-white/18 shadow-[0_28px_70px_rgba(31,6,11,0.32)] transition-all duration-700 ease-out sm:w-[50%] lg:w-[46%] ${getCardClass(
                  index,
                  activeIndex,
                  content.items.length,
                )}`}
                aria-label={`Show ${item.label}`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 72vw, 58vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,10,11,0.22)_70%,rgba(14,10,11,0.66)_100%)]" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-[4px] border border-[#c6a23f] bg-[rgba(35,31,32,0.9)] px-4 py-1 text-base font-semibold italic text-white shadow-[0_12px_24px_rgba(14,10,11,0.35)] sm:text-lg">
                  {item.label}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {content.items.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeIndex === index ? "w-10 bg-white" : "w-2.5 bg-white/40"
                }`}
                aria-label={`Go to ${item.label}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

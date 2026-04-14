'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { importanceCarouselItems } from '@/lib/data';
import { fadeInUp } from '@/lib/animations';

type ImportanceCardProps = {
  title: string;
  description: string;
  image: string;
  index: number;
  isActive: boolean;
};

function ImportanceCard({ title, description, image, index, isActive }: ImportanceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`group relative min-w-0 snap-start overflow-hidden rounded-[28px] border border-[#c89f73]/30 bg-[#f7efe6] shadow-[0_22px_55px_rgba(109,56,30,0.12)] ${
        isActive ? 'ring-1 ring-[#b57a45]/30' : ''
      }`}
    >
      <div className="relative h-[350px] overflow-hidden rounded-[28px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 82vw, (max-width: 1280px) 32vw, 24vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="rounded-t-[26px] border-t border-white/20 bg-[linear-gradient(180deg,rgba(198,144,89,0.2),rgba(96,49,24,0.92))] px-5 py-4 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-serif text-lg font-semibold leading-7 text-[#fff6ea] sm:text-xl">
                {title}
              </h3>
              <button
                onClick={toggleExpanded}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#fff4e6] transition-transform duration-300 hover:bg-white/20"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Description overlay on image */}
        <div className={`absolute inset-0 flex items-end transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full bg-gradient-to-t from-black/90 via-black/70 to-transparent p-5 rounded-t-[28px]">
            <p className="text-sm leading-7 text-white sm:text-[15px]">{description}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ImportanceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCard = useCallback((index: number) => {
    const target = cardRefs.current[index];
    target?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    });
    setActiveIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    const nextIndex =
      activeIndex === 0 ? importanceCarouselItems.length - 1 : activeIndex - 1;
    scrollToCard(nextIndex);
  }, [activeIndex, scrollToCard]);

  const goToNext = useCallback(() => {
    const nextIndex =
      activeIndex === importanceCarouselItems.length - 1 ? 0 : activeIndex + 1;
    scrollToCard(nextIndex);
  }, [activeIndex, scrollToCard]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerLeft = container.getBoundingClientRect().left;
      let nearestIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.abs(card.getBoundingClientRect().left - containerLeft - 16);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  return (
    <section
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative overflow-hidden bg-[#fff4e4] px-4 py-12 outline-none sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent_24%,rgba(230,190,140,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,191,116,0.16),transparent_40%)]" />
      <div className="absolute -left-12 top-20 h-40 w-40 rounded-full bg-[#f1cf9f]/30 blur-3xl" />
      <div className="absolute -right-12 bottom-12 h-44 w-44 rounded-full bg-[#f6dfbb]/36 blur-3xl" />

      <motion.div {...fadeInUp} className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#d7b387]/35 bg-white/65 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[#9a6134] backdrop-blur">
            Temple Significance
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[#5c2417] sm:text-4xl">
            Akshaya Tritiya Importance
          </h2>
          <p className="mt-3 text-sm leading-7 text-[#744632] sm:text-base">
            A sacred day of divine abundance, temple seva, annadan, and auspicious beginnings
            celebrated with devotion, gratitude, and grace.
          </p>
          <div className="mt-7 flex items-center justify-center">
            <div className="flex items-center gap-3 text-[#b9854d]">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#d9a760]" />
              <span className="h-2 w-2 rounded-full bg-[#d9a760]" />
              <span className="h-px w-24 bg-[#d9a760]/70" />
              <span className="h-2 w-2 rounded-full bg-[#d9a760]" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#d9a760]" />
            </div>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-14 bg-gradient-to-r from-[#fff4e4] to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-14 bg-gradient-to-l from-[#fff4e4] to-transparent lg:block" />

          <div className="mb-5 flex items-center justify-end gap-3">
            <button
              onClick={goToPrevious}
              aria-label="View previous importance card"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d5b28b]/35 bg-white/70 text-[#7c4429] shadow-md transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a760]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              aria-label="View next importance card"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d5b28b]/35 bg-white/70 text-[#7c4429] shadow-md transition-all hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a760]"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Akshaya Tritiya importance cards"
          >
            {importanceCarouselItems.map((item, index) => (
              <div
                key={item.title}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className="w-[80vw] flex-none sm:w-[47%] lg:w-[30%] xl:w-[23.5%]"
              >
                <ImportanceCard
                  index={index}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  isActive={activeIndex === index}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {importanceCarouselItems.map((item, index) => (
              <button
                key={item.title}
                onClick={() => scrollToCard(index)}
                aria-label={`Go to importance card ${index + 1}`}
                className={`rounded-full transition-all ${
                  activeIndex === index
                    ? 'h-2.5 w-10 bg-[#f0bf74]'
                    : 'h-2.5 w-2.5 bg-[#d7b387]'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

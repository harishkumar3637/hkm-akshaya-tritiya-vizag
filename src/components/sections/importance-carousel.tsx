'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { fadeInUp } from '@/lib/animations';
import type { ImportanceContent } from '@/data/events/types';

type ImportanceCardProps = {
  title: string;
  description: string;
  image: string;
  index: number;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

function ImportanceCard({ title, description, image, index, isActive, isExpanded, onToggle }: ImportanceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-w-0 overflow-hidden rounded-[18px] border border-[color-mix(in_srgb,var(--borderSubtle)_70%,transparent)] bg-[var(--cardBackground)] shadow-[0_18px_38px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)] transition-shadow duration-300 hover:shadow-[0_24px_56px_color-mix(in_srgb,var(--shadowColor)_48%,transparent)] ${
        isActive ? 'ring-1 ring-[color-mix(in_srgb,var(--decorativeAccent)_70%,transparent)]' : ''
      }`}
    >
      <div className="relative h-[380px] overflow-hidden rounded-[18px] sm:h-[420px] lg:h-[460px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          sizes="(max-width: 768px) 84vw, (max-width: 1280px) 45vw, 24vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,color-mix(in_srgb,var(--heroBackground)_22%,transparent)_67%,color-mix(in_srgb,var(--heroBackground)_76%,transparent)_100%)]" />

        <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4">
          <div
            className={`rounded-[14px] border border-white/55 bg-[color-mix(in_srgb,var(--cardBackground)_94%,white)] px-4 shadow-[0_14px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 ease-out sm:px-5 ${
              isExpanded ? 'py-5' : 'py-3 sm:py-4'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="line-clamp-2 flex-1 text-center font-serif text-base font-bold leading-6 text-[var(--textHeading)] sm:text-lg">
                {title}
              </h3>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggle();
                }}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Hide' : 'Show'} importance details for ${title}`}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--borderSubtle)] bg-white/80 text-[var(--textHeading)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--decorativeSoft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--decorativeAccent)]"
              >
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pt-4 text-[15px] font-medium leading-7 text-[var(--textHeading)] sm:text-base">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

type ImportanceCarouselProps = {
  content: ImportanceContent;
};

export function ImportanceCarousel({ content }: ImportanceCarouselProps) {
  const itemCount = content.items.length;
  const cloneCount = itemCount;
  const loopedItems = [
    ...content.items.slice(-cloneCount),
    ...content.items,
    ...content.items.slice(0, cloneCount),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentLoopedIndexRef = useRef(cloneCount);
  const isJumpingRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  const getRealIndex = useCallback(
    (index: number) => {
      if (itemCount === 0) return 0;

      return ((index - cloneCount) % itemCount + itemCount) % itemCount;
    },
    [cloneCount, itemCount]
  );

  const getScrollLeftForSlide = useCallback((index: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];

    if (!viewport || !slide) return null;

    const targetLeft = slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2;

    return Math.max(0, targetLeft);
  }, []);

  const scrollToLoopedIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const viewport = viewportRef.current;
    const targetLeft = getScrollLeftForSlide(index);

    if (!viewport || targetLeft === null) return;

    viewport.scrollTo({
      left: targetLeft,
      behavior: shouldReduceMotion ? 'auto' : behavior,
    });

    currentLoopedIndexRef.current = index;
    setActiveIndex(getRealIndex(index));
  }, [getRealIndex, getScrollLeftForSlide, shouldReduceMotion]);

  const normalizeScrollPosition = useCallback((loopedIndex: number) => {
    if (itemCount === 0) return;
    if (loopedIndex >= cloneCount && loopedIndex < cloneCount + itemCount) return;

    const normalizedIndex = cloneCount + getRealIndex(loopedIndex);
    const viewport = viewportRef.current;
    const targetLeft = getScrollLeftForSlide(normalizedIndex);

    if (!viewport || targetLeft === null) return;

    isJumpingRef.current = true;
    viewport.scrollTo({ left: targetLeft, behavior: 'auto' });
    currentLoopedIndexRef.current = normalizedIndex;

    window.requestAnimationFrame(() => {
      isJumpingRef.current = false;
    });
  }, [cloneCount, getRealIndex, getScrollLeftForSlide, itemCount]);

  const handleScroll = useCallback(() => {
    if (isJumpingRef.current) return;

    const viewport = viewportRef.current;

    if (!viewport) return;

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;

    let nearestIndex = currentLoopedIndexRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    currentLoopedIndexRef.current = nearestIndex;
    setActiveIndex(getRealIndex(nearestIndex));

    if (scrollEndTimerRef.current) {
      clearTimeout(scrollEndTimerRef.current);
    }

    scrollEndTimerRef.current = setTimeout(() => {
      normalizeScrollPosition(nearestIndex);
    }, 90);
  }, [getRealIndex, normalizeScrollPosition]);

  const handleManualNext = useCallback(() => {
    scrollToLoopedIndex(currentLoopedIndexRef.current + 1);
  }, [scrollToLoopedIndex]);

  const handleManualPrevious = useCallback(() => {
    scrollToLoopedIndex(currentLoopedIndexRef.current - 1);
  }, [scrollToLoopedIndex]);

  const handleDotClick = useCallback((index: number) => {
    scrollToLoopedIndex(cloneCount + index);
  }, [cloneCount, scrollToLoopedIndex]);

  const handleCardToggle = useCallback((index: number) => {
    setExpandedIndex((currentIndex) => (currentIndex === index ? null : index));
  }, []);

  useLayoutEffect(() => {
    if (itemCount === 0) return;

    const viewport = viewportRef.current;
    const targetLeft = getScrollLeftForSlide(cloneCount);

    if (!viewport || targetLeft === null) return;

    viewport.scrollTo({ left: targetLeft, behavior: 'auto' });
    currentLoopedIndexRef.current = cloneCount;
  }, [cloneCount, getScrollLeftForSlide, itemCount]);

  useEffect(() => {
    const handleResize = () => {
      scrollToLoopedIndex(cloneCount + activeIndex, 'auto');
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex, cloneCount, scrollToLoopedIndex]);

  useEffect(() => {
    if (itemCount <= 1 || shouldReduceMotion) {
      return;
    }

    autoplayTimerRef.current = window.setInterval(() => {
      scrollToLoopedIndex(currentLoopedIndexRef.current + 1);
    }, 3200);

    return () => {
      if (autoplayTimerRef.current) {
        window.clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [itemCount, scrollToLoopedIndex, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
      if (autoplayTimerRef.current) window.clearInterval(autoplayTimerRef.current);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handleManualPrevious();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      handleManualNext();
    }
  };

  if (itemCount === 0) {
    return null;
  }

  return (
    <section
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="relative overflow-hidden bg-[var(--sectionAltBackground)] px-4 py-12 outline-none sm:px-6 lg:px-8 lg:py-14"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent_24%,rgba(230,190,140,0.14)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(240,191,116,0.16),transparent_40%)]" />
      <div className="absolute -left-12 top-20 h-40 w-40 rounded-full bg-[color-mix(in_srgb,var(--decorativeAccent)_30%,transparent)] blur-3xl" />
      <div className="absolute -right-12 bottom-12 h-44 w-44 rounded-full bg-[color-mix(in_srgb,var(--decorativeSoft)_36%,transparent)] blur-3xl" />

      <motion.div {...fadeInUp} className="relative mx-auto max-w-[1560px]">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[color-mix(in_srgb,var(--borderSubtle)_35%,transparent)] bg-white/65 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--textMuted)] backdrop-blur">
            {content.eyebrow}
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-[var(--textHeading)] sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--textMuted)] sm:text-base">
            {content.description}
          </p>
          <div className="mt-7 flex items-center justify-center">
            <div className="flex items-center gap-3 text-[var(--textMuted)]">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--decorativeAccent)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--decorativeAccent)]" />
              <span className="h-px w-24 bg-[color-mix(in_srgb,var(--decorativeAccent)_70%,transparent)]" />
              <span className="h-2 w-2 rounded-full bg-[var(--decorativeAccent)]" />
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--decorativeAccent)]" />
            </div>
          </div>
        </div>

        <div className="relative mt-9">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-between sm:flex">
            <button
              onClick={handleManualPrevious}
              aria-label="View previous importance card"
              className="pointer-events-auto -ml-3 flex h-12 w-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--borderSubtle)_55%,transparent)] bg-[color-mix(in_srgb,var(--cardBackground)_88%,transparent)] text-[var(--textHeading)] shadow-[0_12px_30px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)] backdrop-blur transition-all duration-300 hover:-translate-x-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--decorativeAccent)] lg:-ml-5"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleManualNext}
              aria-label="View next importance card"
              className="pointer-events-auto -mr-3 flex h-12 w-12 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--borderSubtle)_55%,transparent)] bg-[color-mix(in_srgb,var(--cardBackground)_88%,transparent)] text-[var(--textHeading)] shadow-[0_12px_30px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)] backdrop-blur transition-all duration-300 hover:translate-x-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--decorativeAccent)] lg:-mr-5"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            ref={viewportRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[8vw] pb-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:px-[10vw] sm:gap-5 lg:px-8 lg:gap-6 xl:px-10 [&::-webkit-scrollbar]:hidden"
            aria-label="Akshaya Tritiya importance cards"
            onScroll={handleScroll}
          >
            {loopedItems.map((item, index) => {
              const realIndex = getRealIndex(index);

              return (
                <div
                  key={`${item.title}-${index}`}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  className="w-[84vw] flex-none snap-center snap-always sm:w-[46%] lg:w-[24%]"
                >
                  <ImportanceCard
                    index={realIndex}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    isActive={activeIndex === realIndex}
                    isExpanded={expandedIndex === realIndex}
                    onToggle={() => handleCardToggle(realIndex)}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {content.items.map((item, index) => (
              <button
                key={item.title}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to importance card ${index + 1}`}
                className={`rounded-full transition-all ${
                  activeIndex === index
                    ? 'h-2.5 w-10 bg-[var(--decorativeAccent)]'
                    : 'h-2.5 w-2.5 bg-[color-mix(in_srgb,var(--borderSubtle)_90%,transparent)]'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

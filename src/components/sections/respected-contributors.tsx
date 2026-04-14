'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { respectedContributors } from '@/lib/data';
import { fadeInUp, staggerContainer, staggerItem, hoverLift } from '@/lib/animations';

export function RespectedContributors() {
  const [activeTab, setActiveTab] = useState<'recent' | 'generous'>('recent');
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(respectedContributors.length / itemsPerSlide);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const startIndex = currentIndex * itemsPerSlide;
  const visibleItems = respectedContributors.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2 
          {...fadeInUp}
          className="text-center font-serif text-4xl font-bold text-[#1a1a2e] sm:text-5xl"
        >
          Respected Contributors
        </motion.h2>

        {/* Tabs */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              setActiveTab('recent');
              setCurrentIndex(0);
            }}
            className={`rounded-full px-8 py-3 font-semibold transition-all ${
              activeTab === 'recent'
                ? 'bg-[#e8d899] text-[#3d2817]'
                : 'bg-white text-[#3d2817] border-2 border-[#8b3a1f]'
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => {
              setActiveTab('generous');
              setCurrentIndex(0);
            }}
            className={`rounded-full px-8 py-3 font-semibold transition-all ${
              activeTab === 'generous'
                ? 'bg-[#8b3a1f] text-white'
                : 'bg-white text-[#3d2817] border-2 border-[#8b3a1f]'
            }`}
          >
            Most Generous
          </button>
        </div>

        {/* Carousel */}
        <div className="relative mt-8">
          {/* Cards Container */}
          <motion.div 
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {visibleItems.map((contributor, index) => (
              <motion.div
                key={`${contributor.name}-${index}`}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="rounded-2xl bg-[#e8d899] p-5 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white font-bold text-[#8b3a1f]">
                    {contributor.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#3d2817]">{contributor.name}</h3>
                    <p className="text-sm text-[#FF9933]">Donated ₹{contributor.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs text-[#9d6d4d]">{contributor.time}</p>
                  </div>
                </div>
                </motion.div>
              ))}
            </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-[#e8d899] disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-[#8b3a1f]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 rounded-full bg-white p-2 shadow-lg transition-all hover:bg-[#e8d899] disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-[#8b3a1f]" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-[#8b3a1f]' : 'w-2 bg-[#d4c4a8]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-full border-2 border-[#8b3a1f] px-8 py-3 font-semibold text-[#8b3a1f] transition-all hover:bg-[#8b3a1f] hover:text-white">
            View More
          </button>
        </div>
      </div>
    </section>
  );
}

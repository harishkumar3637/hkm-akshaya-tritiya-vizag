'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

import { fadeInUp } from '@/lib/animations';
import type { Contributor, ContributorsContent } from '@/data/events/types';

function splitIntoRows(items: Contributor[], rowCount: number) {
  return Array.from({ length: rowCount }, (_, rowIndex) =>
    items.filter((_, itemIndex) => itemIndex % rowCount === rowIndex)
  );
}

function ContributorRow({
  contributors,
  reverse = false,
  duration = 22,
}: {
  contributors: Contributor[];
  reverse?: boolean;
  duration?: number;
}) {
  const marqueeItems = [...contributors, ...contributors];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f8e9e6] to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f8e9e6] to-transparent sm:w-20" />

      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        className="flex w-max gap-4 py-2"
      >
        {marqueeItems.map((contributor, index) => (
          <article
            key={`${contributor.name}-${index}`}
            className="flex min-w-[290px] items-center gap-4 rounded-2xl bg-[#f3d381] px-4 py-3 shadow-[0_10px_24px_rgba(143,65,30,0.08)] sm:min-w-[380px]"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f9eceb] text-2xl font-bold text-[#2f2627]">
              {contributor.avatar}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold text-[#a1515d]">{contributor.name}</h3>
              <p className="text-lg font-bold text-[#221c1d]">
                Donated Rs. {contributor.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-base text-[#433939]">{contributor.time}</p>
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
}

type ContributorsSectionProps = {
  content: ContributorsContent;
};

export function ContributorsSection({ content }: ContributorsSectionProps) {
  const [activeTab, setActiveTab] = useState<'recent' | 'generous'>('recent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setSearchQuery('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSearchQuery('');
    setIsModalOpen(false);
  };

  const activeContributors = activeTab === 'recent' ? content.recent : content.generous;
  const rows = useMemo(() => splitIntoRows(activeContributors, 3), [activeContributors]);
  const filteredContributors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return activeContributors;
    }

    return activeContributors.filter((contributor) =>
      contributor.name.toLowerCase().includes(normalizedQuery)
    );
  }, [activeContributors, searchQuery]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="bg-[#f8e9e6] py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px]">
          <motion.h2
            {...fadeInUp}
            className="px-4 text-center font-sans text-4xl font-black tracking-tight text-[#1d1a1b] sm:text-5xl md:text-6xl"
          >
            {content.heading}
          </motion.h2>

          <div className="mt-8 flex justify-center px-4">
            <div className="inline-flex rounded-[20px] bg-[#f3d381] p-1.5 shadow-[0_10px_24px_rgba(143,65,30,0.08)]">
              <button
                type="button"
                onClick={() => setActiveTab('recent')}
                className={`rounded-[16px] px-8 py-4 text-xl font-bold transition-all sm:min-w-[145px] ${
                  activeTab === 'recent' ? 'bg-[#820000] text-white' : 'text-[#221c1d]'
                }`}
              >
                {content.tabs.recent}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('generous')}
                className={`rounded-[16px] px-8 py-4 text-xl font-bold transition-all sm:min-w-[220px] ${
                  activeTab === 'generous' ? 'bg-[#820000] text-white' : 'text-[#221c1d]'
                }`}
              >
                {content.tabs.generous}
              </button>
            </div>
          </div>

          <div className="mt-12 space-y-3">
            <ContributorRow contributors={rows[0] ?? []} duration={24} />
            <ContributorRow contributors={rows[1] ?? []} reverse duration={26} />
            <ContributorRow contributors={rows[2] ?? []} duration={28} />
          </div>

          <div className="mt-12 flex justify-center px-4">
            <button
              type="button"
              onClick={openModal}
              className="rounded-[18px] border-2 border-[#8b1d12] bg-transparent px-8 py-4 text-2xl font-medium text-[#1d1a1b] transition-colors hover:bg-[#8b1d12] hover:text-white"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[22px] bg-[#f8e3e3] shadow-[0_24px_80px_rgba(28,12,12,0.35)]">
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
              <div>
                <h3 className="text-2xl font-black text-[#231f20] sm:text-[2rem]">{content.modal.title}</h3>
                <p className="mt-1 text-sm text-[#6b5350]">
                  {activeTab === 'recent' ? content.modal.recentSubtitle : content.modal.generousSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#8d7e7b] bg-[#f9eded] text-[#6a5b59] transition-colors hover:bg-[#f3d9d8] hover:text-[#372f30]"
                aria-label="Close donor list"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pt-5 sm:px-7">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8a6763]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={content.modal.searchPlaceholder}
                  className="w-full rounded-2xl border border-[#d8b5af] bg-[#fff7f5] py-3 pl-11 pr-4 text-base text-[#2a2021] outline-none transition focus:border-[#a1515d] focus:ring-2 focus:ring-[#a1515d]/15"
                />
              </label>
            </div>

            <div className="mt-5 overflow-y-auto px-6 pb-6 sm:px-7 sm:pb-7">
              <div className="space-y-5">
                {filteredContributors.length > 0 ? (
                  filteredContributors.map((contributor) => (
                    <article
                      key={`${activeTab}-${contributor.name}-${contributor.amount}`}
                      className="flex items-center gap-3 rounded-[16px] bg-[#f3d381] px-3 py-3 shadow-[0_10px_24px_rgba(143,65,30,0.08)] sm:px-4"
                    >
                      <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-[#f9eceb] text-xl font-bold text-[#2f2627] sm:h-14 sm:w-14">
                        {contributor.avatar}
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-lg font-bold leading-tight text-[#a1515d] sm:text-[1.65rem]">
                          {contributor.name}
                        </h4>
                        <p className="mt-0.5 text-base font-bold text-[#221c1d] sm:text-[1.35rem]">
                          Donated Rs {contributor.amount.toLocaleString('en-IN')}
                        </p>
                        <p className="mt-0.5 text-sm text-[#433939] sm:text-[1.05rem]">
                          {contributor.time}
                        </p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-[16px] bg-[#fff7f5] px-5 py-8 text-center text-[#6b5350]">
                    {content.modal.emptyStatePrefix} &quot;{searchQuery}&quot;.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

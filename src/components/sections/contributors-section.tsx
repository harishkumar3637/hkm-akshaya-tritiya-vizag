'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

import { fadeInUp } from '@/lib/animations';
import type { Contributor, ContributorsContent } from '@/data/events/types';

function splitIntoColumns(items: Contributor[], columnCount: number) {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columnCount === columnIndex)
  );
}

function ContributorColumn({
  contributors,
  reverse = false,
  duration = 24,
  reduceMotion = false,
}: {
  contributors: Contributor[];
  reverse?: boolean;
  duration?: number;
  reduceMotion?: boolean;
}) {
  const marqueeItems = [...contributors, ...contributors];

  return (
    <div className="relative h-[420px] overflow-hidden rounded-[30px] border border-[color-mix(in_srgb,var(--buttonPrimary)_18%,white)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--cardRaisedBackground)_72%,white),color-mix(in_srgb,var(--decorativeSoft)_56%,transparent))] shadow-[0_22px_50px_color-mix(in_srgb,var(--shadowColor)_22%,transparent)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[color-mix(in_srgb,var(--decorativeSoft)_94%,white)] via-[color-mix(in_srgb,var(--decorativeSoft)_72%,transparent)] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[color-mix(in_srgb,var(--decorativeSoft)_94%,white)] via-[color-mix(in_srgb,var(--decorativeSoft)_72%,transparent)] to-transparent" />
      <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-white/20" />

      <motion.div
        animate={reduceMotion ? undefined : { y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={reduceMotion ? undefined : { duration, repeat: Infinity, ease: 'linear' }}
        className="flex flex-col gap-4 px-4 py-4"
      >
        {marqueeItems.map((contributor, index) => (
          <article
            key={`${contributor.name}-${index}`}
            className="flex min-h-[112px] items-center gap-4 rounded-[24px] border border-[color-mix(in_srgb,var(--buttonPrimary)_18%,white)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--cardRaisedBackground)_82%,white),color-mix(in_srgb,var(--decorativeSoft)_42%,transparent))] px-4 py-4 shadow-[0_14px_34px_color-mix(in_srgb,var(--shadowColor)_16%,transparent)] backdrop-blur-md"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--buttonPrimary)_16%,white)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--cardRaisedBackground)_88%,white),color-mix(in_srgb,var(--decorativeSoft)_34%,transparent))] text-2xl font-bold text-[var(--textHeading)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              {contributor.avatar}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xl font-bold text-[var(--buttonPrimary)]">{contributor.name}</h3>
              <p className="text-lg font-bold text-[var(--textHeading)]">
                Donated Rs. {contributor.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-sm text-[var(--textMuted)]">{contributor.time}</p>
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
  const shouldReduceMotion = useReducedMotion();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const activeContributors = activeTab === 'recent' ? content.recent : content.generous;
  const columns = useMemo(() => splitIntoColumns(activeContributors, 3), [activeContributors]);

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
      <section className="bg-gradient-to-b from-[var(--decorativeSoft)] via-[color-mix(in_srgb,var(--decorativeAccent)_78%,white)] to-[var(--decorativeSoft)] py-14 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <motion.h2
            {...fadeInUp}
            className="text-center font-sans text-3xl font-black tracking-tight text-[var(--textHeading)] sm:text-4xl md:text-5xl"
          >
            {content.heading}
          </motion.h2>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-[24px] border border-[color-mix(in_srgb,var(--buttonPrimary)_24%,white)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--cardRaisedBackground)_80%,white),color-mix(in_srgb,var(--decorativeSoft)_48%,transparent))] p-1.5 shadow-[0_18px_40px_color-mix(in_srgb,var(--shadowColor)_18%,transparent)] backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActiveTab('recent')}
                className={`rounded-[18px] px-8 py-4 text-xl font-bold transition-all sm:min-w-[145px] ${
                  activeTab === 'recent'
                    ? 'bg-gradient-to-r from-[var(--buttonPrimary)] to-[var(--buttonHover)] text-[var(--textOnAccent)] shadow-[0_12px_24px_color-mix(in_srgb,var(--shadowColor)_28%,transparent)]'
                    : 'text-[var(--textHeading)]'
                }`}
              >
                {content.tabs.recent}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('generous')}
                className={`rounded-[18px] px-8 py-4 text-xl font-bold transition-all sm:min-w-[220px] ${
                  activeTab === 'generous'
                    ? 'bg-gradient-to-r from-[var(--buttonPrimary)] to-[var(--buttonHover)] text-[var(--textOnAccent)] shadow-[0_12px_24px_color-mix(in_srgb,var(--shadowColor)_28%,transparent)]'
                    : 'text-[var(--textHeading)]'
                }`}
              >
                {content.tabs.generous}
              </button>
            </div>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            <ContributorColumn contributors={columns[0] ?? []} duration={24} reduceMotion={Boolean(shouldReduceMotion)} />
            <ContributorColumn contributors={columns[1] ?? []} reverse duration={26} reduceMotion={Boolean(shouldReduceMotion)} />
            <ContributorColumn contributors={columns[2] ?? []} duration={28} reduceMotion={Boolean(shouldReduceMotion)} />
          </div>

          <div className="mt-12 flex justify-center px-4">
            <button
              type="button"
              onClick={openModal}
              className="rounded-[18px] border-2 border-[var(--buttonPrimary)] bg-transparent px-8 py-4 text-2xl font-medium text-[var(--textHeading)] transition-colors hover:bg-[var(--buttonPrimary)] hover:text-[var(--textOnAccent)]"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_srgb,var(--textHeading)_42%,black)] px-4 py-6">
          <div
            className="absolute inset-0"
            onClick={closeModal}
            aria-hidden="true"
          />

          <div className="relative z-10 flex max-h-[92vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--buttonPrimary)_18%,white)] bg-[linear-gradient(180deg,var(--cardRaisedBackground),color-mix(in_srgb,var(--decorativeSoft)_48%,white))] shadow-[0_24px_80px_color-mix(in_srgb,var(--shadowColor)_30%,transparent)]">
            <div className="flex items-start justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
              <div>
                <h3 className="text-2xl font-black text-[var(--textHeading)] sm:text-[2rem]">{content.modal.title}</h3>
                <p className="mt-1 text-sm text-[var(--textMuted)]">
                  {activeTab === 'recent' ? content.modal.recentSubtitle : content.modal.generousSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[color-mix(in_srgb,var(--buttonPrimary)_22%,white)] bg-[color-mix(in_srgb,var(--cardRaisedBackground)_75%,white)] text-[var(--textMuted)] transition-colors hover:bg-[var(--decorativeSoft)] hover:text-[var(--textHeading)]"
                aria-label="Close donor list"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 overflow-y-auto px-6 pb-6 sm:px-7 sm:pb-7">
              <div className="space-y-3.5">
                {activeContributors.map((contributor) => (
                  <article
                    key={`${activeTab}-${contributor.name}-${contributor.amount}`}
                    className="flex items-center gap-3 rounded-[14px] border border-[color-mix(in_srgb,var(--buttonPrimary)_16%,white)] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--cardRaisedBackground)_84%,white),color-mix(in_srgb,var(--decorativeSoft)_44%,transparent))] px-3 py-2.5 shadow-[0_8px_18px_color-mix(in_srgb,var(--shadowColor)_12%,transparent)]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--buttonPrimary)_16%,white)] bg-[color-mix(in_srgb,var(--cardRaisedBackground)_80%,white)] text-base font-bold text-[var(--textHeading)] sm:h-12 sm:w-12 sm:text-lg">
                      {contributor.avatar}
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate text-base font-bold leading-tight text-[var(--buttonPrimary)] sm:text-lg">
                        {contributor.name}
                      </h4>
                      <p className="mt-0.5 text-sm font-bold text-[var(--textHeading)] sm:text-[0.95rem]">
                        Donated Rs {contributor.amount.toLocaleString('en-IN')}
                      </p>
                      <p className="mt-0.5 text-xs text-[var(--textMuted)] sm:text-sm">
                        {contributor.time}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

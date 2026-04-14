'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

import { fadeInUp } from '@/lib/animations';

type Contributor = {
  name: string;
  amount: number;
  time: string;
  avatar: string;
};

const recentContributors: Contributor[] = [
  { name: 'Parthiv', amount: 113, time: 'about 5 hours ago', avatar: 'P' },
  { name: 'Kumar Abhishek', amount: 103, time: 'about 6 hours ago', avatar: 'K' },
  { name: 'Soumya Ranjan Senapati', amount: 501, time: 'about 6 hours ago', avatar: 'S' },
  { name: 'I P Smit', amount: 201, time: 'about 4 hours ago', avatar: 'I' },
  { name: 'Rahul kumar Ranakoti', amount: 103, time: 'about 9 hours ago', avatar: 'R' },
  { name: 'Radheshyam Kushwaha', amount: 251, time: 'about 9 hours ago', avatar: 'R' },
  { name: 'NP', amount: 205, time: 'about 10 hours ago', avatar: 'N' },
  { name: 'Kamlesh Roy', amount: 301, time: 'about 6 hours ago', avatar: 'K' },
  { name: 'Nalinikant Mohanty', amount: 511, time: 'about 11 hours ago', avatar: 'N' },
  { name: 'Subhash Wadhwa', amount: 1122, time: 'about 11 hours ago', avatar: 'S' },
  { name: 'Megha Bansal', amount: 103, time: 'about 11 hours ago', avatar: 'M' },
  { name: 'Rishab Agarwal', amount: 151, time: 'about 10 hours ago', avatar: 'R' },
];

const generousContributors: Contributor[] = [
  { name: 'Anand Sagar', amount: 33391, time: 'top supporter', avatar: 'A' },
  { name: 'Ribhav Soni', amount: 33280, time: 'featured donor', avatar: 'R' },
  { name: 'Atul Kumar Tawakley', amount: 33673, time: 'major patron', avatar: 'A' },
  { name: 'Mrs Vasantben Tailo', amount: 35000, time: 'featured donor', avatar: 'M' },
  { name: 'Dayanidhi Mishra', amount: 51100, time: 'honored patron', avatar: 'D' },
  { name: 'Kapil Vidhani', amount: 52040, time: 'major patron', avatar: 'K' },
  { name: 'Shivam Gupta', amount: 52040, time: 'featured donor', avatar: 'S' },
  { name: 'Ravi Krishnamoorthy', amount: 50000, time: 'grace donor', avatar: 'R' },
  { name: 'Abhishek Ranjan', amount: 50000, time: 'honored patron', avatar: 'A' },
  { name: 'Akshat Punjlaut', amount: 85000, time: 'lead contributor', avatar: 'A' },
  { name: 'Akshay Ghugal', amount: 75000, time: 'lead contributor', avatar: 'A' },
  { name: 'Yogya Modi', amount: 140000, time: 'top contributor', avatar: 'Y' },
];

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

export function RespectedContributors() {
  const [activeTab, setActiveTab] = useState<'recent' | 'generous'>('recent');

  const activeContributors = activeTab === 'recent' ? recentContributors : generousContributors;
  const rows = useMemo(() => splitIntoRows(activeContributors, 3), [activeContributors]);

  return (
    <section className="bg-[#f8e9e6] py-14 sm:py-16">
      <div className="mx-auto max-w-[1400px]">
        <motion.h2
          {...fadeInUp}
          className="px-4 text-center font-sans text-4xl font-black tracking-tight text-[#1d1a1b] sm:text-5xl md:text-6xl"
        >
          Respected Contributors
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
              Recent
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('generous')}
              className={`rounded-[16px] px-8 py-4 text-xl font-bold transition-all sm:min-w-[220px] ${
                activeTab === 'generous' ? 'bg-[#820000] text-white' : 'text-[#221c1d]'
              }`}
            >
              Most Generous
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
            className="rounded-[18px] border-2 border-[#8b1d12] bg-transparent px-8 py-4 text-2xl font-medium text-[#1d1a1b] transition-colors hover:bg-[#8b1d12] hover:text-white"
          >
            View More
          </button>
        </div>
      </div>
    </section>
  );
}

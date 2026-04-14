"use client";

import { motion } from 'framer-motion';
import { donorBenefits } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export function BenefitsSection() {
  return (
    <section id="benefits" className="relative py-[72px] sm:py-[88px]">
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(243,186,86,0.18),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b46e2f]">Divine Benefits</p>
          <h2 className="mt-4 font-serif text-4xl text-[#FF9933] sm:text-5xl">What devotees receive with every offering</h2>
          <p className="mt-4 text-lg leading-8 text-[#7b4a2f]">
            Each contribution is paired with devotional remembrance, sacred blessings, and festival participation.
          </p>
        </motion.div>

        <motion.div 
          className="mt-10 grid gap-5 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {donorBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div key={benefit.title} variants={staggerItem} whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 10 }}>
                <Card className="bg-white h-full">
                  <CardContent className="p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#fff2d7_0%,#ffd79c_100%)] text-[#af5e22]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-[#6e2918]">{benefit.title}</h3>
                    <p className="mt-3 text-base leading-7 text-[#FF9933]">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

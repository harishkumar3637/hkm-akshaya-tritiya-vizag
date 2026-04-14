"use client";

import Image from "next/image";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { slideInLeft, slideInRight } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#4f170f]">
      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-9">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex items-center justify-between rounded-full border border-white/15 bg-black/18 px-4 py-2 text-white/90 backdrop-blur md:max-w-max"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.26em] sm:text-sm">
            <Sparkles className="h-4 w-4 text-[#ffd37a]" />
            Akshaya Tritiya 2026 Donation
          </div>
        </motion.div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-10">
          <motion.div {...slideInLeft} className="max-w-3xl pt-1 text-white lg:py-6">
            <div className="inline-flex items-center rounded-full border border-[#ffd188]/35 bg-[#f2c26a]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#ffe2a8]">
              Offer Seva and Daan that never diminishes
            </div>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.95] sm:text-5xl lg:text-6xl">
              Akshaya Tritiya Donation
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/84 sm:text-base">
              Make your Akshaya Tritiya donation at Gupt Vrindavan Dham and serve Sri Sri Krishna-Balaram through
              annadan, gau seva, temple offerings, and heartfelt daan on this eternally auspicious occasion.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#donation-form">
                <Button size="lg" className="w-full sm:w-auto">
                  Donate Now
                </Button>
              </a>
              <a
                href="#akshaya-tritiya-daan"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                Explore Seva's
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["108+", "Minimum Sankalpa"],
                ["24/7", "Sacred temple prayers"],
                ["100%", "Trust"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/14 bg-white/10 p-4 backdrop-blur-sm">
                  <div className="font-serif text-2xl text-[#ffd98a]">{value}</div>
                  <div className="mt-2 text-sm text-white/75">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...slideInRight} className="lg:sticky lg:top-5">
            <div className="mx-auto max-w-[500px]">
              <div className="relative h-[520px]">
                <Image
                  src="/hero-poster.png"
                  alt="Akshaya Tritiya devotional offering"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.28)]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

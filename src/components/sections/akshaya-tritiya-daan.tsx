"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid3x3, List } from "lucide-react";
import { motion } from "framer-motion";

import { akshayaTritiyaDaan } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function AkshayaTritiyaDaan() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <section id="akshaya-tritiya-daan" className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          {...fadeInUp}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="rounded-full bg-[#fde9bf] px-6 py-3">
            <h2 className="font-serif text-2xl font-bold text-[#6e2918]">AKSHAYA TRITIYA DAAN</h2>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-10 w-10 rounded-lg"
            >
              <List className="h-5 w-5" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-10 w-10 rounded-lg"
            >
              <Grid3x3 className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className={
            viewMode === "grid"
              ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              : "space-y-2"
          }
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {viewMode === "grid" ? (
            // Grid View
            akshayaTritiyaDaan.map((item) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex h-auto flex-col items-stretch sm:h-56 sm:flex-row">
                  <div className="relative h-40 w-full flex-shrink-0 overflow-hidden sm:h-full sm:w-44">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between bg-[#6e2918] p-5 text-white">
                    <h3 className="font-serif text-xl font-bold sm:text-2xl leading-tight">
                      {item.title}
                    </h3>

                    <a href="#donation-form">
                      <Button
                        size="lg"
                        className="mt-4 w-fit rounded-full bg-white text-[#6e2918] transition-colors hover:bg-[#f0dec0]"
                      >
                        Donate
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // List View
            akshayaTritiyaDaan.map((item, index) => (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                className={`flex items-center justify-between rounded-2xl px-5 py-4 transition-all ${
                  index % 2 === 0
                    ? 'bg-[#fde9bf] hover:bg-[#fcd896]'
                    : 'bg-[#f5dca3] hover:bg-[#f0d491]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-lg font-bold text-[#6e2918] w-8">
                    {index + 1}.
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#6e2918]">
                    {item.title}
                  </h3>
                </div>

                <a href="#donation-form">
                  <Button
                    size="sm"
                    className="rounded-full bg-[#6e2918] text-white transition-colors hover:bg-[#5a1f0f]"
                  >
                    Donate
                  </Button>
                </a>
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-4 text-[#a1672e]">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a1672e]/30" />
          <div className="text-3xl">⋯ ✦ ⋯</div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a1672e]/30" />
        </div>
      </div>
    </section>
  );
}

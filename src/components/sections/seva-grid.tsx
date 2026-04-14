import Image from "next/image";

import { sevaItems } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function SevaGrid() {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#6e2918]">Seva Offerings</p>
            <h2 className="mt-4 font-serif text-4xl text-[#6e2918] sm:text-5xl">Choose a sacred way to participate</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#6e2918]">
            The original page highlights multiple seva paths. This grid recreates that offering-led layout with warm
            image cards and devotional descriptions.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sevaItems.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group overflow-hidden border-[#f0dec0] bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(79,23,15,0.78)_100%)]" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-[#af5e22] backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-serif text-xl text-[#6e2918]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6e2918]">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

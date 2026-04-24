import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import type { SevaContent } from "@/data/events/types";

type SevaGridProps = {
  content: SevaContent;
};

export function SevaGrid({ content }: SevaGridProps) {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--textBody)]">{content.eyebrow}</p>
            <h2 className="mt-4 whitespace-nowrap font-serif text-[clamp(2rem,5vw,3rem)] text-[var(--textBody)]">{content.title}</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {content.items.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.title}
                className="group h-full overflow-hidden rounded-[18px] border border-[color-mix(in_srgb,var(--borderSubtle)_70%,transparent)] bg-[var(--cardBackground)] shadow-[0_14px_34px_color-mix(in_srgb,var(--shadowColor)_28%,transparent)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_22px_48px_color-mix(in_srgb,var(--shadowColor)_38%,transparent)]"
              >
                <div className="relative h-64 overflow-hidden sm:h-72 xl:h-80">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(79,23,15,0.78)_100%)]" />
                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-[var(--buttonSecondary)] backdrop-blur-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-serif text-xl text-[var(--textBody)]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--textBody)]">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

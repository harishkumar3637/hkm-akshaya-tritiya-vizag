import { Button } from "@/components/ui/button";
import type { EventOverviewContent } from "@/data/events/types";

type EventOverviewSectionProps = {
  content: EventOverviewContent;
};

export function EventOverviewSection({ content }: EventOverviewSectionProps) {
  const [beforeKeyword, afterKeyword] = content.supportingText.includes("Akshaya Punya")
    ? content.supportingText.split("Akshaya Punya")
    : [content.supportingText, ""];

  return (
    <section className="bg-gradient-to-b from-[#fde9bf] via-[#f9dfa8] to-[#fde9bf] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 flex justify-center">
          <div className="inline-block rounded-full border-2 border-[#8b3a1f] px-6 py-2 bg-[#f2c26a]/20">
            <p className="text-center text-sm font-semibold tracking-widest text-[#8b3a1f] uppercase">
              {content.eyebrow}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-4 -right-4 top-0 h-1 bg-gradient-to-r from-transparent via-[#8b3a1f] to-transparent" />
          <h2 className="py-4 text-center font-serif text-3xl font-bold text-[#5a1a0f] sm:text-4xl">
            {content.title}
          </h2>
          <div className="absolute -left-4 -right-4 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#8b3a1f] to-transparent" />
        </div>

        <div className="relative mx-auto mt-6 max-w-3xl rounded-2xl border-4 border-[#8b3a1f] bg-gradient-to-br from-[#fff9f0] to-[#fde9bf] px-6 py-7 shadow-lg">
          <div className="absolute -top-5 left-8 inline-block bg-[#fde9bf] px-3">
            <span className="text-5xl font-serif text-[#8b3a1f]/30">&quot;</span>
          </div>

          <p className="text-center font-serif text-lg font-semibold text-[#333]">
            {content.quote}
          </p>

          <p className="mt-5 text-center text-base leading-relaxed text-[#333]">
            <span className="font-bold">{content.emphasis}</span>
            <span className="ml-1">
              {beforeKeyword}
              {afterKeyword ? <span className="italic">Akshaya Punya</span> : null}
              {afterKeyword}
            </span>
          </p>

          <div className="absolute -bottom-5 right-8 inline-block bg-[#fde9bf] px-3">
            <span className="text-5xl font-serif text-[#8b3a1f]/30">&quot;</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#8b3a1f]/60" />
          <div className="flex items-center gap-2">
            <span className="text-3xl text-[#8b3a1f]">{"\u2726"}</span>
            <span className="text-sm font-semibold text-[#8b3a1f] tracking-widest">{content.sacredDayLabel}</span>
            <span className="text-3xl text-[#8b3a1f]">{"\u2726"}</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#8b3a1f]/60" />
        </div>

        <div className="mt-7 grid items-center gap-6 rounded-2xl border-2 border-[#8b3a1f]/30 bg-white/40 p-5 backdrop-blur-sm lg:grid-cols-[minmax(360px,480px)_1fr] lg:gap-8 lg:p-6 xl:grid-cols-[minmax(420px,560px)_1fr]">
          <div className="overflow-hidden rounded-2xl border-4 border-[#8b3a1f] shadow-lg">
            <div className="relative aspect-video bg-black">
              <iframe
                src={content.video.src}
                title={content.video.title}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="mb-3 inline-block rounded-full border border-[#8b3a1f]/50 px-4 py-1 bg-[#f2c26a]/20">
              <span className="text-xs font-semibold tracking-widest text-[#8b3a1f] uppercase">{content.impactEyebrow}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-[#1a1a1a] sm:text-3xl">
              {content.heading}
              <br />
              <span className="text-[#8b3a1f]">{content.highlightedHeading}</span>
            </h3>

            <div className="mt-5 space-y-3 border-l-4 border-[#f2c26a] pl-5">
              {content.points.map((point) => (
                <p key={point} className="text-sm leading-relaxed text-[#333] sm:text-base">
                  <span className="inline-block mb-2">{"\u25C6"}</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#donation-form" className="inline-flex items-center gap-2 text-base font-semibold text-[#5a1a0f] hover:text-[#8b3a1f] transition-colors">
                {content.readMoreLabel}
                <span>{"\u2192"}</span>
              </a>
            </div>

            <div className="mt-5">
              <a href="#donation-form">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-[#8b3a1f] to-[#6b3d2f] px-8 text-white hover:from-[#6b3d2f] hover:to-[#5a3428] shadow-lg transition-all">
                  {content.donateLabel}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

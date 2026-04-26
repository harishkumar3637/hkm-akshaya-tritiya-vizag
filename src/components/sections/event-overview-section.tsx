import { Button } from "@/components/ui/button";
import type { EventOverviewContent } from "@/data/events/types";

type EventOverviewSectionProps = {
  content: EventOverviewContent;
};

export function EventOverviewSection({ content }: EventOverviewSectionProps) {
  const [beforeKeyword, afterKeyword] = content.supportingText.includes("Akshaya Punya")
    ? content.supportingText.split("Akshaya Punya")
    : [content.supportingText, ""];
  const isUploadedVideo =
    content.video.src.startsWith("data:video/") ||
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(content.video.src);

  return (
    <section className="bg-gradient-to-b from-[var(--decorativeSoft)] via-[color-mix(in_srgb,var(--decorativeAccent)_78%,white)] to-[var(--decorativeSoft)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-3 flex justify-center">
          <div className="inline-block rounded-full border-2 border-[var(--buttonPrimary)] bg-[color-mix(in_srgb,var(--decorativeAccent)_20%,transparent)] px-6 py-2">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-[var(--buttonPrimary)]">
              {content.eyebrow}
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-4 -right-4 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--buttonPrimary)] to-transparent" />
          <h2 className="py-4 text-center font-serif text-3xl font-bold text-[var(--textHeading)] sm:text-4xl">
            {content.title}
          </h2>
          <div className="absolute -left-4 -right-4 bottom-0 h-1 bg-gradient-to-r from-transparent via-[var(--buttonPrimary)] to-transparent" />
        </div>

        <div className="relative mx-auto mt-6 max-w-3xl rounded-2xl border-4 border-[var(--buttonPrimary)] bg-gradient-to-br from-[var(--cardRaisedBackground)] to-[var(--decorativeSoft)] px-6 py-7 shadow-lg">
          <div className="absolute -top-5 left-8 inline-block bg-[var(--decorativeSoft)] px-3">
            <span className="text-5xl font-serif text-[color-mix(in_srgb,var(--buttonPrimary)_30%,transparent)]">&quot;</span>
          </div>

          <p className="text-center font-serif text-lg font-semibold text-[var(--textHeading)]">
            {content.quote}
          </p>

          <p className="mt-5 text-center text-base leading-relaxed text-[var(--textHeading)]">
            <span className="font-bold">{content.emphasis}</span>
            <span className="ml-1">
              {beforeKeyword}
              {afterKeyword ? <span className="italic">Akshaya Punya</span> : null}
              {afterKeyword}
            </span>
          </p>

          <div className="absolute -bottom-5 right-8 inline-block bg-[var(--decorativeSoft)] px-3">
            <span className="text-5xl font-serif text-[color-mix(in_srgb,var(--buttonPrimary)_30%,transparent)]">&quot;</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[color-mix(in_srgb,var(--buttonPrimary)_60%,transparent)]" />
          <div className="flex items-center gap-2">
            <span className="text-3xl text-[var(--buttonPrimary)]">{"\u2726"}</span>
            <span className="text-sm font-semibold tracking-widest text-[var(--buttonPrimary)]">{content.sacredDayLabel}</span>
            <span className="text-3xl text-[var(--buttonPrimary)]">{"\u2726"}</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[color-mix(in_srgb,var(--buttonPrimary)_60%,transparent)]" />
        </div>

        <div className="mt-7 grid items-center gap-6 rounded-2xl border-2 border-[color-mix(in_srgb,var(--buttonPrimary)_30%,transparent)] bg-white/40 p-5 backdrop-blur-sm lg:grid-cols-[minmax(360px,480px)_1fr] lg:gap-8 lg:p-6 xl:grid-cols-[minmax(420px,560px)_1fr]">
          <div className="overflow-hidden rounded-2xl border-4 border-[var(--buttonPrimary)] shadow-lg">
            <div className="relative aspect-video bg-black">
              {isUploadedVideo ? (
                <video
                  src={content.video.src}
                  title={content.video.title}
                  className="absolute inset-0 h-full w-full"
                  controls
                  playsInline
                />
              ) : (
                <iframe
                  src={content.video.src}
                  title={content.video.title}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="mb-3 inline-block rounded-full border border-[color-mix(in_srgb,var(--buttonPrimary)_50%,transparent)] bg-[color-mix(in_srgb,var(--decorativeAccent)_20%,transparent)] px-4 py-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--buttonPrimary)]">{content.impactEyebrow}</span>
            </div>
            <h3 className="font-serif text-2xl font-bold leading-tight text-[var(--textHeading)] sm:text-3xl">
              {content.heading}
              <br />
              <span className="text-[var(--buttonPrimary)]">{content.highlightedHeading}</span>
            </h3>

            <div className="mt-5 space-y-3 border-l-4 border-[var(--decorativeAccent)] pl-5">
              {content.points.map((point) => (
                <p key={point} className="text-sm leading-relaxed text-[var(--textHeading)] sm:text-base">
                  <span className="inline-block mb-2">{"\u25C6"}</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>

            <div className="mt-5">
              <a href="#donation-form">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-[var(--buttonPrimary)] to-[var(--buttonHover)] px-8 text-[var(--textOnAccent)] shadow-lg transition-all hover:brightness-105">
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

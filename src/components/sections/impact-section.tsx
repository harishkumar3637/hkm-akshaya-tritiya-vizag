import type { ImpactContent } from "@/data/events/types";

type ImpactSectionProps = {
  content: ImpactContent;
};

export function ImpactSection({ content }: ImpactSectionProps) {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#671d13_0%,#8d2d17_35%,#c96b1e_72%,#f0b54d_100%)] px-6 py-8 text-white shadow-[0_34px_90px_rgba(104,34,16,0.24)] sm:px-8 sm:py-10 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe2a0]">{content.eyebrow}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{content.title}</h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/82">
                {content.description}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.cards.map((card) => (
                <div key={card.title} className="rounded-[24px] border border-white/18 bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#fff1cf]">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/78">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

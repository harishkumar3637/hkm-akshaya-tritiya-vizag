export function ImpactSection() {
  return (
    <section className="py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-[linear-gradient(120deg,#671d13_0%,#8d2d17_35%,#c96b1e_72%,#f0b54d_100%)] px-6 py-8 text-white shadow-[0_34px_90px_rgba(104,34,16,0.24)] sm:px-8 sm:py-10 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffe2a0]">Why This Day Matters</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                Akshaya Tritiya is revered as a day when spiritual merit multiplies and never fades.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/82">
                Offering seva on this day carries a deep devotional urgency. Donations help sustain worship, prasadam
                distribution, and care within the dham while giving devotees a meaningful way to participate from
                anywhere.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Festival Seva", "Support floral decoration, bhoga offerings, and sacred arrangements."],
                ["Annadan Impact", "Extend prasadam service to more visiting devotees and families."],
                ["Temple Care", "Help maintain the dham with beauty, cleanliness, and festive dignity."],
                ["Blessings", "Join collective prayers offered for donors and their loved ones."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[24px] border border-white/18 bg-white/10 p-4 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-[#fff1cf]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/78">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

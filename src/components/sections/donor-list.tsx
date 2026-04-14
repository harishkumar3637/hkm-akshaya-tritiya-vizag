import { recentDonors } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export function DonorList() {
  return (
    <section className="py-[72px] sm:py-[88px]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#b46e2f]">Recent Donors</p>
            <h2 className="mt-4 font-serif text-4xl text-[#FF9933] sm:text-5xl">Live-style donor feed</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#FF9933]">
            A scrollable list helps preserve the original donation-page feel while keeping the page compact on mobile.
          </p>
        </div>

        <Card className="mt-10 overflow-hidden border-[#f0dec0] bg-white">
          <CardContent className="p-0">
            <div className="grid grid-cols-[1.2fr_auto_auto] gap-4 border-b border-[#f2dfc4] bg-[#fff7ea] px-6 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#ab6a33]">
              <span>Devotee</span>
              <span>Amount</span>
              <span>Time</span>
            </div>
            <div className="max-h-[420px] overflow-y-auto">
              {recentDonors.map((donor, index) => (
                <div
                  key={`${donor.name}-${donor.time}`}
                  className="grid grid-cols-[1.2fr_auto_auto] items-center gap-4 border-b border-[#f7ebd8] px-6 py-4 text-sm text-[#6d371d] last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fff0ce_0%,#ffd28f_100%)] font-semibold text-[#8c431b]">
                      {donor.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{donor.name}</div>
                      <div className="text-xs text-[#9d6d4d]">Offering #{(index + 1).toString().padStart(3, "0")}</div>
                    </div>
                  </div>
                  <div className="font-semibold text-[#9c4318]">₹{donor.amount.toLocaleString("en-IN")}</div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[#b1743e]">{donor.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

import { DonationForm } from "@/components/sections/donation-form";
import { DonorPrivileges } from "@/components/sections/donor-privileges";
import { DonationHighlights } from "@/components/sections/donation-highlights";
import { EventOverviewSection } from "@/components/sections/event-overview-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ImportanceCarousel } from "@/components/sections/importance-carousel";
import { ContributorsSection } from "@/components/sections/contributors-section";
import { SevaGrid } from "@/components/sections/seva-grid";
import type { EventPageData } from "@/data/events/types";

type EventTemplateProps = {
  event: EventPageData;
};

export function EventTemplate({ event }: EventTemplateProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fffaf2_0%,#fff3df_42%,#fff8ef_100%)]">
      <HeroSection content={event.hero} />
      <div className="bg-[#fff4e4]">
        <EventOverviewSection content={event.overview} />
      </div>
      <ImportanceCarousel content={event.importance} />
      <div className="bg-[#fffaf2]">
        <ImpactSection content={event.impact} />
      </div>
      <div className="bg-[#fff4e4]">
        <DonorPrivileges content={event.privileges} />
      </div>
      <div className="bg-[#fffaf2]">
        <DonationHighlights content={event.donationHighlights} />
      </div>
      <div className="bg-[#fff4e4]">
        <SevaGrid content={event.seva} />
      </div>
      <DonationForm content={event.donationForm} />
      <div className="bg-[#fffaf2]">
        <ContributorsSection content={event.contributors} />
      </div>
      <Footer />
    </main>
  );
}

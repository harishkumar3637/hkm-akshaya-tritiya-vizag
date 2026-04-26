import { DonationForm } from "@/components/sections/donation-form";
import { DonorPrivileges } from "@/components/sections/donor-privileges";
import { DonationHighlights } from "@/components/sections/donation-highlights";
import { EventOverviewSection } from "@/components/sections/event-overview-section";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ImportanceCarousel } from "@/components/sections/importance-carousel";
import { ContributorsSection } from "@/components/sections/contributors-section";
import { GalleryCarousel } from "@/components/sections/gallery-carousel";
import { SevaGrid } from "@/components/sections/seva-grid";
import { EventThemeSync } from "@/components/event-theme-sync";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { EventPageData } from "@/data/events/types";
import { createSemanticTokens } from "@/lib/themes";
import type { CSSProperties } from "react";

type EventTemplateProps = {
  event: EventPageData;
};

export function EventTemplate({ event }: EventTemplateProps) {
  const themeStyles = createSemanticTokens(event.theme) as CSSProperties;

  return (
    <>
      <EventThemeSync theme={event.theme} />
      <main
        data-event-theme={event.theme.name}
        style={themeStyles}
        className="min-h-screen overflow-x-hidden bg-[image:var(--appBackgroundGradient)] text-textBody"
      >
        <HeroSection content={event.hero} />
        <div className="bg-sectionAltBackground">
          <EventOverviewSection content={event.overview} />
        </div>
        <div className="bg-sectionBackground">
          <DonationHighlights content={event.donationHighlights} />
        </div>
        <ImportanceCarousel content={event.importance} />
        <div className="bg-sectionBackground">
          <ImpactSection content={event.impact} />
        </div>
        <div className="bg-sectionAltBackground">
          <DonorPrivileges content={event.privileges} />
        </div>
        <div className="bg-sectionAltBackground">
          <SevaGrid content={event.seva} />
        </div>
        <DonationForm content={event.donationForm} />
        <div className="bg-sectionBackground">
          <ContributorsSection content={event.contributors} />
        </div>
        <GalleryCarousel content={event.gallery} />
        <Footer />
        <ThemeSwitcher />
      </main>
    </>
  );
}

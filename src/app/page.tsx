import { AkshayaTritiyaDaan } from "@/components/sections/akshaya-tritiya-daan";
import { AkshayaTritiyaSection } from "@/components/sections/akshaya-tritiya-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { DonationForm } from "@/components/sections/donation-form";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { ImportanceCarousel } from "@/components/sections/importance-carousel";
import { RespectedContributors } from "@/components/sections/respected-contributors";
import { SevaGrid } from "@/components/sections/seva-grid";
import { FestivalDonorPrivileges } from "../components/sections/festival-donor-privileges";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fffaf2_0%,#fff3df_42%,#fff8ef_100%)]">
      <HeroSection />
      <div className="bg-[#fff4e4]">
        <AkshayaTritiyaSection />
      </div>
      <ImportanceCarousel />
      <div className="bg-[#fffaf2]">
        <ImpactSection />
      </div>
      <div className="bg-[#fff4e4]">
        <FestivalDonorPrivileges />
      </div>
      <div className="bg-[#fffaf2]">
        <AkshayaTritiyaDaan />
      </div>
      {/* <BenefitsSection /> */}
      <div className="bg-[#fff4e4]">
        <SevaGrid />
      </div>
      <DonationForm />
      <div className="bg-[#fffaf2]">
        <RespectedContributors />
      </div>
      <Footer />
    </main>
  );
}

import {
  HeroSection,
  BenefitsSection,
  StatsSection,
  TimelineSection,
  PartnersSection,
  FAQSection,
  RegisterCTASection,
  FooterSection,
} from "@/src/components/sections";

export default function Home() {
  return (
    <main className="w-full bg-brand-bg text-brand-text">
      <HeroSection />
      {/* Mid sections: 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
        <div className="flex flex-col">
          <BenefitsSection />
        </div>
        <StatsSection />
      </div>
      <TimelineSection />
      <PartnersSection />
      <FAQSection />
      <RegisterCTASection />
      <FooterSection />
    </main>
  );
}

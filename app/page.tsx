import {
  HeroSection,
  BenefitsSection,
  WhatIsBAISection,
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
      <BenefitsSection />
      <WhatIsBAISection />
      <StatsSection />
      <TimelineSection />
      <PartnersSection />
      <FAQSection />
      <RegisterCTASection />
      <FooterSection />
    </main>
  );
}

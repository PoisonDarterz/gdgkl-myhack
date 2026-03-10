import {
  HeroSection,
  BenefitsSection,
  TimelineSection,
  PartnersSection,
  FAQSection,
  FooterSection,
} from "@/src/components/sections";

export default function Home() {
  return (
    <main className="w-full bg-brand-bg text-brand-text">
      <HeroSection />
      <BenefitsSection />
      <TimelineSection />
      <PartnersSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}

import React from "react";

const marqueeSponsors = [
  { label: "DIAMOND SPONSOR", name: "GOOGLE" },
  { label: "GOLD SPONSOR",    name: "SPONSOR" },
  { label: "SILVER SPONSOR",  name: "SPONSOR" },
  { label: "DIAMOND SPONSOR", name: "GOOGLE" },
];

// Doubled for seamless infinite loop
const marqueeItems = [...marqueeSponsors, ...marqueeSponsors];

const gridSponsors: { tier: string; tierColor: string; logo: React.ReactNode }[] = [
  {
    tier: "GOOGLE",
    tierColor: "bg-[#34A853]",
    logo: (
      <p className="font-sans text-5xl font-black tracking-tight select-none">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#34A853]">g</span>
        <span className="text-[#EA4335]">l</span>
        <span className="text-[#4285F4]">e</span>
      </p>
    ),
  },
  { tier: "", tierColor: "", logo: null },
  { tier: "", tierColor: "", logo: null },
];

export function PartnersSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      {/* header row */}
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
          PARTNERS
        </span>
      </div>

      {/* Marquee carousel strip */}
      <div className="overflow-hidden bg-brand-text">
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-8 py-4 shrink-0"
            >
              {/* pixelated icon placeholder */}
              <div className="grid grid-cols-2 gap-0.5 shrink-0">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="w-3 h-3 bg-white/70" />
                ))}
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor grid — 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-brand-text">
        {gridSponsors.map((sponsor, i) => (
          <div key={i} className="border-r border-b border-brand-text flex flex-col min-h-40">
            {sponsor.tier && (
              <div className={`px-3 py-1 ${sponsor.tierColor}`}>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                  {sponsor.tier}
                </span>
              </div>
            )}
            <div className="flex-1 flex items-center justify-center p-6">
              {sponsor.logo}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

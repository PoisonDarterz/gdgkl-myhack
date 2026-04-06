import React from "react";

const sponsors = [
  { label: "OFFICIAL SPONSOR", name: "GOOGLE",            img: null,                           tierColor: "bg-[#34A853]" },
  { label: "GOLD SPONSOR",     name: "DEVOTEAM",          img: "/sponsors/logo-devoteam.svg",  tierColor: "bg-amber-500" },
  { label: "SILVER SPONSOR",   name: "MONEYLION",         img: "/sponsors/logo-moneylion.svg", tierColor: "bg-slate-400" },
  { label: "VENUE SPONSOR",    name: "SUNWAY UNIVERSITY", img: "/sponsors/sunway-logo.webp",   tierColor: "bg-blue-600"  },
  { label: "VENUE SPONSOR",    name: "KL42",              img: "/sponsors/logo-kl42.png",      tierColor: "bg-blue-600"  },
  { label: "MAIN PARTNER",     name: "CRADLE FUNDS",      img: "/sponsors/logo-cradle.png",    tierColor: "bg-purple-700"},
];

// Doubled for seamless infinite loop
const marqueeItems = [...sponsors, ...sponsors];

const googleLogo = (
  <p className="font-sans text-5xl font-black tracking-tight select-none">
    <span className="text-[#4285F4]">G</span>
    <span className="text-[#EA4335]">o</span>
    <span className="text-[#FBBC05]">o</span>
    <span className="text-[#34A853]">g</span>
    <span className="text-[#EA4335]">l</span>
    <span className="text-[#4285F4]">e</span>
  </p>
);

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
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-6 w-auto object-contain brightness-0 invert shrink-0"
                />
              ) : (
                <p className="font-sans text-base font-black tracking-tight select-none shrink-0">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#34A853]">g</span>
                  <span className="text-[#EA4335]">l</span>
                  <span className="text-[#4285F4]">e</span>
                </p>
              )}
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor grid — 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-brand-text">
        {sponsors.map((sponsor, i) => (
          <div key={i} className="border-r border-b border-brand-text flex flex-col min-h-40">
            <div className={`px-3 py-1 ${sponsor.tierColor}`}>
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                {sponsor.label}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-800/90 backdrop-blur-sm">
              {sponsor.img ? (
                <img
                  src={sponsor.img}
                  alt={sponsor.name}
                  className="max-h-16 w-auto max-w-full object-contain drop-shadow-sm"
                />
              ) : (
                googleLogo
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

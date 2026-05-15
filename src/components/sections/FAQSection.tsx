"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "Who can register?",
    a: "Open to all developers, students, and AI enthusiasts in Malaysia. No prior AI experience is required — bring curiosity and a laptop.",
  },
  {
    q: "How large can teams be?",
    a: "Teams of 1 to 4 members.",
  },
  {
    q: "What should I build?",
    a: "Any project that meaningfully uses Google AI technologies — Gemini API, Vertex AI, Firebase AI, or Gemma. The theme is AI for Real Impact.",
  },
  {
    q: "Are there prizes?",
    a: "Winning teams receive Google hardware bundles, Google Cloud credits, and featured placement across GDG KL community channels.",
  },
  {
    q: "Do I need to bring a laptop?",
    a: "Yes, bring your own device. WiFi and power will be provided. Google Cloud credits will be distributed to all registered teams before the hackathon starts.",
  },
  {
    q: "Is food provided?",
    a: "Meals and refreshments are included for all registered participants for both days of the event.",
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section className="px-6 lg:px-8 py-6">
      {/* header row */}
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
          FAQ
        </span>
      </div>
      {/* accordion list */}
      <div className="border border-brand-text">
        {faqItems.map((item, i) => (
          <div
            key={i}
            className="border-b border-brand-muted/30 last:border-b-0"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-start items-center p-4 hover:bg-brand-text/5 text-left cursor-pointer"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`w-4 h-4 shrink-0 mr-3 transition-transform duration-300 ${openItems.has(i) ? "rotate-180" : ""}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              <span className="font-mono text-base font-bold text-brand-text flex-1">
                {item.q}
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems.has(i) ? "max-h-48" : "max-h-0"
              }`}
            >
              <div className="px-4 pb-4 pt-1">
                <p className="font-mono text-sm text-brand-muted leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

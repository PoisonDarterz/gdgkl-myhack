"use client";

const LOG_LINES = [
  "> INITIALIZING BUILD WITH AI PROGRAM...",
  "# BUILD WITH AI (BAI) IS A GOOGLE DEVELOPER GROUP INITIATIVE",
  "# CONNECTING LOCAL DEVELOPER COMMUNITIES TO GOOGLE AI TOOLS",
  "# FORMAT: HANDS-ON WORKSHOPS + REAL PROJECTS",
  "# PARTICIPANTS GAIN EXPERIENCE WITH GEMINI, VERTEX AI, AND MORE",
  "# GLOBAL REACH: 2,258 EVENTS. 178,000 DEVELOPERS TRAINED.",
  "> STATUS: ACTIVE — KUALA LUMPUR NODE ONLINE",
];

export function WhatIsBAISection() {
  return (
    <section className="w-full bg-background py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-4">
        {/* Section heading */}
        <h2 className="font-mono text-brand-muted uppercase tracking-widest text-xs mb-8">
          WHAT IS BUILD WITH AI?
        </h2>

        {/* Terminal block */}
        <div className="border border-brand-text bg-background font-mono text-brand-text">
          {/* Window chrome (title bar) */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-brand-text">
            {/* Traffic light dots */}
            <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            {/* Title */}
            <span className="ml-2 text-xs text-brand-muted tracking-widest">
              build-with-ai.sh
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6">
            {LOG_LINES.map((line, index) => (
              <p key={index} className="text-sm font-mono leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

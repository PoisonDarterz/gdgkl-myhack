"use client";

import { useState, useEffect, useRef } from "react";

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
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver trigger
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setHasAnimated(true);
          setIsAnimating(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Typewriter animation logic
  useEffect(() => {
    if (!isAnimating) return;

    let lineIndex = 0;
    let charIndex = 0;

    const typeNextChar = () => {
      if (lineIndex >= LOG_LINES.length) {
        setIsAnimating(false);
        return;
      }
      const currentLine = LOG_LINES[lineIndex];
      if (charIndex <= currentLine.length) {
        setCurrentLineText(currentLine.slice(0, charIndex));
        charIndex++;
        setTimeout(typeNextChar, 30);
      } else {
        // Line complete — commit it to visibleLines, pause, then next line
        setVisibleLines((prev) => [...prev, currentLine]);
        setCurrentLineText("");
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNextChar, 150);
      }
    };

    typeNextChar();
  }, [isAnimating]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-background py-16 lg:py-24"
    >
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
          <div className="p-6 min-h-[200px]">
            {visibleLines.map((line, index) => (
              <p key={index} className="text-sm font-mono leading-relaxed">
                {line}
              </p>
            ))}
            {isAnimating && currentLineText && (
              <p className="text-sm font-mono leading-relaxed">
                {currentLineText}
                <span className="animate-pulse">|</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

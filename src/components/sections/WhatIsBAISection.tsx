"use client";

import { useState, useEffect, useRef } from "react";

const FULL_TEXT =
  "Build with AI is a global series of community-led events focused on helping developers learn how to create safe, secure, and scalable solutions using Google's latest AI models and Cloud technology. These events go beyond simple presentations, offering hands-on workshops and technical sessions where you can actually build with the tools.";

export function WhatIsBAISection() {
  const [displayedText, setDisplayedText] = useState("");
  const [animating, setAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setHasAnimated(true);
          setAnimating(true);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!animating) return;

    let charIndex = 0;
    const timer = setInterval(() => {
      charIndex++;
      if (charIndex > FULL_TEXT.length) {
        clearInterval(timer);
        setAnimating(false);
      } else {
        setDisplayedText(FULL_TEXT.slice(0, charIndex));
      }
    }, 18);

    return () => clearInterval(timer);
  }, [animating]);

  return (
    <section className="p-6 lg:p-8 pt-8 lg:pt-10">
      {/* Bordered box with legend-style title */}
      <div ref={sectionRef} className="border border-brand-text relative">
        {/* Title overlapping the top border */}
        <span className="absolute top-0 left-4 -translate-y-1/2 bg-background px-1 font-mono text-xs font-bold tracking-wider uppercase">
          // WHAT IS BUILD WITH AI?
        </span>

        {/* Content row: text + hatched pattern */}
        <div className="flex">
          {/* Left: paragraph */}
          <div className="flex-1 p-5 pt-6">
            <p className="font-mono text-sm leading-relaxed text-brand-text">
              {displayedText}
              {animating && (
                <span className="animate-pulse ml-0.5">|</span>
              )}
            </p>
          </div>

          {/* Right: diagonal hatch block */}
          <div
            className="w-24 lg:w-32 shrink-0 border-l border-brand-text"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #282828 0px, #282828 2px, transparent 2px, transparent 10px)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  // Glitch text animation state
  const TARGET_TEXT = "start building the future today.";
  const GLITCH_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
  const TOTAL_FRAMES = 18;
  const [glitchText, setGlitchText] = useState(TARGET_TEXT);

  // Signal bracket swap animation state
  const [isDouble, setIsDouble] = useState(true);

  // Glitch text animation effect
  useEffect(() => {
    let frame = 0;

    const interval = setInterval(() => {
      frame++;

      if (frame >= TOTAL_FRAMES) {
        setGlitchText(TARGET_TEXT);
        clearInterval(interval);
        return;
      }

      let displayText = "";
      for (let i = 0; i < TARGET_TEXT.length; i++) {
        const settleFrame = Math.floor((i / TARGET_TEXT.length) * TOTAL_FRAMES);

        if (frame >= settleFrame) {
          displayText += TARGET_TEXT[i];
        } else {
          // Preserve spaces and punctuation
          if (TARGET_TEXT[i] === " " || TARGET_TEXT[i] === ".") {
            displayText += TARGET_TEXT[i];
          } else {
            displayText +=
              GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }
      }

      setGlitchText(displayText);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Signal bracket swap effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsDouble((prev) => !prev);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex gap-0 items-start w-full px-6 lg:px-8 py-8">
      {/* Left column */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Heading row: icon + h1 (KUALA LUMPUR is NOT in this row) */}
        <div className="flex items-end gap-4">
          <Image
            src="/images/bai_icon.svg"
            alt=""
            width={80}
            height={80}
            aria-hidden="true"
          />
          <h1 className="font-display text-8xl leading-none text-brand-text">
            Build With AI
          </h1>
        </div>

        {/* KUALA LUMPUR — own line below heading row */}
        <span className="font-retro text-xl tracking-widest text-brand-text uppercase block -mt-3">
          KUALA LUMPUR
        </span>

        {/* Description with glitch text */}
        <p className="font-mono text-base text-brand-muted max-w-lg">
          Gain real-world experience with Google&apos;s latest AI tools &amp;
          models and{" "}
          <span className="bg-brand-text text-white px-2 py-1">
            {glitchText}
          </span>
        </p>
      </div>

      {/* Right column: w-[420px], full bordered card */}
      <div className="w-[420px] shrink-0 flex flex-col gap-0">
        <div className="border border-brand-text flex flex-col">

          {/* Section A — Twin towers + CTA content */}
          <div className="flex">
            {/* Towers illustration */}
            <Image
              src="/images/twin-towers.svg"
              alt="Petronas Twin Towers"
              className="self-stretch object-contain shrink-0 w-[93px]"
              width={93}
              height={200}
            />

            {/* CTA content col */}
            <div className="flex-1 flex flex-col border-l border-brand-text">
              {/* Signal header bar */}
              <span className="font-mono text-white bg-brand-text px-3 py-2 text-xs tracking-widest uppercase text-center block">
                {isDouble ? "[[ SIGNAL RECEIVED ]]" : "[ SIGNAL RECEIVED ]"}
              </span>

              {/* HANDS-ON text */}
              <p className="font-mono text-brand-text text-xs tracking-widest uppercase font-bold italic text-center px-3 pt-3 pb-1">
                HANDS-ON AI TRAINING NEAR YOU.
              </p>

              {/* CTA row: arrows left, REGISTER NOW right */}
              <div className="flex flex-row items-center justify-between px-3 pb-3">
                <p className="font-mono text-brand-text text-sm">→ → →</p>
                <a
                  href="#"
                  className="inline-block bg-[#8CFF81] text-black font-bold font-mono text-xs tracking-widest uppercase px-4 py-2 hover:bg-green-700 transition-colors"
                >
                  REGISTER NOW
                </a>
              </div>
            </div>
          </div>

          {/* Section B — System log */}
          <div className="border-t border-brand-text px-4 py-3">
            <p className="font-mono text-xs text-brand-text font-semibold mb-1">
              [ SYSTEM LOG ]
            </p>
            <p className="font-mono text-xs text-brand-muted">
              # INITIALIZING ANTIGRAVITY.......///....OK
            </p>
            <p className="font-mono text-xs text-brand-muted">
              # DOWNLOADING GEMMA... COMPLETED
            </p>
            <p className="font-mono text-xs text-brand-muted">
              # CONNECTING TO GOOGLE CLOUD... ESTABLISHED
            </p>
          </div>

          {/* Section C — Stats row */}
          <div className="border-t border-brand-text flex">
            {/* Stat 1: Globe + global events */}
            <div className="flex-1 flex items-center gap-2 px-4 py-3 border-r border-brand-text">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="shrink-0 text-brand-text"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 1 0 20 14.5 14.5 0 0 1 0-20" />
                <path d="M2 12h20" />
              </svg>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-brand-text leading-none">
                  2,258
                </span>
                <span className="font-mono text-[10px] text-brand-muted leading-tight">
                  global events organized
                </span>
              </div>
            </div>

            {/* Stat 2: People + developers trained */}
            <div className="flex-1 flex items-center gap-2 px-4 py-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="shrink-0 text-brand-text"
              >
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
              </svg>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-brand-text leading-none">
                  178,000
                </span>
                <span className="font-mono text-[10px] text-brand-muted leading-tight">
                  developers trained
                </span>
              </div>
            </div>
          </div>

          {/* Section D — Recap video card */}
          <div className="border-t border-brand-text flex">
            {/* Left: dark thumbnail panel */}
            <div className="w-[120px] shrink-0 bg-brand-text flex flex-col items-center justify-center py-4 gap-1">
              <span className="font-display text-white text-base leading-none">
                Build
              </span>
              <span className="font-display text-white text-base leading-none">
                with AI
              </span>
              <span className="font-mono text-[#8CFF81] text-[10px] tracking-widest mt-1">
                GDG
              </span>
              <span className="font-mono text-white text-[10px]">2026</span>
            </div>

            {/* Right: recap video info */}
            <div className="flex-1 flex flex-col justify-center px-4 py-3 gap-1 border-l border-brand-text">
              <span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">
                [ RECAP VIDEO ]
              </span>
              <div className="flex items-center gap-2 mt-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-brand-text shrink-0"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span className="font-mono text-xs text-brand-text">
                  Watch recap
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  // Glitch text animation state
  const TARGET_TEXT = "start building the future today.";
  const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
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
            displayText += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
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
      setIsDouble(prev => !prev);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex gap-12 items-start py-8 w-full overflow-hidden">
      {/* Left column: heading row + description */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Heading row: signal icon + h1 + KUALA LUMPUR inline */}
        <div className="flex items-end gap-4">
          <Image
            src="/images/bai_icon.svg"
            alt=""
            width={56}
            height={56}
            aria-hidden="true"
          />
          <h1 className="font-display text-7xl lg:text-8xl leading-none text-brand-text">
            Build With AI
          </h1>
          <span className="font-retro text-2xl lg:text-3xl tracking-widest text-brand-text self-end pb-2">
            KUALA LUMPUR
          </span>
        </div>

        {/* Description with inverted highlight on last phrase */}
        <p className="font-mono text-sm text-brand-muted max-w-xl">
          Gain real-world experience with Google&apos;s latest AI tools &amp;
          models and{" "}
          <span className="bg-brand-text text-white px-1">
            {glitchText}
          </span>
        </p>
      </div>

      {/* Right column: bordered card + system log */}
      <div className="shrink-0 flex flex-col gap-4">
        {/* Card */}
        <div className="border border-brand-text flex">
          {/* Twin Towers illustration */}
          <Image
            src="/images/twin-towers.svg"
            alt="Petronas Twin Towers"
            width={100}
            height={160}
          />

          {/* CTA content */}
          <div className="flex flex-col gap-3 p-5 justify-between min-w-[200px]">
            <span className="font-mono text-white bg-brand-text px-3 py-1 text-xs tracking-widest uppercase self-start">
              {isDouble ? "[[ SIGNAL RECEIVED ]]" : "[ SIGNAL RECEIVED ]"}
            </span>
            <p className="font-mono text-brand-text text-xs tracking-widest uppercase font-bold italic">
              HANDS-ON AI TRAINING NEAR YOU.
            </p>
            <p className="font-mono text-brand-text text-sm tracking-wider">
              → → →
            </p>
            <a
              href="#"
              className="inline-block bg-green-700 text-white font-mono text-sm tracking-widest uppercase px-6 py-3 text-center hover:bg-green-800 transition-colors duration-200"
            >
              REGISTER NOW
            </a>
          </div>
        </div>

        {/* System log */}
        <div className="font-mono text-xs text-brand-muted flex flex-col gap-0.5">
          <p className="text-brand-text font-semibold mb-1">[ SYSTEM LOG ]</p>
          <p># INITIALIZING ANTIGRAVITY.......///....OK</p>
          <p># DOWNLOADING GEMMA... COMPLETED</p>
          <p># CONNECTING TO GOOGLE CLOUD... ESTABLISHED</p>
        </div>
      </div>
    </section>
  );
}

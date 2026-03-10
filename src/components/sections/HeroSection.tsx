"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const FULL_TEXT =
  "Build with AI is a global series of community-led events focused on helping developers learn how to create safe, secure, and scalable solutions using Google's latest AI models and Cloud technology. These events go beyond simple presentations, offering hands-on workshops and technical sessions where you can actually build with the tools.";

export function HeroSection() {
  // Glitch text animation state
  const TARGET_TEXT = "start building the future today.";
  const GLITCH_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
  const TOTAL_FRAMES = 18;
  const [glitchText, setGlitchText] = useState(TARGET_TEXT);

  // Signal bracket swap animation state
  const [isDouble, setIsDouble] = useState(true);

  // WhatIsBAI typewriter animation state
  const [displayedText, setDisplayedText] = useState("");
  const [animating, setAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stats count-up animation state
  const [events, setEvents] = useState(0);
  const [devs, setDevs] = useState(0);
  const statsHasAnimated = useRef(false);

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

  // WhatIsBAI IntersectionObserver — triggers once on scroll into view
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

  // WhatIsBAI character-by-character typing effect
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

  // Stats count-up animation effect — triggers once when hero is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsHasAnimated.current) {
          statsHasAnimated.current = true;
          observer.disconnect();

          const eventsTarget = 2258;
          const eventsIncrement = Math.ceil(eventsTarget / 60);
          let eventsCount = 0;
          const eventsInterval = setInterval(() => {
            eventsCount += eventsIncrement;
            if (eventsCount >= eventsTarget) {
              setEvents(eventsTarget);
              clearInterval(eventsInterval);
            } else {
              setEvents(eventsCount);
            }
          }, 25);

          const devsTarget = 178000;
          const devsIncrement = Math.ceil(devsTarget / 60);
          let devsCount = 0;
          const devsInterval = setInterval(() => {
            devsCount += devsIncrement;
            if (devsCount >= devsTarget) {
              setDevs(devsTarget);
              clearInterval(devsInterval);
            } else {
              setDevs(devsCount);
            }
          }, 25);

          return () => {
            clearInterval(eventsInterval);
            clearInterval(devsInterval);
          };
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col lg:flex-row justify-between gap-0 lg:items-stretch w-full px-6 lg:px-8 py-8">
      {/* Left column */}
      <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-[50%] h-full justify-between">
        {/* Top group: heading + description */}
        <div className="flex flex-col gap-6">
          {/* Heading row: icon + h1 + KUALA LUMPUR inline */}
          <div className="flex items-end gap-4">
            <Image
              src="/images/bai_icon.svg"
              alt=""
              width={80}
              height={80}
              aria-hidden="true"
            />
            <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl leading-none text-brand-text">
              Build With AI
            </h1>
            <span className="font-retro text-base sm:text-xl tracking-widest text-brand-text uppercase self-end pb-2">
              KUALA LUMPUR
            </span>
          </div>

          {/* Description with glitch text */}
          <p className="font-mono text-base sm:text-xl text-brand-muted max-w-lg">
            Gain real-world experience with Google&apos;s latest AI tools &amp;
            models and
            <br />
            <span className="bg-brand-text text-white px-2 py-1">
              {glitchText}
            </span>
          </p>
        </div>

        {/* WhatIsBAI bordered box — grows to fill remaining left column height */}
        <div ref={sectionRef} className="border border-brand-text relative flex-1">
          {/* Title overlapping the top border */}
          <span className="absolute top-0 left-4 -translate-y-1/2 bg-background px-1 font-mono text-xs font-bold tracking-wider uppercase">
            // WHAT IS BUILD WITH AI?
          </span>

          {/* Content row: text + hatched pattern */}
          <div className="flex h-full">
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
      </div>

      {/* Right column: card (signal + system log) + stats  — all equal height */}
      <div className="w-full lg:w-105 lg:shrink-0 flex flex-col h-full justify-between mt-6 lg:mt-0">

        {/* Section A — Twin towers + CTA content */}
        <div className="border border-brand-text flex">
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
            <div className="flex flex-row items-center justify-between mt-4 px-8 pb-3">
              <p className="font-mono text-brand-text text-sm">→ → →</p>
              <a
                href="#"
                className="inline-block bg-[#8CFF81] text-black font-bold font-mono text-md tracking-widest uppercase px-4 py-2 hover:bg-green-700 transition-colors"
              >
                REGISTER NOW
              </a>
            </div>
          </div>
        </div>

        {/* Section B — System log */}
        <div className="px-4 py-3">
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

        {/* Section C — Inline stats with SVG icons */}
        <div className="py-4 flex flex-col gap-4">
          {/* Stat row 1: globe + 2,258 */}
          <div className="flex flex-row items-center gap-4">
            <Image
              src="/images/earth.svg"
              alt="Globe"
              width={120}
              height={120}
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-6xl lg:text-7xl leading-none text-brand-text">
                {events.toLocaleString()}
              </span>
              <span className="font-mono text-lg text-brand-muted tracking-widest uppercase mt-1">
                global events organized
              </span>
            </div>
          </div>

          {/* Stat row 2: people + 178,000 */}
          <div className="flex flex-row items-center gap-4">
            <Image
              src="/images/people.svg"
              alt="People"
              width={120}
              height={120}
              className="shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display text-4xl sm:text-6xl lg:text-7xl leading-none text-brand-text">
                {devs.toLocaleString()}
              </span>
              <span className="font-mono text-lg text-brand-muted tracking-widest uppercase mt-1">
                developers trained
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

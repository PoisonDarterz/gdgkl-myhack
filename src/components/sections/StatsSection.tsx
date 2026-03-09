"use client";

import { useEffect, useRef, useState } from "react";

export function StatsSection() {
  const [events, setEvents] = useState(0);
  const [devs, setDevs] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          // Count up for events (2,258)
          const eventsTarget = 2258;
          const eventsIncrement = Math.ceil(eventsTarget / 60); // ~60 frames over 1.5s
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

          // Count up for developers (178,000)
          const devsTarget = 178000;
          const devsIncrement = Math.ceil(devsTarget / 60); // ~60 frames over 1.5s
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

          // Cleanup function
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
    <section ref={sectionRef} className="w-full py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* Events stat */}
        <div className="flex flex-col gap-2">
          <div className="font-display text-7xl lg:text-8xl text-brand-text">
            {events.toLocaleString()}
          </div>
          <div className="font-mono text-brand-muted text-sm tracking-widest uppercase">
            global events organized
          </div>
        </div>

        {/* Developers stat */}
        <div className="flex flex-col gap-2">
          <div className="font-display text-7xl lg:text-8xl text-brand-text">
            {devs.toLocaleString()}
          </div>
          <div className="font-mono text-brand-muted text-sm tracking-widest uppercase">
            developers trained
          </div>
        </div>
      </div>
    </section>
  );
}

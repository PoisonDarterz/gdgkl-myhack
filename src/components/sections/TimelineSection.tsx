type TimelineEvent = {
  month: string;
  day: string;
  name: string;
  description: string;
  type: string;
  link?: string;
};

const events: TimelineEvent[] = [
  { month: "APR", day: "9", name: "MEETUP #1", description: "Kick off Build with AI 2026 with GDG KL! Explore cutting-edge GenAI: Gemini 3, Veo 3 & more at Google Malaysia.", type: "meetup", link: "https://gdg.community.dev/e/mgkk2e/" },
  { month: "APR", day: "25", name: "WORKSHOP", description: "Hands-on session at Sunway University — build with Gemini 3 and Veo 3. Bring your own laptop.", type: "workshop" },
  { month: "MAY", day: "5", name: "MEETUP #2", description: "Dive deeper into GenAI: Gemini 3, Veo 3, Nano Banana & Antigravity on Google Cloud at Google Malaysia.", type: "meetup" },
  { month: "MAY", day: "16", name: "MYHACK OPENING", description: "24-hour hackathon begins at Sunway University. Build impactful AI solutions with Gemini 3.1 and Veo.", type: "hackathon", link: "https://forms.gle/7C1S7w2gjMVKfdgj9" },
  { month: "MAY", day: "17", name: "MYHACK CLOSING", description: "Showcase your project. Top teams win a guaranteed consultation with Cradle Fund VC partner.", type: "hackathon", link: "https://forms.gle/7C1S7w2gjMVKfdgj9" },
];

const typeHeaderStyles: Record<string, string> = {
  workshop:  "bg-[#FF9800] text-white",
  meetup:    "bg-[#2196F3] text-white",
  hackathon: "bg-[#D32F2F] text-white",
  talk:      "bg-[#2196F3] text-white",
  keynote:   "bg-[#FFD600] text-[#282828]",
  showcase:  "bg-[#9C27B0] text-white",
};

const GRID_SIZE = 8; // 2 rows × 4 cols

export function TimelineSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      {/* header row */}
      <div className="flex items-center gap-4 mb-6">
        <span className="bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
          TIMELINE
        </span>
      </div>

      {/* 2×4 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-brand-text">
        {Array.from({ length: GRID_SIZE }).map((_, i) => {
          const event = i < events.length ? events[i] : undefined;
          return event ? (
            <div key={i} className="border-r border-b border-brand-text flex flex-col">
              {/* type header */}
              <div className={`px-3 py-1.5 ${typeHeaderStyles[event.type]}`}>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                  {event.type}
                </span>
              </div>
              {/* date | content */}
              <div className="flex gap-0 flex-1">
                {/* date column */}
                <div className="flex flex-col items-center justify-center shrink-0 border-r border-brand-muted/30 px-3 py-3 gap-0">
                  <span className="font-mono text-[9px] uppercase text-brand-muted tracking-wide">{event.month}</span>
                  <span className="font-mono text-3xl font-black text-brand-text leading-none">{event.day}</span>
                </div>
                {/* event info */}
                <div className="flex flex-col justify-center gap-1 p-3">
                  <span className="font-mono text-[11px] font-bold text-brand-text uppercase tracking-wide leading-tight">
                    {event.name}
                  </span>
                  <p className="font-mono text-[10px] text-brand-muted leading-relaxed">
                    {event.description}
                  </p>
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-mono text-[10px] font-bold uppercase tracking-widest mt-1.5 ${
                        event.type === "meetup" ? "text-[#2196F3]" : "text-[#D32F2F]"
                      }`}
                    >
                      Register →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div key={i} className="border-r border-b border-brand-text" />
          );
        })}
      </div>
    </section>
  );
}

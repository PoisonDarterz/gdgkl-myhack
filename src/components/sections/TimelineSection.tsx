const events = [
  { month: "JAN", day: "24", name: "GEMINI API WORKSHOP", description: "Hands-on session building with the Gemini API — from first call to a working prototype.", type: "workshop" },
  { month: "JAN", day: "26", name: "VERTEX AI WORKSHOP", description: "Explore Vertex AI capabilities and deployment patterns for production-ready AI applications.", type: "workshop" },
  { month: "MAR", day: "31", name: "MEETUP #1", description: "Learn skills alongside your local developer community.", type: "meetup" },
  { month: "APR", day: "15", name: "MYHACK OPENING KEYNOTE", description: "Join us in the kickoff event to kick start MyHack!", type: "hackathon" },
  { month: "APR", day: "16", name: "MYHACK CLOSING", description: "Join us in the closing day of MyHack and win prizes.", type: "hackathon" },
  { month: "APR", day: "15", name: "MEETUP #2", description: "Learn skills alongside your local developer community.", type: "meetup" },
] as const;

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
        <span className="bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
          TIMELINE
        </span>
        <span className="font-mono text-sm text-brand-muted tracking-widest shrink-0">{`>>>`}</span>
        <div className="flex-1 border-t border-dashed border-brand-muted/60" />
      </div>

      {/* 2×4 grid */}
      <div className="grid grid-cols-4 border-l border-t border-brand-text">
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

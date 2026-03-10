const events = [
  { date: "DAY 1", time: "09:00", name: "OPENING KEYNOTE", description: "Welcome ceremony and event overview with featured speakers from Google and GDG KL.", type: "keynote" },
  { date: "DAY 1", time: "10:30", name: "GEMINI API WORKSHOP", description: "Hands-on session building with the Gemini API — from first call to a working prototype deployed on Firebase.", type: "workshop" },
  { date: "DAY 1", time: "14:00", name: "VERTEX AI DEEP DIVE", description: "Technical deep dive into Vertex AI capabilities and deployment patterns for production-ready AI applications.", type: "talk" },
  { date: "DAY 2", time: "09:00", name: "HACKATHON KICKOFF", description: "Teams lock in their ideas and begin building AI-powered solutions using Google's developer toolchain.", type: "hackathon" },
  { date: "DAY 2", time: "15:00", name: "PROJECT SHOWCASE", description: "Teams present completed projects to a panel of judges from Google and the developer community.", type: "showcase" },
  { date: "DAY 2", time: "17:30", name: "AWARDS + CLOSING", description: "Prize announcements, community recognitions, and closing remarks from GDG KL organisers.", type: "keynote" },
] as const;

const typeBadgeStyles: Record<string, string> = {
  workshop:  "bg-[#4CAF50] text-white",
  talk:      "bg-[#2196F3] text-white",
  keynote:   "bg-[#FFD600] text-[#282828]",
  hackathon: "bg-[#FF9800] text-white",
  showcase:  "bg-[#9C27B0] text-white",
};

export function TimelineSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      {/* header row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs font-bold border border-brand-text px-2 py-0.5 tracking-wider">
          [ TIMELINE ]
        </span>
        <span className="font-mono text-xs text-brand-muted tracking-widest">{`>>>`}</span>
        <div className="flex-1 border-t border-dashed border-brand-muted/60" />
      </div>
      {/* event entries */}
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div key={event.name} className="flex items-stretch gap-4">
            {/* date/time column */}
            <div className="w-24 shrink-0 flex flex-col justify-center gap-0.5">
              <span className="font-mono text-xs font-bold text-brand-text uppercase">{event.date}</span>
              <span className="font-mono text-xs text-brand-muted">{event.time}</span>
            </div>
            {/* event card */}
            <div className="flex-1 border border-brand-text h-28 overflow-hidden relative p-3 flex flex-col justify-between">
              <span className="font-mono text-sm font-bold text-brand-text uppercase tracking-wide">
                {event.name}
              </span>
              <p className="font-mono text-xs text-brand-muted leading-relaxed line-clamp-2">
                {event.description}
              </p>
              <div className="flex justify-end">
                <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 ${typeBadgeStyles[event.type]}`}>
                  {event.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

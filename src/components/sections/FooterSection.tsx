export function FooterSection() {
  return (
    <section className="w-full bg-brand-text">
      {/* Zone 1: top row — GDG logo box left, squares + links right */}
      <div className="flex items-start justify-between px-8 py-10">
        {/* Left: bordered GDG logo box */}
        <div className="border border-white/30 p-5 flex flex-col gap-2">
          <span className="text-white/50 text-xs font-mono tracking-widest uppercase">
            Brought to you by
          </span>
          <span className="text-white text-xs font-mono tracking-widest uppercase">
            Google Developer Group
          </span>
          <span className="text-white text-sm font-bold font-mono tracking-widest uppercase">
            Kuala Lumpur
          </span>
        </div>

        {/* Right: decorative squares + policy links */}
        <div className="flex flex-col items-end gap-4">
          {/* Three white squares */}
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-white" />
            <div className="w-4 h-4 bg-white" />
            <div className="w-4 h-4 bg-white" />
          </div>
          {/* Policy links */}
          <div className="flex gap-6 text-xs font-mono tracking-widest text-white/70 uppercase">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>

      {/* Zone 2: giant outlined REGISTER NOW full-width */}
      <div className="border-t border-white/20 px-4 pt-4 pb-2 overflow-hidden">
        <a href="#" className="block">
          <p
            style={{ WebkitTextStroke: "2px white", color: "transparent", fontFamily: "var(--font-instrument-serif)" }}
            className="text-[12vw] font-black tracking-tighter leading-none uppercase text-center"
          >
            REGISTER NOW
          </p>
        </a>
      </div>
    </section>
  );
}

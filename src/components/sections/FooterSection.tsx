import Image from "next/image";

export function FooterSection() {
  return (
    <section className="w-full bg-brand-text">
      {/* Zone 1: top row — GDG logo box left, barcode squares + links right */}
      <div className="flex flex-col sm:flex-row items-start sm:justify-between px-6 sm:px-8 py-8 sm:py-10 gap-6 sm:gap-0">
        {/* Left: bordered GDG logo box with logo inline */}
        <div className="border border-white/30 p-5 flex items-center gap-4">
          <Image
            src="/images/gdg_white.svg"
            alt="GDG KL"
            width={48}
            height={48}
          />
          <div className="flex flex-col gap-2">
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
        </div>

        {/* Right: decorative squares + policy links stacked vertically */}
        <div className="flex flex-col sm:items-end gap-6 sm:gap-8">
          {/* Three white squares (barcode design) */}
          <div className="flex gap-6">
            <div className="w-4 h-4 bg-white" />
            <div className="w-4 h-4 bg-white" />
            <div className="w-4 h-4 bg-white" />
          </div>
          {/* Policy links stacked vertically */}
          <div className="flex flex-col gap-2 text-xs font-mono tracking-widest text-white/70 uppercase items-end">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>

      {/* Zone 2: giant filled REGISTER NOW full-width with depth effect */}
      <div className="px-0 pt-4 pb-2 overflow-hidden">
        <a href="#" className="block">
          <div className="flex flex-col">
            <div>
              <div>
                {/* Copy 1: full brightness */}
                <p
                  style={{
                    WebkitTextStroke: "8px white",
                    color: "#282828",
                    paintOrder: "stroke fill",
                    fontFamily: "'Google Sans', sans-serif",
                  }}
                  className="text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-100 relative z-3"
                >
                  REGISTER NOW
                </p>

                {/* Copy 2: medium opacity, slightly offset */}
                <p
                  style={{
                    WebkitTextStroke: "8px white",
                    color: "#282828",
                    paintOrder: "stroke fill",
                    fontFamily: "'Google Sans', sans-serif",
                    marginTop: "-0.75em",
                  }}
                  className="text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-40 relative z-2"
                >
                  REGISTER NOW
                </p>

                {/* Copy 3: low opacity, further offset for depth */}
                <p
                  style={{
                    WebkitTextStroke: "8px white",
                    color: "#282828",
                    paintOrder: "stroke fill",
                    fontFamily: "'Google Sans', sans-serif",
                    marginTop: "-0.75em",
                  }}
                  className="text-[14vw] font-black tracking-tighter leading-none uppercase text-center opacity-20 relative z-1"
                >
                  REGISTER NOW
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

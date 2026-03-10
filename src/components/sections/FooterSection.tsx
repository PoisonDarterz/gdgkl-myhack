import Image from "next/image";

export function FooterSection() {
  return (
    <section className="w-full bg-brand-text">
      {/* Zone 1: top row — GDG logo box left, barcode squares + links right */}
      <div className="flex items-start justify-between px-8 py-10">
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
        <div className="flex flex-col items-end gap-4">
          {/* Three white squares (barcode design) */}
          <div className="flex gap-2">
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
      <div className="border-t border-white/20 px-0 pt-4 pb-2 overflow-hidden">
        <a href="#" className="block">
          <div className="flex flex-col">
            {/* Copy 1: full brightness */}
            <p
              style={{
                color: "white",
                fontFamily: "var(--font-google-sans)",
              }}
              className="text-[12vw] font-black tracking-tighter leading-none uppercase text-center opacity-100"
            >
              REGISTER NOW
            </p>
            {/* Copy 2: medium opacity, slightly offset */}
            <p
              style={{
                color: "white",
                fontFamily: "var(--font-google-sans)",
                marginTop: "-0.55em",
              }}
              className="text-[12vw] font-black tracking-tighter leading-none uppercase text-center opacity-40"
            >
              REGISTER NOW
            </p>
            {/* Copy 3: low opacity, further offset for depth */}
            <p
              style={{
                color: "white",
                fontFamily: "var(--font-google-sans)",
                marginTop: "-0.55em",
              }}
              className="text-[12vw] font-black tracking-tighter leading-none uppercase text-center opacity-20"
            >
              REGISTER NOW
            </p>
          </div>
        </a>
      </div>
    </section>
  );
}

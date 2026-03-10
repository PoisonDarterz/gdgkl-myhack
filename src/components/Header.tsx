import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-text px-6 py-4 flex items-center justify-between">
      {/* Left: GDG white logo + text */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/gdg_white.svg"
          alt="GDG logo"
          width={40}
          height={40}
        />
        <div className="flex flex-col border-l-2 border-white/30 pl-3">
          <span className="text-xs tracking-widest text-white/70 uppercase font-mono">
            Google Developer Group
          </span>
          <span className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            Kuala Lumpur
          </span>
        </div>
      </div>

      {/* Right: Instagram link — hidden on mobile, visible on md+ */}
      <a
        href="https://instagram.com/gdg.kl"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block text-xs font-mono tracking-widest text-white hover:text-white/70 transition-colors uppercase"
      >
        {">> CHECK OUT OUR INSTAGRAM <<"}
      </a>
    </header>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-brand-text">
      <div className="max-w-screen-xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left: GDG KL logo text */}
        <div className="flex flex-col border-l-2 border-white/30 pl-3">
          <span className="text-xs tracking-widest text-white/70 uppercase font-mono">
            Google Developer Group
          </span>
          <span className="text-sm font-bold text-white tracking-wide uppercase font-mono">
            Kuala Lumpur
          </span>
        </div>

        {/* Right: Instagram link */}
        <a
          href="https://instagram.com/gdgkl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono tracking-widest text-white hover:text-white/70 transition-colors uppercase"
        >
          {">> CHECK OUT OUR INSTAGRAM <<"}
        </a>
      </div>
    </header>
  );
}

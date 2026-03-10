export function PartnersSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      {/* header row */}
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-xs font-bold border border-brand-text px-2 py-0.5 tracking-wider">
          [ PARTNERS ]
        </span>
        <span className="font-mono text-xs text-brand-muted tracking-widest">{`>>>`}</span>
        <div className="flex-1 border-t border-dashed border-brand-muted/60" />
      </div>

      {/* Diamond tier — Google, oversized, centered, bordered */}
      <div className="flex flex-col items-center border border-brand-text p-8 mb-8 mx-auto max-w-xs">
        <p className="font-sans text-5xl font-black tracking-tight mb-2">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#34A853]">g</span>
          <span className="text-[#EA4335]">l</span>
          <span className="text-[#4285F4]">e</span>
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-muted">DIAMOND SPONSOR</span>
      </div>

      {/* Gold tier — 2 placeholder boxes */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-muted w-16 text-right shrink-0">GOLD</span>
        <div className="flex gap-4">
          {[1, 2].map(n => (
            <div key={n} className="w-32 h-16 border border-dashed border-brand-muted/60 flex items-center justify-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted/60">SPONSOR</span>
            </div>
          ))}
        </div>
      </div>

      {/* Silver tier — 3 placeholder boxes */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-muted w-16 text-right shrink-0">SILVER</span>
        <div className="flex gap-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="w-24 h-12 border border-dashed border-brand-muted/60 flex items-center justify-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted/60">SPONSOR</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bronze tier — 4 placeholder boxes */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-muted w-16 text-right shrink-0">BRONZE</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="w-20 h-10 border border-dashed border-brand-muted/60 flex items-center justify-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-brand-muted/60">SPONSOR</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

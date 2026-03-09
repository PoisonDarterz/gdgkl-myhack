const benefits = [
  {
    title: "PRACTICAL WORKSHOPS",
    description:
      "Use Google's integrated AI stack to solve real-world challenges, following a practical path from your first API call to a fully deployed application.",
  },
  {
    title: "MODERN AI TECH STACK",
    description:
      "Explore the full stack of Google AI. From the open-source power of Gemma to the enterprise scale of Vertex AI, see how the pieces fit together.",
  },
  {
    title: "PEER-TO-PEER GUIDANCE",
    description:
      "Work alongside our Google Developer Experts (GDEs) and local leads who share their honest experience building in the AI ecosystem.",
  },
];

export function BenefitsSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      {/* Header row */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-bold border border-brand-text px-2 py-0.5 tracking-wider">
          [ BENEFITS ]
        </span>
        <span className="font-mono text-xs text-brand-muted tracking-widest">
          {`>>>`}
        </span>
        <div className="flex-1 border-t border-dashed border-brand-muted/60" />
      </div>

      {/* Benefits list */}
      <div className="flex flex-col divide-y divide-dashed divide-brand-muted/30">
        {benefits.map(({ title, description }) => (
          <div key={title} className="flex flex-col py-5">
            <h3 className="font-mono text-sm font-bold text-brand-text mb-2">
              # {title}{" "}
              <span className="font-normal text-brand-muted/50 tracking-widest">
                ·········
              </span>
            </h3>
            <p className="font-mono text-xs text-brand-muted leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

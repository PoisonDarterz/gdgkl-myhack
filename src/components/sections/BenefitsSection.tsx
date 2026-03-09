export function BenefitsSection() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto flex flex-col gap-0">
        {/* Card 1: Practical Workshops */}
        <div className="border border-brand-text p-8 hover:bg-brand-text/5 transition-colors duration-200">
          <h3 className="font-mono text-brand-text text-xl mb-3">
            # PRACTICAL WORKSHOPS
          </h3>
          <p className="font-mono text-brand-muted text-sm leading-relaxed">
            Use Google&apos;s integrated AI stack to solve real-world challenges, following a practical path from your first API call to a fully deployed application.
          </p>
        </div>

        {/* Dot separator */}
        <div className="border-t border-dashed border-brand-muted/40"></div>

        {/* Card 2: Modern AI Tech Stack */}
        <div className="border border-brand-text p-8 hover:bg-brand-text/5 transition-colors duration-200">
          <h3 className="font-mono text-brand-text text-xl mb-3">
            # MODERN AI TECH STACK
          </h3>
          <p className="font-mono text-brand-muted text-sm leading-relaxed">
            Explore the full stack of Google AI. From the open-source power of Gemma to the enterprise scale of Vertex AI, see how the pieces fit together.
          </p>
        </div>

        {/* Dot separator */}
        <div className="border-t border-dashed border-brand-muted/40"></div>

        {/* Card 3: Peer-to-Peer Guidance */}
        <div className="border border-brand-text p-8 hover:bg-brand-text/5 transition-colors duration-200">
          <h3 className="font-mono text-brand-text text-xl mb-3">
            # PEER-TO-PEER GUIDANCE
          </h3>
          <p className="font-mono text-brand-muted text-sm leading-relaxed">
            Learn skills alongside your local developer community.
          </p>
        </div>
      </div>
    </section>
  );
}

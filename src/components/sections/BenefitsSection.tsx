import Image from "next/image";

const benefits = [
  {
    title: "PRACTICAL WORKSHOPS",
    description:
      "Use Google's integrated AI stack to solve real-world challenges, following a practical path from your first API call to a fully deployed application.",
    icon: "braces",
    iconColor: "text-[#4CAF50]",
  },
  {
    title: "MODERN AI TECH STACK",
    description:
      "Explore the full stack of Google AI. From the open-source power of Gemma to the enterprise scale of Vertex AI, see how the pieces fit together.",
    icon: "sparkle",
    iconColor: "text-[#2196F3]",
  },
  {
    title: "PEER-TO-PEER GUIDANCE",
    description:
      "Work alongside our Google Developer Experts (GDEs) and local leads who share their honest experience building in the AI ecosystem.",
    icon: "heart",
    iconColor: "text-[#F44336]",
  },
];

function BracesIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1" />
      <path d="M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BenefitIcon({ icon }: { icon: string }) {
  if (icon === "braces") return <BracesIcon />;
  if (icon === "sparkle") return <SparkleIcon />;
  if (icon === "heart") return <HeartIcon />;
  return null;
}

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
        {benefits.map(({ title, description, icon, iconColor }) => (
          <div key={title} className="flex items-start gap-3 py-5">
            {/* Colored icon */}
            <span className={`shrink-0 mt-0.5 ${iconColor}`}>
              <BenefitIcon icon={icon} />
            </span>

            {/* Text content */}
            <div className="flex flex-col gap-1">
              <h3 className="font-mono text-sm font-bold text-brand-text">
                # {title}{" "}
                <span className="font-normal text-brand-muted/50 tracking-widest">
                  ............
                </span>
              </h3>
              <p className="font-mono text-xs text-brand-muted leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* City landmarks row */}
      <div className="flex items-end justify-center gap-4 border-t border-dashed border-brand-muted/40 mt-2 pt-4 pb-2">
        <Image
          src="/images/kl-tower.svg"
          alt="KL Tower"
          width={32}
          height={60}
          className="object-contain opacity-60"
        />
        <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
        <Image
          src="/images/twin-towers.svg"
          alt="Petronas Twin Towers"
          width={40}
          height={60}
          className="object-contain opacity-60"
        />
        <span className="font-mono text-brand-muted/50 text-sm mb-2">+</span>
        <Image
          src="/images/kl-tower.svg"
          alt=""
          aria-hidden
          width={32}
          height={60}
          className="object-contain opacity-60"
        />
      </div>
    </section>
  );
}

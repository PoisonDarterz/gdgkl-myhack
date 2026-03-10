import Image from "next/image";
import { LandmarksRow } from "@/src/components/LandmarksRow";

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
  if (icon === "braces") return <Image src={"/images/braces.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
  if (icon === "sparkle") return <Image src={"/images/gemini.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
  if (icon === "heart") return <Image src={"/images/heart.svg"} alt={""} width={100} height={100} className="w-14 h-14 sm:w-[100px] sm:h-[100px]" />;
  return null;
}

function RecapVideoCard() {
  return (
    <div className="border border-brand-text flex flex-col h-full relative">

      {/* RECAP VIDEO red label — top-left absolute */}
      <div className="absolute top-0 left-0 bg-[#FF0000] px-2 py-0.5 z-10">
        <span className="font-mono text-white text-[10px] font-bold uppercase tracking-widest">
          RECAP VIDEO
        </span>
      </div>

      {/* Main two-panel row — fills available height */}
      <div className="flex flex-row flex-1 min-h-0">

        {/* Left dark panel */}
        <div className="w-[55%] bg-[#1a1a1a] flex flex-col justify-between p-4 pt-7">
          {/* Top: Build with AI heading */}
          <div>
            <div className="font-mono text-xs text-white leading-snug mb-3">
              <span className="text-[#FFD600] text-base font-bold">{"{"}</span>
              <span className="text-white font-bold text-sm mx-1">Build</span>
              <span className="text-[#FFD600] text-base font-bold">{"}"}</span>
              <span className="text-white font-bold text-sm mx-1">with AI</span>
            </div>
            <p className="font-mono text-[10px] text-white/70 uppercase tracking-wider mb-2">
              Google Developer<br />Groups
            </p>
            {/* KL badge */}
            <span className="inline-block font-mono text-[9px] text-white/80 border border-white/30 rounded-full px-2 py-0.5 mb-3">
              Kuala Lumpur
            </span>
            {/* Wavy lines — 3 rows of tilde chars */}
            <div className="font-mono text-[#FFD600]/40 text-[10px] leading-tight mb-3">
              <div>~ ~ ~ ~ ~ ~ ~ ~</div>
              <div>~ ~ ~ ~ ~ ~ ~ ~</div>
              <div>~ ~ ~ ~ ~ ~ ~ ~</div>
            </div>
            {/* Google tech color dots row */}
            <div className="flex gap-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
              <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
              <span className="w-2 h-2 rounded-full bg-[#34A853]" />
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
            </div>
          </div>
          {/* Bottom: 2026 yellow circle badge */}
          <div className="flex justify-end">
            <div className="w-9 h-9 rounded-full bg-[#FFD600] flex items-center justify-center">
              <span className="font-mono text-[#1a1a1a] text-[10px] font-bold">2026</span>
            </div>
          </div>
        </div>

        {/* Right watch-recap panel */}
        <div className="flex-1 bg-[#F5F5F5] flex flex-col items-center justify-center gap-2 border-l border-brand-text/20">
          {/* Play triangle */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" stroke="#111" strokeWidth="1.5" />
            <polygon points="10,8 18,12 10,16" fill="#111" />
          </svg>
          <span className="font-mono text-[10px] text-brand-text uppercase tracking-wider text-center px-2">
            Watch recap
          </span>
        </div>

      </div>

      {/* Bottom info bar */}
      <div className="border-t border-brand-text/30 px-3 py-2 flex items-center gap-2">
        {/* YouTube icon (red rectangle with play) */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect width="16" height="12" rx="2" fill="#FF0000" />
          <polygon points="6,3 12,6 6,9" fill="white" />
        </svg>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[9px] font-bold text-brand-text uppercase tracking-wider truncate">
            BUILD WITH AI RECAP 2025
          </p>
          <a
            href="https://youtu.be/46dB6AAcmTI"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] text-brand-muted hover:text-brand-text"
          >
            youtu.be/46dB6AAcmTI
          </a>
        </div>
        {/* Barcode pattern — thin vertical lines */}
        <div className="flex gap-px items-center shrink-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-brand-text/60"
              style={{ width: i % 3 === 0 ? 2 : 1, height: i % 2 === 0 ? 18 : 12 }}
            />
          ))}
        </div>
        <span className="font-mono text-[9px] text-brand-muted ml-1 shrink-0">1:36:46</span>
      </div>

    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left: existing content */}
        <div className="w-full lg:w-[70%] flex flex-col">
          {/* Header row */}
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-brand-text text-white font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-5xl font-black tracking-widest uppercase px-4 py-2 shrink-0">
              BENEFITS
            </span>
          </div>

          {/* Benefits list */}
          <div className="flex flex-col">
            {benefits.map(({ title, description, icon, iconColor }) => (
              <div key={title} className="flex items-start gap-3 py-5">
                {/* Colored icon */}
                <span className={`shrink-0 mt-0.5 ${iconColor}`}>
                  <BenefitIcon icon={icon} />
                </span>

                {/* Text content */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono text-lg font-bold text-brand-text">
                    # {title}{" "}
                    <span className="font-normal text-brand-muted/50 tracking-widest">
                      ............
                    </span>
                  </h3>
                  <p className="font-mono text-md text-brand-muted leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right: Recap video card */}
        <div className="shrink-0 w-full lg:w-auto mt-4 lg:mt-0 min-h-70 lg:min-h-0 lg:self-stretch">
          <RecapVideoCard />
        </div>
      </div>

      {/* City landmarks row — full width, animated */}
      <LandmarksRow />
    </section>
  );
}

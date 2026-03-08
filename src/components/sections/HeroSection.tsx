import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full overflow-hidden flex items-end justify-between py-20">
      {/* Left column: Twin Towers illustration */}
      <div className="shrink-0 self-end">
        <Image
          src="/images/twin-towers.svg"
          alt="Petronas Twin Towers"
          width={200}
          height={320}
        />
      </div>

      {/* Center column: All text content */}
      <div className="flex flex-col items-center text-center gap-6">
        {/* Signal received badge */}
        <span className="font-mono text-white bg-brand-text px-4 py-1 rounded-full text-sm tracking-widest uppercase">
          {`[[ SIGNAL RECEIVED ]]`}
        </span>

        {/* Main heading */}
        <h1 className="font-display text-7xl lg:text-8xl leading-none text-brand-text">
          Build With AI
        </h1>

        {/* City subheading */}
        <p className="font-retro text-4xl lg:text-5xl tracking-widest text-brand-text">
          KUALA LUMPUR
        </p>

        {/* Tagline / description */}
        <p className="font-mono text-sm text-brand-muted max-w-md">
          Gain real-world experience with Google&apos;s latest AI tools &amp;
          models and start building the future today.
        </p>

        {/* CTA button */}
        <a
          href="#"
          className="inline-block border border-brand-text text-brand-text font-mono text-sm tracking-widest uppercase px-8 py-3 hover:bg-brand-text hover:text-white transition-colors duration-200"
        >
          REGISTER NOW
        </a>
      </div>

      {/* Right column: KL Tower + Signal icon */}
      <div className="flex flex-col items-center gap-4 shrink-0 self-end">
        <Image
          src="/images/signal-icon.svg"
          alt=""
          width={80}
          height={80}
          aria-hidden="true"
        />
        <Image
          src="/images/kl-tower.svg"
          alt="KL Tower"
          width={120}
          height={280}
        />
      </div>
    </section>
  );
}

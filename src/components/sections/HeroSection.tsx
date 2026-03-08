import Image from "next/image";

export function HeroSection() {
  return (
    <section className="flex gap-12 items-start py-20 w-full overflow-hidden">
      {/* Left column: heading row + description */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Heading row: signal icon + h1 + KUALA LUMPUR inline */}
        <div className="flex items-end gap-4">
          <Image
            src="/images/signal-icon.svg"
            alt=""
            width={56}
            height={56}
            aria-hidden="true"
          />
          <h1 className="font-display text-7xl lg:text-8xl leading-none text-brand-text">
            Build With AI
          </h1>
          <span className="font-retro text-2xl lg:text-3xl tracking-widest text-brand-text self-end pb-2">
            KUALA LUMPUR
          </span>
        </div>

        {/* Description with inverted highlight on last phrase */}
        <p className="font-mono text-sm text-brand-muted max-w-xl">
          Gain real-world experience with Google&apos;s latest AI tools &amp; models and{" "}
          <span className="bg-brand-text text-white px-1">start building the future today.</span>
        </p>
      </div>

      {/* Right column: bordered card + system log */}
      <div className="shrink-0 flex flex-col gap-4">
        {/* Card */}
        <div className="border border-brand-text flex">
          {/* Twin Towers illustration */}
          <Image
            src="/images/twin-towers.svg"
            alt="Petronas Twin Towers"
            width={160}
            height={260}
          />

          {/* CTA content */}
          <div className="flex flex-col gap-3 p-5 justify-between min-w-[200px]">
            <span className="font-mono text-white bg-brand-text px-3 py-1 text-xs tracking-widest uppercase self-start">
              {`[[ SIGNAL RECEIVED ]]`}
            </span>
            <p className="font-mono text-brand-text text-xs tracking-widest uppercase">
              HANDS-ON AI TRAINING NEAR YOU.
            </p>
            <p className="font-mono text-brand-text text-sm tracking-wider">
              → → →
            </p>
            <a
              href="#"
              className="inline-block bg-green-700 text-white font-mono text-sm tracking-widest uppercase px-6 py-3 text-center hover:bg-green-800 transition-colors duration-200"
            >
              REGISTER NOW
            </a>
          </div>
        </div>

        {/* System log */}
        <div className="font-mono text-xs text-brand-muted flex flex-col gap-0.5">
          <p className="text-brand-text font-semibold mb-1">[ SYSTEM LOG ]</p>
          <p># INITIALIZING ANTIGRAVITY.......///....OK</p>
          <p># DOWNLOADING GEMMA... COMPLETED</p>
          <p># CONNECTING TO GOOGLE CLOUD... ESTABLISHED</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ICONS = [
  { src: "/images/kl-tower.svg", alt: "KL Tower" },
  { src: "/images/twin-towers.svg", alt: "Petronas Twin Towers" },
  { src: "/images/tmtower.svg", alt: "TM Tower" },
];

export function LandmarksRow() {
  // Each slot starts at a different index so they display different buildings initially
  const [indices, setIndices] = useState([0, 1, 2]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      // After 150ms, advance indices and fade back in
      setTimeout(() => {
        setIndices((prev) => prev.map((i) => (i + 1) % 3));
        setVisible(true);
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-end justify-around w-full py-4">
      <span className="font-mono text-brand-muted/50 text-lg pb-2">+</span>

      <div
        className="transition-opacity duration-150 h-[60px] w-[40px] flex items-end justify-center"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={ICONS[indices[0]].src}
          alt={ICONS[indices[0]].alt}
          width={40}
          height={60}
          className="opacity-60 object-contain"
        />
      </div>

      <span className="font-mono text-brand-muted/50 text-lg pb-2">+</span>

      <div
        className="transition-opacity duration-150 h-[60px] w-[40px] flex items-end justify-center"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={ICONS[indices[1]].src}
          alt={ICONS[indices[1]].alt}
          width={40}
          height={60}
          className="opacity-60 object-contain"
        />
      </div>

      <span className="font-mono text-brand-muted/50 text-lg pb-2">+</span>

      <div
        className="transition-opacity duration-150 h-[60px] w-[40px] flex items-end justify-center"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={ICONS[indices[2]].src}
          alt={ICONS[indices[2]].alt}
          width={40}
          height={60}
          className="opacity-60 object-contain"
        />
      </div>

      <span className="font-mono text-brand-muted/50 text-lg pb-2">+</span>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BUILDINGS = [
  { src: "/images/kltower.svg", alt: "KL Tower" },
  { src: "/images/big_union.svg", alt: "Asterisk" },
  { src: "/images/tmtower.svg", alt: "TM Tower" },
];

const UnionIcon = () => (
  <div className="flex items-center justify-center w-5 h-5 sm:w-10 sm:h-10">
    <Image
      src="/images/union.svg"
      alt="separator"
      width={36}
      height={36}
      className="opacity-50"
    />
  </div>
);

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
    <div className="min-h-16 sm:min-h-32 flex items-center justify-around w-full mt-6 border-brand-muted/40">
      <UnionIcon />

      <div
        className="transition-opacity duration-150 w-7 sm:w-12.5 flex items-end justify-center overflow-hidden"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={BUILDINGS[indices[0]].src}
          alt={BUILDINGS[indices[0]].alt}
          width={50}
          height={70}
          className="opacity-60 object-contain object-bottom"
        />
      </div>

      <UnionIcon />

      <div
        className="transition-opacity duration-150 w-7 sm:w-12.5 flex items-end justify-center overflow-hidden"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={BUILDINGS[indices[1]].src}
          alt={BUILDINGS[indices[1]].alt}
          width={50}
          height={70}
          className="opacity-60 object-contain object-bottom"
        />
      </div>

      <UnionIcon />

      <div
        className="transition-opacity duration-150 w-7 sm:w-12.5 flex items-end justify-center overflow-hidden"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <Image
          src={BUILDINGS[indices[2]].src}
          alt={BUILDINGS[indices[2]].alt}
          width={50}
          height={70}
          className="opacity-60 object-contain object-bottom"
        />
      </div>

      <UnionIcon />
    </div>
  );
}

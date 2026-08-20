"use client";

import { useEffect, useRef } from "react";
import CrystalCard from "./CrystalCard";
import type { CrystalBottle as CrystalBottleType } from "../data/site";

const SPEED = 55;

export default function CrystalMarquee({
  items,
  direction = "right-to-left",
}: {
  items: CrystalBottleType[];
  direction?: "right-to-left" | "left-to-right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sign = direction === "left-to-right" ? 1 : -1;
    let raf = 0;
    const tick = (t: number) => {
      const half = track.scrollWidth / 2;
      if (half > 0) {
        const offset = ((t * SPEED) / 1000) % half;
        track.style.transform = `translateX(${sign * offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#050505] to-transparent sm:w-28"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#050505] to-transparent sm:w-28"
      />
      <div ref={trackRef} className="flex w-max items-stretch gap-10 will-change-transform">
        {doubled.map((bottle, i) => (
          <div key={`${bottle.id}-${i}`} className="w-[220px] shrink-0">
            <CrystalCard bottle={bottle} />
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import CrystalBottle from "./CrystalBottle";
import { usePayment } from "./PaymentProvider";
import { crystalBottles, formatPrice } from "../data/site";

export default function CrystalWave() {
  const { openPayment } = usePayment();
  const bottleRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const pausedRef = useRef(false);
  const count = crystalBottles.length;

  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      if (!pausedRef.current) {
        const speed = t / 1000;
        crystalBottles.forEach((bottle, i) => {
          const el = bottleRefs.current.get(bottle.id);
          if (!el) return;
          const phase = speed * 1.6 + (i * Math.PI * 2) / count;
          const y = Math.sin(phase) * 80;
          const tilt = Math.cos(phase) * 9;
          el.style.transform = `translate(-50%, -50%) translateY(${y}px) rotate(${tilt}deg)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  return (
    <article
      className="group glass relative flex h-full min-h-[520px] flex-col overflow-hidden rounded-[26px] border-dashed p-6 pt-10 text-center transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/40"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-ocean-500/20 blur-[80px]"
      />
      <h3 className="font-serif text-2xl text-pearl sm:text-3xl">The Crystal Wave</h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-mist">
        Our crystal collection rides the ocean swell — tap any bottle to order.
      </p>

      <div className="relative mt-4 flex-1">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 h-36 w-full -translate-y-1/2 text-gold-300/25"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,50 C8,32 17,32 25,50 C33,68 42,68 50,50 C58,32 67,32 75,50 C83,68 92,68 100,50"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 2.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {crystalBottles.map((bottle, i) => (
          <button
            key={bottle.id}
            ref={(el) => {
              if (el) bottleRefs.current.set(bottle.id, el);
              else bottleRefs.current.delete(bottle.id);
            }}
            type="button"
            onClick={() =>
              openPayment({
                id: bottle.id,
                name: bottle.name,
                price: bottle.price,
                size: bottle.size,
                image: bottle.image,
              })
            }
            aria-label={`Order ${bottle.name} — complete payment`}
            className="group/bottle absolute left-0 top-1/2 cursor-pointer will-change-transform"
            style={{ left: `${((i + 0.5) * 100) / count}%`, zIndex: i }}
          >
            <CrystalBottle
              src={bottle.image}
              alt={`${bottle.name} — crystal perfume bottle by The Ocean Perfumes`}
              glowClass={bottle.glow}
              size="small"
              spin="none"
              float={false}
              imageClassName="w-16 sm:w-24 lg:w-28"
            />
            <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-full border border-gold-300/40 bg-ocean-950/85 px-2.5 py-1 text-[11px] font-bold text-gold-gradient opacity-0 shadow-gold backdrop-blur-md transition-all duration-300 group-hover/bottle:opacity-100 max-md:hidden">
              {formatPrice(bottle.price)}
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

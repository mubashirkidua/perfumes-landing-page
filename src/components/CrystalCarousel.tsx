"use client";

import { useEffect, useRef } from "react";
import CrystalBottle from "./CrystalBottle";
import { usePayment } from "./PaymentProvider";
import { crystalBottles, formatPrice } from "../data/site";

export interface CarouselItem {
  id: string;
  name: string;
  tag?: string;
  image: string;
  glowClass: string;
  price: number;
}

const DEFAULT_ITEMS: CarouselItem[] = crystalBottles.map((b) => ({
  id: b.id,
  name: b.name,
  tag: b.subtitle,
  image: b.image,
  glowClass: b.glow,
  price: b.price,
}));

function CarouselCard({
  item,
  imageClassName,
}: {
  item: CarouselItem;
  imageClassName: string;
}) {
  const { openPayment } = usePayment();

  return (
    <button
      type="button"
      onClick={() =>
        openPayment({
          id: item.id,
          name: item.name,
          price: item.price,
          size: "50ml Eau de Parfum",
          image: item.image,
        })
      }
      aria-label={`Order ${item.name} — complete payment`}
      className="group/card relative flex w-[170px] flex-col items-center text-center"
    >
      <CrystalBottle
        src={item.image}
        alt={`${item.name} — crystal perfume bottle by The Ocean Perfumes`}
        glowClass={item.glowClass}
        size="small"
        spin="none"
        float={false}
        imageClassName={imageClassName}
      />
      <p className="mt-3 font-serif text-base font-semibold text-pearl drop-shadow-lg sm:text-lg">
        {item.name}
      </p>
      <div className="pointer-events-none absolute -bottom-7 translate-y-2 opacity-0 transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 max-md:translate-y-0 max-md:opacity-100">
        <span className="whitespace-nowrap rounded-full border border-gold-300/40 bg-ocean-950/85 px-4 py-2 text-[13px] font-bold text-gold-gradient shadow-gold backdrop-blur-md">
          {formatPrice(item.price)}
        </span>
      </div>
      <span className="pointer-events-none absolute -bottom-16 translate-y-2 rounded-full border border-gold-300/50 bg-gold-300/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-gold-200 uppercase opacity-0 backdrop-blur-md transition-all duration-500 group-hover/card:translate-y-0 group-hover/card:opacity-100 max-md:hidden">
        Click to Order
      </span>
    </button>
  );
}

export default function CrystalCarousel({
  items = DEFAULT_ITEMS,
  radius = 240,
  duration = 26000,
  imageClassName = "w-32 sm:w-36",
  stageClassName = "h-[600px] w-[600px]",
}: {
  items?: CarouselItem[];
  radius?: number;
  duration?: number;
  imageClassName?: string;
  stageClassName?: string;
}) {
  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const pausedRef = useRef(false);

  useEffect(() => {
    const count = items.length;
    let raf = 0;
    const tick = (t: number) => {
      if (!pausedRef.current) {
        const angle = ((t % duration) / duration) * 360;
        items.forEach((item, i) => {
          const el = itemsRef.current.get(item.id);
          if (!el) return;
          const a = angle + (i * 360) / count;
          el.style.transform = `translate(-50%, -50%) rotate(${a}deg) translateX(${radius}px) rotate(${-a}deg)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items, radius, duration]);

  return (
    <div
      className="group relative mx-auto flex items-center justify-center overflow-visible"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-600/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[calc(100%-6rem)] w-[calc(100%-6rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-300/15"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[calc(100%-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
      />

      <div className={`relative ${stageClassName}`}>
        {items.map((item, i) => {
          const base = (i * 360) / items.length;
          return (
            <div
              key={item.id}
              ref={(el) => {
                if (el) itemsRef.current.set(item.id, el);
                else itemsRef.current.delete(item.id);
              }}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                transform: `translate(-50%, -50%) rotate(${base}deg) translateX(${radius}px) rotate(${-base}deg)`,
              }}
            >
              <CarouselCard item={item} imageClassName={imageClassName} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

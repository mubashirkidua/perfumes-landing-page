"use client";

import CrystalBottle from "./CrystalBottle";
import { usePayment } from "./PaymentProvider";
import { useCatalog } from "./CatalogProvider";
import { formatPrice, type CrystalBottle as CrystalBottleType } from "../data/site";

export default function CrystalCard({
  bottle,
}: {
  bottle: CrystalBottleType;
}) {
  const { openPayment } = usePayment();
  const { getItem } = useCatalog();
  const live = getItem(bottle.id);
  const price = live?.price ?? bottle.price;
  const stock = live?.stock ?? 50;
  const outOfStock = stock <= 0;

  return (
    <div className="group relative flex h-full flex-col items-center text-center">
      <div className="relative w-full">
        <CrystalBottle
          src={bottle.image}
          alt={`${bottle.name} — crystal perfume bottle by The Ocean Perfumes`}
          glowClass={bottle.glow}
          size="medium"
          spin="none"
          float={false}
        />
        {outOfStock ? (
          <span className="absolute inset-x-4 bottom-0 z-20 flex items-center justify-center rounded-full border border-red-400/50 bg-ocean-950/85 px-4 py-3 text-[11px] font-bold tracking-[0.18em] text-red-300 uppercase backdrop-blur-md">
            Out of Stock
          </span>
        ) : (
          <button
            type="button"
            onClick={() =>
              openPayment({
                id: bottle.id,
                name: bottle.name,
                price,
                size: bottle.size,
                image: bottle.image,
              })
            }
            aria-label={`Complete payment for ${bottle.name}`}
            className="absolute inset-x-4 bottom-0 z-20 flex items-center justify-center gap-2 rounded-full border border-gold-300/50 bg-ocean-950/80 px-4 py-3 text-[11px] font-bold tracking-[0.18em] text-gold-200 uppercase opacity-0 shadow-[0_0_30px_-6px_rgba(214,179,106,0.5)] backdrop-blur-md transition-all duration-500 hover:border-gold-300 hover:bg-gold-300 hover:text-ocean-950 group-hover:opacity-100 group-focus-within:opacity-100 max-md:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
              <path d="M2.5 10h19M6 15h4" strokeLinecap="round" />
            </svg>
            Order Now
          </button>
        )}
      </div>

      <h3 className={`mt-6 font-serif text-lg text-pearl sm:text-xl ${bottle.color}`}>
        {bottle.name}
      </h3>
      <p className="mt-1 text-[11px] font-semibold tracking-[0.22em] text-mist uppercase">
        {bottle.subtitle}
      </p>
      <p className="mt-2 text-sm font-semibold text-gold-gradient">{formatPrice(price)}</p>
      <span className="hairline-gold mt-4 w-10 opacity-0 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
    </div>
  );
}

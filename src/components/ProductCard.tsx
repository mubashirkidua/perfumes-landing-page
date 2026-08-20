"use client";

import Image from "next/image";
import Button from "./Button";
import { contactLinks, formatPrice, type Product } from "../data/site";
import { useTilt } from "../lib/useTilt";
import { usePayment } from "./PaymentProvider";
import { cn } from "../lib/cn";

const accentMap = {
  blue: {
    ring: "hover:shadow-[0_0_60px_-12px_rgba(47,166,224,0.55)]",
    chip: "text-ocean-300 border-ocean-400/40",
  },
  noir: {
    ring: "hover:shadow-[0_0_60px_-12px_rgba(120,140,190,0.5)]",
    chip: "text-ocean-100 border-ocean-200/30",
  },
  gold: {
    ring: "hover:shadow-[0_0_60px_-12px_rgba(214,179,106,0.55)]",
    chip: "text-gold-300 border-gold-400/40",
  },
} as const;

export default function ProductCard({
  product,
  index,
  onQuickView,
}: {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLElement>(7);
  const accent = accentMap[product.accent];
  const { openPayment } = usePayment();
  const orderUrl = contactLinks.whatsapp(
    `Hello The Ocean Perfumes! I would like to order *${product.name}* (${product.size}) — ${formatPrice(
      product.price
    )}.`
  );

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transitionDelay: `${index * 60}ms` }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-md card-3d",
        accent.ring
      )}
    >
      <div className="relative overflow-hidden">
        <span className="absolute left-4 top-4 z-20 rounded-full border bg-ocean-950/70 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.22em] text-gold-300 uppercase backdrop-blur-sm">
          Eau de Parfum
        </span>
        <button
          type="button"
          onClick={() => onQuickView(product)}
          aria-label={`View ${product.name} details`}
          className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-ocean-950/70 p-2.5 text-gold-300 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-gold-300/60"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative aspect-[4/5] overflow-hidden bg-ocean-950/40">
          <Image
            src={product.image}
            alt={`${product.name} — ${product.tagline}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <button
            type="button"
            onClick={() =>
              openPayment({
                id: product.id,
                name: product.name,
                price: product.price,
                size: product.size,
                image: product.image,
              })
            }
            aria-label={`Complete payment for ${product.name}`}
            className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-gold-300/50 bg-ocean-950/80 px-5 py-3 text-[11px] font-bold tracking-[0.18em] text-gold-200 uppercase opacity-0 shadow-[0_0_30px_-6px_rgba(214,179,106,0.5)] backdrop-blur-md transition-all duration-500 hover:border-gold-300 hover:bg-gold-300 hover:text-ocean-950 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:opacity-100 max-md:translate-y-0 max-md:opacity-100"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
              <path d="M2.5 10h19M6 15h4" strokeLinecap="round" />
            </svg>
            Complete Payment
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <span
          className={cn(
            "mb-2 inline-flex w-fit items-center gap-2 text-[10px] font-bold tracking-[0.28em] uppercase",
            accent.chip
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {product.tagline}
        </span>
        <h3 className="font-serif text-[22px] font-semibold text-pearl transition-colors duration-300 group-hover:text-gold-200">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-mist">
          {product.description}
        </p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-serif text-2xl font-semibold text-gold-gradient">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-mist/80">/ 100ml</span>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <Button
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3"
            ariaLabel={`Buy ${product.name} now on WhatsApp`}
          >
            Buy Now
          </Button>
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="button-ghost hover:button-ghost-hover w-full rounded-full px-7 py-3 text-[12px] font-bold tracking-[0.16em] uppercase"
          >
            Quick View
          </button>
        </div>
      </div>
    </article>
  );
}

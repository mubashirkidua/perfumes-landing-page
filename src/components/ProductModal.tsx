"use client";

import { useEffect } from "react";
import Image from "next/image";
import { contactLinks, formatPrice, type Product } from "../data/site";
import Button from "./Button";
import PayButton from "./PayButton";

function NoteGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-mist">
        {items.map((item) => (
          <span key={item} className="mr-2 inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const orderUrl = contactLinks.whatsapp(
    `Hello The Ocean Perfumes! I would like to order *${product.name}* (${product.size}) — ${formatPrice(
      product.price
    )}.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-ocean-950/80 p-4 backdrop-blur-xl animate-fade-in sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-deep relative w-full max-w-4xl overflow-hidden rounded-[28px] shadow-deep animate-rise"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ocean-950/70 text-gold-300 transition-all duration-300 hover:rotate-90 hover:border-gold-300/70"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:min-h-[560px]">
            <Image
              src={product.image}
              alt={`${product.name} — ${product.size}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ocean-900/40" />
          </div>

          <div className="flex flex-col gap-5 p-7 sm:p-9">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 px-3 py-1 text-[10px] font-bold tracking-[0.26em] text-gold-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              {product.tagline}
            </span>
            <h2 className="font-serif text-3xl font-semibold text-pearl sm:text-4xl">
              {product.name}
            </h2>
            <p className="text-sm leading-relaxed text-mist">
              {product.description}
            </p>

            <div className="flex items-end gap-3">
              <span className="font-serif text-3xl font-semibold text-gold-gradient">
                {formatPrice(product.price)}
              </span>
              <span className="pb-1 text-xs text-mist">{product.size}</span>
            </div>

            <div className="hairline-gold" />

            <div className="grid gap-4 sm:grid-cols-3">
              <NoteGroup label="Top Notes" items={product.notes.top} />
              <NoteGroup label="Heart Notes" items={product.notes.heart} />
              <NoteGroup label="Base Notes" items={product.notes.base} />
            </div>

            <div className="mt-1 flex flex-col gap-3">
              <Button
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4"
                ariaLabel={`Order ${product.name} on WhatsApp`}
              >
                Order on WhatsApp
              </Button>
              <PayButton
                item={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  size: product.size,
                  image: product.image,
                }}
                className="w-full py-4"
                label={`Pay ${formatPrice(product.price)} with Card`}
              />
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={contactLinks.tel}
                  className="button-ghost hover:button-ghost-hover flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[12px] font-bold tracking-[0.12em] uppercase"
                >
                  Call
                </a>
                <a
                  href={contactLinks.email}
                  className="button-ghost hover:button-ghost-hover flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[12px] font-bold tracking-[0.12em] uppercase"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

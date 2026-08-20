"use client";

import { usePayment } from "./PaymentProvider";
import { cn } from "../lib/cn";
import type { PaymentItem } from "../data/site";

export default function PayButton({
  item,
  className,
  label = "Pay with Card",
  ghost = false,
}: {
  item: PaymentItem;
  className?: string;
  label?: string;
  ghost?: boolean;
}) {
  const { openPayment } = usePayment();

  return (
    <button
      type="button"
      onClick={() => openPayment(item)}
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-7 text-[12px] font-bold tracking-[0.16em] uppercase",
        ghost
          ? "button-ghost hover:button-ghost-hover"
          : "button-gold hover:button-gold-hover",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
        <path d="M2.5 10h19M6 15h4" strokeLinecap="round" />
      </svg>
      {label}
    </button>
  );
}

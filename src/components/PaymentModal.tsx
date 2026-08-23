"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  contactLinks,
  crystalBottles,
  formatPrice,
  products,
  type PaymentItem,
} from "../data/site";
import { cn } from "../lib/cn";

type Step = "pick" | "form" | "processing" | "success";
type Method = "card" | "cod";

type Errors = {
  name?: string;
  phone?: string;
  address?: string;
  card?: string;
  expiry?: string;
  cvc?: string;
};

const luhn = (digits: string) => {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
};

const formatCard = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

const formatExpiry = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 4);
  if (d.length <= 2) return d;
  return `${d.slice(0, 2)}/${d.slice(2)}`;
};

const formatPhone = (value: string) => {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.slice(1);
  if (d.length > 10) d = d.slice(0, 10);
  return d.length > 4 ? `${d.slice(0, 4)} ${d.slice(4)}` : d;
};

const detectBrand = (digits: string) => {
  if (/^4/.test(digits)) return "Visa";
  if (/^5[1-5]/.test(digits)) return "Mastercard";
  if (/^3[47]/.test(digits)) return "Amex";
  if (/^6/.test(digits)) return "Discover";
  return "";
};

const ALL_ITEMS: PaymentItem[] = [
  ...products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    size: p.size,
    image: p.image,
  })),
  ...crystalBottles.map((b) => ({
    id: b.id,
    name: b.name,
    price: b.price,
    size: b.size,
    image: b.image,
  })),
];

export default function PaymentModal({
  item,
  onClose,
}: {
  item: PaymentItem | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(item ? "form" : "pick");
  const [effective, setEffective] = useState<PaymentItem | null>(item);
  const [method, setMethod] = useState<Method>("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [orderId, setOrderId] = useState("");
  const [quantity, setQuantity] = useState(1);

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

  const digits = card.replace(/\s/g, "");
  const brand = useMemo(() => detectBrand(digits), [digits]);
  const total = (effective?.price ?? 0) * quantity;

  const validate = (): boolean => {
    const next: Errors = {};
    if (name.trim().length < 3) next.name = "Enter your full name.";
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) next.phone = "Enter a valid phone number.";
    if (method === "cod" && address.trim().length < 5)
      next.address = "Enter your delivery address.";
    if (method === "card") {
      if (digits.length !== 16) {
        next.card = "Enter a valid 16-digit card number.";
      } else if (!luhn(digits)) {
        next.card = "This card number looks invalid.";
      }
      const m = expiry.match(/^(\d{2})\/(\d{2})$/);
      if (!m) {
        next.expiry = "Use MM/YY.";
      } else {
        const month = Number(m[1]);
        const year = 2000 + Number(m[2]);
        const now = new Date();
        if (month < 1 || month > 12) {
          next.expiry = "Invalid month.";
        } else if (
          year < now.getFullYear() ||
          (year === now.getFullYear() && month < now.getMonth() + 1)
        ) {
          next.expiry = "Card has expired.";
        }
      }
      if (cvc.replace(/\D/g, "").length < 3) next.cvc = "3-4 digits.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!effective || !validate()) return;
    setStep("processing");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: effective.id,
          quantity,
          paymentMethod: method,
          customer: {
            name,
            phone,
            address: method === "cod" ? address : undefined,
          },
          last4: method === "card" ? digits.slice(-4) : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderId(data.orderId);
        setStep("success");
      } else {
        setErrors({ card: data.error || "Order could not be placed." });
        setStep("form");
      }
    } catch {
      setErrors({ card: "Network error. Please try again." });
      setStep("form");
    }
  };

  const confirmUrl = effective
    ? contactLinks.whatsapp(
        `Hello The Ocean Perfumes! I just placed an order for *${effective.name}* x${quantity} (${formatPrice(
          total
        )}) via ${method === "cod" ? "Cash on Delivery" : "Card payment"}. Order reference: ${orderId}. Please confirm my order.\n\nName: ${name}\nPhone: ${phone}${
          address ? `\nAddress: ${address}` : ""
        }`
      )
    : "#";

  const inputClass = (hasError?: string) =>
    cn(
      "w-full rounded-xl border bg-ocean-950/50 px-4 py-3 text-[15px] text-pearl placeholder:text-mist/50 outline-none transition-all duration-300",
      hasError
        ? "border-red-400/70 focus:border-red-300"
        : "border-white/15 focus:border-gold-300/70 focus:shadow-[0_0_0_1px_rgba(214,179,106,0.4)]"
    );

  const labelClass = "mb-1.5 block text-[11px] font-bold tracking-[0.18em] text-mist uppercase";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={effective ? `Secure checkout for ${effective.name}` : "Choose your fragrance"}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-ocean-950/85 p-4 backdrop-blur-xl animate-fade-in sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-deep relative w-full max-w-lg overflow-hidden rounded-[28px] shadow-deep animate-rise"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ocean-950/70 text-gold-300 transition-all duration-300 hover:rotate-90 hover:border-gold-300/70"
        >
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {step !== "success" && effective && (
          <div className="flex items-center gap-4 border-b border-white/10 bg-ocean-950/40 p-6 sm:p-7">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold-300/40 bg-gold-300/10 text-gold-300">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
                <path d="M2.5 10h19M6 15h4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-xl text-pearl">{effective.name}</p>
              <p className="text-xs text-mist">{effective.size}</p>
              <p className="mt-1 font-serif text-lg text-gold-gradient">{formatPrice(effective.price)}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-white/15 bg-ocean-950/50 px-2 py-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full text-mist transition hover:text-gold-300"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold text-pearl">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-full text-mist transition hover:text-gold-300"
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7">
          {step === "pick" && (
            <div>
              <p className="mb-5 flex items-center gap-2 text-[11px] font-bold tracking-[0.28em] text-mist uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
                Choose Your Fragrance
              </p>
              <div className="grid max-h-[52vh] grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
                {ALL_ITEMS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setEffective(p);
                      setStep("form");
                    }}
                    className="group/pick flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/50 hover:shadow-gold"
                  >
                    <div className="relative h-20 w-full">
                      <Image
                        src={p.image ?? "/images/crystal-clear.png"}
                        alt={p.name}
                        fill
                        sizes="120px"
                        className="object-contain transition-transform duration-300 group-hover/pick:scale-110"
                      />
                    </div>
                    <p className="mt-2 line-clamp-1 font-serif text-[13px] text-pearl">{p.name}</p>
                    <p className="mt-0.5 text-[11px] font-bold text-gold-gradient">{formatPrice(p.price)}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "form" && effective && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              noValidate
            >
              <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-ocean-950/50 p-1.5">
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition",
                    method === "card"
                      ? "bg-gold-300/20 text-gold-200"
                      : "text-mist hover:text-pearl"
                  )}
                >
                  Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("cod")}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-[12px] font-bold tracking-[0.1em] uppercase transition",
                    method === "cod"
                      ? "bg-gold-300/20 text-gold-200"
                      : "text-mist hover:text-pearl"
                  )}
                >
                  Cash on Delivery
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="pm-name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="pm-name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className={inputClass(errors.name)}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="pm-phone" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="pm-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="3XX XXXX XXX"
                    className={inputClass(errors.phone)}
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-300">{errors.phone}</p>}
                </div>

                {method === "cod" && (
                  <div>
                    <label htmlFor="pm-address" className={labelClass}>
                      Delivery Address
                    </label>
                    <textarea
                      id="pm-address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, area, city, landmark…"
                      rows={2}
                      className={cn(inputClass(errors.address), "resize-none")}
                    />
                    {errors.address && <p className="mt-1.5 text-xs text-red-300">{errors.address}</p>}
                  </div>
                )}

                {method === "card" && (
                  <>
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <label htmlFor="pm-card" className={labelClass}>
                          Card Number
                        </label>
                        <span className="text-[11px] font-semibold text-gold-300">{brand || "Visa / Mastercard"}</span>
                      </div>
                      <input
                        id="pm-card"
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={card}
                        onChange={(e) => setCard(formatCard(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        className={inputClass(errors.card)}
                      />
                      {errors.card && <p className="mt-1.5 text-xs text-red-300">{errors.card}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pm-expiry" className={labelClass}>
                          Expiry
                        </label>
                        <input
                          id="pm-expiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className={inputClass(errors.expiry)}
                        />
                        {errors.expiry && <p className="mt-1.5 text-xs text-red-300">{errors.expiry}</p>}
                      </div>
                      <div>
                        <label htmlFor="pm-cvc" className={labelClass}>
                          CVC
                        </label>
                        <input
                          id="pm-cvc"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          className={inputClass(errors.cvc)}
                        />
                        {errors.cvc && <p className="mt-1.5 text-xs text-red-300">{errors.cvc}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-gold-300/30 bg-gold-300/10 px-4 py-3 text-xs text-gold-200">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="4" y="10" width="16" height="11" rx="2" />
                        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                      </svg>
                      Demo card transaction — no real payment is taken.
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="button-gold hover:button-gold-hover mt-2 w-full rounded-full px-7 py-4 text-[13px] font-bold tracking-[0.16em] uppercase"
                >
                  {method === "cod"
                    ? `Place Order — ${formatPrice(total)}`
                    : `Pay ${formatPrice(total)}`}
                </button>

                <p className="mt-1 text-center text-[11px] leading-relaxed text-mist/70">
                  {method === "cod"
                    ? "Pay in cash when your order is delivered anywhere in Pakistan."
                    : "Demo checkout — connect Stripe / JazzCash / EasyPaisa for real transactions."}
                </p>
              </div>
            </form>
          )}

          {step === "processing" && effective && (
            <div className="flex flex-col items-center py-14 text-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-gold-300/20 border-t-gold-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
                    <path d="M2.5 10h19M6 15h4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <p className="mt-6 font-serif text-xl text-pearl">
                {method === "cod" ? "Placing your order…" : "Processing payment…"}
              </p>
              <p className="mt-2 text-sm text-mist">
                {method === "cod"
                  ? `Confirming ${effective.name} x${quantity} (${formatPrice(total)}) for delivery`
                  : `Securely authorising ${formatPrice(total)} for ${effective.name}`}
              </p>
            </div>
          )}

          {step === "success" && effective && (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/15 text-emerald-300">
                <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-6 font-serif text-2xl text-pearl">
                {method === "cod" ? "Order Placed" : "Payment Successful"}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mist">
                {method === "cod"
                  ? `Thank you ${name}! Your order for ${effective.name} x${quantity} (${formatPrice(
                      total
                    )}) will be delivered. We'll call you at ${phone} to confirm.`
                  : `Thank you ${name}! Your order for ${effective.name} x${quantity} (${formatPrice(
                      total
                    )}) has been confirmed.`}
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-ocean-950/50 px-6 py-3">
                <p className="text-[10px] font-bold tracking-[0.28em] text-mist uppercase">Order Reference</p>
                <p className="mt-1 font-mono text-lg tracking-wider text-gold-300">{orderId}</p>
              </div>
              <div className="mt-8 flex w-full flex-col gap-3">
                <a
                  href={confirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-gold hover:button-gold-hover flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[13px] font-bold tracking-[0.16em] uppercase"
                >
                  Confirm on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="button-ghost hover:button-ghost-hover w-full rounded-full px-7 py-3.5 text-[12px] font-bold tracking-[0.16em] uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

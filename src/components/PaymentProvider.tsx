"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import PaymentModal from "./PaymentModal";
import type { PaymentItem } from "../data/site";

type PaymentContextValue = {
  openPayment: (item?: PaymentItem) => void;
};

const PaymentContext = createContext<PaymentContextValue | null>(null);

export function usePayment() {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePayment must be used within <PaymentProvider>");
  return ctx;
}

export default function PaymentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<PaymentItem | null>(null);

  const openPayment = useCallback((next?: PaymentItem) => {
    setItem(next ?? null);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <PaymentContext.Provider value={{ openPayment }}>
      {children}
      {open && <PaymentModal item={item} onClose={close} />}
    </PaymentContext.Provider>
  );
}

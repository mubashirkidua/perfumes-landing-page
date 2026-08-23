"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type LiveCatalogItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  size: string;
  image: string;
  stock: number;
};

type CatalogContextValue = {
  items: LiveCatalogItem[];
  getItem: (id: string) => LiveCatalogItem | undefined;
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within <CatalogProvider>");
  return ctx;
}

export default function CatalogProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LiveCatalogItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/catalog")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.success && Array.isArray(data.products)) {
          setItems(data.products);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const getItem = (id: string) => items.find((i) => i.id === id);

  return (
    <CatalogContext.Provider value={{ items, getItem }}>
      {children}
    </CatalogContext.Provider>
  );
}

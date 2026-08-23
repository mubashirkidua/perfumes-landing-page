import { crystalBottles, products, type Product } from "@/data/site";
import { getProductOverride, DEFAULT_STOCK } from "./db";

export type CatalogItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  size: string;
  image: string;
  stock: number;
};

export async function getCatalog(): Promise<CatalogItem[]> {
  const base: CatalogItem[] = [
    ...products.map((p) => ({
      id: p.id,
      name: p.name,
      subtitle: p.tagline,
      price: p.price,
      size: p.size,
      image: p.image,
      stock: DEFAULT_STOCK,
    })),
    ...crystalBottles.map((b) => ({
      id: b.id,
      name: b.name,
      subtitle: b.subtitle,
      price: b.price,
      size: b.size,
      image: b.image,
      stock: DEFAULT_STOCK,
    })),
  ];
  const out: CatalogItem[] = [];
  for (const item of base) {
    const ov = await getProductOverride(item.id);
    out.push({
      ...item,
      price: ov?.price ?? item.price,
      stock: ov?.stock ?? item.stock,
    });
  }
  return out;
}

export async function getCatalogItem(id: string): Promise<CatalogItem | undefined> {
  const catalog = await getCatalog();
  return catalog.find((c) => c.id === id);
}

export function toPaymentItem(item: CatalogItem) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    size: item.size,
    image: item.image,
  };
}

export function productToCatalogItem(p: Product): CatalogItem {
  return {
    id: p.id,
    name: p.name,
    subtitle: p.tagline,
    price: p.price,
    size: p.size,
    image: p.image,
    stock: DEFAULT_STOCK,
  };
}

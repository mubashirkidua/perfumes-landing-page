import { promises as fs } from "node:fs";
import path from "node:path";
import { crystalBottles, products } from "@/data/site";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "card" | "cod";

export type OrderCustomer = {
  name: string;
  phone: string;
  address?: string;
};

export type Order = {
  id: string;
  itemId: string;
  itemName: string;
  itemPrice: number;
  quantity: number;
  size?: string;
  image?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  customer: OrderCustomer;
  status: OrderStatus;
  createdAt: string;
  last4?: string;
};

export type ProductOverride = {
  price?: number;
  stock?: number;
};

export type DBShape = {
  orders: Order[];
  products: Record<string, ProductOverride>;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");

let cache: DBShape | null = null;

function seedProducts(): Record<string, ProductOverride> {
  const seed: Record<string, ProductOverride> = {};
  for (const p of [...products, ...crystalBottles]) {
    seed[p.id] = { price: p.price, stock: DEFAULT_STOCK };
  }
  return seed;
}

export async function readDB(): Promise<DBShape> {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<DBShape>;
    cache = {
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
      products: parsed.products ?? seedProducts(),
    };
  } catch {
    cache = { orders: [], products: seedProducts() };
    await writeDB(cache);
  }
  return cache;
}

export async function writeDB(db: DBShape) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf-8");
  await fs.rename(tmp, DB_FILE);
  cache = db;
}

export async function createOrder(order: Order): Promise<Order> {
  const db = await readDB();
  db.orders.unshift(order);
  await writeDB(db);
  return order;
}

export async function listOrders(): Promise<Order[]> {
  const db = await readDB();
  return [...db.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const db = await readDB();
  return db.orders.find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | null> {
  const db = await readDB();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await writeDB(db);
  return order;
}

export async function getProductOverride(id: string): Promise<ProductOverride | undefined> {
  const db = await readDB();
  return db.products[id];
}

export async function setProductOverride(
  id: string,
  patch: ProductOverride
): Promise<ProductOverride> {
  const db = await readDB();
  const current = db.products[id] ?? {};
  db.products[id] = { ...current, ...patch };
  await writeDB(db);
  return db.products[id];
}

export async function getStats() {
  const orders = await listOrders();
  const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
  const count = (s: OrderStatus) => orders.filter((o) => o.status === s).length;
  const today = new Date().toISOString().slice(0, 10);
  const todayOrders = orders.filter((o) => o.createdAt.slice(0, 10) === today).length;
  const pendingRevenue = orders
    .filter((o) => o.status === "pending")
    .reduce((sum, o) => sum + o.amount, 0);
  return {
    totalOrders: orders.length,
    revenue,
    pending: count("pending"),
    confirmed: count("confirmed"),
    shipped: count("shipped"),
    delivered: count("delivered"),
    cancelled: count("cancelled"),
    todayOrders,
    pendingRevenue,
  };
}

export function generateOrderId(): string {
  return `TOP-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
}

export const DEFAULT_STOCK = 50;

export function getStoredStock(override: ProductOverride | undefined): number {
  return override?.stock ?? DEFAULT_STOCK;
}

export async function deductStock(
  itemId: string,
  quantity: number
): Promise<{ ok: boolean; stock: number }> {
  const db = await readDB();
  const current = getStoredStock(db.products[itemId]);
  if (current < quantity) return { ok: false, stock: current };
  const stock = current - quantity;
  db.products[itemId] = { ...(db.products[itemId] ?? {}), stock };
  await writeDB(db);
  return { ok: true, stock };
}

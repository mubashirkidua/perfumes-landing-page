"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Order, OrderStatus } from "@/lib/db";

type Stats = {
  totalOrders: number;
  revenue: number;
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  todayOrders: number;
  pendingRevenue: number;
};

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  size: string;
  stock: number;
};

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  confirmed: "bg-ocean-400/15 text-ocean-200 border-ocean-400/30",
  shipped: "bg-sky-400/15 text-sky-300 border-sky-400/30",
  delivered: "bg-emerald-400/15 text-emerald-300 border-emerald-400/30",
  cancelled: "bg-red-400/15 text-red-300 border-red-400/30",
};

const formatPKR = (n: number) =>
  `PKR ${n.toLocaleString("en-PK")}`;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

async function fetchJSON<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [s, o, p] = await Promise.all([
        fetchJSON<{ stats: Stats }>("/api/admin/stats"),
        fetchJSON<{ orders: Order[] }>("/api/admin/orders"),
        fetchJSON<{ products: Product[] }>("/api/admin/products"),
      ]);
      setStats(s.stats);
      setOrders(o.orders);
      setProducts(p.products);
      setError("");
    } catch {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetchJSON<{ stats: Stats }>("/api/admin/stats"),
      fetchJSON<{ orders: Order[] }>("/api/admin/orders"),
      fetchJSON<{ products: Product[] }>("/api/admin/products"),
    ])
      .then(([s, o, p]) => {
        if (cancelled) return;
        setStats(s.stats);
        setOrders(o.orders);
        setProducts(p.products);
        setError("");
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load dashboard data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  const updateStatus = async (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    try {
      await fetchJSON(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await loadData();
    } catch {
      setError("Failed to update order status.");
      loadData();
    }
  };

  const saveProduct = async (p: Product, patch: { price?: number; stock?: number }) => {
    setProducts((prev) =>
      prev.map((x) =>
        x.id === p.id
          ? { ...x, ...(patch.price !== undefined ? { price: patch.price } : {}), ...(patch.stock !== undefined ? { stock: patch.stock } : {}) }
          : x
      )
    );
    try {
      await fetchJSON("/api/admin/products", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, ...patch }),
      });
      setError("");
    } catch {
      setError("Failed to save product changes.");
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-mist">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 pb-28 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
              The Ocean Perfumes
            </p>
            <h1 className="mt-2 font-serif text-3xl text-pearl sm:text-4xl">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] text-mist uppercase transition hover:border-gold-300/60 hover:text-pearl"
            >
              View Store
            </Link>
            <button
              onClick={logout}
              className="rounded-full border border-red-400/40 px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] text-red-300 uppercase transition hover:bg-red-400/10"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <p className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        {stats && (
          <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <StatCard label="Total Orders" value={String(stats.totalOrders)} />
            <StatCard label="Today" value={String(stats.todayOrders)} />
            <StatCard label="Revenue" value={formatPKR(stats.revenue)} accent />
            <StatCard label="Pending" value={String(stats.pending)} />
            <StatCard label="Shipped" value={String(stats.shipped)} />
            <StatCard label="Delivered" value={String(stats.delivered)} />
          </div>
        )}

        <div className="mb-6 flex gap-2">
          {(["orders", "products"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase transition ${
                tab === t
                  ? "bg-gold-300/20 text-gold-200 border border-gold-300/40"
                  : "border border-white/15 text-mist hover:text-pearl"
              }`}
            >
              {t === "orders" ? "Orders" : "Products"}
            </button>
          ))}
        </div>

        {tab === "orders" ? (
          <OrdersTable orders={orders} onStatus={updateStatus} />
        ) : (
          <ProductsTable products={products} onSave={saveProduct} />
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-gold-300/40 bg-gold-300/10"
          : "border-white/10 bg-ocean-900/40"
      }`}
    >
      <p className="text-[10px] font-bold tracking-[0.2em] text-mist uppercase">
        {label}
      </p>
      <p
        className={`mt-2 font-serif text-xl ${
          accent ? "text-gold-200" : "text-pearl"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function OrdersTable({
  orders,
  onStatus,
}: {
  orders: Order[];
  onStatus: (id: string, status: OrderStatus) => void;
}) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-ocean-900/40 p-10 text-center">
        <p className="font-serif text-lg text-pearl">No orders yet</p>
        <p className="mt-2 text-sm text-mist">
          Orders placed through the store will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-ocean-900/40">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-bold tracking-[0.18em] text-mist uppercase">
            <th className="px-5 py-4">Order</th>
            <th className="px-5 py-4">Customer</th>
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Amount</th>
            <th className="px-5 py-4">Payment</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr
              key={o.id}
              className="border-b border-white/5 transition hover:bg-white/[0.03]"
            >
              <td className="px-5 py-4 font-mono text-xs text-gold-200">
                {o.id}
              </td>
              <td className="px-5 py-4">
                <p className="text-pearl">{o.customer.name}</p>
                <p className="mt-0.5 text-xs text-mist">{o.customer.phone}</p>
                {o.customer.address && (
                  <p className="mt-0.5 max-w-[220px] truncate text-xs text-mist/70">
                    {o.customer.address}
                  </p>
                )}
              </td>
              <td className="px-5 py-4">
                <p className="text-pearl">
                  {o.itemName}
                  {o.size ? ` · ${o.size}` : ""}
                </p>
                <p className="mt-0.5 text-xs text-mist">
                  qty {o.quantity} @ {formatPKR(o.itemPrice)}
                </p>
              </td>
              <td className="px-5 py-4 font-semibold text-pearl">
                {formatPKR(o.amount)}
              </td>
              <td className="px-5 py-4">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase ${
                    o.paymentMethod === "cod"
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-ocean-400/30 bg-ocean-400/10 text-ocean-200"
                  }`}
                >
                  {o.paymentMethod === "cod" ? "COD" : "Card"}
                </span>
                {o.last4 && (
                  <p className="mt-1 text-[11px] text-mist/70">
                    •••• {o.last4}
                  </p>
                )}
              </td>
              <td className="px-5 py-4">
                <select
                  value={o.status}
                  onChange={(e) =>
                    onStatus(o.id, e.target.value as OrderStatus)
                  }
                  className={`cursor-pointer rounded-full border px-2.5 py-1.5 text-[11px] font-bold uppercase outline-none ${STATUS_STYLE[o.status]}`}
                >
                  {STATUS_FLOW.map((s) => (
                    <option key={s} value={s} className="bg-ocean-900 text-pearl">
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-xs text-mist">
                {formatDate(o.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductsTable({
  products,
  onSave,
}: {
  products: Product[];
  onSave: (p: Product, patch: { price?: number; stock?: number }) => void;
}) {
  const [editing, setEditing] = useState<Record<string, { price: string; stock: string }>>({});

  const beginEdit = (p: Product) =>
    setEditing((prev) => ({
      ...prev,
      [p.id]: { price: String(p.price), stock: String(p.stock) },
    }));

  const cancelEdit = (id: string) =>
    setEditing((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const commit = async (p: Product) => {
    const e = editing[p.id];
    if (!e) return;
    const patch: { price?: number; stock?: number } = {};
    const price = Number(e.price);
    const stock = Number(e.stock);
    if (Number.isFinite(price) && price !== p.price) patch.price = Math.round(price);
    if (Number.isFinite(stock) && stock !== p.stock) patch.stock = Math.floor(stock);
    cancelEdit(p.id);
    if (Object.keys(patch).length > 0) {
      await onSave(p, patch);
    }
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-ocean-900/40">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[10px] font-bold tracking-[0.18em] text-mist uppercase">
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Size</th>
            <th className="px-5 py-4">Price (PKR)</th>
            <th className="px-5 py-4">Stock</th>
            <th className="px-5 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const e = editing[p.id];
            return (
              <tr
                key={p.id}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                <td className="px-5 py-4">
                  <p className="text-pearl">{p.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-mist/70">
                    {p.id}
                  </p>
                </td>
                <td className="px-5 py-4 text-mist">{p.size}</td>
                <td className="px-5 py-4">
                  {e ? (
                    <input
                      type="number"
                      min={0}
                      value={e.price}
                      onChange={(ev) =>
                        setEditing((prev) => ({
                          ...prev,
                          [p.id]: { ...prev[p.id], price: ev.target.value },
                        }))
                      }
                      className="w-32 rounded-lg border border-white/15 bg-ocean-950/60 px-3 py-1.5 text-sm text-pearl outline-none focus:border-gold-300/70"
                    />
                  ) : (
                    <span className="font-semibold text-pearl">
                      {formatPKR(p.price)}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {e ? (
                    <input
                      type="number"
                      min={0}
                      value={e.stock}
                      onChange={(ev) =>
                        setEditing((prev) => ({
                          ...prev,
                          [p.id]: { ...prev[p.id], stock: ev.target.value },
                        }))
                      }
                      className="w-24 rounded-lg border border-white/15 bg-ocean-950/60 px-3 py-1.5 text-sm text-pearl outline-none focus:border-gold-300/70"
                    />
                  ) : (
                    <span
                      className={
                        p.stock <= 10
                          ? "font-semibold text-red-300"
                          : "font-semibold text-emerald-300"
                      }
                    >
                      {p.stock}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {e ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => commit(p)}
                        className="rounded-full border border-emerald-400/40 px-4 py-1.5 text-[11px] font-bold text-emerald-300 uppercase transition hover:bg-emerald-400/10"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => cancelEdit(p.id)}
                        className="rounded-full border border-white/15 px-4 py-1.5 text-[11px] font-bold text-mist uppercase transition hover:text-pearl"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => beginEdit(p)}
                      className="rounded-full border border-gold-300/40 px-4 py-1.5 text-[11px] font-bold text-gold-200 uppercase transition hover:bg-gold-300/10"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { NextResponse } from "next/server";
import { getCatalogItem } from "@/lib/catalog";
import { createOrder, deductStock, generateOrderId } from "@/lib/db";

export const runtime = "nodejs";

type CheckoutBody = {
  itemId?: string;
  quantity?: number;
  paymentMethod?: "card" | "cod";
  customer?: { name?: string; phone?: string; address?: string };
  last4?: string;
};

export async function POST(req: Request) {
  let body: CheckoutBody = {};
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const method = body.paymentMethod === "cod" ? "cod" : "card";

  const customerName = (body.customer?.name ?? "").trim();
  const customerPhone = (body.customer?.phone ?? "").trim();
  const customerAddress = (body.customer?.address ?? "").trim();

  if (customerName.length < 3) {
    return NextResponse.json(
      { success: false, error: "Please enter your full name." },
      { status: 400 }
    );
  }
  const phoneDigits = customerPhone.replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json(
      { success: false, error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }
  if (method === "cod" && customerAddress.length < 5) {
    return NextResponse.json(
      { success: false, error: "Please enter your delivery address." },
      { status: 400 }
    );
  }

  const item = await getCatalogItem(String(body.itemId ?? ""));
  if (!item) {
    return NextResponse.json(
      { success: false, error: "Product not found." },
      { status: 400 }
    );
  }

  const quantity = Math.max(1, Math.min(10, Number(body.quantity) || 1));
  const amount = item.price * quantity;

  if (item.stock <= 0) {
    return NextResponse.json(
      { success: false, error: `${item.name} is currently out of stock.` },
      { status: 400 }
    );
  }
  if (item.stock < quantity) {
    return NextResponse.json(
      {
        success: false,
        error: `Only ${item.stock} left in stock for ${item.name}. Please reduce the quantity.`,
      },
      { status: 400 }
    );
  }

  const deducted = await deductStock(item.id, quantity);
  if (!deducted.ok) {
    return NextResponse.json(
      { success: false, error: `Only ${deducted.stock} left in stock. Please reduce the quantity.` },
      { status: 400 }
    );
  }

  if (method === "card") {
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  const orderId = generateOrderId();
  await createOrder({
    id: orderId,
    itemId: item.id,
    itemName: item.name,
    itemPrice: item.price,
    quantity,
    size: item.size,
    image: item.image,
    amount,
    paymentMethod: method,
    customer: {
      name: customerName,
      phone: customerPhone,
      address: customerAddress || undefined,
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    last4: method === "card" ? body.last4 ?? undefined : undefined,
  });

  return NextResponse.json({
    success: true,
    orderId,
    amount,
    item: { id: item.id, name: item.name, price: item.price, size: item.size },
    paymentMethod: method,
  });
}

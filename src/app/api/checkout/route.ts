import { NextResponse } from "next/server";

export const runtime = "nodejs";

type CheckoutBody = {
  item?: { id?: string; name?: string; price?: number };
  last4?: string;
};

export async function POST(req: Request) {
  let body: CheckoutBody = {};
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const price = Number(body.item?.price);
  if (!body.item?.id || !body.item?.name || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ success: false, error: "Missing product information." }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 1600));

  const orderId = `TOP-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({
    success: true,
    orderId,
    amount: price,
    last4: body.last4 ?? "0000",
  });
}

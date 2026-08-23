import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { getCatalog } from "@/lib/catalog";
import { setProductOverride } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const catalog = await getCatalog();
  return NextResponse.json({ success: true, products: catalog });
}

export async function PATCH(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();

  let body: { id?: string; price?: number; stock?: number } = {};
  try {
    body = (await req.json()) as { id?: string; price?: number; stock?: number };
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ success: false, error: "Product id required." }, { status: 400 });
  }

  const patch: { price?: number; stock?: number } = {};
  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0 || price > 10000000) {
      return NextResponse.json(
        { success: false, error: "Invalid price." },
        { status: 400 }
      );
    }
    patch.price = Math.round(price);
  }
  if (body.stock !== undefined) {
    const stock = Math.floor(Number(body.stock));
    if (!Number.isFinite(stock) || stock < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid stock." },
        { status: 400 }
      );
    }
    patch.stock = stock;
  }

  await setProductOverride(body.id, patch);
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { updateOrderStatus, type OrderStatus } from "@/lib/db";

export const runtime = "nodejs";

const STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdminRequest(req)) return unauthorized();
  const { id } = await params;

  let body: { status?: string } = {};
  try {
    body = (await req.json()) as { status?: string };
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const status = body.status as OrderStatus;
  if (!STATUSES.includes(status)) {
    return NextResponse.json({ success: false, error: "Invalid status." }, { status: 400 });
  }

  const order = await updateOrderStatus(id, status);
  if (!order) {
    return NextResponse.json({ success: false, error: "Order not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true, order });
}

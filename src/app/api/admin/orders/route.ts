import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { listOrders } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const orders = await listOrders();
  return NextResponse.json({ success: true, orders });
}

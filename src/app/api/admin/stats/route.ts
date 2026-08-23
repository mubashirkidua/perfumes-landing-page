import { NextResponse } from "next/server";
import { isAdminRequest, unauthorized } from "@/lib/admin-guard";
import { getStats } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(req: Request) {
  if (!isAdminRequest(req)) return unauthorized();
  const stats = await getStats();
  return NextResponse.json({ success: true, stats });
}

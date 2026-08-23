import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "./auth";

export function isAdminRequest(req: Request): boolean {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return verifySessionToken(match?.[1]);
}

export function unauthorized(): NextResponse {
  return NextResponse.json(
    { success: false, error: "Unauthorized." },
    { status: 401 }
  );
}

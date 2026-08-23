import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || "ocean-admin-2026";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "ocean-session-secret-change-me";

export const SESSION_COOKIE = "admin_session";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function verifyAdminPassword(password: string): boolean {
  return safeEqual(password, ADMIN_PASSWORD);
}

export function createSessionToken(): string {
  const payload = randomBytes(24).toString("base64url");
  const sig = createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return safeEqual(sig, expected);
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

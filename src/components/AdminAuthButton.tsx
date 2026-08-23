"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../lib/cn";

export default function AdminAuthButton({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAuthed(data?.authenticated === true);
      })
      .catch(() => {
        if (!cancelled) setAuthed(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (authed === null) return null;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    if (pathname === "/admin" || pathname.startsWith("/admin")) {
      router.replace("/");
    }
    router.refresh();
  };

  if (authed) {
    return (
      <button
        type="button"
        onClick={logout}
        className={cn(
          "flex items-center gap-2 rounded-full border border-gold-300/40 px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] text-gold-200 uppercase transition-all duration-300 hover:border-gold-300 hover:bg-gold-300/10",
          className
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 12H3m0 0 4-4m-4 4 4 4M11 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Sign Out
      </button>
    );
  }

  return (
    <Link
      href="/admin/login"
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-[12px] font-bold tracking-[0.14em] text-mist uppercase transition-all duration-300 hover:border-gold-300/60 hover:text-gold-200",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
      </svg>
      Sign In
    </Link>
  );
}

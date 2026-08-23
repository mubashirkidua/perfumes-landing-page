"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { usePayment } from "./PaymentProvider";
import AdminAuthButton from "./AdminAuthButton";
import { contactLinks, navLinks, site } from "../data/site";
import { cn } from "../lib/cn";

export default function Navbar() {
  const pathname = usePathname();
  const { openPayment } = usePayment();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ocean-950/85 backdrop-blur-xl shadow-deep"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group relative py-2 text-[13px] font-semibold tracking-[0.22em] uppercase transition-colors duration-300",
                      active ? "text-gold-300" : "text-mist hover:text-pearl"
                    )}
                  >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-gold-300 via-gold-500 to-transparent transition-transform duration-300 origin-left",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <AdminAuthButton />
          <button
            type="button"
            onClick={() => openPayment()}
            className="button-gold rounded-full px-6 py-2.5 text-[12px] font-bold tracking-[0.14em] uppercase"
            onMouseEnter={(e) => e.currentTarget.classList.add("button-gold-hover")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("button-gold-hover")}
          >
            Order Now
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 lg:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-full rounded bg-gold-300 transition-all duration-300",
                open && "top-1/2 -translate-y-1/2 rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 rounded bg-gold-300 transition-all duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-0.5 w-full rounded bg-gold-300 transition-all duration-300",
                open && "bottom-1/2 translate-y-1/2 -rotate-45"
              )}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[72px] z-40 origin-top bg-ocean-950/97 backdrop-blur-2xl transition-all duration-500 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-7 pt-10 pb-10">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li
                  key={link.href}
                  className={cn(
                    "translate-x-0 transition-all duration-500",
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: open ? `${100 + i * 70}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl tracking-wide",
                      active ? "text-gold-300" : "text-pearl/90"
                    )}
                  >
                    {link.label}
                    <span className="text-sm tracking-[0.3em] text-gold-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto space-y-3">
            <AdminAuthButton className="w-full justify-center" />
            <Link
              href={contactLinks.whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="button-gold flex w-full items-center justify-center rounded-full px-6 py-4 text-sm font-bold tracking-[0.14em] uppercase"
            >
              Order on WhatsApp
            </Link>
            <a
              href={contactLinks.email}
              className="block text-center text-sm tracking-wide text-mist"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { contactLinks, site } from "../data/site";
import { cn } from "../lib/cn";

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={contactLinks.whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={cn(
          "fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full shadow-gold transition-all duration-500 hover:scale-110",
          show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}
        style={{
          background: "linear-gradient(135deg,#25D366,#128C7E)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.27-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.92 2.23 1 2.39.08.16.13.35.03.56-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.19.32.85 1.4 1.82 2.27 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.14.71-.08.19-.21.82-.95 1.03-1.28.22-.32.43-.27.72-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.8-.16 1.47z" />
        </svg>
      </a>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[70] border-t border-gold-300/20 bg-ocean-950/92 backdrop-blur-xl transition-transform duration-500 lg:hidden",
          show ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <Link
            href={contactLinks.whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-[12px] font-bold tracking-[0.1em] uppercase"
            style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
              <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.27-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.92 2.23 1 2.39.08.16.13.35.03.56-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.19.32.85 1.4 1.82 2.27 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.14.71-.08.19-.21.82-.95 1.03-1.28.22-.32.43-.27.72-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.8-.16 1.47z" />
            </svg>
            WhatsApp
          </Link>
          <a
            href={contactLinks.tel}
            className="flex-1 rounded-full px-4 py-3 text-center text-[12px] font-bold tracking-[0.1em] uppercase button-gold"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}

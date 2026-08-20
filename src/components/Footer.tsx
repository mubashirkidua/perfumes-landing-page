import Link from "next/link";
import Logo from "./Logo";
import { contactLinks, navLinks, site } from "../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-ocean-950/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-18">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm font-serif text-lg text-gold-200 italic">
              “{site.tagline}”
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
              {site.description} Crafted with cinematic elegance and lasting
              sophistication.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-[12px] font-bold tracking-[0.34em] text-gold-300 uppercase">
              Explore
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-mist transition-colors duration-300 hover:text-gold-200"
                  >
                    <span className="h-px w-4 bg-gold-400/60 transition-all duration-300 group-hover:w-6" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[12px] font-bold tracking-[0.34em] text-gold-300 uppercase">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a
                  href={contactLinks.email}
                  className="text-mist transition-colors duration-300 hover:text-gold-200"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={contactLinks.tel}
                  className="text-mist transition-colors duration-300 hover:text-gold-200"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contactLinks.whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mist transition-colors duration-300 hover:text-gold-200"
                >
                  WhatsApp: {site.whatsappDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href={contactLinks.whatsapp()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-300 transition-all duration-300 hover:scale-110 hover:border-gold-300/70"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current">
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.27-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.92 2.23 1 2.39.08.16.13.35.03.56-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.19.32.85 1.4 1.82 2.27 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.14.71-.08.19-.21.82-.95 1.03-1.28.22-.32.43-.27.72-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.8-.16 1.47z" />
                </svg>
              </a>
              <a
                href={contactLinks.email}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-300 transition-all duration-300 hover:scale-110 hover:border-gold-300/70"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={contactLinks.tel}
                aria-label="Call"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gold-300 transition-all duration-300 hover:scale-110 hover:border-gold-300/70"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-7">
          <p className="text-center text-[12px] tracking-[0.18em] text-mist/70 uppercase">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

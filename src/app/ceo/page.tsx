import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { contactLinks, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Our CEO — Muhammad Mubashir Ali",
  description: `Meet ${site.name} CEO Muhammad Mubashir Ali — the visionary behind our premium ocean-inspired fragrances.`,
  alternates: { canonical: "/ceo" },
};

const contactCards = [
  {
    label: "Email",
    value: site.email,
    href: contactLinks.email,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Mobile",
    value: site.phoneDisplay,
    href: contactLinks.tel,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: site.whatsappDisplay,
    href: contactLinks.whatsapp(),
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.27-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.92 2.23 1 2.39.08.16.13.35.03.56-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.19.32.85 1.4 1.82 2.27 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.14.71-.08.19-.21.82-.95 1.03-1.28.22-.32.43-.27.72-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.8-.16 1.47z" />
      </svg>
    ),
  },
];

export default function CeoPage() {
  return (
    <>
      <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:pt-40 md:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
            <Reveal className="relative mx-auto w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-gold-300/30 via-ocean-500/10 to-transparent blur-2xl"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/15 blur-[90px]"
              />
              <figure className="glass-deep relative overflow-hidden rounded-[36px] p-3 ring-gold animate-float-slow">
                <div className="relative overflow-hidden rounded-[26px]">
                  <Image
                    src="/images/ceo.jpg"
                    alt="Muhammad Mubashir Ali — CEO of The Ocean Perfumes"
                    width={800}
                    height={880}
                    priority
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-ocean-950/55 px-5 py-4 backdrop-blur-xl">
                    <p className="font-serif text-xl text-pearl">Muhammad Mubashir Ali</p>
                    <p className="mt-0.5 text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
                      Chief Executive Officer
                    </p>
                  </div>
                </div>
              </figure>
            </Reveal>

            <div>
              <Reveal>
                <p className="mb-4 inline-flex items-center gap-3 text-[12px] font-bold tracking-[0.42em] text-gold-300 uppercase">
                  <span className="hairline-gold w-10" />
                  Our Leadership
                </p>
                <h1 className="font-serif text-4xl leading-tight text-pearl text-shadow-lux sm:text-5xl md:text-6xl">
                  Muhammad <span className="text-gold-gradient">Mubashir</span> Ali
                </h1>
                <p className="mt-3 text-sm font-semibold tracking-[0.3em] text-mist uppercase">
                  CEO — {site.name}
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="hairline-gold my-8" />
                <p className="text-base leading-relaxed text-mist md:text-lg">
                  Muhammad Mubashir Ali is the visionary founder and Chief Executive
                  Officer of {site.name}. With an unwavering passion for fragrance and a
                  deep reverence for the sea, he founded the house to translate the
                  serenity, power and mystery of the ocean into timeless perfumes.
                </p>
                <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
                  Under his leadership, every composition is perfected to capture emotion —
                  blending rare ingredients with cinematic artistry to create scents that
                  leave a lasting impression.
                </p>
              </Reveal>

              <Reveal delay={320}>
                <blockquote className="glass relative mt-9 overflow-hidden rounded-3xl px-7 py-8">
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-4 font-serif text-7xl text-gold-300/25"
                  >
                    “
                  </span>
                  <p className="relative font-serif text-xl italic leading-relaxed text-gold-100 md:text-2xl">
                    A perfume is not worn — it is felt. Like the ocean, it should move
                    with you, quietly carrying your story wherever you go.
                  </p>
                  <footer className="relative mt-5 flex items-center gap-3">
                    <span className="hairline-gold w-10" />
                    <span className="text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
                      Muhammad Mubashir Ali
                    </span>
                  </footer>
                </blockquote>
              </Reveal>

              <Reveal delay={440}>
                <div className="mt-9 grid gap-4 sm:grid-cols-3">
                  {contactCards.map((card) => (
                    <a
                      key={card.label}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group glass flex flex-col items-center gap-3 rounded-2xl px-4 py-5 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/40 hover:shadow-gold"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/30 text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                        {card.icon}
                      </span>
                      <span>
                        <span className="block text-[10px] font-bold tracking-[0.28em] text-mist uppercase">
                          {card.label}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-pearl break-all">
                          {card.value}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Experience the vision"
        description="Discover the collection born from a dream of the ocean — crafted with the same passion our CEO pours into every bottle."
        primaryLabel="Explore Collection"
        secondaryLabel="Order on WhatsApp"
        secondaryHref={contactLinks.whatsapp()}
      />
    </>
  );
}

import type { Metadata } from "next";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import ProductGrid from "@/components/ProductGrid";
import CrystalCollection from "@/components/CrystalCollection";
import CrystalMarquee from "@/components/CrystalMarquee";
import CrystalCarousel from "@/components/CrystalCarousel";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import {
  catalogBottles,
  contactLinks,
  site,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Signature Collection — Shop Luxury Perfumes",
  description:
    "Shop the premium ocean-inspired fragrance collection by The Ocean Perfumes. Explore Ocean Blue, Ocean Noir and Ocean Gold — crafted for confidence and elegance.",
  alternates: { canonical: "/collection" },
};

const journey = [
  {
    step: "01",
    title: "Discover",
    text: "Explore the collection and find the fragrance that speaks to you.",
  },
  {
    step: "02",
    title: "Explore",
    text: "Dive into notes, character and story behind every signature scent.",
  },
  {
    step: "03",
    title: "Evaluate",
    text: "Compare profiles and choose the perfect companion for any moment.",
  },
  {
    step: "04",
    title: "Buy / Contact",
    text: "Order instantly via WhatsApp, or reach us directly for assistance.",
  },
];

const perks = [  {
    title: "Nationwide Delivery",
    text: "Safe, fast delivery across Pakistan.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" strokeLinejoin="round" />
        <circle cx="7" cy="17.5" r="1.8" />
        <circle cx="17" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Original Products",
    text: "Authentic, premium eau de parfum only.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Easy Ordering",
    text: "Order in seconds via WhatsApp or call.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function CollectionPage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:pt-36">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative z-10 text-center lg:text-left">
            <Reveal className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.4em] text-gold-200 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-300" />
              The Signature Collection
            </Reveal>

            <h1 className="font-serif text-4xl leading-[1.1] text-pearl text-shadow-lux sm:text-5xl md:text-6xl xl:text-7xl">
              <Reveal as="span" delay={120} className="block">
                Discover Your{" "}
                <span className="text-gold-gradient">Signature</span>
              </Reveal>
              <Reveal as="span" delay={260} className="block">
                Scent
              </Reveal>
            </h1>

            <Reveal delay={380}>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-mist sm:text-lg lg:mx-0">
                Premium fragrances crafted to express confidence, elegance and
                individuality.
              </p>
            </Reveal>

            <Reveal delay={520}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="#products" className="w-full sm:w-auto">
                  Shop Collection
                </Button>
                <Button href="#contact" variant="ghost" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </div>
            </Reveal>

            <Reveal delay={680}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
                {perks.map((perk) => (
                  <span
                    key={perk.title}
                    className="inline-flex items-center gap-2.5 text-[12px] font-semibold tracking-[0.14em] text-mist uppercase"
                  >
                    <span className="text-gold-300">{perk.icon}</span>
                    {perk.title}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/10 blur-[120px]"
            />
            <Parallax factor={0.1}>
              <div className="origin-center scale-[0.65] sm:scale-[0.85] lg:scale-100">
                <CrystalCarousel />
              </div>
            </Parallax>
            <div
              aria-hidden="true"
              className="absolute -left-6 top-12 hidden animate-float rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-xl lg:block"
            >
              <p className="text-[10px] tracking-[0.3em] text-gold-300 uppercase">Best Seller</p>
              <p className="mt-1 font-serif text-lg text-pearl">Ocean Blue</p>
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-6 bottom-24 hidden animate-float-slow rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-xl lg:block"
              style={{ animationDelay: "-3s" }}
            >
              <p className="text-[10px] tracking-[0.3em] text-gold-300 uppercase">Limited</p>
              <p className="mt-1 font-serif text-lg text-pearl">Ocean Gold</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-16 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-center text-[12px] font-bold tracking-[0.42em] text-gold-300 uppercase">
              The Journey
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item, i) => (
              <Reveal key={item.step} delay={i * 120} className="h-full">
                <div className="group glass relative flex h-full flex-col rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/40">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl text-gold-gradient">{item.step}</span>
                    <span className="hairline-gold flex-1 opacity-60" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-pearl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative scroll-mt-24 px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Collection"
            title="Choose your signature fragrance"
            description="Three masterful compositions, each a different chapter of the ocean. Tap any product for full details, or order instantly on WhatsApp."
          />
          <ProductGrid />
        </div>
      </section>

      <CrystalCollection />

      <section className="relative py-16 sm:py-20">
        <Reveal>
          <CrystalMarquee items={catalogBottles} direction="left-to-right" />
        </Reveal>
      </section>

      <CTASection
        eyebrow="Ready to Order?"
        title="Find your signature scent today"
        description="Explore the collection, chat with us on WhatsApp, and let the ocean become part of your story."
        primaryLabel={site.whatsappDisplay}
        primaryHref={contactLinks.whatsapp()}
        secondaryLabel="Call Us"
        secondaryHref={contactLinks.tel}
      />

      <ContactSection />
    </>
  );
}

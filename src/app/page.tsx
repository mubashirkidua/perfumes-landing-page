import type { Metadata } from "next";
import Link from "next/link";
import CrystalCarousel from "@/components/CrystalCarousel";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Premium Luxury Ocean-Inspired Perfumes",
  description: site.description,
  alternates: { canonical: "/" },
};

const brandValues = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3c3 4.2 6 7 6 11a6 6 0 1 1-12 0c0-4 3-6.8 6-11Z" strokeLinejoin="round" />
        <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Ocean Inspired",
    text: "Each fragrance is drawn from the untamed depth, freshness and mystery of the ocean.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" strokeLinejoin="round" />
        <path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Timeless Elegance",
    text: "Classic, refined compositions that never fade — crafted for those who value permanence.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 3v13" strokeLinecap="round" />
        <path d="M7 9l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 20h14" strokeLinecap="round" />
      </svg>
    ),
    title: "Lasting Impression",
    text: "Long-lasting sillage that lingers gracefully, leaving an unforgettable signature.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:pt-36">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="relative z-10 text-center lg:text-left">
            <Reveal className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-300/30 bg-white/5 px-4 py-2 text-[11px] font-bold tracking-[0.4em] text-gold-200 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-300" />
              Luxury Fragrance House
            </Reveal>

            <h1 className="font-serif text-5xl leading-[1.05] text-pearl text-shadow-lux sm:text-6xl md:text-7xl xl:text-[84px]">
              <Reveal as="span" delay={120} className="block">
                The <span className="text-gold-gradient">Ocean</span>
              </Reveal>
              <Reveal as="span" delay={260} className="block tracking-[0.08em]">
                Perfumes
              </Reveal>
            </h1>

            <Reveal delay={380}>
              <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-gold-200 sm:text-2xl lg:mx-0">
                “{site.tagline}”
              </p>
            </Reveal>

            <Reveal delay={500}>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist sm:text-lg lg:mx-0">
                {site.description}
              </p>
            </Reveal>

            <Reveal delay={620}>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button href="/collection" className="w-full sm:w-auto">
                  Explore Collection
                </Button>
                <Button href="/ceo" variant="ghost" className="w-full sm:w-auto">
                  Discover Our Story
                </Button>
              </div>
            </Reveal>

            <Reveal delay={760}>
              <div className="mt-12 flex items-center justify-center gap-8 text-center lg:justify-start lg:text-left">
                <div>
                  <p className="font-serif text-2xl text-gold-gradient">100ml</p>
                  <p className="mt-1 text-[10px] tracking-[0.28em] text-mist uppercase">Eau de Parfum</p>
                </div>
                <div className="h-10 w-px bg-gradient-to-b from-transparent via-gold-300/40 to-transparent" />
                <div>
                  <p className="font-serif text-2xl text-gold-gradient">3</p>
                  <p className="mt-1 text-[10px] tracking-[0.28em] text-mist uppercase">Signature Scents</p>
                </div>
                <div className="hidden h-10 w-px bg-gradient-to-b from-transparent via-gold-300/40 to-transparent sm:block" />
                <div className="hidden sm:block">
                  <p className="font-serif text-2xl text-gold-gradient">∞</p>
                  <p className="mt-1 text-[10px] tracking-[0.28em] text-mist uppercase">Lasting Sillage</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/20 blur-[120px]"
            />
            <Parallax factor={0.12}>
              <CrystalCarousel />
            </Parallax>
          </div>
        </div>

        <Link
          href="#values"
          aria-label="Scroll to brand values"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist transition-colors duration-300 hover:text-gold-300 sm:flex"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold-300/70 to-transparent" />
        </Link>
      </section>

      <section id="values" className="relative px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our Brand Values"
            title="Born from the depth of the ocean"
            description="Three principles guide every fragrance we craft — each bottle is an invitation to experience the sea."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {brandValues.map((value, i) => (
              <Reveal key={value.title} delay={i * 140} className="h-full">
                <article className="group glass relative h-full overflow-hidden rounded-[26px] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/40 hover:shadow-gold">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-300/30 bg-gradient-to-br from-gold-300/20 to-transparent text-gold-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {value.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-pearl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{value.text}</p>
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-6 font-serif text-6xl text-gold-300/10 transition-all duration-500 group-hover:text-gold-300/25"
                  >
                    0{i + 1}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="origin-center scale-[0.7] sm:scale-90 lg:scale-100">
              <CrystalCarousel
                radius={270}
                duration={24000}
                imageClassName="w-44 sm:w-52 lg:w-60"
                stageClassName="h-[660px] w-[660px]"
              />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="The Signature Collection"
              title="A fragrance for every mood of the sea"
              description="From the crisp freshness of Ocean Blue to the warm confidence of Ocean Gold, find the scent that speaks to your soul."
            />
            <Reveal delay={200}>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button href="/collection" className="w-full sm:w-auto">
                  Shop the Collection
                </Button>
                <Button href="/ceo" variant="ghost" className="w-full sm:w-auto">
                  Meet Our CEO
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        title="Your signature scent is waiting"
        description="Step into a world where oceanic freshness meets timeless luxury. Order today and let the ocean speak for you."
        primaryLabel="Explore Collection"
        secondaryLabel="Contact Us"
        secondaryHref="/collection#contact"
      />
    </>
  );
}

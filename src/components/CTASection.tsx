import Button from "./Button";
import Reveal from "./Reveal";

export default function CTASection({
  eyebrow = "Begin Your Journey",
  title,
  description,
  primaryLabel = "Shop the Collection",
  primaryHref = "/collection",
  secondaryLabel,
  secondaryHref,
  id,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  id?: string;
}) {
  return (
    <section id={id} className="relative px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal className="glass relative overflow-hidden rounded-[32px] px-6 py-14 text-center sm:px-12 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-64 w-[480px] -translate-x-1/2 rounded-full bg-gold-300/20 blur-[110px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-ocean-500/25 blur-[110px]"
          />
          <p className="mb-4 text-[12px] font-bold tracking-[0.42em] text-gold-300 uppercase">
            {eyebrow}
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-pearl text-shadow-lux sm:text-4xl md:text-[46px]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={primaryHref} className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} variant="ghost" className="w-full sm:w-auto">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

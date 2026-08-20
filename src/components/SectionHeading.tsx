import { cn } from "../lib/cn";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 max-w-2xl md:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <p
        className={cn(
          "mb-4 flex items-center gap-3 text-[12px] font-bold tracking-[0.42em] text-gold-300 uppercase",
          align === "center" ? "justify-center" : "justify-start"
        )}
      >
        {align === "left" && <span className="hairline-gold w-8" />}
        {eyebrow}
        {align === "center" && <span className="hairline-gold w-8" />}
      </p>
      <h2 className="font-serif text-3xl leading-tight text-pearl text-shadow-lux sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-mist md:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}

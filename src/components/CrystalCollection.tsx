import CrystalMarquee from "./CrystalMarquee";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { catalogBottles } from "../data/site";

export default function CrystalCollection() {
  return (
    <section id="crystal" className="relative scroll-mt-24 py-20 sm:py-24 md:py-28">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[480px] w-[90vw] max-w-4xl -translate-x-1/2 rounded-full bg-gold-300/5 blur-[130px]"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Crystal Collection"
          title="Bottles forged in crystal light"
          description="Ten crystal-crafted flacons, each a living prism of colour. Hover to pause and explore every bottle."
        />
      </div>

      <div className="mt-12 sm:mt-16">
        <Reveal>
          <CrystalMarquee items={catalogBottles} />
        </Reveal>
      </div>
    </section>
  );
}

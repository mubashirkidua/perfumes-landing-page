import type { Metadata } from "next";
import type { ReactNode } from "react";

type LegalSection = {
  heading: string;
  body: ReactNode;
};

export function legalMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
  };
}

export default function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <div className="px-5 pb-28 pt-32 sm:px-8 lg:pt-36">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] font-bold tracking-[0.32em] text-gold-300 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-pearl sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-mist">Last updated: {updated}</p>

        {children && <div className="mt-10">{children}</div>}

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl text-gold-200">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-mist">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

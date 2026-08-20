import { contactLinks, site } from "../data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const channels = [
  {
    label: "WhatsApp Ordering",
    text: "Fastest way to order — chat with us directly.",
    value: site.whatsappDisplay,
    href: contactLinks.whatsapp(),
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.94 1.35-.5.05-1.13.24-3.8-.8-3.2-1.27-5.24-4.55-5.4-4.76-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4h.61c.2 0 .46-.07.72.55.27.64.92 2.23 1 2.39.08.16.13.35.03.56-.11.21-.16.34-.32.52-.16.18-.34.41-.48.55-.16.16-.33.34-.14.66.19.32.85 1.4 1.82 2.27 1.25 1.12 2.3 1.47 2.63 1.63.33.16.52.14.71-.08.19-.21.82-.95 1.03-1.28.22-.32.43-.27.72-.16.3.1 1.9.9 2.23 1.06.32.16.54.24.62.38.08.13.08.8-.16 1.47z" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    text: "Speak with our fragrance consultants directly.",
    value: site.phoneDisplay,
    href: contactLinks.tel,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    text: "For inquiries, orders and partnerships.",
    value: site.email,
    href: contactLinks.email,
    external: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="We would love to hear from you"
          description="Order your signature scent or ask us anything — our team is one message away."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 130} className="h-full">
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group glass flex h-full flex-col items-center rounded-[26px] p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:border-gold-300/40 hover:shadow-gold"
              >
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold-300/30 bg-gradient-to-br from-gold-300/15 to-transparent text-gold-300 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {channel.icon}
                </span>
                <h3 className="font-serif text-xl text-pearl">{channel.label}</h3>
                <p className="mt-2 text-sm text-mist">{channel.text}</p>
                <span className="mt-4 break-all text-sm font-semibold text-gold-300 transition-colors duration-300 group-hover:text-gold-100">
                  {channel.value}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

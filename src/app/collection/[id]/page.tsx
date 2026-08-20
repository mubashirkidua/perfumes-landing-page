import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/Button";
import PayButton from "@/components/PayButton";
import { contactLinks, formatPrice, products } from "@/data/site";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.size}`,
    description: product.description,
    alternates: { canonical: `/collection/${product.id}` },
  };
}

function NoteList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-bold tracking-[0.3em] text-gold-300 uppercase">
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-mist">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const orderUrl = contactLinks.whatsapp(
    `Hello The Ocean Perfumes! I would like to order *${product.name}* (${product.size}) — ${formatPrice(
      product.price
    )}.`
  );

  return (
    <div className="px-5 pb-24 pt-28 sm:px-8 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/collection"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-mist uppercase transition-colors duration-300 hover:text-gold-300"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Collection
        </Link>

        <div className="glass-deep grid overflow-hidden rounded-[32px] shadow-deep md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:min-h-[620px]">
            <Image
              src={product.image}
              alt={`${product.name} — ${product.size}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ocean-900/40" />
            <span className="absolute left-6 top-6 rounded-full border border-gold-300/40 bg-ocean-950/70 px-4 py-2 text-[11px] font-bold tracking-[0.26em] text-gold-300 uppercase backdrop-blur-md">
              Eau de Parfum
            </span>
          </div>

          <div className="flex flex-col gap-6 p-8 sm:p-11">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-400/40 px-3 py-1 text-[10px] font-bold tracking-[0.26em] text-gold-300 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
              {product.tagline}
            </span>

            <h1 className="font-serif text-4xl font-semibold text-pearl sm:text-5xl">
              {product.name}
            </h1>
            <p className="text-base leading-relaxed text-mist md:text-lg">
              {product.description}
            </p>

            <div className="flex items-end gap-3">
              <span className="font-serif text-4xl font-semibold text-gold-gradient">
                {formatPrice(product.price)}
              </span>
              <span className="pb-1 text-sm text-mist">{product.size}</span>
            </div>

            <div className="hairline-gold" />

            <div className="grid gap-6 sm:grid-cols-3">
              <NoteList label="Top Notes" items={product.notes.top} />
              <NoteList label="Heart Notes" items={product.notes.heart} />
              <NoteList label="Base Notes" items={product.notes.base} />
            </div>

            <div className="hairline-gold" />

            <div className="flex flex-col gap-3.5">
              <Button
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 text-sm"
                ariaLabel={`Order ${product.name} on WhatsApp`}
              >
                Order on WhatsApp
              </Button>
              <PayButton
                item={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  size: product.size,
                  image: product.image,
                }}
                className="w-full py-4 text-sm"
                label={`Pay ${formatPrice(product.price)} with Card`}
              />
              <div className="grid grid-cols-2 gap-3.5">
                <a
                  href={contactLinks.tel}
                  className="button-ghost hover:button-ghost-hover flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Call Us
                </a>
                <a
                  href={contactLinks.email}
                  className="button-ghost hover:button-ghost-hover flex items-center justify-center gap-2 rounded-full px-4 py-3.5 text-[12px] font-bold tracking-[0.12em] uppercase"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

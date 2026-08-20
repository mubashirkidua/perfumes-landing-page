export const site = {
  name: "The Ocean Perfumes",
  tagline: "Where Oceanic Freshness Meets Timeless Luxury.",
  description:
    "Discover refined fragrances inspired by the depth, freshness and mystery of the ocean.",
  email: "alimuhammd98573@gmail.com",
  phoneDisplay: "0323-2930657",
  phoneIntl: "+923232930657",
  whatsappDisplay: "0342-8156086",
  whatsappIntl: "923428156086",
  whatsappMessage:
    "Hello The Ocean Perfumes! I would like to place an order.",
} as const;

export const contactLinks = {
  email: `mailto:${site.email}`,
  tel: `tel:${site.phoneIntl}`,
  whatsapp: (message: string = site.whatsappMessage) =>
    `https://wa.me/${site.whatsappIntl}?text=${encodeURIComponent(message)}`,
} as const;

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  size: string;
  accent: "blue" | "noir" | "gold";
};

export const products: Product[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue",
    tagline: "Fresh aquatic elegance",
    description:
      "An elegant aquatic fragrance with a fresh oceanic character and sophisticated depth.",
    price: 4999,
    image: "/images/product-ocean-blue.jpg",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Marine Accord", "Bergamot", "Sea Salt"],
      heart: ["Blue Lotus", "Jasmine", "Cucumber"],
      base: ["Amberwood", "White Musk", "Driftwood"],
    },
    accent: "blue",
  },
  {
    id: "ocean-noir",
    name: "Ocean Noir",
    tagline: "Mysterious midnight depth",
    description:
      "A mysterious and refined fragrance blending freshness with a deep luxurious character.",
    price: 5499,
    image: "/images/product-ocean-noir.jpg",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Black Pepper", "Cypress", "Ozone"],
      heart: ["Suede", "Violet", "Seaweed Absolute"],
      base: ["Oud Accord", "Vetiver", "Amber"],
    },
    accent: "noir",
  },
  {
    id: "ocean-gold",
    name: "Ocean Gold",
    tagline: "Warm golden confidence",
    description:
      "A warm sophisticated scent designed for confidence, elegance and unforgettable evenings.",
    price: 5999,
    image: "/images/product-ocean-gold.jpg",
    size: "100ml Eau de Parfum",
    notes: {
      top: ["Golden Amber", "Mandarin", "Saffron"],
      heart: ["Neroli", "Honey", "Rose Absolute"],
      base: ["Vanilla", "Sandalwood", "Tonka Bean"],
    },
    accent: "gold",
  },
];

export const formatPrice = (price: number) =>
  `PKR ${price.toLocaleString("en-PK")}`;

export type CrystalBottle = {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  glow: string;
  image: string;
  price: number;
  size: string;
};

export type PaymentItem = {
  id: string;
  name: string;
  price: number;
  size?: string;
  image?: string;
};

export const crystalBottles: CrystalBottle[] = [  {
    id: "ruby",
    name: "Crystal Ruby",
    subtitle: "Fiery & passionate",
    color: "text-red-400",
    glow: "bg-red-500/35",
    image: "/images/crystal-ruby.png",
    price: 7999,
    size: "50ml Eau de Parfum",
  },
  {
    id: "emerald",
    name: "Crystal Emerald",
    subtitle: "Fresh & magnetic",
    color: "text-emerald-400",
    glow: "bg-emerald-500/35",
    image: "/images/crystal-emerald.png",
    price: 7499,
    size: "50ml Eau de Parfum",
  },
  {
    id: "amethyst",
    name: "Crystal Amethyst",
    subtitle: "Mystic & bold",
    color: "text-purple-400",
    glow: "bg-purple-500/35",
    image: "/images/crystal-amethyst.png",
    price: 6999,
    size: "50ml Eau de Parfum",
  },
  {
    id: "obsidian",
    name: "Crystal Obsidian",
    subtitle: "Deep & enigmatic",
    color: "text-slate-300",
    glow: "bg-slate-400/35",
    image: "/images/crystal-obsidian.png",
    price: 7999,
    size: "50ml Eau de Parfum",
  },
  {
    id: "sapphire",
    name: "Crystal Sapphire",
    subtitle: "Calm & regal",
    color: "text-blue-400",
    glow: "bg-blue-500/35",
    image: "/images/crystal-sapphire.png",
    price: 7499,
    size: "50ml Eau de Parfum",
  },
  {
    id: "golden",
    name: "Crystal Golden",
    subtitle: "Warm & luminous",
    color: "text-gold-300",
    glow: "bg-gold-300/35",
    image: "/images/crystal-golden.png",
    price: 8499,
    size: "50ml Eau de Parfum",
  },
  {
    id: "rose",
    name: "Crystal Rose",
    subtitle: "Soft & romantic",
    color: "text-pink-400",
    glow: "bg-pink-500/35",
    image: "/images/crystal-rose.png",
    price: 6499,
    size: "50ml Eau de Parfum",
  },
  {
    id: "teal",
    name: "Crystal Teal",
    subtitle: "Cool & serene",
    color: "text-teal-400",
    glow: "bg-teal-400/35",
    image: "/images/crystal-teal.png",
    price: 6999,
    size: "50ml Eau de Parfum",
  },
  {
    id: "citrine",
    name: "Crystal Citrine",
    subtitle: "Sunny & radiant",
    color: "text-amber-400",
    glow: "bg-amber-400/35",
    image: "/images/crystal-citrine.png",
    price: 6499,
    size: "50ml Eau de Parfum",
  },
  {
    id: "crystal",
    name: "Crystal Clear",
    subtitle: "Pure & timeless",
    color: "text-sky-200",
    glow: "bg-sky-300/35",
    image: "/images/crystal-crystal.png",
    price: 8499,
    size: "50ml Eau de Parfum",
  },
];

export const catalogBottles: CrystalBottle[] = [
  ...products.map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.tagline,
    color:
      p.accent === "blue"
        ? "text-ocean-300"
        : p.accent === "noir"
          ? "text-ocean-100"
          : "text-gold-300",
    glow:
      p.accent === "blue"
        ? "bg-blue-500/35"
        : p.accent === "noir"
          ? "bg-slate-400/35"
          : "bg-gold-300/35",
    image: p.image,
    price: p.price,
    size: p.size,
  })),
  ...crystalBottles,
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "CEO", href: "/ceo" },
  { label: "Collection", href: "/collection" },
  { label: "Contact", href: "/collection#contact" },
] as const;

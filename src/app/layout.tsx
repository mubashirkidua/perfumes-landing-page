import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import OceanBackground from "@/components/OceanBackground";
import PaymentProvider from "@/components/PaymentProvider";
import { site } from "@/data/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theoceanperfumes.example.com"),
  title: {
    default: `${site.name} — Where Oceanic Freshness Meets Timeless Luxury`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "The Ocean Perfumes",
    "luxury perfume",
    "ocean perfume",
    "eau de parfum",
    "premium fragrance",
    "Pakistan perfumes",
    "designer perfume",
  ],
  authors: [{ name: site.name, url: "/ceo" }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Premium Luxury Perfumes`,
    description: site.description,
    images: [
      {
        url: "/images/bottle-hero.png",
        width: 900,
        height: 900,
        alt: `${site.name} signature perfume bottle`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium Luxury Perfumes`,
    description: site.description,
    images: ["/images/bottle-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#061A2D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <OceanBackground intensity="subtle" />
        <PaymentProvider>
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
        </PaymentProvider>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}

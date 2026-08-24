# The Ocean Perfumes

A premium, production-ready luxury perfume brand website with a full ordering + admin backend, built with **Next.js 16 + React 19 + TypeScript + Tailwind CSS v4**.

> Where Oceanic Freshness Meets Timeless Luxury.

## Pages

| Route | Description |
| --- | --- |
| `/` | Brand introduction — cinematic hero, brand values, signature collection teaser |
| `/ceo` | CEO profile — Muhammad Mubashir Ali, contact cards, luxury quote |
| `/collection` | Sales landing — signature scents, rotating crystal collection, product cards, quick-view modal, contact section, mobile sticky CTA |
| `/collection/[id]` | SEO-friendly product detail pages for each scent |
| `/privacy-policy` | Privacy policy (brand placeholders — client should review) |
| `/terms` | Terms & Conditions (brand placeholders — client should review) |
| `/refund-shipping` | Refund & Shipping policy (brand placeholders — client should review) |
| `/admin` | Admin dashboard — order management, stats, product price & stock editor (auth required) |
| `/admin/login` | Admin sign-in page |

## Checkout & Orders

- **Payment methods**: Card (via the payment gateway integration point — see below) and **Cash on Delivery (COD)**
- **Customer info**: name, phone and delivery address (required for COD) are captured and stored
- **Server-side pricing**: the amount is always calculated from the server catalog — a client-sent price is never trusted
- **Stock management**: stock is deducted when an order is placed; out-of-stock / low-stock badges show on product cards, and orders are rejected when stock runs out
- Orders persist to `data/db.json` (JSON file store, atomic writes, no external DB required)

## Payment Gateway Integration (Client Task)

Card payments currently complete through a clearly-marked **placeholder** in `src/lib/payment-gateway.ts`.

The client must replace the body of the `processCardPayment` function with a real charge call. Everything else (order creation, stock deduction, admin display of transaction IDs) is already wired.

```ts
// src/lib/payment-gateway.ts
export async function processCardPayment(input) {
  // Replace this with a real gateway call, for example:
  //
  // Stripe:
  //   const intent = await stripe.paymentIntents.create({
  //     amount: input.amount * 100, // minor units (paise)
  //     currency: "pkr",
  //     metadata: { orderId: input.orderId },
  //   });
  //   return { success: true, transactionId: intent.id };
  //
  // JazzCash / EasyPaisa: HTTP POST the order to their API and
  // return { success: true, transactionId: "<gateway-txn-id>" }.
  //
  // On failure return { success: false, error: "message" }.
}
```

- Card details are never sent to or stored on this server — only the last 4 digits are kept for reference.
- If a payment fails, the deducted stock is automatically restored and the customer sees a friendly error.

## Admin Panel

| Feature | Description |
| --- | --- |
| **Login** | Session-cookie auth (HMAC-signed), one admin password via `ADMIN_PASSWORD` env |
| **Stats** | Total orders, today's orders, revenue, pending / shipped / delivered counts |
| **Orders** | View customer details, payment method, transaction ID, amounts; update status (pending → confirmed → shipped → delivered / cancelled) |
| **Products** | Edit price and stock inline for all 13 products; changes go live on the storefront instantly |

Access via the **Sign In** button in the navbar, the **Admin Panel** link in the footer, or `/admin`.

### Setup

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production site URL (no trailing slash) — used for SEO canonical/OG links |
| `ADMIN_PASSWORD` | Admin panel login password (local default: `ocean-admin-2026`) |
| `ADMIN_SESSION_SECRET` | HMAC secret for session cookies — set a long random value in production |

## API Routes

| Route | Method | Auth | Description |
| --- | --- | --- | --- |
| `/api/checkout` | POST | — | Place an order (card or COD) |
| `/api/catalog` | GET | — | Live catalog with current prices & stock |
| `/api/admin/login` | POST | — | Sign in, sets session cookie |
| `/api/admin/logout` | POST | ✓ | Sign out |
| `/api/admin/session` | GET | — | Check auth state |
| `/api/admin/orders` | GET | ✓ | List orders |
| `/api/admin/orders/[id]` | PATCH | ✓ | Update order status |
| `/api/admin/stats` | GET | ✓ | Dashboard stats |
| `/api/admin/products` | GET/PATCH | ✓ | List / edit products |

## Go-Live Checklist (Client)

1. **Payment gateway** — implement `processCardPayment` in `src/lib/payment-gateway.ts` (Stripe, JazzCash or EasyPaisa)
2. **Site URL** — set `NEXT_PUBLIC_SITE_URL` to the production domain in `.env`
3. **Admin security** — set a strong `ADMIN_PASSWORD` and a long random `ADMIN_SESSION_SECRET`
4. **Brand content** — replace placeholder images in `public/images/` and finalise contact/address details in `src/data/site.ts`
5. **Legal pages** — review `/privacy-policy`, `/terms` and `/refund-shipping` and adjust to your business reality
6. **Data** — `data/db.json` is gitignored; back it up regularly in production

## Design System

- **Colors**: Deep Ocean Navy `#061A2D`, Midnight Blue `#020B16`, Ocean Blue `#0B3D5C`, Champagne Gold `#D6B36A`, Pearl White `#F7F8FA`
- **Typography**: Playfair Display (serif headings) + Manrope (sans body)
- **Effects**: glassmorphism, ocean particle field, parallax, 3D card tilt, floating elements, scroll reveals, animated waves, continuous 3D crystal bottle rotation
- **Accessibility**: semantic landmarks, ARIA labels, keyboard-close modal, `prefers-reduced-motion` support
- **SEO**: per-page metadata, Open Graph, Twitter cards, canonical URLs, static prerendering

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality

```bash
npm run lint    # ESLint — clean
npm run build   # Next.js production build — clean
```

Placeholder artwork is generated from `scripts/generate-images.mjs` (SVG -> sharp):

```bash
node scripts/generate-images.mjs
```

Ten rotating crystal bottles (ruby, emerald, amethyst, obsidian, sapphire, golden, rose, teal, citrine, crystal) are generated by `scripts/generate-crystal.mjs`:

```bash
node scripts/generate-crystal.mjs
```

Images live in `public/images/`. Replace them with real photography when available. `data/` (orders + product overrides) is gitignored so real order data is never pushed.

## Contact

- Email: alimuhammd98573@gmail.com
- Mobile: 0323-2930657
- WhatsApp: 0342-8156086

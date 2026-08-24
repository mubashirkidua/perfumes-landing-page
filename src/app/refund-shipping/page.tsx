import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = legalMetadata(
  "Refund & Shipping Policy",
  "Shipping, delivery and refund/return policy for The Ocean Perfumes."
);

export default function RefundShippingPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Refund & Shipping Policy"
      updated="24 August 2026"
      sections={[
        {
          heading: "Shipping & Delivery",
          body: (
            <>
              <p>
                Orders are dispatched within 1–2 business days of confirmation.
                Standard delivery within major Pakistani cities takes 2–4
                business days; other cities may take 4–7 business days depending
                on your courier area.
              </p>
              <p>
                A delivery fee may apply for orders outside the primary delivery
                zone. You will be informed of any fee before dispatch.
              </p>
            </>
          ),
        },
        {
          heading: "Order Tracking",
          body: (
            <p>
              After dispatch you will receive a confirmation on WhatsApp or by
              phone with tracking details. You can also reach us at{" "}
              {site.phoneDisplay} with your order reference number.
            </p>
          ),
        },
        {
          heading: "Returns & Refunds",
          body: (
            <>
              <p>
                We want you to love your fragrance. If you receive a damaged,
                defective or incorrect item, contact us within 48 hours of
                delivery and we will arrange a replacement or a full refund.
              </p>
              <p>
                For hygiene reasons, we are unable to accept returns of products
                whose seals have been opened or tampered with, unless the product
                itself is faulty.
              </p>
              <p>
                Refunds for card payments are processed to the original payment
                method within 5–7 business days of approval. COD refunds are
                issued via bank transfer or as store credit, at your choice.
              </p>
            </>
          ),
        },
        {
          heading: "Non-Returnable Items",
          body: (
            <p>
              Fragrance products that have been used, opened or unsealed cannot be
              returned or exchanged unless defective.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              For any return, refund or delivery question, contact us at{" "}
              <a href={`mailto:${site.email}`} className="text-gold-300 underline">
                {site.email}
              </a>{" "}
              or {site.phoneDisplay}.
            </p>
          ),
        },
      ]}
    />
  );
}

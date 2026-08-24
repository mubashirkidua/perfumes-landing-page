import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = legalMetadata(
  "Terms & Conditions",
  "The terms and conditions for using The Ocean Perfumes online store."
);

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="24 August 2026"
      sections={[
        {
          heading: "Agreement",
          body: (
            <p>
              By placing an order on {site.name}, you agree to these Terms &
              Conditions. Please read them carefully before completing a purchase.
            </p>
          ),
        },
        {
          heading: "Products & Pricing",
          body: (
            <>
              <p>
                Product images are illustrative. Colours and packaging may vary
                slightly from the images shown. Prices are listed in Pakistani
                Rupees (PKR) and are inclusive of applicable taxes unless stated
                otherwise.
              </p>
              <p>
                We reserve the right to update prices at any time. The price shown
                at the moment you place an order is the price you pay.
              </p>
            </>
          ),
        },
        {
          heading: "Orders",
          body: (
            <>
              <p>
                An order is confirmed once we receive your details and (for card
                payments) successful payment authorisation. We may contact you to
                confirm or clarify order details before dispatch.
              </p>
              <p>
                If a product is out of stock at the time of fulfilment, we will
                contact you to arrange a replacement, restock date or refund.
              </p>
            </>
          ),
        },
        {
          heading: "Payment",
          body: (
            <>
              <p>
                We accept card payments (processed through a secure payment
                gateway) and Cash on Delivery (COD) within Pakistan.
              </p>
              <p>
                For COD orders, please keep the exact amount ready. A delivery
                fee may apply depending on your location and will be communicated
                before dispatch.
              </p>
            </>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Contact us at{" "}
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

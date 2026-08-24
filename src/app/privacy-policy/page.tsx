import LegalPage, { legalMetadata } from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = legalMetadata(
  "Privacy Policy",
  "How The Ocean Perfumes collects, uses and protects your personal information."
);

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="24 August 2026"
      sections={[
        {
          heading: "Information We Collect",
          body: (
            <>
              <p>
                When you place an order, we collect your name, phone number and
                delivery address. If you pay by card, we collect only the last
                four digits of your card number — full card details are processed
                by the payment gateway and are never stored on our servers.
              </p>
              <p>
                We may also collect basic analytics data (such as pages visited
                and browser type) to improve your experience on {site.name}.
              </p>
            </>
          ),
        },
        {
          heading: "How We Use Your Information",
          body: (
            <>
              <p>
                Your details are used to process and deliver your order, confirm
                your purchase by phone or WhatsApp, and provide customer support.
                We do not sell, rent or share your personal information with
                third parties, except as required to fulfil your order (for
                example, a delivery partner).
              </p>
            </>
          ),
        },
        {
          heading: "Data Storage & Security",
          body: (
            <>
              <p>
                Order data is stored securely and is only accessible to the store
                administrator. We use reasonable technical and organisational
                measures to protect your information from unauthorised access.
              </p>
            </>
          ),
        },
        {
          heading: "Your Rights",
          body: (
            <>
              <p>
                You may request a copy of the information we hold about you, or
                ask us to correct or delete it. To do so, contact us using the
                details below.
              </p>
            </>
          ),
        },
        {
          heading: "Contact Us",
          body: (
            <>
              <p>
                For any privacy questions or requests, reach us at{" "}
                <a href={`mailto:${site.email}`} className="text-gold-300 underline">
                  {site.email}
                </a>{" "}
                or call {site.phoneDisplay}.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}

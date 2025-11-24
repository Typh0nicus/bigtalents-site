import type { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Big Talents team for partnerships, press, or player support. We’re active across NA & EU.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description:
      "Partnerships, press, player support — get in touch with Big Talents.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}

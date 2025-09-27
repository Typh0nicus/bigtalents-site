import type { Metadata } from "next";
import BrandGuidelinesClient from "@/components/brand/BrandGuidelinesClient";

export const metadata: Metadata = {
  title: "Brand Guidelines — Big Talents",
  description:
    "Official Big Talents brand guidelines, logo usage, colors, and assets for partners and creators.",
  alternates: { canonical: "/brand-guidelines" },
  openGraph: {
    title: "Brand Guidelines — Big Talents",
    description: "Official brand guidelines, logos, and assets for Big Talents partners.",
    url: "/brand-guidelines",
    type: "website",
  },
};

export default function BrandGuidelinesPage() {
  return <BrandGuidelinesClient />;
}

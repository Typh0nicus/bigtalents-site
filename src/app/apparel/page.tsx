import type { Metadata } from "next";
import { ApparelFilters } from "@/components/apparel/ApparelFilters";
import { ApparelHero } from "@/components/apparel/ApparelHero";
import { FeaturedPromo } from "@/components/apparel/FeaturedPromo";
import { ProductGrid } from "@/components/apparel/ProductGrid";

export const metadata: Metadata = {
  title: "Apparel",
  description: "Shop the latest Big Talents apparel drops and limited releases.",
  alternates: { canonical: "/apparel" },
  openGraph: {
    title: "Apparel",
    description: "Shop the latest Big Talents apparel drops and limited releases.",
    url: "/apparel",
    type: "website",
  },
};

export default function ApparelPage() {
  return (
    <div className="bg-black text-white">
      <ApparelHero />
      <ApparelFilters />
      <ProductGrid />
      <FeaturedPromo />
    </div>
  );
}

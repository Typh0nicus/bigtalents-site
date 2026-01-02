import type { Metadata } from "next";
import { ProductCard } from "@/components/store/ProductCard";

const products = [
  {
    id: "bgt-pro-jersey",
    name: "BGT Pro Jersey",
    description: "Our signature jersey with breathable performance fabric and gold accents.",
    price: "$79",
  },
  {
    id: "founders-hoodie",
    name: "Founders Hoodie",
    description: "Limited edition heavyweight hoodie inspired by the Elite Club palette.",
    price: "$92",
  },
  {
    id: "collector-pin-set",
    name: "Collector Pin Set",
    description: "Three enamel pins celebrating the biggest moments in BGT history.",
    price: "$24",
  },
];

export const metadata: Metadata = {
  title: "BGT Store",
  description: "Explore upcoming Big Talents merchandise and collectible drops.",
  alternates: { canonical: "/store" },
  openGraph: {
    title: "BGT Store",
    description: "Explore upcoming Big Talents merchandise and collectible drops.",
    url: "/store",
    type: "website",
  },
};

export default function StorePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[var(--gold)]/80">
          Storefront Preview
        </p>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">BGT Merch Store</h1>
        <p className="max-w-2xl text-base text-white/70">
          We&apos;re preparing the official Big Talents store. Here&apos;s a sneak peek at the
          first wave of merchandise while we finalize checkout and fulfillment.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

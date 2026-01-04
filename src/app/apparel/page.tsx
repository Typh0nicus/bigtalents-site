import type { Metadata } from "next";
import { ApparelHero } from "@/components/apparel/ApparelHero";
import { DropCountdown } from "@/components/apparel/DropCountdown";
import { ProductGrid } from "@/components/apparel/ProductGrid";
import { SizeGuide } from "@/components/apparel/SizeGuide";
import { APPAREL_ITEMS, UPCOMING_DROPS } from "@/data/apparel";

export const metadata: Metadata = {
  title: "Apparel",
  description: "Official Big Talents merchandise. Premium esports apparel for the BGT community.",
  openGraph: {
    title: "BGT Apparel | Big Talents",
    description: "Premium esports apparel designed for champions. Shop the official Big Talents collection.",
    url: "https://bigtalents.org/apparel",
    siteName: "Big Talents",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Big Talents Apparel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    title: "BGT Apparel | Big Talents",
    description: "Premium esports apparel designed for champions.",
    images: ["/og.png"],
  },
};

export default function ApparelPage() {
  const upcomingDrop = UPCOMING_DROPS[0];

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero Section */}
      <ApparelHero />

      {/* Countdown Section */}
      {upcomingDrop && <DropCountdown drop={upcomingDrop} />}

      {/* Products Grid */}
      <ProductGrid items={APPAREL_ITEMS} />

      {/* Size Guide Section */}
      <SizeGuide />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bgt-bg-master opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
        
        <div className="container relative z-10">
          <div className="card-premium p-12 lg:p-16 text-center max-w-3xl mx-auto glow-gold-subtle">
            <span className="label-esports text-gold-vibrant text-xs sm:text-sm inline-block mb-4">
              Stay Updated
            </span>
            <h2 className="h2 text-gradient-gold mb-4">
              Don&apos;t Miss the Drop
            </h2>
            <p className="lead text-white/80 mb-8">
              Be the first to know when new merchandise launches. Sign up for notifications and exclusive early access.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                Get Notified
              </button>
              <a href="/club" className="btn btn-outline btn-lg">
                Join BGT Club
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

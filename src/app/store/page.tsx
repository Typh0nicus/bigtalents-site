import type { Metadata } from "next";
import { ComingSoon } from "@/components/store/ComingSoon";

export const metadata: Metadata = {
  title: "Store",
  description: "Official Big Talents merchandise store. Premium esports apparel coming soon.",
  openGraph: {
    title: "BGT Store | Big Talents",
    description: "Premium esports merchandise coming soon. Be the first to shop the official Big Talents collection.",
    url: "https://bigtalents.org/store",
    siteName: "Big Talents",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Big Talents Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    title: "BGT Store | Big Talents",
    description: "Premium esports merchandise coming soon.",
    images: ["/og.png"],
  },
};

export default function StorePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <ComingSoon />
    </main>
  );
}

import type { Metadata } from "next";
import { PlayersComingSoon } from "@/components/players/PlayersComingSoon";

export const metadata: Metadata = {
  title: "Players",
  description: "Meet the BGT competitive roster. Player profiles coming soon.",
  openGraph: {
    title: "Players | Big Talents",
    description: "Discover the talented players competing under the BGT banner.",
    url: "https://bigtalents.org/players/coming-soon",
    siteName: "Big Talents",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Big Talents Players",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    title: "Players | Big Talents",
    description: "Discover the talented players competing under the BGT banner.",
    images: ["/og.png"],
  },
};

export default function PlayersComingSoonPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <PlayersComingSoon />
    </main>
  );
}

import type { Metadata } from "next";
import { PlayersComingSoon } from "@/components/players/PlayersComingSoon";

export const metadata: Metadata = {
  title: "Players Coming Soon",
  description: "Three elite players joining the BGT roster. New competitive lineup incoming. Follow for the reveal.",
  openGraph: {
    title: "Players Coming Soon | Big Talents",
    description: "Three elite players joining the BGT roster. The reveal is coming soon.",
    url: "https://bigtalents.org/players/coming-soon",
    siteName: "Big Talents",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Big Talents Players Coming Soon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
    title: "Players Coming Soon | Big Talents",
    description: "Three elite players joining the BGT roster. Follow for the reveal.",
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

// src/app/rosters/page.tsx
import type { Metadata } from "next";
import ComingSoonRosters from "@/components/rosters/ComingSoonRosters";

// Force fresh render during development / after deploy until roster goes live
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Rosters — Big Talents",
  description:
    "Official BGT rosters hub. Competitive rosters coming soon; creator program is active and accepting applications.",
  alternates: { canonical: "/rosters" },
  openGraph: {
    title: "Rosters — Big Talents",
    description:
      "Explore BGT programs by game. Competitive rosters are coming soon; creator program is active.",
    url: "/rosters",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
  },
};

export default function RostersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Big Talents",
            url: "https://bigtalents.gg/rosters",
            department: [
              {
                "@type": "SportsTeam",
                name: "BGT — Brawl Stars",
                sport: "Esports",
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: "Programs",
                  itemListElement: [
                    { "@type": "Offer", name: "Competitive Roster", availability: "https://schema.org/PreOrder", url: "https://bigtalents.gg/rosters" },
                    { "@type": "Offer", name: "Creator Program", availability: "https://schema.org/InStock", url: "https://bigtalents.gg/creator-program/apply" },
                  ],
                },
              },
            ],
          }),
        }}
      />
      <ComingSoonRosters />
    </>
  );
}

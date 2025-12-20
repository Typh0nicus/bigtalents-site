// src/app/creators/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big Talents | Creators",
  description:
    "Meet the Big Talents content creators across YouTube, Twitch, TikTok and more.",
  openGraph: {
    title: "Big Talents | Creators",
    description:
      "Discover Big Talents creators producing high-level Brawl Stars and esports content.",
    images: [
      {
        url: "/images/og-creators.webp",
        width: 1200,
        height: 630,
        alt: "Big Talents Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Talents | Creators",
    description:
      "Premium content creators representing Big Talents across platforms.",
    images: ["/images/og-creators.webp"],
  },
};

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

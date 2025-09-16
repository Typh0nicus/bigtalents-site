import type { Metadata } from "next";
import NewsClient from "@/components/news/NewsClient";

export const metadata: Metadata = {
  title: "News — Big Talents",
  description:
    "Updates, announcements, and winners from Big Talents tournaments across NA & EU.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News — Big Talents",
    description: "Tournament recaps, announcements, and community updates.",
    url: "/news",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bgtalents",
    creator: "@bgtalents",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}

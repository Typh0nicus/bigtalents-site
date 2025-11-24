import type { Metadata } from "next";
import ClubClient from "@/components/club/ClubClient";

export const metadata: Metadata = {
  title: "BGT Elite Club",
  description:
    "Join the most exclusive Brawl Stars club. Play with world champions, top global players, and biggest creators. Limited access.",
  alternates: { canonical: "/club" },
  openGraph: {
    title: "BGT Elite Club",
    description:
      "The most exclusive Brawl Stars club. World champions, top players, biggest creators.",
    url: "/club",
    type: "website",
  },
};

export default function ClubPage() {
  return <ClubClient />;
}

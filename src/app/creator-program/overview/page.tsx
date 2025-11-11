import { CreatorProgram } from "@/components/creator/CreatorProgram";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creator Program Overview — BGT",
  description: "Join the Big Talents Creator Program and collaborate with top esports talent.",
  openGraph: {
    title: "Creator Program Overview — BGT",
    description: "The most exclusive creator program in Brawl Stars esports. Grow your audience, earn revenue, and collaborate with the best.",
    images: [
      {
        url: "/images/og-creator-program.webp",
        width: 1920,
        height: 1080,
        alt: "BGT Creator Program",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Program Overview — BGT",
    description: "The most exclusive creator program in Brawl Stars esports.",
    images: ["/images/og-creator-program.jpg"],
  },
};

export default function CreatorProgramOverviewPage() {
  return <CreatorProgram />;
}

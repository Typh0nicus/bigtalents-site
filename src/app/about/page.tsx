import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Big Talents - the premier Brawl Stars esports organization. Our story, mission, and the team behind the biggest tournaments.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description:
      "The premier Brawl Stars esports organization. Our story, mission, and team.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}

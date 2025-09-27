import type { Metadata } from "next";
import { CreatorProgram } from "@/components/creator/CreatorProgram";

export const metadata: Metadata = {
  title: "Creator Program",
  description: "Join the most exclusive creator program in Brawl Stars esports. Earn revenue, grow your audience, and access premium tournaments.",
  openGraph: {
    title: "BGT Creator Program - Join the Elite",
    description: "Exclusive creator program with revenue sharing, premium tournaments, and professional support.",
    images: [{ url: "/og-creator-program.png", width: 1200, height: 630 }],
  },
};

export default function CreatorProgramPage() {
  return (
    <main>
      <CreatorProgram />
    </main>
  );
}

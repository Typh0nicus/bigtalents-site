import type { Metadata } from "next";
import { CreatorApplication } from "@/components/creator/CreatorApplication";

export const metadata: Metadata = {
  title: "Apply - Creator Program",
  description: "Apply to join the BGT Creator Program and start earning revenue from your Brawl Stars content.",
  robots: {
    index: false, // Don't index application pages
  },
};

export default function CreatorApplicationPage() {
  return (
    <main>
      <CreatorApplication />
    </main>
  );
}

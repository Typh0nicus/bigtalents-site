import type { Metadata } from "next";
import { CreatorApplication } from "@/components/creator/CreatorApplication";

export const metadata: Metadata = {
  title: "Creator Program - Apply",
  description: "Apply to join the BGT Creator Program and start earning revenue from your Brawl Stars content.",
  robots: {
    index: false, 
  },
};

export default function CreatorApplicationPage() {
  return (
    <main>
      <CreatorApplication />
    </main>
  );
}

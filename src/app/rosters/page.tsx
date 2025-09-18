// src/app/rosters/page.tsx
import type { Metadata } from "next";
import ComingSoonRosters from "@/components/rosters/ComingSoonRosters";

export const metadata: Metadata = {
  title: "BGT — Rosters",
  description:
    "Official BGT rosters — coming soon. Follow us for announcements and tryout info.",
};

export default function RostersPage() {
  return <ComingSoonRosters />;
}

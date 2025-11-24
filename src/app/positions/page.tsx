// src/app/positions/page.tsx
import type { Metadata } from "next";
import PositionsClient from "@/components/positions/PositionsClient";

export const metadata: Metadata = {
  title: "Positions",
};

export default function PositionsPage() {
  return <PositionsClient />;
}

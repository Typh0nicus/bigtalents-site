import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedSlice } from "@/components/home/FeaturedSlice";
import { AboutBGT } from "@/components/home/AboutBGT";
import { TrustedBy } from "@/components/home/TrustedBy";
import { BottomCTA } from "@/components/home/BottomCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedSlice />
      <AboutBGT />
      <TrustedBy />
      <BottomCTA />
    </>
  );
}

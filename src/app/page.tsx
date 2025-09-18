import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedSlice } from "@/components/home/FeaturedSlice";
import { AboutBGT } from "@/components/home/AboutBGT";
import { TrustedBy } from "@/components/home/TrustedBy";
import { BottomCTA } from "@/components/home/BottomCTA";
import RouteTracker from "@/components/system/RouteTracker";

export default function HomePage() {
  return (
    <>
      <RouteTracker />
      <Hero />
      <Stats />
      <FeaturedSlice />
      <AboutBGT />
      <TrustedBy />
      <BottomCTA />
    </>
  );
}

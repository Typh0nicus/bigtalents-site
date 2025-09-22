import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedTournaments } from "@/components/home/FeaturedTournaments";
import { ExclusiveClub } from "@/components/home/ExclusiveClub";
import { TrustedBy } from "@/components/home/TrustedBy";
import { BottomCTA } from "@/components/home/BottomCTA";
import RouteTracker from "@/components/system/RouteTracker";

export default function HomePage() {
  return (
    <>
      <RouteTracker />
      <Hero />
      <Stats />
      <ExclusiveClub />
      <FeaturedTournaments />
      <TrustedBy />
      <BottomCTA />
    </>
  );
}

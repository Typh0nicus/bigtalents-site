import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedTournaments } from "@/components/home/FeaturedTournaments";
import { ExclusiveClub } from "@/components/home/ExclusiveClub";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ExclusiveClub />
    </>
  );
}

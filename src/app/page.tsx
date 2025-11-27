import { Hero } from "@/components/home/Hero";
import { HomeNews } from "@/components/home/HomeNews";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import { ExclusiveClub } from "@/components/home/ExclusiveClub";
import { getFeaturedContent, Creator } from "@/lib/featuredAlgorithm";
import { CREATORS } from "@/data/creators";
import { fetchYouTubeChannelStats } from "@/lib/youtube";
import { fetchTwitchUser } from "@/lib/twitch";

// Revalidate this page every 2 hours (7200 seconds) to keep featured content fresh
export const revalidate = 7200;

async function enrichCreatorsWithLiveStats(): Promise<Creator[]> {
  const enriched = await Promise.all(
    CREATORS.map(async (creator) => {
      const enrichedCreator = { ...creator };

      // Fetch live YouTube stats
      if (creator.platforms.youtube) {
        const stats = await fetchYouTubeChannelStats(creator.platforms.youtube.channelId);
        if (stats && enrichedCreator.platforms.youtube) {
          enrichedCreator.platforms.youtube.subscribers = stats.subscriberCount;
        }
      }

      // Fetch live Twitch stats
      if (creator.platforms.twitch) {
        const stats = await fetchTwitchUser(creator.platforms.twitch.username);
        if (stats && enrichedCreator.platforms.twitch) {
          enrichedCreator.platforms.twitch.followers = stats.followerCount;
        }
      }

      // TikTok followers come from video metadata (no separate user stats endpoint)
      // Leave at 0 for now, will be populated when videos are fetched

      return enrichedCreator;
    })
  );

  return enriched;
}

export default async function HomePage() {
  const creatorsWithLiveStats = await enrichCreatorsWithLiveStats();

  const featuredContent = await getFeaturedContent(creatorsWithLiveStats, 6);

  return (
    <>
      <Hero />
      <HomeNews />
      <FeaturedContent content={featuredContent} />
      <ExclusiveClub />
    </>
  );
}

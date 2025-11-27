import type { Metadata } from "next";
import type { Creator } from "@/lib/featuredAlgorithm";
import { getCreatorById } from "@/data/creators";
import CreatorProfile, {
  CreatorLatestVideo,
} from "@/components/roster/CreatorProfile";
import { getCreatorLatestVideos } from "@/lib/getCreatorLatestVideos";
import { fetchYouTubeChannelStats } from "@/lib/youtube";
import { fetchTikTokUser } from "@/lib/tiktok";
import { fetchTwitchUser } from "@/lib/twitch";

// Revalidate creator pages every 2 hours (7200 seconds) to keep stats fresh
export const revalidate = 7200;

interface PageProps {
  params: Promise<{ creatorId: string }>;
}

// Per‑creator tab/minibar title + meta
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { creatorId } = await params;
  const creator = getCreatorById(creatorId);

  if (!creator) {
    return {
      title: "Creator not found",
      description: "This creator does not exist in the Big Talents roster.",
    };
  }

  const title = ` Big Talents | ${creator.name}`;
  const description =
    creator.bio ??
    `${creator.name} is a Big Talents creator producing competitive Brawl Stars and esports content.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: creator.banner,
          width: 1200,
          height: 630,
          alt: creator.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [creator.banner],
    },
  };
}

export default async function CreatorPage({ params }: PageProps) {
  const { creatorId } = await params;
  const baseCreator: Creator | undefined = getCreatorById(creatorId);

  if (!baseCreator) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Creator not found
      </div>
    );
  }

  // Clone so we can safely mutate follower/subscriber counts per request
  const creator: Creator = JSON.parse(JSON.stringify(baseCreator));

  // Enrich YouTube subscribers if configured
  if (creator.platforms.youtube) {
    try {
      const yt = await fetchYouTubeChannelStats(
        creator.platforms.youtube.channelId
      );
      if (yt) {
        creator.platforms.youtube.subscribers = yt.subscriberCount;
      }
    } catch (err) {
      console.error(
        "Error enriching YouTube stats for",
        creator.name,
        err
      );
    }
  }

  // Enrich Twitch followers if configured
  if (creator.platforms.twitch) {
    try {
      const tw = await fetchTwitchUser(creator.platforms.twitch.username);
      if (tw) {
        creator.platforms.twitch.followers = tw.followerCount;
      }
    } catch (err) {
      console.error(
        "Error enriching Twitch stats for",
        creator.name,
        err
      );
    }
  }

  // Enrich TikTok followers if configured
  if (creator.platforms.tiktok) {
    try {
      const tt = await fetchTikTokUser(creator.platforms.tiktok.username);
      if (tt) {
        creator.platforms.tiktok.followers = tt.followerCount;
      }
    } catch (err) {
      console.error(
        "Error enriching TikTok stats for",
        creator.name,
        err
      );
    }
  }

  const latestVideos: CreatorLatestVideo[] =
    await getCreatorLatestVideos(creator);

  return <CreatorProfile creator={creator} latestVideos={latestVideos} />;
}

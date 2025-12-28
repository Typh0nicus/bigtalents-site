import { CREATORS } from "@/data/creators";
import type { Creator } from "@/lib/featuredAlgorithm";
import type { CreatorEngagementWindow } from "@/types/creatorEngagement";
import { fetchYouTubeChannelStats, fetchYouTubeVideos } from "@/lib/youtube";
import { fetchTwitchUser, fetchTwitchVODs } from "@/lib/twitch";
import { fetchTikTokUser, fetchAllTikTokVideos } from "@/lib/tiktok";
import { CreatorsClient } from "@/components/roster/CreatorsClient";

// Extend Creator with a totalViews field for this page
export type CreatorWithViews = Creator & {
  totalViews?: number;
  engagement30d?: CreatorEngagementWindow;
};

const ENGAGEMENT_WINDOW_DAYS = 30;

function isWithinWindow(publishedAt: string, windowDays: number): boolean {
  const timestamp = new Date(publishedAt).getTime();
  if (!Number.isFinite(timestamp)) return false;
  const cutoff =
    Date.now() - windowDays * 24 * 60 * 60 * 1000;
  return timestamp >= cutoff;
}

// Safe helper to extract a view count from any stats object
function extractViewCount(stats: unknown): number {
  if (!stats || typeof stats !== "object") return 0;

  const s = stats as {
    viewCount?: number | string;
    view_count?: number | string;
  };

  const raw = s.viewCount ?? s.view_count;
  if (typeof raw === "string") {
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return typeof raw === "number" ? raw : 0;
}

// Helper: merge follower counts so a flaky API returning 0/null
// doesn't wipe a previously configured value (from CREATORS).
function mergeFollowers(
  base: number | undefined,
  live: number | undefined | null
): number {
  const existing = base ?? 0;
  if (live == null) return existing;
  if (live === 0 && existing > 0) {
    // Treat "suddenly 0" from API as suspicious and keep existing
    return existing;
  }
  return live;
}

async function enrichCreator(creator: Creator): Promise<CreatorWithViews> {
  const [
    ytStats,
    twitchStats,
    tiktokStats,
    tiktokVideos,
    youtubeVideos,
    twitchVods,
  ] = await Promise.all([
    creator.platforms.youtube?.channelId
      ? fetchYouTubeChannelStats(creator.platforms.youtube.channelId)
      : Promise.resolve(null),
    creator.platforms.twitch?.username
      ? fetchTwitchUser(creator.platforms.twitch.username)
      : Promise.resolve(null),
    creator.platforms.tiktok?.username
      ? fetchTikTokUser(creator.platforms.tiktok.username)
      : Promise.resolve(null),
    creator.platforms.tiktok?.username
      ? fetchAllTikTokVideos(creator.platforms.tiktok.username)
      : Promise.resolve([]),
    creator.platforms.youtube?.channelId
      ? fetchYouTubeVideos(creator.platforms.youtube.channelId, 20)
      : Promise.resolve([]),
    creator.platforms.twitch?.userId
      ? fetchTwitchVODs(creator.platforms.twitch.userId, 20)
      : Promise.resolve([]),
  ]);

  // Followers / subs (reach) — merge live + base safely
  const youtubeSubs = mergeFollowers(
    creator.platforms.youtube?.subscribers,
    (ytStats as { subscriberCount?: number } | null)?.subscriberCount
  );

  const twitchFollowers = mergeFollowers(
    creator.platforms.twitch?.followers,
    (twitchStats as { followerCount?: number } | null)?.followerCount
  );

  const tiktokFollowers = mergeFollowers(
    creator.platforms.tiktok?.followers,
    (tiktokStats as { followerCount?: number } | null)?.followerCount
  );

  // X followers are manually maintained, just pass through
  const xFollowers = creator.platforms.x?.followers ?? 0;

  // ──────────────────────────────
  // Lifetime views per platform
  // ──────────────────────────────

  const youtubeViews = extractViewCount(ytStats);
  const twitchViews = extractViewCount(twitchStats);

  // Sum views from fetched TikTok videos (recent video views, not lifetime)
  const tiktokViews = Array.isArray(tiktokVideos)
    ? tiktokVideos.reduce((sum, video) => sum + (video.viewCount ?? 0), 0)
    : 0;

  const totalViews = youtubeViews + twitchViews + tiktokViews;

  const youtubeEngagement = youtubeVideos
    .filter((video) =>
      isWithinWindow(video.publishedAt, ENGAGEMENT_WINDOW_DAYS)
    )
    .reduce(
      (totals, video) => {
        totals.likes += video.likeCount ?? 0;
        totals.comments += video.commentCount ?? 0;
        totals.views += video.viewCount ?? 0;
        return totals;
      },
      { likes: 0, comments: 0, views: 0 }
    );

  const tiktokEngagement = tiktokVideos
    .filter((video) =>
      isWithinWindow(video.publishedAt, ENGAGEMENT_WINDOW_DAYS)
    )
    .reduce(
      (totals, video) => {
        totals.likes += video.likeCount ?? 0;
        totals.comments += video.commentCount ?? 0;
        totals.shares += video.shareCount ?? 0;
        totals.views += video.viewCount ?? 0;
        return totals;
      },
      { likes: 0, comments: 0, shares: 0, views: 0 }
    );

  const twitchViews30d = twitchVods
    .filter((vod) => isWithinWindow(vod.publishedAt, ENGAGEMENT_WINDOW_DAYS))
    .reduce((sum, vod) => sum + (vod.viewCount ?? 0), 0);

  const engagement30d: CreatorEngagementWindow = {
    windowDays: ENGAGEMENT_WINDOW_DAYS,
    likes: youtubeEngagement.likes + tiktokEngagement.likes,
    comments: youtubeEngagement.comments + tiktokEngagement.comments,
    shares: tiktokEngagement.shares,
    views: youtubeEngagement.views + tiktokEngagement.views + twitchViews30d,
    totalInteractions:
      youtubeEngagement.likes +
      youtubeEngagement.comments +
      tiktokEngagement.likes +
      tiktokEngagement.comments +
      tiktokEngagement.shares,
  };

  console.log(
    "Computed stats for",
    creator.id,
    "=>",
    "YT subs:",
    youtubeSubs,
    "TW fol:",
    twitchFollowers,
    "TT fol:",
    tiktokFollowers,
    "X fol:",
    xFollowers,
    "| YT views:",
    youtubeViews,
    "TW views:",
    twitchViews,
    "TT views:",
    tiktokViews,
    "30d interactions:",
    engagement30d.totalInteractions,
    "(from", Array.isArray(tiktokVideos) ? tiktokVideos.length : 0, "total videos)",
    "TOTAL views:",
    totalViews
  );

  return {
    ...creator,
    platforms: {
      ...creator.platforms,
      youtube:
        creator.platforms.youtube && {
          ...creator.platforms.youtube,
          subscribers: youtubeSubs,
        },
      twitch:
        creator.platforms.twitch && {
          ...creator.platforms.twitch,
          followers: twitchFollowers,
        },
      tiktok:
        creator.platforms.tiktok && {
          ...creator.platforms.tiktok,
          followers: tiktokFollowers,
        },
      x:
        creator.platforms.x && {
          ...creator.platforms.x,
          followers: xFollowers,
        },
    },
    totalViews,
    engagement30d,
  };
}

export const metadata = {
  title: "Creators",
  description:
    "Meet the Elite, Partnered, and Academy creators representing Big Talents.",
};

export default async function CreatorsPage() {
  const enrichedCreators = await Promise.all(
    CREATORS.map(enrichCreator)
  );

  return <CreatorsClient creators={enrichedCreators} />;
}

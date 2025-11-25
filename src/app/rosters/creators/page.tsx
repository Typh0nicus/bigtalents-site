import { CREATORS } from "@/data/creators";
import type { Creator } from "@/lib/featuredAlgorithm";
import { fetchYouTubeChannelStats } from "@/lib/youtube";
import { fetchTwitchUser } from "@/lib/twitch";
import { fetchTikTokUser } from "@/lib/tiktok";
import { CreatorsClient } from "@/components/roster/CreatorsClient";

// Force this page to be dynamic so we don't get weird build-time caching
export const dynamic = "force-dynamic";

// Extend Creator with a totalViews field for this page
export type CreatorWithViews = Creator & {
  totalViews?: number;
};

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
// doesn't wipe a previously configured value.
function mergeFollowers(
  base: number | undefined,
  live: number | undefined | null
): number {
  const existing = base ?? 0;
  if (live == null) return existing;
  if (live === 0 && existing > 0) {
    // Treat "suddenly 0" from API as suspicious and keep existing value
    return existing;
  }
  return live;
}

async function enrichCreator(creator: Creator): Promise<CreatorWithViews> {
  const [ytStats, twitchStats, tiktokStats] = await Promise.all([
    creator.platforms.youtube?.channelId
      ? fetchYouTubeChannelStats(creator.platforms.youtube.channelId)
      : Promise.resolve(null),
    creator.platforms.twitch?.username
      ? fetchTwitchUser(creator.platforms.twitch.username)
      : Promise.resolve(null),
    creator.platforms.tiktok?.username
      ? fetchTikTokUser(creator.platforms.tiktok.username)
      : Promise.resolve(null),
  ]);

  // Followers / subs (reach) — we merge live + base safely
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

  // TikTok user/info doesn't expose lifetime views – only likes (heartCount),
  // so we leave this as 0 for now to avoid mixing "likes" and "views".
  const tiktokViews = 0;

  const totalViews = youtubeViews + twitchViews + tiktokViews;

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
  };
}

export const metadata = {
  title: "Big Talents | Creators",
  description:
    "Meet the Elite, Partnered, and Academy creators representing Big Talents.",
};

export default async function CreatorsPage() {
  const enrichedCreators = await Promise.all(
    CREATORS.map(enrichCreator)
  );

  return <CreatorsClient creators={enrichedCreators} />;
}

// src/lib/featuredAlgorithm.ts
import { fetchYouTubeVideos } from "./youtube";
import { fetchTwitchVODs } from "./twitch";
import { fetchTikTokVideos } from "./tiktok";

export type ContentType =
  | "youtube_video"
  | "youtube_short"
  | "twitch_stream"
  | "twitch_clip"
  | "tiktok_video"
  | "tiktok_live";

export type CreatorTier = "academy" | "partnered" | "elite";

export interface BaseContent {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  platform: "youtube" | "twitch" | "tiktok";
  contentType: ContentType;
  creatorId: string;
  creatorName: string;
  creatorTier: CreatorTier;
  featured?: boolean;
}

export interface YouTubeContent extends BaseContent {
  platform: "youtube";
  contentType: "youtube_video" | "youtube_short";
  views: number;
  likes: number;
  comments: number;
  duration: number;
  watchTimePercent?: number;
  shares?: number;
}

export interface TwitchContent extends BaseContent {
  platform: "twitch";
  contentType: "twitch_stream" | "twitch_clip";
  views: number;
  likes?: number;
  peakViewers?: number;
  chatMessagesPerMinute?: number;
  duration?: number;
}

export interface TikTokContent extends BaseContent {
  platform: "tiktok";
  contentType: "tiktok_video" | "tiktok_live";
  views: number;
  likes: number;
  shares: number;
  comments: number;
  peakViewers?: number;
  gifts?: number;
  duration?: number;
}

export type Content = YouTubeContent | TwitchContent | TikTokContent;

export interface ScoredContent {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  platform: "youtube" | "twitch" | "tiktok";
  contentType: ContentType;
  creatorId: string;
  creatorName: string;
  creatorTier: CreatorTier;
  score: number;
  rawScore: number;
  breakdown: {
    baseEngagement: number;
    contentTypeMultiplier: number;
    platformAuthority: number;
    recencyDecay: number;
    tierBonus: number;
    diversityBonus: number;
  };
}

export interface Creator {
  id: string;
  name: string;
  tier: CreatorTier;
  region?: "NA" | "EU" | "EA" | "LATAM" | "APAC" | string;
  country?: string;
  countryCode?: string;
  bio?: string;
  avatar: string;
  banner: string;
  platforms: {
    youtube?: {
      channelId: string;
      subscribers: number;
      url: string;
    };
    twitch?: {
      userId: string;
      username: string;
      followers: number;
      url: string;
    };
    tiktok?: {
      username: string;
      followers: number;
      url: string;
    };
    x?: {
      handle: string;
      followers?: number;
      url: string;
    };
    instagram?: {
      handle: string;
      followers?: number;
      url: string;
    };
    discord?: {
      url: string;
    };
  };
}

const CONFIG = {
  weights: {
    baseEngagement: 0.5,
    contentType: 0.15,
    platformAuthority: 0.05,
    recency: 0.2,
    tier: 0.1,
  },
  contentTypeMultipliers: {
    youtube_video: 1.0,
    youtube_short: 0.8,
    twitch_stream: 1.0,
    twitch_clip: 0.85,
    tiktok_video: 0.85,
    tiktok_live: 0.75,
  },
  platformDifficulty: {
    youtube_video: 2.0,
    youtube_short: 1.3,
    twitch_stream: 2.2,
    twitch_clip: 1.0,
    tiktok_video: 0.9,
    tiktok_live: 1.2,
  },
  tierPoints: {
    elite: 8,
    partnered: 5,
    academy: 2,
  },
  diversity: {
    targetCreatorsInTop4: 3,
    maxPerCreatorBeforePenalty: 1,
    platformDiversityBonus: 5,
    contentTypeDiversityBonus: 3,
    creatorRepetitionPenalty: 15,
  },
};

// ───────────────── ENGAGEMENT ─────────────────

function calculateBaseEngagement(content: Content): number {
  const maxScore = 50;

  switch (content.contentType) {
    case "youtube_video":
      return calculateYouTubeVideoEngagement(content, maxScore);
    case "youtube_short":
      return calculateYouTubeShortEngagement(content, maxScore);
    case "twitch_stream":
      return calculateTwitchStreamEngagement(content, maxScore);
    case "twitch_clip":
      return calculateTwitchClipEngagement(content, maxScore);
    case "tiktok_video":
      return calculateTikTokVideoEngagement(content, maxScore);
    case "tiktok_live":
      return calculateTikTokLiveEngagement(content, maxScore);
    default:
      return 0;
  }
}

function calculateYouTubeVideoEngagement(
  content: YouTubeContent,
  maxScore: number
): number {
  const viewScore = Math.min(
    (Math.log10(content.views + 1) / Math.log10(500_000)) * 22,
    22
  );
  const likeRatio =
    content.views > 0 ? (content.likes / content.views) * 100 : 0;
  const likeScore = Math.min(likeRatio * 2.0, 16);
  const commentRatio =
    content.views > 0 ? (content.comments / content.views) * 100 : 0;
  const commentScore = Math.min(commentRatio * 20, 8);
  const watchScore = content.watchTimePercent
    ? Math.min((content.watchTimePercent / 100) * 4, 4)
    : 0;

  return Math.min(
    viewScore + likeScore + commentScore + watchScore,
    maxScore
  );
}

function calculateYouTubeShortEngagement(
  content: YouTubeContent,
  maxScore: number
): number {
  const viewScore = Math.min(
    (Math.log10(content.views + 1) / Math.log10(5_000_000)) * 24,
    24
  );
  const likeRatio =
    content.views > 0 ? (content.likes / content.views) * 100 : 0;
  const likeScore = Math.min(likeRatio * 1.8, 16);
  const shareScore = content.shares
    ? Math.min((content.shares / content.views) * 500, 10)
    : 0;

  return Math.min(viewScore + likeScore + shareScore, maxScore);
}

function calculateTwitchStreamEngagement(
  content: TwitchContent,
  maxScore: number
): number {
  const viewScore = Math.min(
    (Math.log10(content.views + 1) / Math.log10(30_000)) * 16,
    16
  );
  const peakScore = content.peakViewers
    ? Math.min(
        (Math.log10(content.peakViewers + 1) / Math.log10(3_000)) * 20,
        20
      )
    : viewScore * 0.5;
  const chatScore = content.chatMessagesPerMinute
    ? Math.min((content.chatMessagesPerMinute / 120) * 8, 8)
    : 0;
  const durationScore = content.duration
    ? Math.min((content.duration / 7200) * 6, 6)
    : 0;

  return Math.min(viewScore + peakScore + chatScore + durationScore, maxScore);
}

function calculateTwitchClipEngagement(
  content: TwitchContent,
  maxScore: number
): number {
  const viewScore = Math.min(
    (Math.log10(content.views + 1) / Math.log10(300_000)) * 30,
    30
  );
  const likeScore =
    content.likes && content.views > 0
      ? Math.min((content.likes / content.views) * 100 * 2.0, 20)
      : 0;

  return Math.min(viewScore + likeScore, maxScore);
}

function calculateTikTokVideoEngagement(
  content: TikTokContent,
  maxScore: number
): number {
  const viewScore = Math.min(
    (Math.log10(content.views + 1) / Math.log10(3_000_000)) * 18,
    18
  );
  const likeRatio =
    content.views > 0 ? (content.likes / content.views) * 100 : 0;
  const likeScore = Math.min(likeRatio * 1.5, 14);
  const shareScore = Math.min(
    (content.shares / Math.max(content.views, 1)) * 400,
    12
  );
  const commentScore = Math.min(
    (content.comments / Math.max(content.views, 1)) * 400,
    6
  );

  return Math.min(viewScore + likeScore + shareScore + commentScore, maxScore);
}

function calculateTikTokLiveEngagement(
  content: TikTokContent,
  maxScore: number
): number {
  const peakScore = content.peakViewers
    ? Math.min(
        (Math.log10(content.peakViewers + 1) / Math.log10(2000)) * 24,
        24
      )
    : 0;
  const giftScore = content.gifts
    ? Math.min((content.gifts / 500) * 16, 16)
    : 0;
  const durationScore = content.duration
    ? Math.min((content.duration / 3600) * 10, 10)
    : 0;

  return Math.min(peakScore + giftScore + durationScore, maxScore);
}

// ───────────── SCORING MULTIPLIERS ─────────────

function calculateContentTypeMultiplier(content: Content): number {
  const maxScore = 15;
  const baseEngagement = calculateBaseEngagement(content);
  const multiplier = CONFIG.contentTypeMultipliers[content.contentType];

  return Math.min((baseEngagement / 50) * maxScore * multiplier, maxScore);
}

function calculatePlatformAuthority(
  content: Content,
  creator: Creator,
  platformAverages: Record<string, number>
): number {
  const maxScore = 5;
  let creatorFollowers = 0;
  let platformAverage = 10_000;

  if (content.platform === "youtube" && creator.platforms.youtube) {
    creatorFollowers = creator.platforms.youtube.subscribers;
    platformAverage = platformAverages.youtube || 10_000;
  } else if (content.platform === "twitch" && creator.platforms.twitch) {
    creatorFollowers = creator.platforms.twitch.followers;
    platformAverage = platformAverages.twitch || 5_000;
  } else if (content.platform === "tiktok" && creator.platforms.tiktok) {
    creatorFollowers = creator.platforms.tiktok.followers;
    platformAverage = platformAverages.tiktok || 50_000;
  }

  const difficultyMultiplier = CONFIG.platformDifficulty[content.contentType];
  const relativeAuthority =
    platformAverage > 0 ? creatorFollowers / platformAverage : 0;

  return Math.min(relativeAuthority * difficultyMultiplier, maxScore);
}

function calculateRecencyDecay(content: Content): number {
  const maxScore = 20;
  const now = Date.now();
  const publishDate = new Date(content.publishedAt).getTime();
  const daysAgo = (now - publishDate) / (1000 * 60 * 60 * 24);

  switch (content.contentType) {
    case "youtube_video":
      if (daysAgo <= 3) return maxScore;
      if (daysAgo <= 7) return maxScore * 0.95;
      if (daysAgo <= 14) return maxScore * 0.85;
      if (daysAgo <= 30) return maxScore * 0.7;
      if (daysAgo <= 60) return maxScore * 0.5;
      return maxScore * 0.3;

    case "youtube_short":
      if (daysAgo <= 2) return maxScore;
      if (daysAgo <= 5) return maxScore * 0.9;
      if (daysAgo <= 10) return maxScore * 0.7;
      if (daysAgo <= 20) return maxScore * 0.4;
      return 0;

    case "twitch_stream":
      if (daysAgo <= 3) return maxScore;
      if (daysAgo <= 7) return maxScore * 0.9;
      if (daysAgo <= 14) return maxScore * 0.7;
      if (daysAgo <= 30) return maxScore * 0.4;
      return 0;

    case "twitch_clip":
      if (daysAgo <= 2) return maxScore;
      if (daysAgo <= 5) return maxScore * 0.8;
      if (daysAgo <= 10) return maxScore * 0.5;
      if (daysAgo <= 20) return maxScore * 0.25;
      return 0;

    case "tiktok_video":
      if (daysAgo <= 2) return maxScore;
      if (daysAgo <= 5) return maxScore * 0.85;
      if (daysAgo <= 10) return maxScore * 0.6;
      if (daysAgo <= 20) return maxScore * 0.3;
      return 0;

    case "tiktok_live": {
      const hoursAgo = (now - publishDate) / (1000 * 60 * 60);
      if (hoursAgo <= 8) return maxScore;
      if (hoursAgo <= 24) return maxScore * 0.7;
      if (hoursAgo <= 48) return maxScore * 0.3;
      return 0;
    }

    default:
      return 0;
  }
}

function calculateTierBonus(tier: CreatorTier): number {
  return CONFIG.tierPoints[tier];
}

// ───────────── DIVERSITY BONUS ─────────────

function calculateDiversityBonus(
  content: ScoredContent,
  currentSelection: ScoredContent[]
): number {
  let bonus = 0;

  const creatorCount = currentSelection.filter(
    (c) => c.creatorId === content.creatorId
  ).length;

  if (creatorCount >= CONFIG.diversity.maxPerCreatorBeforePenalty) {
    const extra =
      creatorCount - CONFIG.diversity.maxPerCreatorBeforePenalty + 1;
    bonus -= CONFIG.diversity.creatorRepetitionPenalty * extra;
  }

  const platformsUsed = new Set(currentSelection.map((c) => c.platform));
  if (!platformsUsed.has(content.platform)) {
    bonus += CONFIG.diversity.platformDiversityBonus;
  }

  const typesUsed = new Set(currentSelection.map((c) => c.contentType));
  if (!typesUsed.has(content.contentType)) {
    bonus += CONFIG.diversity.contentTypeDiversityBonus;
  }

  return bonus;
}

// ───────────── MAIN SCORING ─────────────

export function calculateContentScore(
  content: Content,
  creator: Creator,
  platformAverages: Record<string, number>
): ScoredContent {
  const baseEngagement = calculateBaseEngagement(content);
  const contentTypeMultiplier = calculateContentTypeMultiplier(content);
  const platformAuthority = calculatePlatformAuthority(
    content,
    creator,
    platformAverages
  );
  const recencyDecay = calculateRecencyDecay(content);
  const tierBonus = calculateTierBonus(creator.tier);

  const rawScore =
    baseEngagement * CONFIG.weights.baseEngagement +
    contentTypeMultiplier * CONFIG.weights.contentType +
    platformAuthority * CONFIG.weights.platformAuthority +
    recencyDecay * CONFIG.weights.recency +
    tierBonus * CONFIG.weights.tier;

  const rounded = Math.round(rawScore * 100) / 100;

  return {
    id: content.id,
    title: content.title,
    thumbnail: content.thumbnail,
    url: content.url,
    publishedAt: content.publishedAt,
    platform: content.platform,
    contentType: content.contentType,
    creatorId: content.creatorId,
    creatorName: content.creatorName,
    creatorTier: content.creatorTier,
    score: Math.max(0, rounded),
    rawScore: rounded,
    breakdown: {
      baseEngagement: Math.round(baseEngagement * 100) / 100,
      contentTypeMultiplier:
        Math.round(contentTypeMultiplier * 100) / 100,
      platformAuthority: Math.round(platformAuthority * 100) / 100,
      recencyDecay: Math.round(recencyDecay * 100) / 100,
      tierBonus: Math.round(tierBonus * 100) / 100,
      diversityBonus: 0,
    },
  };
}

// ───────────── FEATURED CONTENT ─────────────

export async function getFeaturedContent(
  creators: Creator[],
  maxResults: number = 4
): Promise<ScoredContent[]> {
  const allContent: Content[] = [];
  const platformAverages = calculatePlatformAverages(creators);

  for (const creator of creators) {
    // YouTube
    if (creator.platforms.youtube) {
      try {
        const videos = await fetchYouTubeVideos(
          creator.platforms.youtube.channelId,
          5
        );

        videos.forEach((video) => {
          const duration = video.duration;
          const isShort = duration < 60;

          const item: YouTubeContent = {
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            url: video.url,
            publishedAt: video.publishedAt,
            platform: "youtube",
            contentType: isShort ? "youtube_short" : "youtube_video",
            creatorId: creator.id,
            creatorName: creator.name,
            creatorTier: creator.tier,
            views: video.viewCount,
            likes: video.likeCount,
            comments: video.commentCount,
            duration,
          };

          allContent.push(item);
        });
      } catch (error) {
        console.error(
          `Error fetching YouTube content for ${creator.name}:`,
          error
        );
      }
    }

    // Twitch
    if (creator.platforms.twitch) {
      try {
        const vods = await fetchTwitchVODs(
          creator.platforms.twitch.userId,
          3
        );

        vods.forEach((vod) => {
          const item: TwitchContent = {
            id: vod.id,
            title: vod.title,
            thumbnail: vod.thumbnail,
            url: vod.url,
            publishedAt: vod.publishedAt,
            platform: "twitch",
            contentType: "twitch_stream",
            creatorId: creator.id,
            creatorName: creator.name,
            creatorTier: creator.tier,
            views: vod.viewCount,
            duration: parseTwitchDuration(vod.duration),
          };

          allContent.push(item);
        });
      } catch (error) {
        console.error(
          `Error fetching Twitch content for ${creator.name}:`,
          error
        );
      }
    }

    // TikTok
    if (creator.platforms.tiktok) {
      try {
        const videos = await fetchTikTokVideos(
          creator.platforms.tiktok.username,
          4
        );

        videos.forEach((video) => {
          const item: TikTokContent = {
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            url: video.url,
            publishedAt: video.publishedAt,
            platform: "tiktok",
            contentType: "tiktok_video",
            creatorId: creator.id,
            creatorName: creator.name,
            creatorTier: creator.tier,
            views: video.viewCount,
            likes: video.likeCount,
            shares: video.shareCount,
            comments: video.commentCount,
            duration: video.duration,
          };

          allContent.push(item);
        });
      } catch (error) {
        console.error(
          `Error fetching TikTok content for ${creator.name}:`,
          error
        );
      }
    }
  }

  console.log("=== FEATURED ALGORITHM DEBUG ===");
  console.log("Total content fetched:", allContent.length);
  console.log("Content breakdown:", {
    youtube: allContent.filter((c) => c.platform === "youtube").length,
    twitch: allContent.filter((c) => c.platform === "twitch").length,
    tiktok: allContent.filter((c) => c.platform === "tiktok").length,
    byCreator: creators.map((cr) => ({
      name: cr.name,
      count: allContent.filter((c) => c.creatorId === cr.id).length,
    })),
  });

  const scoredContent = allContent
    .map((content) => {
      const creator = creators.find((c) => c.id === content.creatorId);
      if (!creator) return null;
      return calculateContentScore(content, creator, platformAverages);
    })
    .filter((c): c is ScoredContent => c !== null)
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  const finalSelection: ScoredContent[] = [];
  const availableContent = [...scoredContent];

  while (finalSelection.length < maxResults && availableContent.length > 0) {
    const contentWithDiversity = availableContent.map((content) => {
      const diversityBonus = calculateDiversityBonus(
        content,
        finalSelection
      );
      const adjustedScore = content.rawScore + diversityBonus;

      return {
        ...content,
        score: Math.round(adjustedScore * 100) / 100,
        breakdown: {
          ...content.breakdown,
          diversityBonus:
            Math.round(diversityBonus * 100) / 100,
        },
      };
    });

    contentWithDiversity.sort((a, b) => b.score - a.score);

    const selected = contentWithDiversity[0];
    finalSelection.push(selected);

    const selectedIndex = availableContent.findIndex(
      (c) => c.id === selected.id
    );
    if (selectedIndex > -1) {
      availableContent.splice(selectedIndex, 1);
    }
  }

  console.log(
    "Final selection:",
    finalSelection.map((c) => ({
      title: `${c.title.substring(0, 35)}...`,
      creator: c.creatorName,
      platform: c.platform,
      type: c.contentType,
      score: c.score,
      rawScore: c.rawScore,
      breakdown: c.breakdown,
    }))
  );

  return finalSelection;
}

// ───────────── UTILITIES ─────────────

function calculatePlatformAverages(
  creators: Creator[]
): Record<string, number> {
  const totals = { youtube: 0, twitch: 0, tiktok: 0 };
  const counts = { youtube: 0, twitch: 0, tiktok: 0 };

  creators.forEach((creator) => {
    if (creator.platforms.youtube) {
      totals.youtube += creator.platforms.youtube.subscribers;
      counts.youtube += 1;
    }
    if (creator.platforms.twitch) {
      totals.twitch += creator.platforms.twitch.followers;
      counts.twitch += 1;
    }
    if (creator.platforms.tiktok) {
      totals.tiktok += creator.platforms.tiktok.followers;
      counts.tiktok += 1;
    }
  });

  return {
    youtube: counts.youtube > 0 ? totals.youtube / counts.youtube : 10_000,
    twitch: counts.twitch > 0 ? totals.twitch / counts.twitch : 5_000,
    tiktok: counts.tiktok > 0 ? totals.tiktok / counts.tiktok : 50_000,
  };
}

function parseTwitchDuration(duration: string): number {
  const hours = parseInt(duration.match(/(\d+)h/)?.[1] ?? "0", 10);
  const minutes = parseInt(duration.match(/(\d+)m/)?.[1] ?? "0", 10);
  const seconds = parseInt(duration.match(/(\d+)s/)?.[1] ?? "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
}

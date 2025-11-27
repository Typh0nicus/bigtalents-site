interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: number;
}

interface YouTubeChannel {
  id: string;
  title: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

interface YouTubeSearchItem {
  id: {
    videoId: string;
  };
}

interface YouTubeSearchResponse {
  items: YouTubeSearchItem[];
}

interface YouTubeThumbnailSet {
  maxres?: { url: string };
  high: { url: string };
}

interface YouTubeStatsItem {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: YouTubeThumbnailSet;
  };
  statistics: {
    viewCount?: string;
    likeCount?: string;
    commentCount?: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface YouTubeVideosResponse {
  items: YouTubeStatsItem[];
}

interface YouTubeChannelItem {
  id: string;
  snippet: { title: string };
  statistics: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
  };
}

interface YouTubeChannelResponse {
  items: YouTubeChannelItem[];
}

const YOUTUBE_API_KEY = process.env["YOUTUBE_API_KEY"];
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function fetchYouTubeVideos(
  channelId: string,
  maxResults: number = 3
): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.error("YouTube API key not configured");
    return [];
  }

  try {
    const searchUrl = `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=${maxResults}&type=video`;
    const searchRes = await fetch(searchUrl, { next: { revalidate: 3600 } });  // 1 hour - fresher video data

    if (!searchRes.ok) {
      throw new Error(`YouTube API error: ${searchRes.status}`);
    }

    const searchData: YouTubeSearchResponse = await searchRes.json();

    if (!searchData.items || searchData.items.length === 0) {
      console.error("YouTube search returned no videos for channel:", channelId);
      return [];
    }

    const videoIds = searchData.items
      .map((item) => item.id.videoId)
      .filter(Boolean)
      .join(",");

    if (!videoIds) return [];

    const statsUrl = `${BASE_URL}/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,statistics,contentDetails`;
    const statsRes = await fetch(statsUrl, { next: { revalidate: 3600 } });  // 1 hour - fresher video data

    if (!statsRes.ok) {
      throw new Error(`YouTube API error: ${statsRes.status}`);
    }

    const statsData: YouTubeVideosResponse = await statsRes.json();

    if (!statsData.items || statsData.items.length === 0) {
      console.error("YouTube stats returned no data for videos:", videoIds);
      return [];
    }

    return statsData.items.map((item): YouTubeVideo => {
      const thumbSet = item.snippet.thumbnails;
      const thumbnail = thumbSet.maxres?.url || thumbSet.high.url;

      return {
        id: item.id,
        title: item.snippet.title,
        thumbnail,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id}`,
        viewCount: parseInt(item.statistics.viewCount ?? "0", 10),
        likeCount: parseInt(item.statistics.likeCount ?? "0", 10),
        commentCount: parseInt(item.statistics.commentCount ?? "0", 10),
        duration: parseYouTubeDuration(item.contentDetails.duration),
      };
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return [];
  }
}

export async function fetchYouTubeChannelStats(
  channelId: string
): Promise<YouTubeChannel | null> {
  if (!YOUTUBE_API_KEY) {
    console.error("YouTube API key not configured");
    return null;
  }

  try {
    const url = `${BASE_URL}/channels?key=${YOUTUBE_API_KEY}&id=${channelId}&part=snippet,statistics`;
    const res = await fetch(url, { next: { revalidate: 86400 } });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`YouTube API error ${res.status}:`, errorText);
      throw new Error(`YouTube API error: ${res.status}`);
    }

    const data: YouTubeChannelResponse = await res.json();

    if (!data.items || data.items.length === 0) {
      console.error("YouTube API returned no channel data for:", channelId);
      console.error("Response:", JSON.stringify(data, null, 2));
      return null;
    }

    const channel = data.items[0];

    return {
      id: channel.id,
      title: channel.snippet.title,
      subscriberCount: parseInt(channel.statistics.subscriberCount ?? "0", 10),
      viewCount: parseInt(channel.statistics.viewCount ?? "0", 10),
      videoCount: parseInt(channel.statistics.videoCount ?? "0", 10),
    };
  } catch (error) {
    console.error("Error fetching YouTube channel stats:", error);
    return null;
  }
}

function parseYouTubeDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
}

export function extractYouTubeChannelId(url: string): string | null {
  const patterns = [
    /youtube\.com\/channel\/([\w-]+)/,
    /youtube\.com\/c\/([\w-]+)/,
    /youtube\.com\/@([\w-]+)/,
    /youtube\.com\/user\/([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

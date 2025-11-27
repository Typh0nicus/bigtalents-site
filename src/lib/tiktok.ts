// src/lib/tiktok.ts

export interface TikTokVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  duration: number;
}

export interface TikTokUser {
  id: string;
  username: string;
  nickname: string;
  followerCount: number;
  followingCount: number;
  heartCount: number;
}

const TIKAPI_HOST = "tiktok-api23.p.rapidapi.com";
const TIKAPI_KEY = process.env["TIKAPI_KEY"];

type TikTokUserStats = {
  followerCount?: number;
  follower_count?: number;
  follower?: number;
  followingCount?: number;
  following_count?: number;
  heartCount?: number;
  heart?: number;
  heart_count?: number;
};

type TikTokUserRaw = {
  id?: string;
  uniqueId?: string;
  nickname?: string;
  secUid?: string;
};

type TikTokUserInfoRaw = {
  userInfo?: {
    user?: TikTokUserRaw;
    stats?: TikTokUserStats;
  };
};

type TikTokPostStats = {
  playCount?: number;
  diggCount?: number;
  commentCount?: number;
  shareCount?: number;
};

type TikTokPostVideo = {
  duration?: number;
  cover?: string;
  dynamicCover?: string;
};

type TikTokPostItem = {
  id?: string;
  awemeId?: string;
  desc?: string;
  description?: string;
  createTime?: number;
  create_time?: number;
  stats?: TikTokPostStats;
  video?: TikTokPostVideo;
  cover?: string;
  dynamicCover?: string;
};

type TikTokPostsResponse = {
  // Different possible layouts depending on the endpoint version
  itemList?: TikTokPostItem[];
  videos?: TikTokPostItem[];
  aweme_list?: TikTokPostItem[];
  data?: {
    itemList?: TikTokPostItem[];
    videos?: TikTokPostItem[];
    aweme_list?: TikTokPostItem[];
  };
};

async function tikApiGet(
  path: string,
  params: Record<string, string>
): Promise<Response | null> {
  if (!TIKAPI_KEY) {
    console.error("TikAPI key not configured");
    return null;
  }

  const search = new URLSearchParams(params).toString();
  const url = `https://${TIKAPI_HOST}${path}?${search}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": TIKAPI_KEY,
        "x-rapidapi-host": TIKAPI_HOST,
      },
      next: { revalidate: 43200 },
    });

    return res;
  } catch (error) {
    console.error("TikAPI network error:", error);
    return null;
  }
}

function extractSecUid(json: TikTokUserInfoRaw): string | null {
  const secUid = json.userInfo?.user?.secUid;
  return typeof secUid === "string" && secUid.length > 0 ? secUid : null;
}

function extractRawVideosFromResponse(json: unknown): TikTokPostItem[] {
  const safe = json as TikTokPostsResponse | undefined;
  if (!safe) return [];

  const candidates: (TikTokPostItem[] | undefined)[] = [
    safe.itemList,
    safe.videos,
    safe.aweme_list,
    safe.data?.itemList,
    safe.data?.videos,
    safe.data?.aweme_list,
  ];

  for (const list of candidates) {
    if (Array.isArray(list) && list.length > 0) {
      return list;
    }
  }

  return [];
}

function normalizePostItem(
  item: TikTokPostItem,
  username: string
): TikTokVideo | null {
  const id =
    item.id ?? item.awemeId ?? null;

  if (!id) return null;

  const title = item.desc ?? item.description ?? "";
  const thumbnail =
    item.video?.cover ??
    item.video?.dynamicCover ??
    item.cover ??
    item.dynamicCover ??
    "";

  const timestamp =
    item.createTime ?? item.create_time ?? null;

  const publishedAt = timestamp
    ? new Date(timestamp * 1000).toISOString()
    : new Date().toISOString();

  const stats = item.stats ?? {};

  const viewCount = stats.playCount ?? 0;
  const likeCount = stats.diggCount ?? 0;
  const commentCount = stats.commentCount ?? 0;
  const shareCount = stats.shareCount ?? 0;
  const duration = item.video?.duration ?? 0;

  return {
    id,
    title,
    thumbnail,
    publishedAt,
    url: `https://www.tiktok.com/@${username}/video/${id}`,
    viewCount,
    likeCount,
    commentCount,
    shareCount,
    duration,
  };
}

export async function fetchTikTokVideos(
  username: string,
  maxResults: number = 3
): Promise<TikTokVideo[]> {
  if (!TIKAPI_KEY) {
    console.error("TikAPI key not configured");
    return [];
  }

  try {
    // 1) Get secUid
    const userRes = await tikApiGet("/api/user/info", {
      uniqueId: username,
    });

    if (!userRes) {
      console.warn("TikAPI user/info request failed for", username);
      return [];
    }

    const userText = await userRes.text();
    if (!userRes.ok) {
      console.warn(
        "TikAPI user/info error:",
        userRes.status,
        userText
      );
      return [];
    }

    if (!userText.trim()) {
      console.warn("TikAPI user/info empty response for", username);
      return [];
    }

    let userJson: TikTokUserInfoRaw;
    try {
      userJson = JSON.parse(userText) as TikTokUserInfoRaw;
    } catch (parseError) {
      console.error("Error parsing TikAPI user/info JSON:", parseError);
      return [];
    }

    const secUid = extractSecUid(userJson);
    if (!secUid) {
      console.warn("Could not extract secUid for", username);
      return [];
    }

    // 2) Get posts using secUid
    const postsRes = await tikApiGet("/api/user/posts", {
      secUid,
      count: String(maxResults * 3), // over-fetch a bit, then slice
      cursor: "0",
    });

    if (!postsRes) {
      console.warn("TikAPI user/posts request failed for", username);
      return [];
    }

    const text = await postsRes.text();

    if (!postsRes.ok) {
      console.warn(
        "TikAPI error (videos):",
        postsRes.status,
        text
      );
      return [];
    }

    if (!text.trim()) {
      console.warn("TikAPI videos empty response body for", username);
      return [];
    }

    let json: unknown;
    try {
      json = JSON.parse(text) as unknown;
    } catch (error) {
      console.error("Error parsing TikTok posts JSON:", error);
      return [];
    }

    const rawVideos = extractRawVideosFromResponse(json);

    const normalized = rawVideos
      .map((item) => normalizePostItem(item, username))
      .filter((v): v is TikTokVideo => v !== null)
      .slice(0, maxResults);

    console.log(
      `TikTok videos for ${username}`,
      normalized.length
    );

    return normalized;
  } catch (error) {
    console.error("Error fetching TikTok videos:", error);
    return [];
  }
}

export async function fetchAllTikTokVideos(
  username: string
): Promise<TikTokVideo[]> {
  if (!TIKAPI_KEY) {
    console.error("TikAPI key not configured");
    return [];
  }

  try {
    // 1) Get secUid first
    const userRes = await tikApiGet("/api/user/info", {
      uniqueId: username,
    });

    if (!userRes) {
      console.warn("TikAPI user/info request failed for", username);
      return [];
    }

    const userText = await userRes.text();
    if (!userRes.ok) {
      console.warn("TikAPI user/info error:", userRes.status, userText);
      return [];
    }

    let userJson: TikTokUserInfoRaw;
    try {
      userJson = JSON.parse(userText) as TikTokUserInfoRaw;
    } catch (parseError) {
      console.error("Error parsing TikAPI user/info JSON:", parseError);
      return [];
    }

    const secUid = extractSecUid(userJson);
    if (!secUid) {
      console.warn("Could not extract secUid for", username);
      return [];
    }

    // 2) Paginate through all videos
    const allVideos: TikTokVideo[] = [];
    let cursor = "0";
    let hasMore = true;
    const maxPages = 20; // Safety limit to prevent infinite loops
    let pageCount = 0;

    while (hasMore && pageCount < maxPages) {
      const postsRes = await tikApiGet("/api/user/posts", {
        secUid,
        count: "30", // Max per request
        cursor,
      });

      if (!postsRes) {
        console.warn("TikAPI user/posts request failed for", username);
        break;
      }

      const text = await postsRes.text();

      if (!postsRes.ok) {
        console.warn("TikAPI error (videos):", postsRes.status, text);
        break;
      }

      if (!text.trim()) {
        break;
      }

      let json: TikTokPostsResponse & { cursor?: string; hasMore?: boolean };
      try {
        json = JSON.parse(text) as TikTokPostsResponse & { cursor?: string; hasMore?: boolean };
      } catch (error) {
        console.error("Error parsing TikTok posts JSON:", error);
        break;
      }

      const rawVideos = extractRawVideosFromResponse(json);
      
      if (rawVideos.length === 0) {
        break;
      }

      const normalized = rawVideos
        .map((item) => normalizePostItem(item, username))
        .filter((v): v is TikTokVideo => v !== null);

      allVideos.push(...normalized);

      // Check for next page - the API returns hasMore and cursor for pagination
      cursor = json.cursor ?? (json.data as { cursor?: string } | undefined)?.cursor ?? "";
      hasMore = (json.hasMore ?? (json.data as { hasMore?: boolean } | undefined)?.hasMore ?? false) && cursor !== "";
      pageCount++;
    }

    console.log(`TikTok: Fetched ${allVideos.length} total videos for ${username} (${pageCount} pages)`);

    return allVideos;
  } catch (error) {
    console.error("Error fetching all TikTok videos:", error);
    return [];
  }
}

export async function fetchTikTokUser(
  username: string
): Promise<TikTokUser | null> {
  if (!TIKAPI_KEY) {
    console.error("TikAPI key not configured");
    return null;
  }

  try {
    const res = await tikApiGet("/api/user/info", {
      uniqueId: username,
    });

    if (!res) {
      console.error("TikAPI user/info network error for", username);
      return null;
    }

    const text = await res.text();

    if (!res.ok) {
      console.error("TikAPI user error:", res.status, text);
      return null;
    }

    if (!text.trim()) {
      console.warn("TikAPI user/info empty body for", username);
      return null;
    }

    let data: TikTokUserInfoRaw;
    try {
      data = JSON.parse(text) as TikTokUserInfoRaw;
    } catch (error) {
      console.error("Error parsing TikAPI user/info JSON:", error);
      return null;
    }

    const user = data.userInfo?.user ?? {};
    const stats = data.userInfo?.stats ?? {};

    // Defensive parsing: the API can return different key names depending on
    // endpoint/version. Try several common variants before falling back to 0.
    const followerCount: number =
      stats.followerCount ?? stats.follower_count ?? stats.follower ?? 0;
    const followingCount: number =
      stats.followingCount ?? stats.following_count ?? 0;
    const heartCount: number =
      stats.heartCount ?? stats.heart ?? stats.heart_count ?? 0;

    // Helpful debug output when running in development so it's easier to
    // diagnose why callers might only be seeing followers or partial data.
    if (process.env.NODE_ENV !== "production") {
      try {
        // Avoid logging huge objects, just the parts relevant to debugging
        console.debug("TikAPI user/info parsed for", username, {
          followerCount,
          followingCount,
          heartCount,
          rawStats: Object.keys(stats).length ? stats : undefined,
        });
      } catch (e) {
        // ignore logging failures
      }
    }

    return {
      id: user.id ?? "",
      username: user.uniqueId ?? username,
      nickname: user.nickname ?? "",
      followerCount,
      followingCount,
      heartCount,
    };
  } catch (error) {
    console.error("Error fetching TikTok user:", error);
    return null;
  }
}

export function extractTikTokUsername(url: string): string | null {
  const match = url.match(/tiktok\.com\/@([\w.-]+)/);
  return match ? match[1] : null;
}

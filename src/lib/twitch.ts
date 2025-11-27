interface TwitchVOD {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  url: string;
  viewCount: number;
  duration: string;
}

interface TwitchChannel {
  id: string;
  login: string;
  displayName: string;
  followerCount: number;
  viewCount: number;
}

interface TwitchVODItem {
  id: string;
  title: string;
  thumbnail_url: string;
  created_at: string;
  url: string;
  view_count: number;
  duration: string;
}

interface TwitchVideosResponse {
  data: TwitchVODItem[];
}

interface TwitchUserItem {
  id: string;
  login: string;
  display_name: string;
  view_count?: number;
}

interface TwitchUsersResponse {
  data: TwitchUserItem[];
}

interface TwitchFollowersResponse {
  total: number;
}

const TWITCH_CLIENT_ID = process.env["TWITCH_CLIENT_ID"];
const TWITCH_CLIENT_SECRET = process.env["TWITCH_CLIENT_SECRET"];
const BASE_URL = "https://api.twitch.tv/helix";

let accessToken: string | null = null;
let tokenExpiry = 0;

async function getTwitchAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!TWITCH_CLIENT_ID || !TWITCH_CLIENT_SECRET) {
    throw new Error("Twitch API credentials not configured");
  }

  try {
    const res = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    if (!res.ok) {
      throw new Error(`Twitch OAuth error: ${res.status}`);
    }

    const data: { access_token: string; expires_in: number } = await res.json();
    accessToken = data.access_token;
    tokenExpiry = Date.now() + data.expires_in * 1000 - 60000;

    return accessToken;
  } catch (error) {
    console.error("Error getting Twitch access token:", error);
    throw error;
  }
}

export async function fetchTwitchVODs(
  userId: string,
  maxResults: number = 3
): Promise<TwitchVOD[]> {
  if (!TWITCH_CLIENT_ID) {
    console.error("Twitch Client ID not configured");
    return [];
  }

  try {
    const token = await getTwitchAccessToken();
    const url = `${BASE_URL}/videos?user_id=${userId}&first=${maxResults}&type=archive`;

    const res = await fetch(url, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 43200 },
    });

    if (!res.ok) {
      console.error(`Twitch API error for user ${userId}: ${res.status}`);
      throw new Error(`Twitch API error: ${res.status}`);
    }

    const data: TwitchVideosResponse = await res.json();

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data.map((vod): TwitchVOD => ({
      id: vod.id,
      title: vod.title,
      thumbnail: vod.thumbnail_url
        .replace("%{width}", "1280")
        .replace("%{height}", "720"),
      publishedAt: vod.created_at,
      url: vod.url,
      viewCount: vod.view_count,
      duration: vod.duration,
    }));
  } catch (error) {
    console.error("Error fetching Twitch VODs:", error);
    return [];
  }
}

export async function fetchTwitchUser(
  username: string
): Promise<TwitchChannel | null> {
  if (!TWITCH_CLIENT_ID) {
    console.error("Twitch Client ID not configured");
    return null;
  }

  try {
    const token = await getTwitchAccessToken();
    const url = `${BASE_URL}/users?login=${username}`;

    const res = await fetch(url, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      throw new Error(`Twitch API error: ${res.status}`);
    }

    const data: TwitchUsersResponse = await res.json();
    const user = data.data[0];

    if (!user) return null;

    const followUrl = `${BASE_URL}/channels/followers?broadcaster_id=${user.id}`;
    const followRes = await fetch(followUrl, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 86400 },
    });

    let followerCount = 0;
    if (followRes.ok) {
      const followData: TwitchFollowersResponse = await followRes.json();
      followerCount = followData.total;
    }

    return {
      id: user.id,
      login: user.login,
      displayName: user.display_name,
      followerCount,
      viewCount: user.view_count ?? 0,
    };
  } catch (error) {
    console.error("Error fetching Twitch user:", error);
    return null;
  }
}

export function extractTwitchUsername(url: string): string | null {
  const match = url.match(/twitch\.tv\/([\w-]+)/);
  return match ? match[1] : null;
}

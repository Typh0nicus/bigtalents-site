import { fetchYouTubeVideos } from "./youtube";
import { fetchTwitchVODs } from "./twitch";
import { fetchTikTokVideos } from "./tiktok";
import type { Creator } from "@/lib/featuredAlgorithm";

type VideoPlatform = "youtube" | "twitch" | "tiktok";

export type CreatorLatestVideo = {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
  platform: VideoPlatform;
};

export async function getCreatorLatestVideos(
  creator: Creator,
  maxResults = 6
): Promise<CreatorLatestVideo[]> {
  const videos: CreatorLatestVideo[] = [];
  const promises: Promise<void>[] = [];

  // YouTube
  if (creator.platforms.youtube) {
    promises.push(
      (async () => {
        try {
          const ytVideos = await fetchYouTubeVideos(
            creator.platforms.youtube!.channelId,
            10
          );

          ytVideos.forEach((v) => {
            videos.push({
              id: v.id,
              title: v.title,
              thumbnail: v.thumbnail,
              url: v.url,
              publishedAt: v.publishedAt,
              platform: "youtube",
            });
          });
        } catch (err) {
          console.error(
            "Error fetching YouTube videos for",
            creator.name,
            err
          );
        }
      })()
    );
  }

  // Twitch
  if (creator.platforms.twitch) {
    promises.push(
      (async () => {
        try {
          const twitchVideos = await fetchTwitchVODs(
            creator.platforms.twitch!.userId,
            10
          );

          twitchVideos.forEach((v) => {
            videos.push({
              id: v.id,
              title: v.title,
              thumbnail: v.thumbnail,
              url: v.url,
              publishedAt: v.publishedAt,
              platform: "twitch",
            });
          });
        } catch (err) {
          console.error(
            "Error fetching Twitch VODs for",
            creator.name,
            err
          );
        }
      })()
    );
  }

  // TikTok
  if (creator.platforms.tiktok) {
    promises.push(
      (async () => {
        try {
          const ttVideos = await fetchTikTokVideos(
            creator.platforms.tiktok!.username,
            10
          );

          // Debug if needed:
          console.log("TikTok videos for", creator.name, ttVideos.length);

          ttVideos.forEach((v) => {
            videos.push({
              id: v.id,
              title: v.title,
              thumbnail: v.thumbnail,
              url: v.url,
              publishedAt: v.publishedAt,
              platform: "tiktok",
            });
          });
        } catch (err) {
          console.error(
            "Error fetching TikTok videos for",
            creator.name,
            err
          );
        }
      })()
    );
  }

  await Promise.all(promises);

  // Sort newest → oldest
  videos.sort((a, b) => {
    const aTime = new Date(a.publishedAt).getTime();
    const bTime = new Date(b.publishedAt).getTime();
    return bTime - aTime;
  });

  return videos.slice(0, maxResults);
}

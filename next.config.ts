import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // YouTube thumbnails
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      // Twitch thumbnails
      {
        protocol: "https",
        hostname: "static-cdn.jtvnw.net",
        pathname: "/**",
      },
      // TikTok global CDN (avatars, thumbs, etc.)
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
        pathname: "/**",
      },
      // TikTok EU CDN (this is the one in your error: p16-pu-sign-no.tiktokcdn-eu.com)
      {
        protocol: "https",
        hostname: "**.tiktokcdn-eu.com",
        pathname: "/**",
      },
      // (Optional) US / other regional CDNs, just in case
      {
        protocol: "https",
        hostname: "**.tiktokcdn-us.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

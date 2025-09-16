import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Ensures Next treats THIS folder as the root (you have another lockfile in C:\Users\brnsl)
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
};

export default nextConfig;

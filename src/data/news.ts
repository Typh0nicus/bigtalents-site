export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  content?: string; // For individual news pages
  featured?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    slug: "bsc-world-championship-2024-results",
    title: "Boss Claims 2024 BSC World Championship Victory",
    date: "2024-12-15T18:00:00Z",
    excerpt: "HMB | Boss dominates the 2024 Brawl Stars Championship World Finals, securing his place as world champion in an incredible tournament run.",
    image: "/images/news/boss-world-champion.jpg",
    tags: ["World Championship", "Boss", "Results"],
    featured: true
  },
  {
    slug: "angelboy-reaches-number-one-global",
    title: "Angelboy Achieves #1 Global Ranking",
    date: "2024-11-28T14:30:00Z",
    excerpt: "TTM | Angelboy reaches the pinnacle of competitive Brawl Stars, claiming the #1 global ranking after months of intense gameplay.",
    image: "/images/news/angelboy-rank-1.jpg",
    tags: ["Angelboy", "Rankings", "Achievement"]
  },
  {
    slug: "hyra-200k-trophy-milestone",
    title: "Hyra Breaks 200K Trophy Milestone",
    date: "2024-11-15T20:15:00Z",
    excerpt: "Content creator and trophy pushing legend Hyra becomes the first player to reach 200,000 trophies, setting a new world record.",
    image: "/images/news/hyra-200k.jpg",
    tags: ["Hyra", "Trophy Pushing", "World Record"]
  },
  {
    slug: "bgt-elite-club-launch",
    title: "BGT Elite Club Now Open for Applications",
    date: "2024-10-30T16:00:00Z",
    excerpt: "Join the most exclusive Brawl Stars community with direct access to world champions, top players, and biggest creators.",
    image: "/images/news/elite-club-launch.jpg",
    tags: ["Elite Club", "Community", "Announcement"]
  },
  {
    slug: "creator-program-expansion",
    title: "BGT Creator Program Welcomes New Talent",
    date: "2024-10-12T12:00:00Z",
    excerpt: "Expanding our creator program with new partnerships and opportunities for content creators across multiple platforms.",
    image: "/images/news/creator-program.jpg",
    tags: ["Creator Program", "Partnership", "Community"]
  },
  {
    slug: "tournament-series-announcement",
    title: "2025 Tournament Series Announced",
    date: "2024-09-25T10:00:00Z",
    excerpt: "Get ready for our biggest tournament series yet with increased prize pools and expanded regional coverage across NA & EU.",
    image: "/images/news/tournament-series.jpg",
    tags: ["Tournaments", "2025", "Announcement"]
  }
];

export type NewsItem = {
  slug: string;
  title: string;
  date: string;         // ISO date preferred (e.g. "2025-09-15")
  excerpt?: string;
  image?: string;       // e.g. "/images/news/site-launch.jpg"
  tags?: string[];      // e.g. ["Announcement", "Winners"]
  href?: string;        // external link (optional)
};

export const NEWS: NewsItem[] = [
  {
    slug: "site-launch",
    title: "BGT Website Launch",
    date: "2025-09-15",
    excerpt:
      "Welcome to the new BGT home. Cleaner events, faster info, and a proper place for winners’ recaps.",
    image: "/images/news/site-launch.jpg",
    tags: ["Announcement"],
  },
  {
    slug: "wildcard-weekend-3-recap",
    title: "Wildcard Weekend #3 — Winners Recap",
    date: "2025-09-06",
    excerpt:
      "Wildcard Weekend #3 wrapped with tight sets and clean execution. Full scores, VODs, and payouts inside.",
    image: "/images/news/ww3-recap.jpg",
    tags: ["Winners", "Tournaments"],
    href: "https://matcherino.com/t/ww3/overview",
  },
  {
    slug: "tog-collab",
    title: "TOG x Big Talents — Collab Highlights",
    date: "2025-04-26",
    excerpt:
      "Quick highlights of the TOG collaboration events with standout plays and stories from the bracket.",
    image: "/images/news/tog-highlights.jpg",
    tags: ["Tournaments"],
    href: "https://matcherino.com/supercell/tournaments/149584",
  },
];

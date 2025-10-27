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
    slug: "bgt-website-launch",
    title: "Big Talents Website Officially Launches!",
    date: "2025-11-01T09:00:00Z",
    excerpt: "We are thrilled to announce the official launch of the Big Talents esports hub on November 1st! Discover tournaments, rosters, news, and the home of the Brawl Stars creator community.",
    image: "/images/news/website-launch.png",
    tags: ["Launch","Community"],
    featured: true,
    content: `
Welcome to the official launch of the **Big Talents** website—your new home for Brawl Stars esports!

## What You'll Find Here

The BGT platform brings together everything you need to stay connected with the competitive Brawl Stars scene:

- **Tournament Hub** - Track live and upcoming tournaments with real-time brackets powered by Matcherino
- **Rosters & Players** - Discover top players, teams, and rising stars from around the globe
- **Creator Program** - Apply to join our exclusive creator network with revenue sharing and professional support
- **News & Updates** - Stay informed about tournament results, player achievements, and community announcements

## Join the Community

We've built this platform for players, creators, and fans who share a passion for competitive Brawl Stars. Whether you're here to compete, create content, or just follow the action, there's a place for you in the BGT community.

### Ready to get started?

- Browse our upcoming tournaments at **/tournaments**
- Check out the **BGT Creator Program** at **/creator-program**
- Join our **Discord community** to connect with other players and creators

## What's Next?

This is just the beginning. We have exciting plans for 2025 including:

- Expanded tournament series across NA & EU regions
- New creator partnerships and content collaborations
- Enhanced community features and player tools
- Exclusive merchandise and community rewards

Stay tuned for more announcements as we continue to grow!

Thank you for being part of this journey. Let's build something incredible together! 🚀

---

**Have questions?** Join our Discord or reach out to our team. We're here to help you get the most out of the BGT platform.
    `
  }
];

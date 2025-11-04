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
    slug: "bgt-roster-announcement",
    title: "Big Talents Unveils Championship Roster for 2025",
    date: "2025-11-01T14:00:00Z",
    excerpt: "We're proud to introduce our competitive Brawl Stars roster featuring T-esports Championship Season 2 finalists Arthur, Salty, and Trashie, supported by world-class coaching staff.",
    image: "/images/news/roster-reveal.jpg",
    tags: ["Esports" , "Announcement"],
    featured: true,
    content: `
Big Talents is excited to officially announce our competitive Brawl Stars roster for 2025, featuring championship-caliber talent ready to dominate the esports scene.

## Meet The Roster

### Players

**Arthur** - Our Austrian prodigy brings exceptional mechanical skill and championship drive. As an EPF-supported player who qualified for the Brawl Stars Championship 2025 Last Chance Qualifier and achieved EPF World Rankings #1 & #2, Arthur represents the future of competitive Brawl Stars.

**Salty** - Czech Republic's competitive powerhouse joins us with multiple 2025 Monthly Finals qualifications and an ECF: Andorra Finalist achievement. His consistent tournament presence and championship experience make him a cornerstone of our roster.

**Trashie** - Our rising Polish star brings aggressive playstyle and strong tournament presence across major events. His competitive drive and growth potential make him a perfect fit for our championship ambitions.

### Championship Staff

Behind every great team is exceptional leadership:

- **Typhon (Manager)** - Big Talents Founder & Manager, bringing strategic roster building and talent management expertise
- **Soleil (Coach)** - Experienced French coach specializing in team strategy and player development, with BLITZ Subcontinental Brawl 2nd Place (2025)
- **Peri (Analyst)** - Spanish analyst and strategic expert specializing in competitive meta analysis and tournament performance optimization

## T-esports Championship Season 2 Finalists

Our roster made history by reaching the finals of T-esports Championship Season 2, proving they have what it takes to compete at the highest level. This achievement is just the beginning of our championship journey.

## What's Next?

With this roster, we're targeting:

- **Multiple Championship Qualifications** across EMEA region
- **Major Tournament** victories and prize earnings
- **Consistent Top Placements** in competitive events

## Join The Journey

Follow our players' individual profiles at **/rosters/players** to stay updated on their achievements, watch their highlight reels, and connect with them on social media.

Be part of something special as we build toward championship glory in 2025 and beyond.

---

**Ready to compete?** Check out our tournaments at **/tournaments** or join our Discord community to connect with the team!
    `
  },
  {
    slug: "bgt-website-launch",
    title: "Big Talents Website Officially Launches!",
    date: "2025-11-01T09:00:00Z",
    excerpt: "We are thrilled to announce the official launch of the Big Talents esports hub on November 1st! Discover tournaments, rosters, news, and the home of the Brawl Stars creator community.",
    image: "/images/news/website-launch.png",
    tags: ["Community"],
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


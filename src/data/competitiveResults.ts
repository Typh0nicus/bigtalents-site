export type TournamentResult = {
  id: string;
  name: string;
  game: string;
  date: string; // ISO format
  placement: string; // "2nd", "1st", "Top 8"
  placementNum: number; // 1, 2, 8 - for sorting/styling
  prizeWon?: number;
  eventType: "lan" | "online";
  region?: string;
  liquipedia?: string;
  matcherino?: string;
  image?: string;
};

export const COMPETITIVE_RESULTS: TournamentResult[] = [
  {
    id: "t-esports-championship-s2",
    name: "T-Esports Championship Season 2",
    game: "Brawl Stars",
    date: "2024-12-01",
    placement: "2nd",
    placementNum: 2,
    eventType: "lan",
    region: "Europe",
    liquipedia: "https://liquipedia.net/brawlstars/T-esports_Championship/Season_2",
  },
  {
    id: "hmble-cup-3",
    name: "HMBLE Cup 3",
    game: "Brawl Stars",
    date: "2024-10-01",
    placement: "2nd",
    placementNum: 2,
    eventType: "online",
    region: "Europe",
    liquipedia: "https://liquipedia.net/brawlstars/HMBLE_Cup/3",
    matcherino: "https://matcherino.com/supercell/tournaments/173353",
  },
];

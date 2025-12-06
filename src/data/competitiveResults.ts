export type TournamentResult = {
  id: string;
  name: string;
  game: string;
  date: string;
  placement: string;
  placementNum: number;
  prizeWon?: number;
  prizePool?: number;
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
    date: "2025-11-16",
    placement: "2nd",
    placementNum: 2,
    prizeWon: 3023.08,
    prizePool: 11627,
    eventType: "lan",
    region: "Europe",
    liquipedia: "https://liquipedia.net/brawlstars/T-esports_Championship/Season_2",
    image: "/images/competed/tec-s2.png",
  },
  {
    id: "hmble-cup-3",
    name: "HMBLE Cup 3",
    game: "Brawl Stars",
    date: "2025-11-22",
    placement: "2nd",
    placementNum: 2,
    prizeWon: 54.78,
    prizePool: 182,
    eventType: "online",
    region: "Europe",
    liquipedia: "https://liquipedia.net/brawlstars/HMBLE_Cup/3",
    matcherino: "https://matcherino.com/supercell/tournaments/173353",
    image: "/images/competed/hmble-cup-3.bin",
  },
];

export type Tournament = {
  title: string;
  date?: string;
  prizeUsd?: number;
  url: string;
  slug: string;
  image?: string;
  liquipedia?: string;
  participants?: number;
  matcherinoId?: number;
  matcherinoSlug?: string; // /t/<slug>
  region?: 'NA' | 'EU';
  archived?: boolean;
};

export const TOURNAMENTS: Tournament[] = [
   {
    title: "Time To Win #18",
    date: "Fri, Mar 14, 2025 9:00PM GMT+1",
    prizeUsd: 385.0,
    url: "https://matcherino.com/supercell/tournaments/145019",
    slug: "ttw18",
    image: "/images/tournaments/ttw18.png",
    liquipedia: "https://liquipedia.net/brawlstars/Time_To_Win/18",
    matcherinoId: 145775,
    participants: 296,
    region: "EU",
    archived: true
  },
  {
    title: "Eternal x Big Talents: March Madness",
    date: "Mon, Mar 3, 2025 12:00AM GMT",
    prizeUsd: 518.0,
    url: "https://matcherino.com/supercell/tournaments/145019",
    slug: "145019",
    image: "/images/tournaments/145019.AVIF",
    liquipedia: "https://liquipedia.net/brawlstars/Eternal_x_BigTipper/March_Madness/Tournament/1",
    matcherinoId: 145019,
    participants: 226,
    region: "NA",
    archived: true
  },
  {
    title: "March Mayhem #1",
    date: "Wed, Mar 5, 2025 7:30PM GMT",
    prizeUsd: 275.0,
    url: "https://matcherino.com/supercell/tournaments/145309",
    slug: "145309-march-mayhem-1",
    image: "/images/tournaments/145309.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/March_Mayhem/1",
    matcherinoId: 145309,
    participants: 380,
    region: "EU",
    archived: true
  },
  {
    title: "March Mayhem #2",
    date: "Wed, Mar 12, 2025 7:30PM GMT",
    prizeUsd: 265.0,
    url: "https://matcherino.com/supercell/tournaments/145395",
    slug: "145395-march-mayhem-2",
    image: "/images/tournaments/145309.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/March_Mayhem/2",
    matcherinoId: 145395,
    participants: 400,
    region: "EU",
    archived: true
  },
  {
    title: "March Mayhem #3",
    date: "Wed, Mar 19, 2025 7:30PM GMT",
    prizeUsd: 250.0,
    url: "https://matcherino.com/supercell/tournaments/145402",
    slug: "145402-march-mayhem-3",
    image: "/images/tournaments/145309.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/March_Mayhem/3",
    matcherinoId: 145402,
    participants: 400,
    region: "EU",
    archived: true
  },
  {
    title: "March Mayhem #4",
    date: "Wed, Mar 26, 2025 7:30PM GMT",
    prizeUsd: 250.0,
    url: "https://matcherino.com/supercell/tournaments/145404",
    slug: "145404-march-mayhem-4",
    image: "/images/tournaments/145309.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/March_Mayhem/4",
    matcherinoId: 145404,
    participants: 285,
    region: "EU",
    archived: true
  },
  {
    title: "TOG x Big Talents",
    date: "Sat, Mar 29, 2025 10:00PM GMT",
    prizeUsd: 1825.0,
    url: "https://matcherino.com/supercell/tournaments/145690",
    slug: "145690-tog-x-bgt",
    image: "/images/tournaments/145690.png",
    liquipedia: "https://liquipedia.net/brawlstars/TOG_x_Big_Tipper",
    matcherinoId: 145690,
    participants: 439,
    region: "NA",
    archived: true
  },
  {
    title: "R7 x Big Talents Tournament",
    date: "Sat, Apr 19, 2025 3:30PM GMT+1",
    prizeUsd: 545.0,
    url: "https://matcherino.com/supercell/tournaments/144717",
    slug: "144717-r7-x-bgt",
    image: "/images/tournaments/144717.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/R7_x_Big_Tipper_Tournament",
    matcherinoId: 144717,
    participants: 543,
    region: "EU",
    archived: true
  },
  {
    title: "TOG x Big Talents (Brawl Ball Only)",
    date: "Sat, Apr 26, 2025 7:00PM GMT+1",
    prizeUsd: 445.0,
    url: "https://matcherino.com/supercell/tournaments/149584",
    slug: "149584-tog-x-bgt-brawl-ball",
    image: "/images/tournaments/149584.jpg",
    liquipedia: "https://liquipedia.net/brawlstars/TOG_x_Big_Tipper_(Brawl_Ball_Only)",
    matcherinoId: 149584,
    participants: 387,
    region: "NA",
    archived: true
  },
  {
    title: "RCN x Big Talents EU Cup",
    date: "Fri, May 30, 2025 6:00PM GMT+1",
    prizeUsd: 516.0,
    url: "https://matcherino.com/supercell/tournaments/152394",
    slug: "152394-rcn-x-bgt-eu-cup",
    image: "/images/tournaments/152394.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/RCN_x_BGT_EU_Cup",
    matcherinoId: 152394,
    participants: 545,
    region: "EU",
    archived: true
  },
  {
    title: "Haneki x Big Talents Tournament",
    date: "Thu, Jun 26, 2025 7:00PM GMT+1",
    prizeUsd: 1793.0,
    url: "https://matcherino.com/t/haneki-x-bigtalents",
    slug: "haneki-x-bgt",
    image: "/images/tournaments/haneki.JPG",
    liquipedia: "https://liquipedia.net/brawlstars/Haneki_x_Big_Talents_Tournament",
    matcherinoId: 153648,
    matcherinoSlug: "haneki-x-bigtalents",
    participants: 373,
    region: "EU",
    archived: true
  },
  {
    title: "BGT July Cup",
    date: "Fri, Jul 18, 2025 6:00PM GMT+1",
    url: "https://matcherino.com/supercell/tournaments/156361",
    slug: "156361-bgt-july-cup",
    image: "/images/tournaments/156361.WEBP",
    matcherinoId: 156361,
    participants: 163,
    region: "EU",
    archived: true
  },
  {
    title: "Wildcard Weekend #1",
    date: "Sat, Aug 16, 2025 10:00PM GMT+1",
    url: "https://matcherino.com/supercell/tournaments/165244/overview",
    slug: "165244-wildcard-weekend-1",
    image: "/images/tournaments/165244.WEBP",
    matcherinoId: 165244,
    participants: 8,
    region: "NA",
    archived: true
  },
  {
    title: "Wildcard Weekend #2",
    date: "Sun, Aug 17, 2025 3:00PM GMT+1",
    url: "https://matcherino.com/supercell/tournaments/165521/overview",
    slug: "165521-wildcard-weekend-2",
    image: "/images/tournaments/165521.WEBP",
    matcherinoId: 165521,
    participants: 29,
    region: "EU",
    archived: true
  },
  {
    title: "Wildcard Weekend #3",
    date: "Sat, Sep 6, 2025 7:30PM GMT+1",
    prizeUsd: 139.72,
    url: "https://matcherino.com/t/ww3/overview",
    slug: "ww3",
    image: "/images/tournaments/ww3.WEBP",
    liquipedia: "https://liquipedia.net/brawlstars/Wildcard_Weekend/3",
    matcherinoId: 165776,
    participants: 427,
    region: "EU",
    archived: true
  },
  {
    title: "Middle Talents League",
    date: "Fri, Nov 7, 2025 6:00PM GMT+1",
    url: "https://matcherino.com/t/bgt-megaming/overview",
    slug: "bgt-megaming",
    image: "/images/tournaments/mtl.png",
    matcherinoId: 172627,
    participants: 140,
    region: "EU",
    archived: true
  },
];

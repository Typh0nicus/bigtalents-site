export type Tournament = {
  title: string;
  date?: string;
  prizeUsd?: number;
  url: string;
  slug: string;
  image?: string;
};

export const TOURNAMENTS: Tournament[] = [
  {
    title: "Eternal x Big Talents: March Madness",
    date: "Mon, Mar 3, 2025 12:00AM GMT",
    prizeUsd: 518.0,
    url: "https://matcherino.com/supercell/tournaments/145019",
    slug: "145019-eternal-bgt-march-madness",
    image: "/images/tournaments/145019.AVIF",
  },
  {
    title: "March Mayhem #1",
    date: "Wed, Mar 5, 2025 7:30PM GMT",
    prizeUsd: 275.0,
    url: "https://matcherino.com/supercell/tournaments/145309",
    slug: "145309-march-mayhem-1",
    image: "/images/tournaments/145309.WEBP",
  },
  {
    title: "March Mayhem #2",
    date: "Wed, Mar 12, 2025 7:30PM GMT",
    prizeUsd: 265.0,
    url: "https://matcherino.com/supercell/tournaments/145395",
    slug: "145395-march-mayhem-2",
    image: "/images/tournaments/145309.WEBP",
  },
  {
    title: "March Mayhem #3",
    date: "Wed, Mar 19, 2025 7:30PM GMT",
    prizeUsd: 250.0,
    url: "https://matcherino.com/supercell/tournaments/145402",
    slug: "145402-march-mayhem-3",
    image: "/images/tournaments/145309.WEBP",
  },
  {
    title: "March Mayhem #4",
    date: "Wed, Mar 26, 2025 7:30PM GMT",
    prizeUsd: 250.0,
    url: "https://matcherino.com/supercell/tournaments/145404",
    slug: "145404-march-mayhem-4",
    image: "/images/tournaments/145309.WEBP",
  },
  {
    title: "TOG x Big Talents",
    date: "Sat, Mar 29, 2025 10:00PM GMT",
    prizeUsd: 1825.0,
    url: "https://matcherino.com/supercell/tournaments/145690",
    slug: "145690-tog-x-bgt",
    image: "/images/tournaments/145690.png",
  },
  {
    title: "R7 x Big Talents Tournament",
    date: "Sat, Apr 19, 2025 3:30PM GMT+1",
    prizeUsd: 545.0,
    url: "https://matcherino.com/supercell/tournaments/144717",
    slug: "144717-r7-x-bgt",
    image: "/images/tournaments/144717.WEBP",
  },
  {
    title: "TOG x Big Talents (Brawl Ball Only)",
    date: "Sat, Apr 26, 2025 7:00PM GMT+1",
    prizeUsd: 445.0,
    url: "https://matcherino.com/supercell/tournaments/149584",
    slug: "149584-tog-x-bgt-brawl-ball",
    image: "/images/tournaments/149584.jpg",
  },
  {
    title: "RCN x Big Talents EU Cup",
    date: "Fri, May 30, 2025 6:00PM GMT+1",
    prizeUsd: 516.0,
    url: "https://matcherino.com/supercell/tournaments/152394",
    slug: "152394-rcn-x-bgt-eu-cup",
    image: "/images/tournaments/152394.WEBP",
  },
  {
    title: "Haneki x Big Talents Tournament",
    date: "Thu, Jun 26, 2025 7:00PM GMT+1",
    prizeUsd: 1793.0,
    url: "https://matcherino.com/t/haneki-x-bigtalents",
    slug: "haneki-x-bgt",
    image: "/images/tournaments/haneki.JPG",
  },
  {
    title: "BGT July Cup",
    date: "Fri, Jul 18, 2025 6:00PM GMT+1",
    prizeUsd: 50.0,
    url: "https://matcherino.com/supercell/tournaments/156361",
    slug: "156361-bgt-july-cup",
    image: "/images/tournaments/156361.WEBP",
  },
  {
    title: "Wildcard Weekend #1",
    date: "Sat, Aug 16, 2025 10:00PM GMT+1",
    prizeUsd: 30.0,
    url: "https://matcherino.com/supercell/tournaments/165244/overview",
    slug: "165244-wildcard-weekend-1",
    image: "/images/tournaments/165244.WEBP",
  },
  {
    title: "Wildcard Weekend #2",
    date: "Sun, Aug 17, 2025 3:00PM GMT+1",
    prizeUsd: 30.0,
    url: "https://matcherino.com/supercell/tournaments/165521/overview",
    slug: "165521-wildcard-weekend-2",
    image: "/images/tournaments/165521.WEBP",
  },
  {
    title: "Wildcard Weekend #3",
    date: "Sat, Sep 6, 2025 7:30PM GMT+1",
    prizeUsd: 139.72,
    url: "https://matcherino.com/t/ww3/overview",
    slug: "wildcard-weekend-3",
    image: "/images/tournaments/ww3.WEBP",
  },
];

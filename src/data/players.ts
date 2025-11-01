export type StaffRole = 'Coach' | 'Manager' | 'Analyst';

export interface ClipData {
  title: string;
  url: string;
  thumbnail?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  ign: string;
  type: 'player' | 'staff';
  roles?: StaffRole[];
  country: string;
  countryCode: string;
  image: string;
  coverImage?: string;
  bio: string;
  achievements: string[];
  clips?: ClipData[];
  socials: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
    instagram?: string;
    liquipedia?: string;
  };
  joinDate: string;
  featured?: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'arthur',
    name: 'Arthur Kornfeld',
    ign: 'Arthur',
    type: 'player',
    country: 'Austria',
    countryCode: 'AT',
    image: '/images/rosters/arthur.WEBP',
    coverImage: '/images/arthur-cover.png',
    bio: 'Young Austrian prodigy supported by the Esports Player Foundation with exceptional mechanical skill and championship drive.',
    achievements: [
      'Brawl Stars Championship 2025 Last Chance Qualifier',
      'EPF World Rankings #1 & #2 Player (2025)',
      'T-esports Championship Season 2 Finalist',
      'Multiple Monthly Finals Qualifications'
    ],
    clips: [
      { title: 'LCQ 2025 Highlights', url: 'https://youtube.com/watch?v=example1' }
    ],
    socials: {
      twitter: 'https://twitter.com/arthuur_abi',
      twitch: 'https://www.twitch.tv/ae_arthur',
      liquipedia: 'https://liquipedia.net/brawlstars/Arthur'
    },
    joinDate: '2025-11-01',
    featured: true
  },
  {
    id: 'salty',
    name: 'Jiří Vilímovský',
    ign: 'Salty',
    type: 'player',
    country: 'Czech Republic',
    countryCode: 'CZ',
    image: '/images/rosters/salty.WEBP',
    coverImage: '/images/salty-cover.png',
    bio: 'Competitive Czech player with consistent championship qualifications and strong international tournament presence.',
    achievements: [
      'T-esports Championship Season 2 Finalist',
      'Multiple 2025 Monthly Finals Qualifications',
      'ECF: Andorra Finalist',
      'Regional Tournament Champion'
    ],
    socials: {
      twitter: 'https://twitter.com/salty_bs',
      liquipedia: 'https://liquipedia.net/brawlstars/Salty'
    },
    joinDate: '2025-11-01',
    featured: true
  },
  {
    id: 'trashie',
    name: 'Trashie',
    ign: 'Trxshie',
    type: 'player',
    country: 'Poland',
    countryCode: 'PL',
    image: '/images/trashie.png',
    coverImage: '/images/trashie-cover.png',
    bio: 'Rising European competitive player with aggressive playstyle and strong tournament presence across major events.',
    achievements: [
      'T-esports Championship Season 2 Finalist',
      'Competitive Tournament Qualifications',
      'Monthly Qualifier Appearances',
      'Strong Regional Performance'
    ],
    socials: {
      twitter: 'https://twitter.com/trashthrasheer'
    },
    joinDate: '2025-11-01',
    featured: true
  },
  {
    id: 'typhon',
    name: 'Rayen Sidhom',
    ign: 'Typhon',
    type: 'staff',
    roles: ['Manager'],
    country: 'International',
    countryCode: '',
    image: '/images/typhon.png',
    bio: 'Big Talents Founder & Manager - Building championship teams and developing world-class esports talent.',
    achievements: [
      'Big Talents Organization Founder',
      'T-esports Championship Season 2 Finalist',
      'Talent Management & Development',
      'Strategic Roster Building'
    ],
    socials: {
      twitter: 'https://twitter.com/typhonbs'
    },
    joinDate: 'The Beginning',
    featured: true
  },
  {
    id: 'soleil',
    name: 'Soleil (Shiroi)',
    ign: 'Soleil',
    type: 'staff',
    roles: ['Coach'],
    country: 'France',
    countryCode: 'FR',
    image: '/images/soleil.png',
    bio: 'Experienced French coach specializing in team strategy, player development, and competitive meta analysis.',
    achievements: [
      'Brawl Stars Championship Coach',
      'T-esports Championship Season 2 Finalist',
      'BLITZ Subcontinental Brawl 2nd Place (2025)',
      'Professional Team Coaching Experience',
      'Meta & Strategy Expert'
    ],
    socials: {
      twitter: 'https://twitter.com/soleil_bs',
      liquipedia: 'https://liquipedia.net/brawlstars/Soleil'
    },
    joinDate: '2025-11-01'
  },
  {
    id: 'peri',
    name: 'Eric Apesteguia',
    ign: 'Peri',
    type: 'staff',
    roles: ['Analyst'],
    country: 'Spain',
    countryCode: 'ES',
    image: '/images/peri.png',
    bio: 'Spanish analyst and strategic expert specializing in competitive meta analysis and tournament performance optimization.',
    achievements: [
      'Professional Brawl Stars Analyst',
      'T-esports Championship Season 2 Finalist',
      'Championship Tournament Experience',
      'Meta & Strategy Expert',
      'International Tournament Analyst'
    ],
    socials: {
      twitter: 'https://twitter.com/iperibs',
      liquipedia: 'https://liquipedia.net/brawlstars/Peri'
    },
    joinDate: '2025-11-01'
  }
];

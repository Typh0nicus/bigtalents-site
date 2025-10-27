// src/data/rosters.ts
export interface Creator {
  id: string;
  alias: string;
  realName?: string;
  role: 'Streamer' | 'Content Creator' | 'Player' | 'Coach' | 'Analyst';
  game?: string;
  avatar: string;
  banner?: string;
  bio?: string;
  region: 'NA' | 'EU';
  socials?: {
    twitter?: string;
    twitch?: string;
    youtube?: string;
    instagram?: string;
  };
  achievements?: string[];
  joinDate?: string;
  status: 'active' | 'coming-soon';
}

export const CREATORS: Creator[] = [
  {
    id: 'creator-1',
    alias: 'TBA',
    role: 'Content Creator',
    avatar: '/images/rosters/placeholder.png',
    region: 'EU',
    status: 'coming-soon',
  },
  {
    id: 'creator-2',
    alias: 'TBA',
    role: 'Streamer',
    avatar: '/images/rosters/placeholder.png',
    region: 'NA',
    status: 'coming-soon',
  },
  {
    id: 'creator-3',
    alias: 'TBA',
    role: 'Player',
    avatar: '/images/rosters/placeholder.png',
    region: 'EU',
    status: 'coming-soon',
  },
  {
    id: 'creator-4',
    alias: 'TBA',
    role: 'Content Creator',
    avatar: '/images/rosters/placeholder.png',
    region: 'NA',
    status: 'coming-soon',
  },
  {
    id: 'creator-5',
    alias: 'TBA',
    role: 'Player',
    avatar: '/images/rosters/placeholder.png',
    region: 'EU',
    status: 'coming-soon',
  },
  {
    id: 'creator-6',
    alias: 'TBA',
    role: 'Streamer',
    avatar: '/images/rosters/placeholder.png',
    region: 'NA',
    status: 'coming-soon',
  },
  {
    id: 'creator-7',
    alias: 'TBA',
    role: 'Content Creator',
    avatar: '/images/rosters/placeholder.png',
    region: 'EU',
    status: 'coming-soon',
  },
  {
    id: 'creator-8',
    alias: 'TBA',
    role: 'Analyst',
    avatar: '/images/rosters/placeholder.png',
    region: 'NA',
    status: 'coming-soon',
  },
];

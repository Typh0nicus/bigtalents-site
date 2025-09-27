// Tournament type definitions
export interface Tournament {
  id: number;
  title: string;
  description?: string;
  date: string;
  endDate?: string;
  registrationEndDate?: string;
  prizeUsd: number;
  prizeFunded?: number;
  prizeGoal?: number;
  url: string;
  slug: string;
  image?: string;
  banner?: string;
  liquipedia?: string;
  participants?: number;
  maxParticipants?: number;
  teams?: number;
  matcherinoId?: number;
  matcherinoSlug?: string;
  status: 'upcoming' | 'open' | 'live' | 'completed' | 'cancelled';
  region?: 'NA' | 'EU' | 'GLOBAL';
  format?: string;
  game?: string;
  timezone?: string;
  featured?: boolean;
  streamUrl?: string;
  discordUrl?: string;
  bracketUrl?: string;
  rulesUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

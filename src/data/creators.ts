import { Creator } from '@/lib/featuredAlgorithm';

export const CREATORS: Creator[] = [
  {
    id: 'radanbs',
    name: 'Radan',
    tier: 'partnered',
    region: 'EU',
    avatar: '/images/creators/radanbs.jpg',
    banner: '/images/creators/radanbs-banner.jpg',
    platforms: {
      youtube: {
        channelId: 'UClCg7AiTqVMXaPvW2ENg4sw',
        subscribers: 0,
        url: 'https://youtube.com/@radanbs',
      },
      tiktok: {
        username: 'radanbs',
        followers: 0,
        url: 'https://www.tiktok.com/@radanbs',
      },
      x: {
        handle: 'radan_bs',
        followers: 296,
        url: 'https://x.com/radan_bs',
      },
    },
  },
  {
    id: 'ivanoz7',
    name: 'Ivanoz7',
    tier: 'academy',
    region: 'EU',
    avatar: '/images/creators/ivanoz7.webp',
    banner: '/images/creators/ivanoz7-banner.jpg',
    platforms: {
      youtube: {
        channelId: 'UCw0hBgH6HbrcsZRbMoYPPpw',
        subscribers: 0,
        url: 'https://youtube.com/@Ivanoz7',
      },
      twitch: {
        userId: '747148553',
        username: 'ivanoz7_',
        followers: 0,
        url: 'https://twitch.tv/ivanoz7_',
      },
      tiktok: {
        username: 'ivanoz7_',
        followers: 0,
        url: 'https://tiktok.com/@ivanoz7_',
      },
      x: {
        handle: 'Ivanoz7_',
        followers: 1043, 
        url: 'https://x.com/Ivanoz7_',
      },
    },
  },
  {
    id: 'ruffybs',
    name: 'Ruffy',
    tier: 'elite',
    region: 'EU',
    avatar: '/images/creators/ruffybs.jpg',
    banner: '/images/creators/ruffybs-banner.jpg',
    platforms: {
      youtube: {
        channelId: 'UCTMmHWfuJTskxQzWE5-jIHw',
        subscribers: 0,
        url: 'https://youtube.com/@ruffybs',
      },
      tiktok: {
        username: 'ruffybs_',
        followers: 0,
        url: 'https://www.tiktok.com/@ruffybs_',
      },
      x: {
        handle: 'Ruffy',
        followers: 205,
        url: 'https://x.com/Ruffy_Bs',
      },
    },
  },
];

export function getCreatorById(id: string): Creator | undefined {
  return CREATORS.find(c => c.id === id);
}

export function getCreatorsByTier(tier: 'academy' | 'partnered' | 'elite'): Creator[] {
  return CREATORS.filter(c => c.tier === tier);
}

export function getCreatorBySlug(slug: string): Creator | undefined {
  return CREATORS.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === slug);
}

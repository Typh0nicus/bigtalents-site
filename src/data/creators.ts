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
        followers: 285,
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
        followers: 915, 
        url: 'https://x.com/Ivanoz7_',
      },
    },
  },
  {
    id: 'ztbrawl',
    name: 'ZT',
    tier: 'academy',
    region: 'NA',
    avatar: '/images/creators/ztbrawl.jpg',
    banner: '/images/creators/ztbrawl-banner.jpg',
    platforms: {
      youtube: {
        channelId: 'UCegn0pKlwOeOcfWWCEp8_jA',
        subscribers: 0,
        url: 'https://youtube.com/@ztbrawl',
      },
      twitch: {
        userId: '510466958',
        username: 'ztbrawl',
        followers: 0,
        url: 'https://twitch.tv/ztbrawl',
      },
      x: {
        handle: 'ZTBrawl',
        followers: 805,
        url: 'https://x.com/ZTBrawl',
      },
      discord: {
        url: 'https://discord.gg/5cmcTyS3rF',
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

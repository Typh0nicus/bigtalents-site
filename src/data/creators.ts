import { Creator } from '@/lib/featuredAlgorithm';

export const CREATORS: Creator[] = [
  {
    id: 'radanbs',
    name: 'Radan',
    tier: 'partnered',
    region: 'EU',
    language: 'English',
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
        followers: 306,
        url: 'https://x.com/radan_bs',
      },
    },
  },
  {
    id: 'ivanoz7',
    name: 'Ivanoz7',
    tier: 'academy',
    region: 'EU',
    language: 'Spanish',
    avatar: '/images/creators/ivanoz7.jpg',
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
        followers: 1235, 
        url: 'https://x.com/Ivanoz7_',
      },
    },
  },
  {
  id: "superlab",
  name: "Superlab",
  tier: "elite",
  region: "NA",
  language: "English",
  avatar: "/images/creators/superlab.jpg",
  banner: "/images/creators/superlab-banner.png",
  platforms: {
    youtube: {
      channelId: "UC0VXAuazhUHrPL7lzwp0SBw",
      subscribers: 0,
      url: "https://youtube.com/@SuperL4B",
    },
    x: {
      handle: "Superlab",
      followers: 20000,
      url: "https://x.com/superlab9",
    },
    instagram: {
      handle: "SuperLab",
      followers: 40400,
      url: "https://instagram.com/superl4b",
    },
    discord: {
      url: "https://discord.com/invite/zs5c7rMdbr",
    },
  },
},
  {
    id: 'ruffybs',
    name: 'Ruffy',
    tier: 'elite',
    region: 'EU',
    language: 'English',
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
        followers: 206,
        url: 'https://x.com/Ruffy_Bs',
      },
    },
  },
    {
    id: 'rockit',
    name: 'Rockit',
    tier: 'elite',
    region: 'EU',
    language: 'Spanish',
    avatar: '/images/creators/rockit.png',
    banner: '/images/creators/rockit-banner.jpg',
    platforms: {
      youtube: {
        channelId: 'UCJrlJzqJ2Ek3mJFMHyAvBnw',
        subscribers: 0,
        url: 'https://youtube.com/@rockitbs',
      },
      tiktok: {
        username: 'rockitbs',
        followers: 0,
        url: 'https://www.tiktok.com/@rockitbs',
      },
    instagram: {
      handle: "Rockit",
      followers: 1980,
      url: "https://instagram.com/rockitbs",
    },
      x: {
        handle: 'Rockit',
        followers: 5100,
        url: 'https://x.com/rockit_bs',
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

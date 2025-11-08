import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Rosters',
  description: 'Meet the champions, creators, and rising stars of Big Talents. Championship rosters, elite players, and talented content creators representing BGT in Brawl Stars esports.',
  openGraph: {
    title: 'BGT Rosters — Meet Our Teams',
    description: 'Championship rosters, elite players, and content creators representing Big Talents in Brawl Stars esports.',
    images: [
      {
        url: '/images/og-rosters.png',
        width: 1200,
        height: 630,
        alt: 'Big Talents Rosters'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BGT Rosters — Meet Our Teams',
    description: 'Championship rosters and elite talent representing Big Talents.',
    images: ['/images/logo/duocolored.png'],
  },
};

export default function RostersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Players',
  description: 'Meet the elite competitive players representing Big Talents in Brawl Stars esports. Championship-caliber talent competing at the highest level.',
  openGraph: {
    title: 'BGT Players — Meet Our Stars',
    description: 'Elite competitive players representing Big Talents. Championship rosters competing at the highest level of Brawl Stars esports.',
    images: [
      {
        url: '/images/og-rosters.png',
        width: 1200,
        height: 630,
        alt: 'Big Talents Championship Players'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BGT Players — Meet Our Stars',
    description: 'Elite competitive players representing Big Talents.',
    images: ['/images/rosters/rosterlayout.png'],
  },
};

export default function PlayersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

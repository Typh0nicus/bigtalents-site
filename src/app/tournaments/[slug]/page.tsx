import { notFound } from 'next/navigation';
import { TOURNAMENTS } from '@/data/tournaments';
import { TournamentBracket } from '@/components/tournaments/TournamentBracket';
import { TournamentHeader } from '@/components/tournaments/TournamentHeader';
import { TournamentStats } from '@/components/tournaments/TournamentStats';
import type { Metadata } from 'next';

interface TournamentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOURNAMENTS.map((tournament) => ({
    slug: tournament.slug,
  }));
}

export async function generateMetadata({ params }: TournamentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tournament = TOURNAMENTS.find(t => t.slug === slug);
  
  if (!tournament) {
    return { title: 'Tournament Not Found' };
  }

  return {
    title: `${tournament.title} - Big Talents`,
    description: `${tournament.title} tournament details, bracket, and results. ${
      tournament.prizeUsd ? `$${tournament.prizeUsd} prize pool.` : ''
    } ${tournament.participants ? `${tournament.participants} teams competed.` : ''}`,
    openGraph: {
      title: `${tournament.title} - Big Talents`,
      description: `Tournament bracket and results for ${tournament.title}`,
      images: tournament.image ? [tournament.image] : undefined,
    },
    keywords: [
      tournament.title,
      'Brawl Stars',
      'Tournament',
      'Esports',
      'Big Talents',
      'Gaming',
      'Competitive',
      tournament.region || ''
    ].filter(Boolean)
  };
}

export default async function TournamentPage({ params }: TournamentPageProps) {
  const { slug } = await params;
  const tournament = TOURNAMENTS.find(t => t.slug === slug);

  if (!tournament) {
    notFound();
  }

  const isLive = !tournament.archived;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <TournamentHeader tournament={tournament} />
      
      <div className="space-y-20 pb-20">
        <TournamentStats 
          participants={tournament.participants}
          prizePool={tournament.prizeUsd}
          region={tournament.region}
        />

        <TournamentBracket
          tournamentSlug={tournament.slug}
          isLive={isLive}
        />
      </div>
    </div>
  );
}

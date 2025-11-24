import { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEAM_MEMBERS } from "@/data/players";
import PlayerProfile from "./PlayerProfile";

type Props = {
  params: Promise<{ playerId: string }>;
};

export async function generateStaticParams() {
  return TEAM_MEMBERS.map((member) => ({
    playerId: member.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { playerId } = await params;
  const member = TEAM_MEMBERS.find((m) => m.id === playerId);

  if (!member) {
    return { title: "Big Talents | Profile Not Found" };
  }

  return {
    title: `Big Talents | ${member.ign}`,
    description: member.bio,
  };
}

export default async function PlayerPage({ params }: Props) {
  const { playerId } = await params;
  const member = TEAM_MEMBERS.find((m) => m.id === playerId);

  if (!member) {
    notFound();
  }

  return <PlayerProfile member={member} />;
}

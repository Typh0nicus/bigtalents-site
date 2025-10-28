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
    return { title: "Profile Not Found | Big Talents" };
  }

  return {
    title: `${member.ign} - ${member.name} | Big Talents`,
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

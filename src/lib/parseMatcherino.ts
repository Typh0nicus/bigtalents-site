/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BracketData, Placement } from "@/types/bracket";

export function parseMatcherino(json: any): BracketData {
  const payouts = json.payouts || [];
  const allTeams = json.teams || [];
  const placements: Placement[] = [];

  // Create team lookup with members
  const teamLookup = new Map();
  allTeams.forEach((team: any) => {
    const members = (team.members || []).map((m: any) => m.displayName || m.username || m.name).filter(Boolean);
    teamLookup.set(team.id, { name: team.name, members });
  });

  // Extract top 4 placements from payouts
  payouts.forEach((payout: any) => {
    const teams = payout.teams || [];
    teams.forEach((team: any) => {
      if (payout.placeLow <= 4) {
        const teamData = teamLookup.get(team.id);
        placements.push({
          place: payout.placeLow,
          teamName: team.name,
          teamId: team.id?.toString() || '',
          prize: payout.totalAmount ? `$${payout.totalAmount}` : undefined,
          members: teamData?.members || []
        });
      }
    });
  });

  // Sort by placement
  placements.sort((a, b) => a.place - b.place);

  return {
    matches: [],
    participants: [],
    placements,
    metadata: {
      tournamentId: json.id?.toString() || "",
      title: json.name || "",
      bracketType: "single",
      totalRounds: 1,
      isLive: json.status === "in_progress",
      lastUpdated: new Date().toISOString()
    }
  };
}

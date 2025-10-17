/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BracketData, Placement } from "@/types/bracket";

export function parseMatcherino(data: any): BracketData {
  const json = data.body || data;
  
  // Handle array response (brackets endpoint returns array)
  const brackets = Array.isArray(json) ? json : [json];
  const placements: Placement[] = [];
  const seen = new Set<string>();

  brackets.forEach((bracket: any) => {
    (bracket.entrants || []).forEach((entrant: any) => {
      const teamId = entrant.teamId?.toString();
      if (!teamId || seen.has(teamId)) return;
      
      const place = entrant.placement || entrant.countPlace || 0;
      if (place === 0) return; // Skip unplaced teams
      
      seen.add(teamId);

      // Get competing members from team.members
      const members = (entrant.team?.members || [])
        .filter((m: any) => m.inTeamFixture) // Only competing members
        .map((m: any) => m.displayName || m.userName)
        .filter(Boolean)
        .slice(0, 3);

      placements.push({
        place,
        teamName: entrant.name || entrant.team?.name || "Unknown Team",
        teamId,
        prize: undefined,
        members,
      });
    });
  });

  placements.sort((a, b) => a.place - b.place);

  return {
    matches: [],
    participants: [],
    placements,
    metadata: {
      tournamentId: brackets[0]?.bountyId?.toString() || "",
      title: brackets[0]?.title || "",
      bracketType: "single",
      totalRounds: 1,
      isLive: brackets[0]?.status === "in-progress",
      lastUpdated: new Date().toISOString(),
    },
  };
}

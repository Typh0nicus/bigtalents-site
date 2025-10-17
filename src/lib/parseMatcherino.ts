/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BracketData, Placement } from "@/types/bracket";

export function parseMatcherino(json: any): BracketData {
  console.log("=== parseMatcherino START ===");
  console.log("Full JSON received:", json);
  
  const payouts = json.payouts || [];
  const allTeams = json.teams || [];
  const placements: Placement[] = [];

  console.log("📊 Payouts count:", payouts.length);
  console.log("👥 Teams count:", allTeams.length);
  console.log("Raw payouts:", payouts);
  console.log("Raw teams:", allTeams);

  // Create team lookup with members
  const teamLookup = new Map();
  allTeams.forEach((team: any) => {
    const members = (team.members || []).map((m: any) => m.displayName || m.username || m.name).filter(Boolean);
    teamLookup.set(team.id, { name: team.name, members });
    console.log(`✅ Team mapped: ${team.name} (ID: ${team.id}) with ${members.length} members`);
  });

  // Extract top 4 placements from payouts
  payouts.forEach((payout: any, idx: number) => {
    console.log(`\n🏆 Processing payout #${idx + 1}:`, payout);
    
    const teams = payout.teams || [];
    console.log(`  - Teams in this payout: ${teams.length}`);
    
    teams.forEach((team: any) => {
      // Try multiple possible place fields
      const place = payout.placeLow || payout.place || payout.placeHigh || payout.placement;
      console.log(`  - Team: ${team.name}, Place: ${place}`);
      
      if (place && place <= 4) {
        const teamData = teamLookup.get(team.id);
        const placement: Placement = {
          place: place,
          teamName: team.name,
          teamId: team.id?.toString() || '',
          prize: payout.totalAmount ? `$${payout.totalAmount}` : undefined,
          members: teamData?.members || []
        };
        
        placements.push(placement);
        console.log(`    ✅ ADDED placement:`, placement);
      } else {
        console.log(`    ❌ SKIPPED (place: ${place})`);
      }
    });
  });

  // Sort by placement
  placements.sort((a, b) => a.place - b.place);

  console.log("\n🎯 FINAL PLACEMENTS:", placements);
  console.log(`Total placements extracted: ${placements.length}`);

  const result: BracketData = {
    matches: [],
    participants: allTeams.map((team: any) => ({
      id: team.id?.toString() || '',
      name: team.name || 'Unknown Team',
      members: teamLookup.get(team.id)?.members || [],
    })),
    placements,
    metadata: {
      tournamentId: json.id?.toString() || "",
      title: json.name || "",
      bracketType: "single",
      totalRounds: 1,
      isLive: json.status === "in_progress" || json.state === "in_progress",
      lastUpdated: new Date().toISOString()
    }
  };

  console.log("=== parseMatcherino END ===");
  console.log("Returning result:", result);
  
  return result;
}

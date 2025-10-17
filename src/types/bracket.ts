export interface BracketParticipant {
  id: string;
  name: string;
  seed?: number;
  avatar?: string;
  isWinner?: boolean;
  isAdvanced?: boolean;
  resultText?: string | number;
  status?: "PLAYED" | "NO_SHOW" | "WALK_OVER" | "PENDING";
}

export interface BracketMatch {
  id: string;
  name?: string;
  round: number;
  nextMatchId?: string;
  tournamentRoundText?: string;
  startTime?: string;
  state: "SCHEDULED" | "RUNNING" | "DONE" | "CANCELLED";
  participants: [BracketParticipant?, BracketParticipant?];
}

export interface BracketData {
  matches: BracketMatch[];
  participants: BracketParticipant[];
  metadata: {
    tournamentId: string;
    title: string;
    bracketType: "single" | "double" | "swiss";
    totalRounds: number;
    isLive: boolean;
    lastUpdated: string;
  };
  // Add placements for easy access
  placements?: Placement[];
}

export interface Placement {
  place: number;
  teamName: string;
  teamId: string;
  prize?: string;
}

export interface APIBracketResponse {
  success: boolean;
  data?: BracketData;
  error?: string;
  cached?: boolean;
  cacheTime?: number;
}
export interface Placement {
  place: number;
  teamName: string;
  teamId: string;
  prize?: string;
  members?: string[]; // Add team members
}

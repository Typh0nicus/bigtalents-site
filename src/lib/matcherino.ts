// Matcherino API client with comprehensive error handling and caching

export interface MatcherinoTournament {
  id: number;
  title: string;
  description: string;
  organization?: {
    id: number;
    name: string;
    slug: string;
  };
  game?: {
    id: number;
    name: string;
    slug: string;
  };
  start_date: string;
  end_date?: string;
  registration_end_date?: string;
  status: "upcoming" | "open" | "live" | "completed";
  prize_pool: {
    total: number;
    currency: string;
    funded: number;
    goal?: number;
  };
  participants: {
    count: number;
    max?: number;
    teams?: number;
  };
  urls: {
    registration?: string;
    bracket?: string;
    stream?: string;
    discord?: string;
  };
  image_url?: string;
  banner_url?: string;
  timezone: string;
  region?: string;
  format?: string;
  rules?: string;
  created_at: string;
  updated_at: string;
}

export interface MatcherinoError {
  message: string;
  status: number;
  code?: string;
}

type CacheRecord<T> = { data: T; timestamp: number; ttl: number };

class MatcherinoAPIClient {
  private readonly baseUrl = "https://api.matcherino.com/__api";
  private cache = new Map<string, CacheRecord<unknown>>();

  private getCacheKey(endpoint: string, params?: Record<string, unknown>): string {
    return `${endpoint}${params ? JSON.stringify(params) : ""}`;
  }

  private isValidCache(cacheItem: { timestamp: number; ttl: number }): boolean {
    return Date.now() - cacheItem.timestamp < cacheItem.ttl;
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    cacheTTL: number = 300000 // 5 minutes
  ): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cached = this.cache.get(cacheKey);
    if (cached && this.isValidCache(cached)) {
      return cached.data as T;
    }

    try {
      const url = new URL(`${this.baseUrl}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, String(value));
        });
      }

      const response = await fetch(url.toString(), {
        headers: {
          Accept: "application/json",
          "User-Agent": "BigTalents/1.0",
        },
        next: { revalidate: Math.floor(cacheTTL / 1000) },
      });

      if (!response.ok) {
        throw new Error(`Matcherino API error: ${response.status} ${response.statusText}`);
      }

      const data: T = (await response.json()) as T;

      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
        ttl: cacheTTL,
      });

      return data;
    } catch (error) {
      console.error(`Matcherino API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getTournament(id: number): Promise<MatcherinoTournament> {
    return this.request<MatcherinoTournament>(`/bounties/findById`, { id });
  }

  async getOrganizationTournaments(): Promise<MatcherinoTournament[]> {
    try {
      const bgtTournamentIds = [
        145019, 145309, 145395, 145402, 145404, 145690, 144717, 149584, 152394, 156361, 165244, 165521,
      ];

      const tournaments = await Promise.allSettled(bgtTournamentIds.map((id) => this.getTournament(id)));

      const fulfilled = tournaments.filter(
        (result): result is PromiseFulfilledResult<MatcherinoTournament> => result.status === "fulfilled"
      );

      return fulfilled
        .map((r) => r.value)
        .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());
    } catch (error) {
      console.error("Failed to fetch organization tournaments:", error);
      throw error;
    }
  }

  async getTournamentStats(tournamentIds: number[]): Promise<{
    totalPrizePool: number;
    totalParticipants: number;
    totalTournaments: number;
    averagePrizePool: number;
    recentGrowth: number;
  }> {
    try {
      const tournaments = await Promise.allSettled(tournamentIds.map((id) => this.getTournament(id)));

      // FIXED: Typo PromissFulfilledResult -> PromiseFulfilledResult
      const validTournaments = tournaments
        .filter(
          (result): result is PromiseFulfilledResult<MatcherinoTournament> => result.status === "fulfilled"
        )
        .map((r) => r.value);

      const totalPrizePool = validTournaments.reduce((sum, t) => sum + t.prize_pool.total, 0);
      const totalParticipants = validTournaments.reduce(
        (sum, t) => sum + (t.participants.teams || t.participants.count),
        0
      );
      const totalTournaments = validTournaments.length;
      const averagePrizePool = totalTournaments > 0 ? totalPrizePool / totalTournaments : 0;

      const now = new Date();
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());

      const recentTournaments = validTournaments.filter((t) => new Date(t.start_date) >= threeMonthsAgo);
      const previousTournaments = validTournaments.filter(
        (t) => new Date(t.start_date) >= sixMonthsAgo && new Date(t.start_date) < threeMonthsAgo
      );

      const recentGrowth =
        previousTournaments.length > 0
          ? ((recentTournaments.length - previousTournaments.length) / previousTournaments.length) * 100
          : 0;

      return {
        totalPrizePool,
        totalParticipants,
        totalTournaments,
        averagePrizePool,
        recentGrowth,
      };
    } catch (error) {
      console.error("Failed to calculate tournament stats:", error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export const matcherinoAPI = new MatcherinoAPIClient();

// Export fetchMatcherino function
export async function fetchMatcherino(matcherinoId: string | number): Promise<MatcherinoTournament | null> {
  try {
    const id = typeof matcherinoId === 'string' ? parseInt(matcherinoId, 10) : matcherinoId;
    return await matcherinoAPI.getTournament(id);
  } catch (error) {
    console.error(`Failed to fetch Matcherino tournament ${matcherinoId}:`, error);
    return null;
  }
}

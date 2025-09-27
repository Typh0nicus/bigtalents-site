// Creator Program type definitions based on BGT specifications
export type CreatorTier = 'academy' | 'partnered' | 'paid';
export type CreatorStatus = 'applicant' | 'pending' | 'approved' | 'active' | 'suspended' | 'rejected';
export type Platform = 'youtube' | 'twitch' | 'tiktok';

export interface CreatorThresholds {
  youtube?: {
    subscribers: number;
    views60d: number;
  };
  twitch?: {
    followers: number;
    avgCCV: number;
    hours60d: number;
  };
  tiktok?: {
    followers: number;
    views60d: number;
  };
}

export interface CreatorTierConfig {
  name: string;
  description: string;
  thresholds: CreatorThresholds;
  benefits: string[];
  requirements: string[];
  revenue?: {
    baseRate?: number;
    bonusRate?: number;
    conversionBonus?: number;
  };
}

export interface CreatorMetrics {
  platform: Platform;
  subscribers?: number;
  followers?: number;
  views60d: number;
  avgCCV?: number;
  hours60d?: number;
  engagementRate?: number;
  lastUpdated: string;
}

export interface Creator {
  id: string;
  name: string;
  email: string;
  discordId?: string;
  tier: CreatorTier;
  status: CreatorStatus;
  platforms: CreatorMetrics[];
  supercellCreatorCode?: string;
  isSupercellT2: boolean;
  applicationDate: string;
  approvalDate?: string;
  lastReviewDate?: string;
  nextReviewDate: string;
  profile: {
    avatar?: string;
    bio?: string;
    timezone?: string;
    preferredContact?: 'discord' | 'email';
  };
  deliverables: {
    requiredPerMonth: number;
    completedThisMonth: number;
    totalCompleted: number;
  };
  revenue: {
    totalEarned: number;
    last30Days: number;
    last60Days: number;
    pendingPayment: number;
  };
  utm: {
    discordJoin: string;
    eventSignup: string;
    eventsPage: string;
  };
  strikes: {
    count: number;
    reasons: string[];
    lastStrike?: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorApplication {
  id: string;
  name: string;
  email: string;
  discordId: string;
  supercellCreatorCode?: string;
  platforms: {
    platform: Platform;
    handle: string;
    url: string;
    metrics: Partial<CreatorMetrics>;
  }[];
  portfolio?: {
    description: string;
    samples: string[];
  };
  motivation: string;
  availability: string;
  preferredTier: CreatorTier;
  agreedToTerms: boolean;
  submittedAt: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

// Tier configurations based on your specifications
export const CREATOR_TIER_CONFIGS: Record<CreatorTier, CreatorTierConfig> = {
  academy: {
    name: 'BGT Academy',
    description: 'Entry-level tier for Supercell Official Creators (T2)',
    thresholds: {
      youtube: { subscribers: 5000, views60d: 0 },
      twitch: { followers: 3000, avgCCV: 0, hours60d: 0 },
      tiktok: { followers: 15000, views60d: 0 }
    },
    benefits: [
      'BGT Academy certification',
      'Access to private Discord channels',
      'Monthly creator meetups',
      'Brand asset access',
      'Priority tournament notifications'
    ],
    requirements: [
      'Verified Supercell Official Creator (T2)',
      '1 BGT deliverable per month',
      'Follow brand guidelines',
      'Maintain positive community standing'
    ]
  },
  partnered: {
    name: 'BGT Partnered Creator',
    description: 'Mid-tier partnership with revenue sharing',
    thresholds: {
      youtube: { subscribers: 35000, views60d: 400000 },
      twitch: { followers: 10000, avgCCV: 125, hours60d: 20 },
      tiktok: { followers: 100000, views60d: 2000000 }
    },
    benefits: [
      'Revenue sharing program',
      'Custom UTM tracking',
      'Exclusive tournament access',
      'Co-marketing opportunities',
      'Priority support',
      'Academy benefits included'
    ],
    requirements: [
      'Meet platform-specific thresholds',
      'Brawl Stars/BGT content focus',
      'Monthly metrics reporting',
      'Brand compliance'
    ],
    revenue: {
      baseRate: 0.05, // 5% base rate
      bonusRate: 0.02, // 2% performance bonus
      conversionBonus: 10 // $10 per conversion
    }
  },
  paid: {
    name: 'BGT Paid Creator',
    description: 'Premium tier with guaranteed compensation',
    thresholds: {
      youtube: { subscribers: 100000, views60d: 1500000 },
      twitch: { followers: 50000, avgCCV: 5000, hours60d: 25 },
      tiktok: { followers: 500000, views60d: 6000000 }
    },
    benefits: [
      'Guaranteed monthly compensation',
      'Premium revenue sharing',
      'Exclusive content collaboration',
      'Tournament co-hosting opportunities',
      'Direct CFO communication',
      'All lower tier benefits'
    ],
    requirements: [
      'Meet premium platform thresholds',
      'Minimum 2 deliverables per month',
      'Exclusive BGT content commitment',
      'Monthly strategy calls'
    ],
    revenue: {
      baseRate: 1000, // $1000 base monthly
      bonusRate: 0.08, // 8% performance bonus
      conversionBonus: 25 // $25 per conversion
    }
  }
};

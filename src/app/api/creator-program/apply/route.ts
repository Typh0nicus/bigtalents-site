import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_CREATOR_WEBHOOK_URL;

interface PlatformData {
  platform: 'youtube' | 'twitch' | 'tiktok';
  handle: string;
  url: string;
  subscribers?: number;
  followers?: number;
  views60d?: number;
  avgCCV?: number;
  hours60d?: number;
}

interface ApplicationData {
  fullName: string;
  email: string;
  discordUsername: string;
  tier: 'academy' | 'partner' | 'elite';
  supercellCreator: boolean;
  supercellCode?: string;
  platforms: PlatformData[];
  motivation: string;
  availability: string;
}

function createDiscordEmbed(data: ApplicationData) {
  const tierColors = {
    academy: 0x3B82F6,
    partner: 0xD4AF37,
    elite: 0xA855F7,
  };

  const tierEmojis = {
    academy: '🎓',
    partner: '⭐',
    elite: '👑',
  };

  const platformEmojis = {
    youtube: '📹',
    twitch: '🟣',
    tiktok: '🎵',
  };

  // Build platform fields from array
  const platformFields = data.platforms.map((platform) => {
    const stats: string[] = [];
    
    if (platform.subscribers) stats.push(`**${platform.subscribers.toLocaleString()}** subscribers`);
    if (platform.followers) stats.push(`**${platform.followers.toLocaleString()}** followers`);
    if (platform.views60d) stats.push(`**${platform.views60d.toLocaleString()}** views (60d)`);
    if (platform.avgCCV) stats.push(`**${platform.avgCCV.toLocaleString()}** avg CCV`);
    if (platform.hours60d) stats.push(`**${platform.hours60d}** hours streamed (60d)`);

    return {
      name: `${platformEmojis[platform.platform]} ${platform.platform.charAt(0).toUpperCase() + platform.platform.slice(1)}`,
      value: `[${platform.handle}](${platform.url})\n${stats.join('\n')}`,
      inline: false,
    };
  });

  return {
    embeds: [
      {
        title: `${tierEmojis[data.tier]} New Creator Application - ${data.tier.toUpperCase()} Tier`,
        color: tierColors[data.tier],
        fields: [
          {
            name: '👤 Applicant Info',
            value: `**Name:** ${data.fullName}\n**Email:** ${data.email}\n**Discord:** ${data.discordUsername}`,
            inline: false,
          },
          {
            name: '🏆 Supercell Creator',
            value: data.supercellCreator ? `✅ Yes - Code: \`${data.supercellCode}\`` : '❌ No',
            inline: true,
          },
          {
            name: '📊 Platforms',
            value: `${data.platforms.length} platform(s) connected`,
            inline: true,
          },
          ...platformFields,
          {
            name: '💭 Motivation',
            value: data.motivation.slice(0, 1024),
            inline: false,
          },
          {
            name: '📅 Availability',
            value: data.availability.slice(0, 1024),
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: 'BGT Creator Program Application',
        },
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const data: ApplicationData = await request.json();
    
    console.log('Received application data:', data);

    // Validation
    if (!data.fullName || !data.email || !data.discordUsername || !data.tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!data.platforms || data.platforms.length === 0) {
      return NextResponse.json(
        { error: 'At least one platform is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const webhookPayload = createDiscordEmbed(data);
    
    console.log('Sending to Discord:', JSON.stringify(webhookPayload, null, 2));
    
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Discord webhook failed:', response.status, errorText);
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      );
    }

    console.log('Application submitted successfully!');

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

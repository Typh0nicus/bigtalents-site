// src/data/staffRoles.ts

export type StaffRoleId =
  | "moderator"
  | "event_host"
  | "creator_relations"
  | "talent_scout"
  | "graphic_designer"
  | "partnerships_assistant"
  | "operations_assistant";

export type StaffCategory =
  | "Community"
  | "Creators & Talent"
  | "Content & Design"
  | "Partnerships & Operations";

export type QuestionType =
  | "short_text"
  | "long_text"
  | "image_scenario";

export interface QuestionConfig {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
  helperText?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface StaffRoleConfig {
  id: StaffRoleId;
  title: string;
  category: StaffCategory;
  iconEmoji: string;
  shortDescription: string;
  longDescription: string;
  open: boolean;
  questions: QuestionConfig[];
}

export const STAFF_ROLES: Record<StaffRoleId, StaffRoleConfig> = {
  moderator: {
    id: "moderator",
    title: "Moderator",
    category: "Community",
    iconEmoji: "🛡️",
    shortDescription:
      "Keep the BGT community safe, fair, and on-vibe across Discord and social spaces.",
    longDescription:
      "Moderators enforce rules, de-escalate conflicts, and support members day-to-day so the BGT community stays welcoming, readable, and fun.",
    open: true,
    questions: [
      {
        id: "mod_experience",
        label: "Do you have experience moderating Discord communities?",
        type: "long_text",
        required: true,
        helperText: "If yes, describe your moderation experience (communities, roles, responsibilities). If no, explain why you'd be a good fit anyway.",
      },
      {
        id: "mod_gaming_experience",
        label: "Have you moderated or supported any gaming/esports communities, tournaments, or events?",
        type: "long_text",
        required: true,
        helperText: "Describe any relevant experience or write 'No experience' and explain your interest.",
      },
      {
        id: "mod_bot_knowledge",
        label: "Are you familiar with Discord moderation bots (e.g., Dyno, MEE6, Carl-bot)? Which have you used?",
        type: "short_text",
        required: false,
        helperText: "List any bots you've worked with or write 'None yet, willing to learn'.",
      },
      {
        id: "mod_qualities",
        label: "What do you think are the 3 most important qualities of a great moderator?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_why_bgt",
        label: "Why did you choose to apply to Big Talents specifically?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_balance_rules",
        label: "How would you balance enforcing rules while maintaining a friendly atmosphere?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_unsure_situation",
        label: "What would you do if you're unsure how to handle a situation as a moderator?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_rules_knowledge",
        label: "Have you read our server rules and moderation guidelines? Briefly summarize our approach.",
        type: "long_text",
        required: true,
        helperText: "Show us you understand BGT's values and moderation philosophy.",
      },
      {
        id: "scenario_1",
        label: "Case 1: Look at this chat situation. What actions would you take, and why?",
        type: "image_scenario",
        required: true,
        imageUrl: "/images/staff/scenario1-mod.png",
        imageAlt: "Chat scenario showing spam or disruptive behavior",
        helperText: "Walk through your reasoning: warnings, timeouts/bans, DMs, and any follow-up with staff.",
      },
      {
        id: "scenario_2",
        label: "Case 2: Review this interaction. How would you handle this situation?",
        type: "image_scenario",
        required: true,
        imageUrl: "/images/staff/scenario2-mod.png",
        imageAlt: "Chat scenario showing conflict between members",
        helperText: "Explain your step-by-step approach and what you'd communicate to those involved.",
      },
      {
        id: "scenario_3",
        label: "Case 3: What would be your response to this situation?",
        type: "image_scenario",
        required: true,
        imageUrl: "/images/staff/scenario3-mod.png",
        imageAlt: "Chat scenario requiring moderation judgment",
        helperText: "Detail your actions, reasoning, and any escalation if needed.",
      },
      {
        id: "scenario_4",
        label: "Case 4: How would you moderate this case?",
        type: "image_scenario",
        required: true,
        imageUrl: "/images/staff/scenario4-mod.png",
        imageAlt: "Chat scenario testing moderation approach",
        helperText: "Explain your complete response including communication and follow-up.",
      },
      {
        id: "scenario_ping_spam",
        label: "Case 5: A member is repeatedly pinging other members or mass-tagging staff in non-urgent situations. How do you handle this?",
        type: "long_text",
        required: true,
      },
      {
        id: "scenario_staff_rule_break",
        label: "Case 6: You notice another staff member breaking a server rule. What do you do?",
        type: "long_text",
        required: true,
      },
      {
        id: "scenario_creator_scam",
        label: "Case 7: A BGT creator is accused of scamming in DMs. The victim provides screenshots. What's your action?",
        type: "long_text",
        required: true,
      },
      {
        id: "scenario_alt_evasion",
        label: "Case 8: Multiple members report someone using alt accounts to evade a mute/ban. How do you investigate and respond?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_bgt_values",
        label: "What do you understand to be Big Talents' main values and focus?",
        type: "long_text",
        required: true,
      },
      {
        id: "mod_improvement_idea",
        label: "What's one thing you'd improve about BGT's community or moderation if you could?",
        type: "long_text",
        required: false,
        helperText: "Be honest, we value constructive feedback.",
      },
      {
        id: "mod_additional",
        label: "Is there anything else you'd like us to know about you?",
        type: "long_text",
        required: false,
      },
    ],
  },

  event_host: {
    id: "event_host",
    title: "Event Host",
    category: "Community",
    iconEmoji: "🎤",
    shortDescription:
      "Run game nights, watch parties, and community events that keep BGT feeling alive.",
    longDescription:
      "Event Hosts design and run non-tournament community events for BGT, from game nights and watch parties to challenges and Q&As, making sure everything runs smoothly and feels fun.",
    open: true,
    questions: [
      {
        id: "event_ideas",
        label: "What kind of community events would you like to run for BGT?",
        type: "long_text",
        required: true,
        helperText: "Share 2-3 ideas with rough formats (e.g. game mode, duration, prizes, number of participants).",
      },
      {
        id: "event_hosting_experience",
        label: "Do you have any past experience hosting events, streams, or leading groups?",
        type: "long_text",
        required: false,
      },
      {
        id: "event_logistics",
        label: "How would you handle sign-ups, no-shows, and basic rule enforcement during an event?",
        type: "long_text",
        required: true,
      },
    ],
  },

  creator_relations: {
    id: "creator_relations",
    title: "Creator Relations",
    category: "Creators & Talent",
    iconEmoji: "🤝",
    shortDescription:
      "Support BGT creators day-to-day and make sure they feel heard, informed, and valued.",
    longDescription:
      "Creator Relations is the main contact point for BGT creators: onboarding them into the program, answering questions, collecting feedback, and making sure they feel supported rather than ignored.",
    open: true,
    questions: [
      {
        id: "cr_relations_experience",
        label: "Tell us about any experience you have working with creators, communities, or clients.",
        type: "long_text",
        required: true,
      },
      {
        id: "cr_communication_style",
        label: "A creator pings you frustrated about not being featured recently. How do you respond?",
        type: "long_text",
        required: true,
      },
      {
        id: "cr_organization",
        label: "How would you keep track of creator questions, feedback, and follow-ups so nothing is forgotten?",
        type: "long_text",
        required: true,
      },
    ],
  },

  talent_scout: {
    id: "talent_scout",
    title: "Talent Scout",
    category: "Creators & Talent",
    iconEmoji: "🔍",
    shortDescription:
      "Find new creators who fit BGT's vibe and have real potential to grow.",
    longDescription:
      "Talent Scouts research new creators across platforms, evaluate their content and behaviour, and recommend good fits for BGT's creator ecosystem while avoiding obvious drama risks.",
    open: true,
    questions: [
      {
        id: "ts_platforms",
        label: "Where would you primarily look for potential BGT creators, and why?",
        type: "long_text",
        required: true,
      },
      {
        id: "ts_evaluation",
        label: "When you evaluate a creator, what are the main things you look at beyond follower count?",
        type: "long_text",
        required: true,
      },
      {
        id: "ts_example_creators",
        label: "Share 1-2 example creators (links) you think would fit BGT and explain why.",
        type: "long_text",
        required: false,
        helperText: "They don't have to be huge; we're interested in your reasoning.",
      },
      {
        id: "ts_red_flags",
        label: "What are some red flags that would stop you from recommending a creator to BGT?",
        type: "long_text",
        required: true,
      },
    ],
  },

  graphic_designer: {
    id: "graphic_designer",
    title: "Graphic Designer",
    category: "Content & Design",
    iconEmoji: "🎨",
    shortDescription:
      "Create graphics that match and strengthen BGT's premium branding.",
    longDescription:
      "Graphic Designers produce social graphics, thumbnails, headers, and other assets that stay consistent with BGT's visual identity instead of random styles, working closely with the content and partnerships teams.",
    open: true,
    questions: [
      {
        id: "gd_tools",
        label: "Which design tools do you use regularly? (e.g. Photoshop, Illustrator, Figma, etc.)",
        type: "short_text",
        required: true,
      },
      {
        id: "gd_portfolio",
        label: "Share links to your portfolio or examples of your work (images, socials, drive folders, etc.).",
        type: "long_text",
        required: true,
      },
      {
        id: "gd_brand_fit",
        label: "How would you describe BGT's visual style, and how would you keep your work consistent with it?",
        type: "long_text",
        required: true,
      },
      {
        id: "gd_turnaround",
        label: "Roughly how quickly can you turn around common assets (e.g. match graphic, announcement, thumbnail)?",
        type: "short_text",
        required: false,
      },
    ],
  },

  partnerships_assistant: {
    id: "partnerships_assistant",
    title: "Partnerships Assistant",
    category: "Partnerships & Operations",
    iconEmoji: "📨",
    shortDescription:
      "Support outreach to brands, track conversations, and help prepare basic partner info.",
    longDescription:
      "Partnerships Assistants help research potential partners, support outreach based on BGT's guidelines, keep a simple CRM of conversations, and assemble light info packs about BGT when needed.",
    open: true,
    questions: [
      {
        id: "pa_experience",
        label: "Do you have any experience with outreach, sales, or partnership work? Tell us about it.",
        type: "long_text",
        required: false,
      },
      {
        id: "pa_research",
        label: "Name a few brands or companies you think would be a good fit for BGT and explain why.",
        type: "long_text",
        required: true,
      },
      {
        id: "pa_comfort_contact",
        label: "How comfortable are you with contacting brands or creators on behalf of BGT?",
        type: "long_text",
        required: true,
      },
      {
        id: "pa_organization",
        label: "How would you keep track of who has been contacted, when, and what the response was?",
        type: "long_text",
        required: true,
      },
    ],
  },

  operations_assistant: {
    id: "operations_assistant",
    title: "Operations Assistant",
    category: "Partnerships & Operations",
    iconEmoji: "📋",
    shortDescription:
      "Help keep BGT's internal sheets, tasks, and docs organized so the team can move faster.",
    longDescription:
      "Operations Assistants look after internal sheets, simple databases, task tracking, and documentation so BGT's staff and creators can find what they need and hit deadlines with fewer mistakes.",
    open: true,
    questions: [
      {
        id: "ops_tools",
        label: "Which tools do you have experience with for organization and tracking? (e.g. Google Sheets, Notion, Trello).",
        type: "short_text",
        required: true,
      },
      {
        id: "ops_experience",
        label: "Tell us about a time you helped keep a project, team, or event organized.",
        type: "long_text",
        required: true,
      },
      {
        id: "ops_prioritization",
        label: "If several people ask for help at once, how do you decide what to do first?",
        type: "long_text",
        required: true,
      },
      {
        id: "ops_hours",
        label: "Roughly how many hours per week can you dedicate to operations work for BGT?",
        type: "short_text",
        required: true,
      },
    ],
  },
};

export const STAFF_ROLE_LIST: StaffRoleConfig[] = Object.values(STAFF_ROLES);

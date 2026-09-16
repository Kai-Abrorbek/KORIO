export type TierKey =
  | "bronze"
  | "silver"
  | "gold"
  | "sapphire"
  | "ruby"
  | "emerald"
  | "amethyst"
  | "pearl"
  | "obsidian"
  | "diamond";

export interface TierMeta {
  key: TierKey;
  color: string;
  colorDark: string;
  colorLight: string;
  facets: number;
  rays: number;
  glow: boolean;
  sparkle: boolean;
}

export interface AvatarConfig {
  version?: number;
  skinTone?: string;
  bodyShape?: string;
  expression?: string;
  eyeColor?: string;
  hairstyle?: string;
  hairColor?: string;
  eyewear?: string;
  facialHair?: string;
  headwear?: string;
  outfit?: string;
  background?: string;
}

export interface LeagueMember {
  id: string;
  nickname: string;
  profileImage?: string;
  avatar?: AvatarConfig;
  isBot?: boolean;
  xp: number;
  rank: number;
  isMe: boolean;
  flag?: string;
  streak?: number;
  online?: boolean;
}

export interface LeagueData {
  previousRank: number;
  tier: string;
  tierIndex: number;
  weekKey: string;
  endsAt: string;
  promoteCount: number;
  demoteCount: number;
  roomSize: number;
  boostXp: number;
  keepXp: number;
  myWeeklyXp: number;
  daysLeft?: number;
  members: LeagueMember[];
}

export interface LeagueResult {
  weekKey: string;
  finalRank: number;
  fromTier: string;
  toTier: string;
  change: "promote" | "demote" | "stay";
  gems: number;
  reason?: "rank" | "xp" | null;
  weeklyXp?: number;
  requiredXp?: number;
}

export interface ChallengeInfo {
  tier: string;
  id: string;
  maxXp: number;
  energyCost: number;
  playsToday: number;
  playsLeftToday: number;
  cooldownSeconds: number;
}

export const TIERS: TierMeta[] = [
  { key: "bronze", color: "#CD7F32", colorDark: "#A05F1F", colorLight: "#E8A45C", facets: 3, rays: 0, glow: false, sparkle: false },
  { key: "silver", color: "#B0BEC5", colorDark: "#8A99A3", colorLight: "#DCE3E7", facets: 4, rays: 0, glow: false, sparkle: false },
  { key: "gold", color: "#FFC107", colorDark: "#E0A200", colorLight: "#FFE082", facets: 5, rays: 4, glow: true, sparkle: false },
  { key: "sapphire", color: "#42A5F5", colorDark: "#1E88E5", colorLight: "#90CAF9", facets: 5, rays: 5, glow: true, sparkle: false },
  { key: "ruby", color: "#E53935", colorDark: "#C62828", colorLight: "#EF9A9A", facets: 6, rays: 6, glow: true, sparkle: true },
  { key: "emerald", color: "#26A69A", colorDark: "#00897B", colorLight: "#80CBC4", facets: 6, rays: 7, glow: true, sparkle: true },
  { key: "amethyst", color: "#8E5FF5", colorDark: "#6B3FD4", colorLight: "#C4A5FF", facets: 7, rays: 8, glow: true, sparkle: true },
  { key: "pearl", color: "#F06292", colorDark: "#D81B60", colorLight: "#F8BBD0", facets: 7, rays: 9, glow: true, sparkle: true },
  { key: "obsidian", color: "#37474F", colorDark: "#1C262B", colorLight: "#78909C", facets: 8, rays: 10, glow: true, sparkle: true },
  { key: "diamond", color: "#00E5FF", colorDark: "#00B8D4", colorLight: "#B2EBF2", facets: 9, rays: 12, glow: true, sparkle: true },
];

export const LOCKED_TIER = {
  color: "#CFD5DC",
  colorDark: "#AEB6BF",
  colorLight: "#E8ECEF",
};

export const TIER_LABELS: Record<TierKey, string> = {
  bronze: "Bronza",
  silver: "Kumush",
  gold: "Oltin",
  sapphire: "Sapfir",
  ruby: "Yoqut",
  emerald: "Zumrad",
  amethyst: "Ametist",
  pearl: "Marvarid",
  obsidian: "Obsidian",
  diamond: "Olmos",
};

export const CHALLENGE_META: Record<string, { icon: "albums" | "flash" | "swap-horizontal" | "volume-high" | "grid" | "rainy" | "link"; label: string; route: string }> = {
  match: { route: "/match-game", icon: "grid", label: "Juftlikni topish" },
  memory: { route: "/memory-game", icon: "albums", label: "Xotira jangi" },
  wordRain: { route: "/word-rain", icon: "rainy", label: "So'z yomg'iri" },
  swipeJudge: { route: "/swipe-judge", icon: "swap-horizontal", label: "To'g'ri yoki noto'g'ri" },
  particleRush: { route: "/particle-rush", icon: "flash", label: "Chaqmoq yugurish" },
  echoChain: { route: "/echo-chain", icon: "volume-high", label: "Tinglab takrorlash" },
  wordChain: { route: "/word-chain", icon: "link", label: "So'z zanjiri jangi" },
};

export function getTier(key: string): TierMeta {
  return TIERS.find((tier) => tier.key === key) ?? TIERS[0]!;
}

export function getTierIndex(key: string): number {
  return Math.max(0, TIERS.findIndex((tier) => tier.key === key));
}

export function tierLabel(key: string): string {
  return TIER_LABELS[key as TierKey] ?? TIER_LABELS.bronze;
}

export function challengeMetaOf(id?: string) {
  return (id && CHALLENGE_META[id]) || CHALLENGE_META.match!;
}

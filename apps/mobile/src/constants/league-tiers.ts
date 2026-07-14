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
  color: string; // 메인 색 (버튼/배경 동기화용)
  colorDark: string;
  colorLight: string;
  facets: number; // 크리스탈 면 개수 (올라갈수록 화려)
  rays: number; // 뒤 광선 개수
  glow: boolean; // 발광 여부
  sparkle: boolean; // 반짝임 파티클
}

export const TIERS: TierMeta[] = [
  {
    key: "bronze",
    color: "#CD7F32",
    colorDark: "#A05F1F",
    colorLight: "#E8A45C",
    facets: 3,
    rays: 0,
    glow: false,
    sparkle: false,
  },
  {
    key: "silver",
    color: "#B0BEC5",
    colorDark: "#8A99A3",
    colorLight: "#DCE3E7",
    facets: 4,
    rays: 0,
    glow: false,
    sparkle: false,
  },
  {
    key: "gold",
    color: "#FFC107",
    colorDark: "#E0A200",
    colorLight: "#FFE082",
    facets: 5,
    rays: 4,
    glow: true,
    sparkle: false,
  },
  {
    key: "sapphire",
    color: "#42A5F5",
    colorDark: "#1E88E5",
    colorLight: "#90CAF9",
    facets: 5,
    rays: 5,
    glow: true,
    sparkle: false,
  },
  {
    key: "ruby",
    color: "#E53935",
    colorDark: "#C62828",
    colorLight: "#EF9A9A",
    facets: 6,
    rays: 6,
    glow: true,
    sparkle: true,
  },
  {
    key: "emerald",
    color: "#26A69A",
    colorDark: "#00897B",
    colorLight: "#80CBC4",
    facets: 6,
    rays: 7,
    glow: true,
    sparkle: true,
  },
  {
    key: "amethyst",
    color: "#8E5FF5",
    colorDark: "#6B3FD4",
    colorLight: "#C4A5FF",
    facets: 7,
    rays: 8,
    glow: true,
    sparkle: true,
  },
  {
    key: "pearl",
    color: "#F06292",
    colorDark: "#D81B60",
    colorLight: "#F8BBD0",
    facets: 7,
    rays: 9,
    glow: true,
    sparkle: true,
  },
  {
    key: "obsidian",
    color: "#37474F",
    colorDark: "#1C262B",
    colorLight: "#78909C",
    facets: 8,
    rays: 10,
    glow: true,
    sparkle: true,
  },
  {
    key: "diamond",
    color: "#00E5FF",
    colorDark: "#00B8D4",
    colorLight: "#B2EBF2",
    facets: 9,
    rays: 12,
    glow: true,
    sparkle: true,
  },
];

export const getTier = (key: string): TierMeta =>
  TIERS.find((t) => t.key === key) ?? TIERS[0];
export const getTierIndex = (key: string): number =>
  Math.max(
    0,
    TIERS.findIndex((t) => t.key === key),
  );

const LOCKED = {
  color: "#CFD5DC",
  colorDark: "#AEB6BF",
  colorLight: "#E8ECEF",
};
export const LOCKED_TIER = LOCKED;

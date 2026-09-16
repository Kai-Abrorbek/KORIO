export type ChainPlayer = "user" | "ai";
export type GamePhase = "idle" | "user-turn" | "ai-thinking" | "ended";
export type EndReason = "ai-surrender" | "no-hearts";

export interface ChainTurn {
  id: string;
  player: ChainPlayer;
  word: string;
  roman: string;
}

export interface ChainWordDto {
  ko: string;
  uz: string;
  en: string;
  ru: string;
  emoji?: string;
}

export interface ChainTurnResponse {
  accepted: boolean;
  reason?: string;
  word?: ChainWordDto;
  reply?: ChainWordDto | null;
}

export interface ChainHintsResponse {
  words: ChainWordDto[];
}

const STARTERS = [
  { word: "가족", roman: "ga-jok" },
  { word: "가방", roman: "ga-bang" },
  { word: "가수", roman: "ga-su" },
  { word: "가게", roman: "ga-ge" },
  { word: "가위", roman: "ga-wi" },
] as const;

export function pickAiStarter() {
  return STARTERS[Math.floor(Math.random() * STARTERS.length)]!;
}

export function lastSyllable(word: string) {
  return word[word.length - 1] ?? "";
}

export function calcTurnScore(word: string, combo: number) {
  const base = word.length * 10;
  return base + Math.floor(base * (combo * 0.2));
}

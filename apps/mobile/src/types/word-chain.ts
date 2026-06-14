export type ChainPlayer = "user" | "ai";

export type GamePhase =
  | "idle"
  | "playing"
  | "user-turn"
  | "ai-thinking"
  | "ended";

export type EndReason =
  | "ai-surrender" // AI 못 찾음 → 유저 승리
  | "no-hearts" // 하트 0 → 유저 패배
  | "exit";

export interface ChainWord {
  word: string;
  roman: string;
}

export interface ChainTurn {
  id: string;
  player: ChainPlayer;
  word: string;
  roman: string;
  isValid: boolean;
}

export interface ChainGameState {
  phase: GamePhase;
  turns: ChainTurn[];
  usedWords: Set<string>;
  hearts: number;
  score: number;
  combo: number;
  bestCombo: number;
  timeLeft: number;
  hintsLeft: number;
  endReason: EndReason | null;
}

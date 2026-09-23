export interface EnergyState {
  energy: number;
  etaHours: number;
  etaMinutes: number;
  freeRemaining: number;
  gems: number;
  isSuper: boolean;
  maxEnergy: number;
  refillCost: number;
}

export interface GemPass {
  affordable: boolean;
  days: number;
  gems: number;
  id: string;
  overStack: boolean;
  perDay: number;
}

export interface GemPassList {
  gems: number;
  maxStackDays: number;
  passes: GemPass[];
  premiumUntil: string | null;
  stackedDays: number;
}

export interface GemPassRedeemed {
  days: number;
  gems: number;
  gemsSpent: number;
  passId: string;
  premiumUntil: string;
}

export interface ScoreMilestone {
  score: number;
  section: number;
  startScore?: number;
  status?: "completed" | "current" | "locked";
  title?: string;
  units: number;
}

export interface ScoreData {
  completedUnits: number;
  milestones: ScoreMilestone[];
  nextScore: number;
  progress: number;
  score: number;
}

export interface PublicUser {
  coursePrimaryFlag?: string;
  nickname?: string;
  totalXP?: number;
}

export interface StreakDay {
  date: string;
  future: boolean;
  isToday: boolean;
  studied: boolean;
}

export const SCORE_ICONS = [
  "star",
  "hand-left",
  "restaurant",
  "location",
  "book",
  "tv",
  "briefcase",
  "trophy",
] as const;

export const WEAK_AREA_LABELS: Record<string, string> = {
  conversation: "Suhbat",
  expression: "Iboralar",
  grammar: "Grammatika",
  listening: "Tinglash",
  vocabulary: "Leksika",
};

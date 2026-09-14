import api from "./api";
import type { AvatarConfig } from "@/types/avatar";

// 백엔드 /league/me 응답 shape 그대로 (교체는 아래 return 한 줄만)
export interface LeagueMember {
  id: string;
  nickname: string;
  profileImage?: string;
  avatar?: AvatarConfig;
  isBot?: boolean;
  xp: number;
  rank: number;
  isMe: boolean;
  flag?: string; // mock 확장 (백엔드엔 아직 없음)
  streak?: number; // mock 확장
  online?: boolean; // mock 확장
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
  boostXp: number; // +210 버튼용 (mock 확장)
  members: LeagueMember[];
}

export interface LeagueResult {
  weekKey: string;
  finalRank: number;
  fromTier: string;
  toTier: string;
  change: "promote" | "demote" | "stay";
  gems: number;
}

/** 서버가 정하는 이번 주 챌린지 (종목·비용·남은 횟수) */
export interface ChallengeInfo {
  tier: string;
  /** constants/league-challenge.ts 의 CHALLENGE_META 키 */
  id: string;
  maxXp: number;
  energyCost: number;
  playsToday: number;
  playsLeftToday: number;
  cooldownSeconds: number;
}

export interface ChallengeResult {
  tier: string;
  id: string;
  score: number;
  xpEarned: number;
  maxXp: number;
  playsToday: number;
  playsLeftToday: number;
  /** false 면 쿨다운·하루 한도에 걸려 XP 가 안 나갔다 */
  counted: boolean;
}

export const LeagueService = {
  /** 내 리그의 종목. 앱은 이걸로 어떤 게임을 열지만 정한다 (XP 계산은 서버) */
  getChallenge: (): Promise<ChallengeInfo> => api.get("/league/challenge"),

  /** 시작 — 서버가 에너지를 깎는다 */
  startChallenge: (): Promise<{
    id: string;
    energyCost: number;
    energy: unknown;
  }> => api.post("/league/challenge/start", {}),

  /** 완료 — 점수를 보내면 서버가 상한·쿨다운을 걸어 XP 를 정한다 */
  completeChallenge: (score: number): Promise<ChallengeResult> =>
    api.post("/league/challenge/complete", { score }),

  getMyLeague: (): Promise<LeagueData> => api.get(`/league/me`),

  getTiers: (): Promise<any> => api.get(`/league/tiers`),

  snapshotRank: (): Promise<{ previousRank: number }> =>
    api.post(`/league/snapshot-rank`, {}),

  ackRank: (rank: number): Promise<{ rank: number }> =>
    api.post(`/league/ack-rank`, { rank }),

  getLeagueResult: (): Promise<LeagueResult | null> =>
    api.get(`/league/result`),

  ackLeagueResult: (): Promise<any> => api.post(`/league/result/ack`, {}),
};

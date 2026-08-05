import api from "./api";

// 백엔드 /league/me 응답 shape 그대로 (교체는 아래 return 한 줄만)
export interface LeagueMember {
  id: string;
  nickname: string;
  profileImage?: string;
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

export const LeagueService = {
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

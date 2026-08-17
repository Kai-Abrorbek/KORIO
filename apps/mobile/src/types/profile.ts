import { TierKey } from "@/constants/league-tiers";

// 서버 UserLeague enum(10종)과 1:1. 예전엔 platinum 같은 없는 티어가 섞여 있었다.
export type League = TierKey;

export interface FriendStreak {
  id: string;
  name: string;
  avatarUri?: string;
  streak: number;
}

export interface UserProfile {
  name: string;
  username: string;
  joinedYear: number;
  isSuper: boolean;
  coursePrimaryFlag: string; // "🇺🇸"
  courseExtraCount: number;
  following: number;
  followers: number;
  streak: number;
  languageLevel: number;
  league: League;
  totalXp: number;
  friendStreaks: FriendStreak[];
}

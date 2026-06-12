import { UserProfile } from "@/types/profile";

export const MOCK_PROFILE: UserProfile = {
  name: "Abrorbek Anvarbekov",
  username: "ABRORBEKAN6",
  joinedYear: 2026,
  isSuper: true,
  coursePrimaryFlag: "🇺🇸",
  courseExtraCount: 2,
  following: 13,
  followers: 1,
  streak: 3,
  languageLevel: 2,
  league: "silver",
  totalXp: 344,
  friendStreaks: [], // 비어있으면 placeholder + 가 5개
};

export const LEAGUE_COLORS: Record<string, string> = {
  bronze: "#CD7F32",
  silver: "#A8A8B0",
  gold: "#F4B860",
  platinum: "#9FD8F2",
  diamond: "#9CA9F5",
};

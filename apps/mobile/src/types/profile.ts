export type League = "bronze" | "silver" | "gold" | "platinum" | "diamond";

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

import type { KorioTelegramUser } from "../../auth/api/telegram-auth";
import type { AvatarConfig } from "../../../shared/model/avatar";

export interface FriendStreak {
  id: string;
  name: string;
  streak: number;
}

export interface UserMe extends KorioTelegramUser {
  email: string;
  nickname: string;
  username: string;
  profileImage: string;
  avatar: AvatarConfig;
  bio: string;
  provider: string;
  createdAt: string;
  joinedYear: number;
  followingCount: number;
  followersCount: number;
  coursePrimaryFlag: string;
  courseExtraCount: number;
  friendStreaks: FriendStreak[];
  languageLevel: number;
  league: string;
  totalXP: number;
  streak: number;
  gems: number;
}

export const TIER_COLORS: Record<string, string> = {
  bronze: "#CD7F32", silver: "#B0BEC5", gold: "#FFC107",
  sapphire: "#42A5F5", ruby: "#E53935", emerald: "#26A69A",
  amethyst: "#8E5FF5", pearl: "#F06292", obsidian: "#37474F",
  diamond: "#00E5FF",
};

export const TIER_LABELS: Record<string, string> = {
  bronze: "Bronza", silver: "Kumush", gold: "Oltin", sapphire: "Sapfir",
  ruby: "Yoqut", emerald: "Zumrad", amethyst: "Ametist", pearl: "Marvarid",
  obsidian: "Obsidian", diamond: "Olmos",
};

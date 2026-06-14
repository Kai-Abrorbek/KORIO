import { Ionicons } from "@expo/vector-icons";
import { League } from "@/types/profile";

export interface WeeklyXpPoint {
  label: string; // "금" 등
  themXp: number;
  meXp: number;
}

export interface Achievement {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  bgColor: string;
  value: number;
  nameKey: string;
}

export interface FriendProfile {
  id: string;
  name: string;
  username: string;
  joinedYear: number;
  isSuper: boolean;
  isFollowing: boolean;
  coursePrimaryFlag: string;
  courseExtraCount: number;
  following: number;
  followers: number;
  streak: number;
  languageLevel: number;
  league: League;
  totalXp: number;
  themDisplayName: string; // 차트 범례에 쓸 친구 이름
  themTotalWeekXp: number; // 4693
  meTotalWeekXp: number; // 222
  weeklyXp: WeeklyXpPoint[];
  achievements: Achievement[];
}

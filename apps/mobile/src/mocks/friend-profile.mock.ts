import { FriendProfile } from "@/types/friend-profile";
import { League } from "@/types/profile";

export const LEAGUE_HERO_COLORS: Record<League, string> = {
  bronze: "#D4A574",
  silver: "#C9C9D2",
  gold: "#F4D571",
  platinum: "#A8D8F0",
  diamond: "#7BD0F7",
};

export const MOCK_FRIEND_PROFILE: FriendProfile = {
  id: "friend-1",
  name: "hanjo kim",
  username: "TESUNGKIM",
  joinedYear: 2025,
  isSuper: true,
  isFollowing: true,
  coursePrimaryFlag: "🇺🇸",
  courseExtraCount: 2,
  following: 16,
  followers: 16,
  streak: 159,
  languageLevel: 10,
  league: "diamond",
  totalXp: 264397,
  themDisplayName: "hanjo kim",
  themTotalWeekXp: 4693,
  meTotalWeekXp: 222,
  weeklyXp: [
    { label: "금", themXp: 450, meXp: 0 },
    { label: "토", themXp: 200, meXp: 0 },
    { label: "일", themXp: 1200, meXp: 100 },
    { label: "월", themXp: 1000, meXp: 0 },
    { label: "화", themXp: 350, meXp: 20 },
    { label: "수", themXp: 1515, meXp: 0 },
    { label: "목", themXp: 50, meXp: 0 },
  ],
  achievements: [
    {
      id: "ach-1",
      iconName: "compass",
      bgColor: "#A0826D",
      value: 500,
      nameKey: "friendProfile.achievements.explorer",
    },
    {
      id: "ach-2",
      iconName: "fitness",
      bgColor: "#E94B4B",
      value: 20,
      nameKey: "friendProfile.achievements.champion",
    },
    {
      id: "ach-3",
      iconName: "school",
      bgColor: "#F4B860",
      value: 75,
      nameKey: "friendProfile.achievements.scholar",
    },
    {
      id: "ach-4",
      iconName: "color-palette",
      bgColor: "#FF7A00",
      value: 1000,
      nameKey: "friendProfile.achievements.master",
    },
    {
      id: "ach-5",
      iconName: "flame",
      bgColor: "#776ee2",
      value: 100,
      nameKey: "friendProfile.achievements.streakKing",
    },
  ],
};

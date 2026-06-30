import { UserProfile } from "@/types/profile";
import api from "./api";

export interface UserMe {
  id: string;
  email: string;
  nickname: string;
  username: string;
  profileImage: string;
  bio: string;
  country: string;
  level: string;
  totalXP: number;
  streak: number;
  longestStreak: number;
  league: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  isSuper: boolean;
  streakFreeze: number;
  gems: number;
  energy: number;
  followingCount: number;
  followersCount: number;
  completedLessons: number;
  targetLanguage: string;
  dailyGoalMinutes: number;
  isOnboardingCompleted: boolean;
  createdAt: string;
  lastStudiedAt?: string;
}

export const toUserProfile = (me: any): UserProfile => ({
  name: me.nickname,
  username: me.username,
  joinedYear: me.joinedYear,
  isSuper: me.isSuper,
  coursePrimaryFlag: me.coursePrimaryFlag,
  courseExtraCount: me.courseExtraCount ?? 0,
  following: me.followingCount ?? 0,
  followers: me.followersCount ?? 0,
  streak: me.streak ?? 0,
  languageLevel: me.languageLevel ?? 1,
  league: me.league ?? "bronze",
  totalXp: me.totalXP ?? 0,
  friendStreaks: me.friendStreaks ?? [],
});

export const UserService = {
  saveLevelTest: (data: {
    correctAnswers: number;
    totalQuestions: number;
    score: number;
    wrongQuestionIds: string[];
  }): Promise<{ success: boolean; detectedLevel: string; score: number }> =>
    api.post(`/users/me/level-test`, data),

  getMe: (): Promise<UserMe> => api.get(`/users/me`),

  updateMe: (data: Partial<UserMe>): Promise<UserMe> =>
    api.patch(`/users/me`, data),

  getUserById: (id: string): Promise<any> => api.get(`/users/${id}`),

  follow: (id: string): Promise<{ success: boolean }> =>
    api.post(`/users/follow/${id}`, {}),

  unfollow: (id: string): Promise<{ success: boolean }> =>
    api.delete(`/users/follow/${id}`),

  getFollowing: (): Promise<any[]> => api.get(`/users/me/following`),
  getFollowers: (): Promise<any[]> => api.get(`/users/me/followers`),

  getUserWeekly: (id: string): Promise<{ days: any[] }> =>
    api.get(`/users/${id}/stats/weekly`),

  searchUsers: (q: string): Promise<any[]> =>
    api.get(`/users/search?q=${encodeURIComponent(q)}`),
};

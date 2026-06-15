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

export const UserService = {
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
};

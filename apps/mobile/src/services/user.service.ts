import { UserProfile } from "@/types/profile";
import api from "./api";
import { AvatarConfig } from "@/types/avatar";

export interface UserMe {
  id: string;
  email: string;
  nickname: string;
  username: string;
  profileImage: string;
  avatar: AvatarConfig;
  bio: string;
  country: string;
  level: string;
  totalXP: number;
  streak: number;
  longestStreak: number;
  league:
    | "bronze"
    | "silver"
    | "gold"
    | "sapphire"
    | "ruby"
    | "emerald"
    | "amethyst"
    | "pearl"
    | "obsidian"
    | "diamond";
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
  /** 현재 학습 중인 모드 (계정에 저장됨) */
  learnMode: string;
  /** 토픽 학습 중이면 어느 급수인지 */
  topikLevel: "1" | "2";
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

  /** 로드맵 첫 노드(한글 배우기) 완료 */
  completeHangul: (): Promise<{
    success: boolean;
    hangulCompletedAt: string;
  }> => api.post(`/users/me/hangul-complete`, {}),

  /**
   * 설문 결과를 유저 문서에 반영.
   * saveSurvey 는 onboarding 컬렉션에만 쓰고 유저로는 가입 때만 복사돼서,
   * 로그인 후 설문을 보는 경로에서는 이걸 따로 불러줘야 한다.
   */
  syncOnboardingSurvey: (data: {
    hangulLevel?: string;
    selfReportedLevel?: string;
    dailyGoalMinutes?: number;
    targetLanguage?: string;
    interests?: string[];
    reminderHour?: number;
    completeNow?: boolean;
  }): Promise<{ success: boolean }> =>
    api.post(`/users/me/onboarding-survey`, data),

  /**
   * 현재 학습 중인 모드를 계정에 저장.
   * 토픽은 급수까지 같이 보내야 홈에서 그 급수로 들어간다.
   */
  updateLearnMode: (data: {
    learnMode: string;
    topikLevel?: "1" | "2";
  }): Promise<{ learnMode: string; topikLevel: "1" | "2" }> =>
    api.patch(`/users/me/learn-mode`, data),

  /** 발음 연습 점수 전체. 키는 `레벨:단계:모드` */
  getPronunciation: (): Promise<{ scores: Record<string, number> }> =>
    api.get(`/users/me/pronunciation`),

  /** 한 단계 결과 저장. 서버가 최고점만 남기고 갱신된 전체를 돌려준다 */
  savePronunciation: (data: {
    level: string;
    step: number;
    mode: "easy" | "hard";
    score: number;
  }): Promise<{ scores: Record<string, number> }> =>
    api.post(`/users/me/pronunciation`, data),

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

  getUserFollowing: (id: string): Promise<any[]> =>
    api.get(`/users/${id}/following`),
  getUserFollowers: (id: string): Promise<any[]> =>
    api.get(`/users/${id}/followers`),

  getUserWeekly: (id: string): Promise<{ days: any[] }> =>
    api.get(`/users/${id}/stats/weekly`),

  searchUsers: (q: string): Promise<any[]> =>
    api.get(`/users/search?q=${encodeURIComponent(q)}`),

  matchContacts: (names: string[]): Promise<any[]> =>
    api.post(`/users/match-contacts`, { names }),

  getSuggestions: (): Promise<any[]> => api.get(`/users/suggestions`),

  touchActive: (): Promise<{ ok: boolean }> => api.post(`/users/me/active`, {}),

  updateAvatar: (avatar: AvatarConfig): Promise<{ avatar: AvatarConfig }> =>
    api.patch("/users/me/avatar", avatar),
};

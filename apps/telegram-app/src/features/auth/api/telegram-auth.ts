import { apiRequest } from "../../../shared/api/client";
import type { AvatarConfig } from "../../../shared/model/avatar";

export interface KorioTelegramUser {
  id: string;
  email?: string;
  nickname?: string;
  username?: string;
  profileImage?: string;
  level?: string;
  totalXP?: number;
  streak?: number;
  longestStreak?: number;
  currentUnitProgress?: number;
  isOnboardingCompleted: boolean;
  languageLevel?: number;
  hasPickedLevel?: boolean;
  learnMode?: string;
  studyMode?: "guided" | "free";
  topikLevel?: "1" | "2";
  league?: string;
  gems?: number;
  energy?: number;
  hangulCompletedAt?: string | null;
  hangulLevel?: string;
  isSuper?: boolean;
  superPlan?: string | null;
  superExpiresAt?: string | null;
  /** 체험을 이미 써봤는지. 만료되면 superPlan 은 비워지므로 서버가 따로 준다 */
  hasUsedTrial?: boolean;
  avatar?: AvatarConfig;
  bio?: string;
  provider?: string;
  createdAt?: string;
  joinedYear?: number;
  followingCount?: number;
  followersCount?: number;
  coursePrimaryFlag?: string;
  courseExtraCount?: number;
  friendStreaks?: Array<{ id: string; name: string; streak: number }>;
}

export interface TelegramAuthResponse {
  accessToken: string;
  user: KorioTelegramUser;
}

export function exchangeTelegramInitData(
  initData: string,
): Promise<TelegramAuthResponse> {
  return apiRequest<TelegramAuthResponse>("/auth/telegram/mini-app", {
    body: JSON.stringify({ initData }),
    method: "POST",
  });
}

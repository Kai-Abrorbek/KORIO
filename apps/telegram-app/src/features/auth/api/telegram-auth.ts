import { apiRequest } from "../../../shared/api/client";

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
  isSuper?: boolean;
  superPlan?: string | null;
  superExpiresAt?: string | null;
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

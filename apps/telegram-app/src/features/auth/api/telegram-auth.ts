import { apiRequest } from "@/shared/api/client";

export interface KorioTelegramUser {
  id: string;
  email?: string;
  nickname?: string;
  profileImage?: string;
  level?: string;
  totalXP?: number;
  streak?: number;
  isOnboardingCompleted: boolean;
  languageLevel?: number;
  hasPickedLevel?: boolean;
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

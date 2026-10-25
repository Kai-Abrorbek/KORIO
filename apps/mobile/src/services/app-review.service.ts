import { Platform } from "react-native";
import Constants from "expo-constants";
import i18n from "@/locales/i18n";
import api from "./api";

export type AppReviewPrompt = {
  /** 지금 띄울까 — 7일 주기·하루 보지 않기·닫은 횟수는 서버가 본다 */
  show: boolean;
  /** 평가하면 받는 보석 */
  reward: number;
};

export const AppReviewService = {
  prompt: () => api.get<AppReviewPrompt>("/app-reviews/prompt"),
  /** close = 다음 실행에 다시, snooze = 24시간 뒤에 */
  dismiss: (mode: "close" | "snooze") =>
    api.post<{ ok: boolean }>("/app-reviews/prompt/dismiss", { mode }),
  submit: (input: { rating: number; comment?: string }) =>
    api.post<{ reward: number; gems: number }>("/app-reviews", {
      ...input,
      platform: Platform.OS === "ios" ? "ios" : "android",
      appVersion:
        Constants.nativeAppVersion ?? Constants.expoConfig?.version ?? undefined,
      locale: i18n.language?.slice(0, 10),
    }),
};

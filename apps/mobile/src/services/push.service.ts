import api from "./api";

export interface PushSettingsPatch {
  master?: boolean;
  daily?: boolean;
  streak?: boolean;
  league?: boolean;
  friends?: boolean;
  events?: boolean;
  /** 학습 알림을 받을 로컬 시각 (0~23) */
  dailyHour?: number;
  /** ko | uz | en | ru */
  appLanguage?: string;
}

/**
 * 푸시 관련 서버 통신.
 *
 * ⚠️ 알림 스위치는 반드시 서버에도 저장해야 한다. 발송을 결정하는 건 서버
 * 크론이라, 앱 로컬(settings.store)에만 꺼두면 알림은 계속 온다.
 */
export const PushApi = {
  register: (payload: {
    token: string;
    platform?: string;
    deviceName?: string;
    appVersion?: string;
    appLanguage?: string;
  }): Promise<{ success: boolean }> => api.post("/push/register", payload),

  unregister: (token: string): Promise<{ success: boolean }> =>
    api.post("/push/unregister", { token }),

  updateSettings: (patch: PushSettingsPatch): Promise<{ success: boolean }> =>
    api.patch("/push/settings", patch),
};

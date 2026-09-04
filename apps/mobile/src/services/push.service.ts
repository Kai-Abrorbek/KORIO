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

  /**
   * 내 폰으로 테스트 발송 (설정 화면 개발자 패널).
   * type 을 주면 그 종류의 문구가 온다. 설정·한도·중복을 무시한다.
   */
  test: (
    type?: string,
    params?: Record<string, any>,
  ): Promise<{
    delivered: boolean;
    reason?: string;
    lang?: string;
    devices?: number;
    sentCopy?: { title: string; body: string };
  }> => api.post("/push/test", { type, params }),

  /** 내 기기 등록 상태. 푸시가 안 올 때 여기부터 본다 */
  status: (): Promise<{
    devices: {
      platform: string;
      deviceName: string;
      appVersion: string;
      lastSeenAt: string;
      alive: boolean;
    }[];
    appLanguage: string;
    timezone: string;
    reminderHour: number;
    pushPrefs: Record<string, boolean>;
  }> => api.get("/push/status"),

  /** 보내지 않고 "지금(또는 N시에) 나에게 뭐가 갈지" 만 본다 */
  preview: (
    hour?: number,
  ): Promise<{
    now: { localHour: number; timezone: string };
    slots: { reminder: number; engage: number };
    state: {
      lastStudy: string | null;
      idleDays: number | null;
      streak: number;
      studyMode: string | null;
      superPlan: string | null;
    };
    wouldSend: { type: string } | null;
    todayTimeline: { hour: number; type: string }[];
  }> => api.post("/push/preview", { hour }),
};

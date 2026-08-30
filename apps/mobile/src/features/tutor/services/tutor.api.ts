import api from "@/services/api";
import i18n from "@/i18n";

const getLang = () => i18n.language?.split("-")[0] || "uz";

export type TutorMode =
  | "freeTalk"
  | "rolePlay"
  | "lesson"
  | "pronunciation"
  | "review";

export type RolePlayScene =
  | "cafe"
  | "convenienceStore"
  | "office"
  | "hospital"
  | "restaurant"
  | "interview"
  | "meetingFriend"
  | "travel";

export interface TutorQuota {
  isSuper: boolean;
  dailyLimitMin: number;
  monthlyLimitMin: number;
  dailyUsedMin: number;
  monthlyUsedMin: number;
  /** 지금 시작할 수 있는 최대 길이(분). 0 이면 못 쓴다 */
  allowedMin: number;
}

export interface TutorSessionGrant {
  sessionId: string;
  /** OpenAI 단명 토큰. 정식 API 키가 아니다 — 앱엔 정식 키가 없다 */
  clientSecret: string;
  expiresAt: number | null;
  model: string;
  /** 이 시간이 지나면 앱이 스스로 끊는다 (서버 쿼터와 별개의 두 번째 방어선) */
  maxDurationSec: number;
  quota: TutorQuota;
}

export const TutorApi = {
  quota: (): Promise<TutorQuota> => api.get(`/tutor/quota`),

  createSession: (
    mode: TutorMode,
    scene?: RolePlayScene,
  ): Promise<TutorSessionGrant> =>
    api.post(`/tutor/session`, { mode, scene, lang: getLang() }),

  /** 실제 사용 시간은 여기서 쿼터에 반영된다. 서버가 값을 검증한다 */
  endSession: (
    sessionId: string,
    durationSec: number,
  ): Promise<{ success: boolean; durationSec: number; quota: TutorQuota }> =>
    api.post(`/tutor/session/end`, { sessionId, durationSec }),
};

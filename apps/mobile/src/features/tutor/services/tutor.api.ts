import api from "@/services/api";
import i18n from "@/locales/i18n";

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

export type TutorTier = "free" | "super" | "max";

export interface TutorQuota {
  tier: TutorTier;
  isSuper: boolean;
  /** MAX 구독만 제대로 쓸 수 있다 */
  isMax: boolean;
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
  voice: string;
  /** 이 시간이 지나면 앱이 스스로 끊는다 (서버 쿼터와 별개의 두 번째 방어선) */
  maxDurationSec: number;
  quota: TutorQuota;
}

export const TutorApi = {
  quota: (): Promise<TutorQuota> => api.get(`/tutor/quota`),

  /**
   * 고를 수 있는 목소리.
   * ⚠️ /tts/voices (Azure 한국어 목소리)와 다른 목록이다. 이쪽은 대화 모델이
   * 직접 내는 소리라 영어 우선이라 한국어 발음이 그만큼 정확하지 않다.
   */
  voices: (): Promise<{ voices: string[]; default: string }> =>
    api.get(`/tutor/voices`),

  createSession: (
    mode: TutorMode,
    scene?: RolePlayScene,
    voice?: string,
  ): Promise<TutorSessionGrant> =>
    api.post(`/tutor/session`, { mode, scene, voice, lang: getLang() }),

  /** 실제 사용 시간은 여기서 쿼터에 반영된다. 서버가 값을 검증한다 */
  endSession: (
    sessionId: string,
    durationSec: number,
  ): Promise<{ success: boolean; durationSec: number; quota: TutorQuota }> =>
    api.post(`/tutor/session/end`, { sessionId, durationSec }),
};

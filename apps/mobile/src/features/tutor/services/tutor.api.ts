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

export interface TutorTopicCard {
  id: string;
  category: "daily" | "korea";
  level: "beginner" | "intermediate" | "advanced";
  icon: string;
  color: string;
  title: string;
  blurb: string;
  expressionCount: number;
}

export interface TutorSessionGrant {
  sessionId: string;
  /** OpenAI 단명 토큰. 정식 API 키가 아니다 — 앱엔 정식 키가 없다 */
  clientSecret: string;
  expiresAt: number | null;
  model: string;
  voice: string;
  topicId: string | null;
  /** 오늘 연습할 표현. 시작 전에 미리 보여주고, 막혔을 때 힌트로도 쓴다 */
  targetExpressions: string[];
  /** 이 시간이 지나면 앱이 스스로 끊는다 (서버 쿼터와 별개의 두 번째 방어선) */
  maxDurationSec: number;
  quota: TutorQuota;
}

/** 대화 한 마디. 자막으로 이미 받아둔 걸 종료할 때 한 번에 올린다 */
export interface TranscriptTurn {
  role: "user" | "tutor";
  text: string;
}

export type MistakeType =
  | "particle"
  | "ending"
  | "vocabulary"
  | "wordOrder"
  | "honorific"
  | "tense"
  | "pronunciation"
  | "other";

export interface SessionMistake {
  /** 학습자가 실제로 한 말 */
  original: string;
  /** 자연스러운 한국어 */
  corrected: string;
  type: MistakeType;
  /** 왜 그런지 한 줄. 앱 언어로 온다 */
  note?: string;
}

/** 대화 종료 후 요약. 서버가 대화를 분석해서 만든다 */
export interface SessionSummary {
  summary: string;
  mistakes: SessionMistake[];
  newVocabulary: string[];
  goodExpressions: string[];
  grammarPoints: string[];
  spokenTurns: number;
  durationSec: number;
}

export interface EndSessionResult {
  success: boolean;
  durationSec: number;
  quota: TutorQuota;
  /** 대화가 너무 짧거나 분석이 실패하면 null */
  summary: SessionSummary | null;
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

  /** 고를 수 있는 주제. 제목·설명은 앱 언어로 내려온다 */
  topics: (): Promise<{ topics: TutorTopicCard[] }> =>
    api.get(`/tutor/topics?lang=${getLang()}`),

  createSession: (
    mode: TutorMode,
    opts: { scene?: RolePlayScene; voice?: string; topicId?: string } = {},
  ): Promise<TutorSessionGrant> =>
    api.post(`/tutor/session`, { mode, ...opts, lang: getLang() }),

  /**
   * 실제 사용 시간은 여기서 쿼터에 반영된다. 서버가 값을 검증한다.
   * 대화 내용을 같이 보내면 요약까지 만들어서 돌려준다 — 서버는 Realtime
   * 세션을 따로 듣고 있지 않아서 이 경로 말고는 대화를 알 방법이 없다.
   */
  endSession: (
    sessionId: string,
    durationSec: number,
    transcript?: TranscriptTurn[],
  ): Promise<EndSessionResult> =>
    api.post(`/tutor/session/end`, {
      sessionId,
      durationSec,
      lang: getLang(),
      ...(transcript?.length ? { transcript } : {}),
    }),
};

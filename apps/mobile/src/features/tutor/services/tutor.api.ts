import api, { BASE_URL } from "@/services/api";
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

/** 화면에 뿌릴 선생님 카드. promptStyle 같은 건 앱으로 안 내려온다 */
export interface TutorTeacherCard {
  id: string;
  name: string;
  description: string;
  avatar: string;
  color: string;
  personality: "calm" | "friendly" | "energetic" | "strict" | "pronunciation";
  recommendedModes: TutorMode[];
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
  /** 이 세션의 선생님. 목소리·말투·속도가 여기서 정해졌다 */
  teacher: {
    id: string;
    name: Record<string, string>;
    avatar: string;
    color: string;
    speechRate: number;
  };
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

  /** 고를 수 있는 선생님. 목소리만이 아니라 성격·추천 모드까지 온다 */
  teachers: (): Promise<{ teachers: TutorTeacherCard[] }> =>
    api.get(`/tutor/teachers?lang=${getLang()}`),

  createSession: (
    mode: TutorMode,
    opts: {
      scene?: RolePlayScene;
      voice?: string;
      topicId?: string;
      teacherId?: string;
    } = {},
  ): Promise<TutorSessionGrant> =>
    api.post(`/tutor/session`, { mode, ...opts, lang: getLang() }),

  /**
   * 한 문장을 선생님 목소리로 합성한다.
   *
   * 업체도 키도 앱은 모른다 — 문장과 선생님 id 만 보낸다.
   * 돌아온 audioId 로 아래 URL 을 만들어 플레이어에 넘긴다.
   */
  tts: (body: {
    text: string;
    teacherId?: string;
    sessionId?: string;
    language?: "ko" | "uz";
  }): Promise<{ audioId: string; bytes: number; provider: string }> =>
    api.post(`/tutor/tts`, body),

  /**
   * 재생용 주소. 인증 헤더가 없는 이유는 플레이어가 URL 을 재생할 때
   * 헤더를 못 붙이기 때문이다 — audioId 자체가 2분짜리 접근권이다.
   */
  ttsAudioUrl: (audioId: string) =>
    `${BASE_URL}/tutor/tts/audio/${encodeURIComponent(audioId)}`,

  /**
   * "우즈벡어 설명 보기".
   * 눌렀을 때만 부른다 — 매 응답마다 미리 만들면 대부분 그냥 버려진다.
   */
  explain: (
    text: string,
  ): Promise<{ translation: string; explanation: string | null }> =>
    api.post(`/tutor/explain`, { text, lang: getLang() }),

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

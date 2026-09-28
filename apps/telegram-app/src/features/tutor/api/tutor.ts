import { apiBaseUrl } from "../../../shared/config/env";
import type {
  EndSessionResult,
  TranscriptTurn,
  TutorAddressStyle,
  TutorMode,
  TutorQuota,
  TutorSessionGrant,
  TutorTeacherCard,
  TutorTeachingLanguage,
  TutorTopicCard,
} from "../model/tutor";
import { getContentLang } from "../../../shared/i18n/content-language";

export type AuthenticatedRequest = <T>(
  path: string,
  init?: RequestInit,
) => Promise<T>;

export function getTutorQuota(request: AuthenticatedRequest) {
  return request<TutorQuota>("/tutor/quota");
}

export function getTutorTopics(request: AuthenticatedRequest) {
  return request<{ topics: TutorTopicCard[] }>(`/tutor/topics?lang=${getContentLang()}`);
}

export function getTutorTeachers(request: AuthenticatedRequest) {
  return request<{ teachers: TutorTeacherCard[] }>(`/tutor/teachers?lang=${getContentLang()}`);
}

export function createTutorSession(
  request: AuthenticatedRequest,
  mode: TutorMode,
  options: {
    topicId?: string;
    teacherId?: string;
    /** 존댓말/반말. 성격과 독립이고, 시작 화면에서 고른다 */
    addressStyle?: TutorAddressStyle;
    /** 설명을 들을 언어. 서버 계약은 그대로 `lang` 으로 보낸다 (DTO 에 teachingLanguage 는 없다) */
    teachingLanguage?: TutorTeachingLanguage;
  } = {},
) {
  const { teachingLanguage, ...rest } = options;
  return request<TutorSessionGrant>("/tutor/session", {
    body: JSON.stringify({
      mode,
      ...rest,
      lang: teachingLanguage ?? getContentLang(),
    }),
    method: "POST",
  });
}

/** 카드의 previewUrl(상대경로)을 재생 가능한 절대 주소로 */
export function tutorPreviewUrl(previewUrl: string) {
  return `${apiBaseUrl()}${previewUrl}`;
}

export function createTutorSpeech(
  request: AuthenticatedRequest,
  body: { text: string; teacherId?: string; sessionId?: string },
) {
  return request<{ audioId: string; bytes: number; provider: string }>(
    "/tutor/tts",
    { body: JSON.stringify(body), method: "POST" },
  );
}

export function tutorSpeechUrl(audioId: string) {
  return `${apiBaseUrl()}/tutor/tts/audio/${encodeURIComponent(audioId)}`;
}

export function explainTutorCaption(
  request: AuthenticatedRequest,
  text: string,
) {
  return request<{ translation: string; explanation: string | null }>(
    "/tutor/explain",
    {
      body: JSON.stringify({ text, lang: getContentLang() }),
      method: "POST",
    },
  );
}

export function endTutorSession(
  request: AuthenticatedRequest,
  sessionId: string,
  durationSec: number,
  transcript?: TranscriptTurn[],
) {
  return request<EndSessionResult>("/tutor/session/end", {
    body: JSON.stringify({
      sessionId,
      durationSec,
      lang: getContentLang(),
      ...(transcript?.length ? { transcript } : {}),
    }),
    keepalive: true,
    method: "POST",
  });
}

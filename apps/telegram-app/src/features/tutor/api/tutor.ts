import { apiBaseUrl } from "../../../shared/config/env";
import type {
  EndSessionResult,
  TranscriptTurn,
  TutorMode,
  TutorQuota,
  TutorSessionGrant,
  TutorTeacherCard,
  TutorTopicCard,
} from "../model/tutor";

export type AuthenticatedRequest = <T>(
  path: string,
  init?: RequestInit,
) => Promise<T>;

export function getTutorQuota(request: AuthenticatedRequest) {
  return request<TutorQuota>("/tutor/quota");
}

export function getTutorTopics(request: AuthenticatedRequest) {
  return request<{ topics: TutorTopicCard[] }>("/tutor/topics?lang=uz");
}

export function getTutorTeachers(request: AuthenticatedRequest) {
  return request<{ teachers: TutorTeacherCard[] }>("/tutor/teachers?lang=uz");
}

export function createTutorSession(
  request: AuthenticatedRequest,
  mode: TutorMode,
  options: { topicId?: string; teacherId?: string } = {},
) {
  return request<TutorSessionGrant>("/tutor/session", {
    body: JSON.stringify({ mode, ...options, lang: "uz" }),
    method: "POST",
  });
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
      body: JSON.stringify({ text, lang: "uz" }),
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
      lang: "uz",
      ...(transcript?.length ? { transcript } : {}),
    }),
    keepalive: true,
    method: "POST",
  });
}

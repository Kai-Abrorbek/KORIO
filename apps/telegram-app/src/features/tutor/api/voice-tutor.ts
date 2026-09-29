import { apiBaseUrl } from "../../../shared/config/env";
import { getContentLang } from "../../../shared/i18n/content-language";
import type {
  VoiceTutorEnd,
  VoiceTutorMessage,
  VoiceTutorOptions,
  VoiceTutorQuota,
  VoiceTutorSession,
  VoiceTutorSessionDetail,
  VoiceTutorSettings,
  VoiceTutorTopicCard,
} from "../model/voice-tutor";

/**
 * 새 Voice Tutor API — 모바일 features/voice-tutor/services/voice-tutor.api.ts 의 웹판.
 *
 * 예전 텔레그램 튜터는 /tutor/* (Gemini Live) 를 불렀다. 모바일과 같은 튜터를 쓰려고
 * /voice-tutor/* 로 옮겼다. 설정(목소리·말투·성격·수업 언어·수준)은 서버가 기억한다.
 */
export type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

const json = (body: unknown): RequestInit => ({
  body: JSON.stringify(body),
  method: "POST",
});

export const VoiceTutorApi = {
  quota: (request: AuthenticatedRequest) =>
    request<VoiceTutorQuota>("/voice-tutor/quota"),
  topics: (request: AuthenticatedRequest) =>
    request<{ topics: VoiceTutorTopicCard[] }>(
      `/voice-tutor/topics?lang=${encodeURIComponent(getContentLang())}`,
    ),
  options: (request: AuthenticatedRequest) =>
    request<VoiceTutorOptions>("/voice-tutor/options"),
  settings: (request: AuthenticatedRequest) =>
    request<VoiceTutorSettings>("/voice-tutor/settings"),
  updateSettings: (request: AuthenticatedRequest, settings: VoiceTutorSettings) =>
    request<VoiceTutorSettings>("/voice-tutor/settings", {
      body: JSON.stringify(settings),
      method: "PATCH",
    }),
  createSession: (
    request: AuthenticatedRequest,
    settings: VoiceTutorSettings,
    topicId?: string,
  ) =>
    request<VoiceTutorSession>(
      "/voice-tutor/sessions",
      json({ settings, ...(topicId ? { topicId } : {}) }),
    ),
  getSession: (request: AuthenticatedRequest, sessionId: string) =>
    request<VoiceTutorSessionDetail>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}`,
    ),
  replay: (request: AuthenticatedRequest, sessionId: string, messageId: string) =>
    request<VoiceTutorMessage>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}/messages/${encodeURIComponent(messageId)}/audio`,
      json({}),
    ),
  endSession: (request: AuthenticatedRequest, sessionId: string) =>
    request<VoiceTutorEnd>(
      `/voice-tutor/sessions/${encodeURIComponent(sessionId)}/end`,
      { ...json({}), keepalive: true },
    ),
};

/**
 * 선생님 답 음성(/voice-tutor/audio/:id)은 인증이 필요해서 <audio src> 로 바로 못 튼다.
 * 받아서 blob URL 로 만든다. 쓴 뒤 revokeObjectURL 은 부르는 쪽 책임이다.
 */
export async function fetchVoiceTutorAudio(url: string, accessToken: string | null) {
  if (!accessToken) throw new Error("UNAUTHORIZED");
  const base = apiBaseUrl();
  const path = url.startsWith(base) ? url.slice(base.length) : url;
  if (!/^\/voice-tutor\/audio\/[A-Za-z0-9_-]+$/.test(path)) {
    throw new Error("INVALID_AUDIO_URL");
  }
  const response = await fetch(`${base}${path}`, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) throw new Error("AUDIO_PLAYBACK_FAILED");
  return URL.createObjectURL(await response.blob());
}

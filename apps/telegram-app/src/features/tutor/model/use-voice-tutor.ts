"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  VoiceTutorApi,
  fetchVoiceTutorAudio,
  type AuthenticatedRequest,
} from "../api/voice-tutor";
import {
  connectLiveKitTutor,
  type LiveKitAgentState,
  type LiveKitTutorConnection,
  type TranscriptChunk,
} from "./livekit";
import type {
  VoiceTutorEnd,
  VoiceTutorMessage,
  VoiceTutorOptions,
  VoiceTutorPhase,
  VoiceTutorPlan,
  VoiceTutorProgress,
  VoiceTutorQuota,
  VoiceTutorSettings,
  VoiceTutorVoice,
} from "./voice-tutor";

const END_POLL_INTERVAL_MS = 1_500;
const END_POLL_ATTEMPTS = 80;

const AGENT_PHASE: Record<LiveKitAgentState, VoiceTutorPhase> = {
  initializing: "connecting",
  idle: "ready",
  listening: "ready",
  thinking: "thinking",
  speaking: "speaking",
};

const IN_CALL: VoiceTutorPhase[] = ["connecting", "ready", "thinking", "speaking"];

function errorCode(cause: unknown): string {
  if (cause instanceof Error) return cause.message || "VOICE_TUTOR_FAILED";
  return "VOICE_TUTOR_FAILED";
}

/**
 * 새 Voice Tutor 한 사이클 — 모바일 hooks/useVoiceTutor.ts 의 웹판.
 *
 *   설정(서버에 저장) → 수업 시작(쿼터 확인) → LiveKit 통화 → 종료(분석 대기) → 결과
 *
 * 모바일과 다른 점:
 *  - expo-audio 대신 HTMLAudioElement. 선생님 답 음성은 인증이 필요해 blob 으로 받는다
 *  - 앱 백그라운드 대신 visibilitychange / pagehide 에서 수업을 끝낸다
 *  - 브라우저 자동재생이 막히면 audioBlocked → "탭해서 듣기"
 */
export function useVoiceTutor(request: AuthenticatedRequest, accessToken: string | null) {
  const [options, setOptions] = useState<VoiceTutorOptions | null>(null);
  const [settings, setSettings] = useState<VoiceTutorSettings | null>(null);
  const [messages, setMessages] = useState<VoiceTutorMessage[]>([]);
  const [phase, setPhase] = useState<VoiceTutorPhase>("setup");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<VoiceTutorProgress | null>(null);
  const [plan, setPlan] = useState<VoiceTutorPlan | null>(null);
  const [endResult, setEndResult] = useState<VoiceTutorEnd | null>(null);
  const [previewVoiceId, setPreviewVoiceId] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [liveUserText, setLiveUserText] = useState("");
  const [liveTeacherText, setLiveTeacherText] = useState("");
  const [elapsedSec, setElapsedSec] = useState(0);
  const [quota, setQuota] = useState<VoiceTutorQuota | null>(null);
  /** 이번 수업 최대 길이(초). 0 = 모름 */
  const [limitSec, setLimitSec] = useState(0);

  const callStartedAt = useRef<number | null>(null);
  const connection = useRef<LiveKitTutorConnection | null>(null);
  const sessionId = useRef<string | null>(null);
  const actionBusy = useRef(false);
  const closing = useRef(false);
  const ending = useRef(false);
  const mounted = useRef(true);
  const player = useRef<HTMLAudioElement | null>(null);
  const objectUrl = useRef<string | null>(null);
  const playbackEpoch = useRef(0);
  const resumeMicAfterPlayback = useRef(false);
  const seenSegments = useRef(new Set<string>());
  const micOnRef = useRef(false);
  useEffect(() => {
    micOnRef.current = micOn;
  }, [micOn]);

  const releaseMicAfterPlayback = useCallback(() => {
    if (resumeMicAfterPlayback.current) {
      resumeMicAfterPlayback.current = false;
      connection.current?.setMicEnabled(true);
    }
  }, []);

  const stopPlayback = useCallback(() => {
    playbackEpoch.current += 1;
    setPreviewVoiceId(null);
    const audio = player.current;
    player.current = null;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
    }
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    releaseMicAfterPlayback();
  }, [releaseMicAfterPlayback]);

  /** 소리 하나 튼다. 끝나거나 실패하면 마이크를 되돌린다 */
  const playUrl = useCallback(
    async (src: string, onEnd?: () => void) => {
      const audio = new Audio(src);
      player.current = audio;
      audio.onended = () => {
        if (player.current !== audio) return;
        player.current = null;
        if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
        objectUrl.current = null;
        onEnd?.();
        releaseMicAfterPlayback();
      };
      audio.onerror = () => {
        if (player.current !== audio) return;
        player.current = null;
        onEnd?.();
        releaseMicAfterPlayback();
        if (mounted.current) setError("AUDIO_PLAYBACK_FAILED");
      };
      await audio.play();
    },
    [releaseMicAfterPlayback],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [available, saved] = await Promise.all([
        VoiceTutorApi.options(request),
        VoiceTutorApi.settings(request),
      ]);
      if (!mounted.current) return;
      setOptions(available);
      // 한도를 못 받아도 화면은 연다 — 서버가 시작 시점에 다시 막는다
      void VoiceTutorApi.quota(request)
        .then((q) => {
          if (mounted.current) setQuota(q);
        })
        .catch(() => undefined);
      setSettings({
        ...available.defaults,
        ...saved,
        personality: saved.personality ?? available.defaults.personality ?? "friendly",
        characterId: saved.characterId ?? available.defaults.characterId ?? "female_01",
      });
    } catch (cause) {
      if (mounted.current) setError(errorCode(cause));
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [request]);

  const previewVoice = useCallback(
    async (voice: VoiceTutorVoice) => {
      if (!voice.previewUrl || sessionId.current || actionBusy.current || closing.current) return;
      if (previewVoiceId === voice.id) {
        stopPlayback();
        return;
      }
      let uri: string;
      try {
        const url = new URL(voice.previewUrl);
        if (url.protocol !== "https:" || url.username || url.password) throw new Error();
        uri = url.toString();
      } catch {
        setError("INVALID_AUDIO_URL");
        return;
      }
      stopPlayback();
      const epoch = playbackEpoch.current;
      setPreviewVoiceId(voice.id);
      try {
        await playUrl(uri, () => {
          if (epoch === playbackEpoch.current) setPreviewVoiceId(null);
        });
        setError(null);
      } catch (cause) {
        if (epoch === playbackEpoch.current) setPreviewVoiceId(null);
        if (mounted.current) setError(errorCode(cause));
      }
    },
    [playUrl, previewVoiceId, stopPlayback],
  );

  /** "다시 듣기" — 선생님 답을 서버 TTS 음성으로 다시 튼다 */
  const playMessage = useCallback(
    async (message: VoiceTutorMessage) => {
      const id = sessionId.current;
      if (closing.current || !id || message.role !== "teacher") return;
      stopPlayback();
      const epoch = playbackEpoch.current;
      const stale = () =>
        !mounted.current || sessionId.current !== id || closing.current || epoch !== playbackEpoch.current;
      try {
        const playable = message.audioUrl ? message : await VoiceTutorApi.replay(request, id, message.id);
        if (!playable.audioUrl) throw new Error("VOICE_TUTOR_TTS_UNAVAILABLE");
        if (stale()) return;
        setMessages((current) => current.map((row) => (row.id === playable.id ? playable : row)));
        const src = await fetchVoiceTutorAudio(playable.audioUrl, accessToken);
        if (stale()) {
          URL.revokeObjectURL(src);
          return;
        }
        objectUrl.current = src;
        // 안 끄면 선생님이 자기 목소리를 학습자 말로 듣고 대답한다
        if (connection.current && micOnRef.current) {
          connection.current.setMicEnabled(false);
          resumeMicAfterPlayback.current = true;
        }
        await playUrl(src);
        setError(null);
      } catch (cause) {
        if (stale()) return;
        releaseMicAfterPlayback();
        setError(errorCode(cause));
      }
    },
    [accessToken, playUrl, releaseMicAfterPlayback, request, stopPlayback],
  );

  const syncMessages = useCallback(
    async (id: string) => {
      try {
        const detail = await VoiceTutorApi.getSession(request, id);
        if (!mounted.current || closing.current || sessionId.current !== id) return;
        setMessages(detail.messages);
        setProgress(detail.progress);
        setLiveUserText("");
        setLiveTeacherText("");
      } catch {
        // 메시지 새로고침이 잠깐 실패해도 통화는 계속된다
      }
    },
    [request],
  );

  const onTranscript = useCallback(
    (chunk: TranscriptChunk) => {
      if (!mounted.current || closing.current || !sessionId.current) return;
      if (chunk.role === "user") {
        setLiveUserText(chunk.text);
        if (chunk.isFinal && !seenSegments.current.has(chunk.segmentId)) {
          seenSegments.current.add(chunk.segmentId);
          setPhase("thinking");
        }
        return;
      }
      setLiveTeacherText(chunk.text);
      setPhase("speaking");
      if (chunk.isFinal && !seenSegments.current.has(chunk.segmentId)) {
        seenSegments.current.add(chunk.segmentId);
        void syncMessages(sessionId.current);
      }
    },
    [syncMessages],
  );

  const start = useCallback(
    async (topicId?: string | null) => {
      if (!settings || actionBusy.current || sessionId.current) return;
      actionBusy.current = true;
      setError(null);
      setPhase("starting");
      try {
        stopPlayback();
        await VoiceTutorApi.updateSettings(request, settings);
        const created = await VoiceTutorApi.createSession(request, settings, topicId ?? undefined);
        if (!mounted.current) {
          void VoiceTutorApi.endSession(request, created.sessionId).catch(() => undefined);
          return;
        }
        sessionId.current = created.sessionId;
        setLimitSec(created.maxDurationSec ?? 0);
        setPlan(created.plan);
        setProgress(null);
        setEndResult(null);
        setMessages(created.initialMessage ? [created.initialMessage] : []);
        setLiveUserText("");
        setLiveTeacherText("");
        seenSegments.current.clear();
        if (!created.livekit) throw new Error("VOICE_TUTOR_AGENT_UNAVAILABLE");
        setPhase("connecting");
        const call = await connectLiveKitTutor(created.livekit, {
          onAgentState: (state) => {
            if (!mounted.current || closing.current) return;
            setPhase(AGENT_PHASE[state] ?? "ready");
            if (state === "speaking") void syncMessages(created.sessionId);
          },
          onTranscript,
          onAgentMissing: () => {
            if (!mounted.current || closing.current) return;
            connection.current?.setMicEnabled(false);
            setMicOn(false);
            setError("VOICE_TUTOR_AGENT_UNAVAILABLE");
            setPhase("ending");
          },
          onDisconnected: () => {
            if (!mounted.current || closing.current) return;
            connection.current = null;
            setMicOn(false);
            setError("CONNECTION_LOST");
            setPhase("ending");
          },
          onError: () => {
            if (mounted.current && !closing.current) setError("CONNECTION_ERROR");
          },
          onAudioBlocked: (blocked) => {
            if (mounted.current) setAudioBlocked(blocked);
          },
        });
        if (!mounted.current || closing.current || sessionId.current !== created.sessionId) {
          await call.close();
          return;
        }
        connection.current = call;
        callStartedAt.current = Date.now();
        setElapsedSec(0);
        setMicOn(true);
        setPhase((current) => (current === "connecting" ? "ready" : current));
      } catch (cause) {
        const id = sessionId.current;
        sessionId.current = null;
        if (id) void VoiceTutorApi.endSession(request, id).catch(() => undefined);
        if (mounted.current) {
          setError(errorCode(cause));
          setPhase("setup");
        }
      } finally {
        actionBusy.current = false;
      }
    },
    [onTranscript, request, settings, stopPlayback, syncMessages],
  );

  const toggleMic = useCallback(() => {
    if (!connection.current || closing.current) return;
    setMicOn((current) => {
      const next = !current;
      connection.current?.setMicEnabled(next);
      return next;
    });
  }, []);

  /** 통화 화면의 "천천히" / "설명해 줘". 워커가 받아쓰기 없이 한 턴을 만든다 */
  const requestTurn = useCallback(async (kind: "slower" | "explain") => {
    const call = connection.current;
    if (!call) return;
    try {
      await call.rpc("voice_tutor_request", kind);
    } catch {
      if (mounted.current) setError("CONNECTION_ERROR");
    }
  }, []);

  /** 기기에서 소리를 낼 때(오늘의 표현 듣기) 마이크를 잠깐 끈다 */
  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const call = connection.current;
    const wasOn = !!call && micOnRef.current;
    if (wasOn) call.setMicEnabled(false);
    try {
      await play();
    } finally {
      if (wasOn && connection.current === call) call.setMicEnabled(true);
    }
  }, []);

  const resumeAudio = useCallback(async () => {
    await connection.current?.resumeAudio();
  }, []);

  const end = useCallback(
    async (waitForCompletion = true) => {
      if (ending.current) return;
      const id = sessionId.current;
      if (!id) return;
      ending.current = true;
      closing.current = true;
      setError(null);
      setPhase("ending");
      try {
        stopPlayback();
        const call = connection.current;
        connection.current = null;
        setMicOn(false);
        setAudioBlocked(false);
        await call?.close().catch(() => undefined);
        let result = await VoiceTutorApi.endSession(request, id);
        if (result.status === "ending") {
          if (!waitForCompletion) return;
          for (
            let attempt = 0;
            attempt < END_POLL_ATTEMPTS && mounted.current && sessionId.current === id;
            attempt++
          ) {
            await new Promise<void>((resolve) => window.setTimeout(resolve, END_POLL_INTERVAL_MS));
            if (!mounted.current || sessionId.current !== id) return;
            try {
              const detail = await VoiceTutorApi.getSession(request, id);
              if (detail.status !== "ended") continue;
              setMessages(detail.messages);
              result = { sessionId: id, status: "ended", progress: detail.progress, plan: detail.plan };
              break;
            } catch {
              // 잠깐 끊겨도 서버에 이미 들어간 종료 요청은 유효하다
            }
          }
        }
        if (!mounted.current || sessionId.current !== id) return;
        if (result.status !== "ended") throw new Error("NETWORK_ERROR");
        sessionId.current = null;
        setProgress(result.progress);
        setPlan(result.plan);
        setEndResult(result);
        setPhase("finished");
      } catch (cause) {
        if (mounted.current) {
          setError(errorCode(cause));
          setPhase("ending");
        }
      } finally {
        closing.current = false;
        ending.current = false;
      }
    },
    [request, stopPlayback],
  );

  const endRef = useRef(end);
  useEffect(() => {
    endRef.current = end;
  }, [end]);

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
      playbackEpoch.current += 1;
      player.current?.pause();
      player.current = null;
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      objectUrl.current = null;
      const call = connection.current;
      connection.current = null;
      void call?.close().catch(() => undefined);
      const id = sessionId.current;
      sessionId.current = null;
      if (id && !closing.current) void VoiceTutorApi.endSession(request, id).catch(() => undefined);
    };
  }, [load, request]);

  // 텔레그램을 내리거나 창을 닫으면 수업을 끝낸다 (안 끝내면 한도가 계속 흐른다)
  useEffect(() => {
    const endWhenHidden = () => {
      if (document.visibilityState !== "visible" && connection.current && !ending.current) {
        void endRef.current(false);
      }
    };
    const endOnPageHide = () => {
      if (sessionId.current && !ending.current) void endRef.current(false);
    };
    document.addEventListener("visibilitychange", endWhenHidden);
    window.addEventListener("pagehide", endOnPageHide);
    return () => {
      document.removeEventListener("visibilitychange", endWhenHidden);
      window.removeEventListener("pagehide", endOnPageHide);
    };
  }, []);

  const inCall = IN_CALL.includes(phase);
  useEffect(() => {
    if (!inCall) return;
    const timer = window.setInterval(() => {
      if (callStartedAt.current) {
        setElapsedSec(Math.floor((Date.now() - callStartedAt.current) / 1000));
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [inCall]);

  // 한도에 닿으면 앱이 먼저 깔끔하게 끝낸다 (안 그러면 워커가 방을 닫아 "끊겼어요" 로 끝난다)
  useEffect(() => {
    if (inCall && limitSec > 0 && elapsedSec >= limitSec) void end();
  }, [inCall, limitSec, elapsedSec, end]);

  const restart = useCallback(() => {
    if (sessionId.current || actionBusy.current) return;
    callStartedAt.current = null;
    setElapsedSec(0);
    setLimitSec(0);
    void VoiceTutorApi.quota(request).then(setQuota).catch(() => undefined);
    setMessages([]);
    setEndResult(null);
    setError(null);
    setPhase("setup");
  }, [request]);

  return {
    audioBlocked,
    elapsedSec,
    end,
    endResult,
    error,
    inCall,
    limitSec,
    liveTeacherText,
    liveUserText,
    load,
    loading,
    messages,
    micOn,
    options,
    phase,
    plan,
    playMessage,
    previewVoice,
    previewVoiceId,
    progress,
    quota,
    requestTurn,
    restart,
    resumeAudio,
    setSettings,
    settings,
    start,
    toggleMic,
    withMicMuted,
  };
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  createTutorSession,
  endTutorSession,
  getTutorQuota,
  type AuthenticatedRequest,
} from "../api/tutor";
import {
  extractTutorExamples,
  type SessionSummary,
  type TranscriptTurn,
  type TutorAddressStyle,
  type TutorMode,
  type TutorQuota,
  type TutorState,
  type TutorTeachingLanguage,
} from "./tutor";
import {
  connectLiveKitTutor,
  type LiveKitAgentState,
  type LiveKitTutorConnection,
  type TranscriptChunk,
} from "./livekit";

const MAX_TURNS_TO_SEND = 100;
const MAX_TURN_CHARS = 300;

/** Agent 의 'idle' = 아무것도 안 하는 중 = 유저 차례. 화면에선 "듣고 있어요" */
const AGENT_STATE: Record<LiveKitAgentState, TutorState> = {
  initializing: "connecting",
  idle: "listening",
  listening: "listening",
  thinking: "thinking",
  speaking: "speaking",
};

function pushTurn(
  target: { current: TranscriptTurn[] },
  role: TranscriptTurn["role"],
  text: string,
) {
  const clean = text.trim();
  if (!clean) return;
  const last = target.current.at(-1);
  if (last?.role === role && last.text === clean) return;
  target.current.push({ role, text: clean.slice(0, MAX_TURN_CHARS) });
  if (target.current.length > MAX_TURNS_TO_SEND) {
    target.current.splice(0, target.current.length - MAX_TURNS_TO_SEND);
  }
}

function errorCode(error: unknown) {
  if (error instanceof Error) return error.message;
  return "TUTOR_SESSION_FAILED";
}

export interface TutorStartOptions {
  addressStyle?: TutorAddressStyle;
  teacherId?: string;
  teachingLanguage?: TutorTeachingLanguage;
  topicId?: string;
}

/**
 * 튜터 대화 한 사이클 — 모바일 hooks/useRealtimeTutor.ts 와 같은 흐름.
 *
 *   마이크 ──WebRTC──▶ LiveKit ──▶ Tutor Agent ──▶ Gemini Live
 *
 * 지켜야 할 것 두 가지:
 *  1) 화면을 떠나거나 앱이 숨겨지면 반드시 끊는다 (마이크가 열린 채 과금이 계속된다).
 *  2) 끊을 때 서버에 실제 사용 시간을 보고한다.
 */
export function useRealtimeTutor(request: AuthenticatedRequest) {
  const [state, setState] = useState<TutorState>("idle");
  const [quota, setQuota] = useState<TutorQuota | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [maxSec, setMaxSec] = useState(0);
  const [caption, setCaption] = useState("");
  const [captionPrev, setCaptionPrev] = useState("");
  const [userSaid, setUserSaid] = useState("");
  const [targets, setTargets] = useState<string[]>([]);
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [teacher, setTeacher] = useState<
    { id: string; avatar: string; color: string } | null
  >(null);
  const [micOn, setMicOn] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const connectionRef = useRef<LiveKitTutorConnection | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const maxSecRef = useRef(0);
  const endingRef = useRef(false);
  const micOnRef = useRef(true);
  const captionRef = useRef("");
  const tutorSegmentRef = useRef("");
  /** final 자막이 두 번 오는 경우가 있어 segment id 로 막는다 */
  const pushedRef = useRef<Set<string>>(new Set());
  const transcriptRef = useRef<TranscriptTurn[]>([]);
  const runIdRef = useRef(0);
  const stopRef = useRef<() => Promise<void>>(async () => undefined);

  const refreshQuota = useCallback(async () => {
    try {
      setQuota(await getTutorQuota(request));
    } catch {
      // 조회 실패만으로 화면을 막지 않는다. 서버가 시작 시 다시 검사한다.
    }
  }, [request]);

  useEffect(() => {
    void refreshQuota();
  }, [refreshQuota]);

  /** 여러 경로(버튼·화면 이탈·숨김·시간 초과)에서 불려도 안전하게 한 번만 */
  const finishSession = useCallback(
    async (preserveError = false) => {
      if (endingRef.current) return;
      endingRef.current = true;
      runIdRef.current += 1;

      const connection = connectionRef.current;
      const sessionId = sessionIdRef.current;
      const seconds = startedAtRef.current
        ? Math.round((Date.now() - startedAtRef.current) / 1000)
        : 0;
      const turns = transcriptRef.current;

      connectionRef.current = null;
      sessionIdRef.current = null;
      startedAtRef.current = 0;
      maxSecRef.current = 0;
      transcriptRef.current = [];
      pushedRef.current = new Set();
      tutorSegmentRef.current = "";
      captionRef.current = "";

      try {
        await connection?.close();
      } catch {
        // 이미 끊겼으면 그만
      }

      setState(preserveError ? "error" : "idle");
      setElapsedSec(0);
      setMaxSec(0);
      setCaption("");
      setCaptionPrev("");
      setUserSaid("");
      setTargets([]);
      setTeacher(null);
      setAudioBlocked(false);

      if (sessionId) {
        // 서버 기준과 맞춘다 (45초 이상 + 학습자가 2번 이상 말함)
        const wantsSummary =
          seconds >= 45 &&
          turns.filter((turn) => turn.role === "user").length >= 2;
        if (wantsSummary) setAnalyzing(true);
        try {
          const result = await endTutorSession(
            request,
            sessionId,
            seconds,
            wantsSummary ? turns.slice(-MAX_TURNS_TO_SEND) : undefined,
          );
          setQuota(result.quota);
          if (result.summary) setSummary(result.summary);
        } catch {
          // 보고 실패해도 서버의 선차감이 남아 쿼터가 새지는 않는다
        } finally {
          setAnalyzing(false);
        }
      }
      endingRef.current = false;
    },
    [request],
  );

  const stop = useCallback(() => finishSession(false), [finishSession]);
  stopRef.current = stop;

  /** 선생님 말은 caption, 내 말은 userSaid. 확정본만 기록에 넣는다 */
  const onTranscript = useCallback((chunk: TranscriptChunk) => {
    if (chunk.role === "user") {
      setUserSaid(chunk.text.trim());
      if (chunk.isFinal && !pushedRef.current.has(chunk.segmentId)) {
        pushedRef.current.add(chunk.segmentId);
        pushTurn(transcriptRef, "user", chunk.text);
      }
      return;
    }
    // 새 문장이 시작됐다 — 앞 문장은 흐리게 위로 내린다
    if (tutorSegmentRef.current && tutorSegmentRef.current !== chunk.segmentId) {
      setCaptionPrev(captionRef.current);
    }
    tutorSegmentRef.current = chunk.segmentId;
    captionRef.current = chunk.text;
    setCaption(chunk.text);
    if (chunk.isFinal && !pushedRef.current.has(chunk.segmentId)) {
      pushedRef.current.add(chunk.segmentId);
      pushTurn(transcriptRef, "tutor", chunk.text);
    }
  }, []);

  const start = useCallback(
    async (mode: TutorMode, options: TutorStartOptions = {}) => {
      if (connectionRef.current || endingRef.current) return;
      const runId = runIdRef.current + 1;
      runIdRef.current = runId;
      setError(null);
      setSummary(null);
      setCaption("");
      setCaptionPrev("");
      setUserSaid("");
      transcriptRef.current = [];
      pushedRef.current = new Set();
      tutorSegmentRef.current = "";
      setState("connecting");

      try {
        // 쿼터 검사는 서버가 여기서 한다. 방도 이 호출 안에서 만들어지고 Agent 도 불린다
        const grant = await createTutorSession(request, mode, options);
        if (runIdRef.current !== runId) {
          void endTutorSession(request, grant.sessionId, 0).catch(() => undefined);
          return;
        }
        sessionIdRef.current = grant.sessionId;
        maxSecRef.current = grant.maxDurationSec;
        setMaxSec(grant.maxDurationSec);
        setTargets(grant.targetExpressions ?? []);
        setQuota(grant.quota);
        setTeacher({
          id: grant.teacher.id,
          avatar: grant.teacher.avatar,
          color: grant.teacher.color,
        });

        const connection = await connectLiveKitTutor(grant.livekit, {
          onAgentState: (next) => {
            if (runIdRef.current === runId) setState(AGENT_STATE[next] ?? "listening");
          },
          onTranscript: (chunk) => {
            if (runIdRef.current === runId) onTranscript(chunk);
          },
          // 선생님이 끝내 응답이 없다 — 이걸 안 잡으면 고장이 "듣고 있어요" 로 보인다
          onAgentMissing: () => {
            if (runIdRef.current !== runId) return;
            setError("TUTOR_AGENT_UNAVAILABLE");
            void finishSession(true);
          },
          onDisconnected: () => {
            if (endingRef.current || runIdRef.current !== runId || !connectionRef.current) return;
            setError("CONNECTION_LOST");
            void finishSession(true);
          },
          onError: () => {
            if (runIdRef.current === runId) setError("CONNECTION_ERROR");
          },
          onAudioBlocked: (blocked) => {
            if (runIdRef.current === runId) setAudioBlocked(blocked);
          },
        });
        if (runIdRef.current !== runId) {
          void connection.close();
          return;
        }
        connectionRef.current = connection;
        micOnRef.current = true;
        setMicOn(true);
        startedAtRef.current = Date.now();
        // Agent 가 이미 speaking 을 보고했으면 덮어쓰지 않는다
        setState((current) => (current === "connecting" ? "listening" : current));
      } catch (reason) {
        if (runIdRef.current !== runId) return;
        setError(errorCode(reason));
        // 세션은 열렸는데 연결이 실패했으면 서버에 알려 선차감을 정정한다
        await finishSession(true);
      }
    },
    [finishSession, onTranscript, request],
  );

  /**
   * 예문을 들려주는 동안 마이크를 끈다. 우리 예문은 선생님이 반응할 대상이 아니다.
   * 끝나면 유저가 걸어 둔 음소거 상태로 되돌린다 (제멋대로 켜지면 안 된다).
   */
  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const connection = connectionRef.current;
    try {
      connection?.setMicEnabled(false);
      await play();
    } finally {
      connection?.setMicEnabled(micOnRef.current);
    }
  }, []);

  const toggleMic = useCallback(() => {
    const next = !micOnRef.current;
    micOnRef.current = next;
    setMicOn(next);
    connectionRef.current?.setMicEnabled(next);
  }, []);

  const resumeAudio = useCallback(async () => {
    await connectionRef.current?.resumeAudio();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!startedAtRef.current) return;
      const seconds = Math.round((Date.now() - startedAtRef.current) / 1000);
      setElapsedSec(seconds);
      if (maxSecRef.current > 0 && seconds >= maxSecRef.current) {
        void stopRef.current();
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const endWhenHidden = () => {
      if (document.visibilityState !== "visible" && connectionRef.current) {
        void stopRef.current();
      }
    };
    const endOnPageHide = () => {
      if (connectionRef.current || sessionIdRef.current) {
        void stopRef.current();
      }
    };
    document.addEventListener("visibilitychange", endWhenHidden);
    window.addEventListener("pagehide", endOnPageHide);
    return () => {
      document.removeEventListener("visibilitychange", endWhenHidden);
      window.removeEventListener("pagehide", endOnPageHide);
    };
  }, []);

  useEffect(
    () => () => {
      void stopRef.current();
    },
    [],
  );

  return {
    active: state !== "idle" && state !== "error",
    analyzing,
    audioBlocked,
    busy: state === "connecting",
    caption,
    captionPrev,
    clearSummary: () => setSummary(null),
    elapsedSec,
    error,
    examples: extractTutorExamples(caption),
    maxSec,
    micOn,
    quota,
    refreshQuota,
    resumeAudio,
    start,
    state,
    stop,
    summary,
    targets,
    teacher,
    toggleMic,
    userSaid,
    withMicMuted,
  };
}

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
  type TutorMode,
  type TutorQuota,
  type TutorState,
} from "./tutor";
import { connectRealtime, type RealtimeConnection } from "./realtime";

const MAX_TURNS_TO_SEND = 100;
const MAX_TURN_CHARS = 300;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function readString(record: Record<string, unknown> | null, key: string) {
  const value = record?.[key];
  return typeof value === "string" ? value : "";
}

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
  if (target.current.length > MAX_TURNS_TO_SEND * 2) {
    target.current.splice(
      0,
      target.current.length - MAX_TURNS_TO_SEND,
    );
  }
}

function errorCode(error: unknown) {
  if (error instanceof Error) return error.message;
  return "TUTOR_SESSION_FAILED";
}

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

  const connectionRef = useRef<RealtimeConnection | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const startedAtRef = useRef(0);
  const maxSecRef = useRef(0);
  const endingRef = useRef(false);
  const textBufferRef = useRef("");
  const captionRef = useRef("");
  const greetedRef = useRef(false);
  const stateRef = useRef<TutorState>("idle");
  const transcriptRef = useRef<TranscriptTurn[]>([]);
  const runIdRef = useRef(0);
  const stopRef = useRef<() => Promise<void>>(async () => undefined);
  stateRef.current = state;

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
      textBufferRef.current = "";
      captionRef.current = "";
      greetedRef.current = false;
      connection?.close();

      setState(preserveError ? "error" : "idle");
      setElapsedSec(0);
      setMaxSec(0);
      setCaption("");
      setCaptionPrev("");
      setUserSaid("");
      setTargets([]);

      if (sessionId) {
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
          // 서버의 선차감이 남으므로 보고 재시도로 마이크를 다시 열지 않는다.
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

  const handleServerEvent = useCallback((rawEvent: unknown) => {
    const event = asRecord(rawEvent);
    switch (readString(event, "type")) {
      case "input_audio_buffer.speech_started":
        textBufferRef.current = "";
        setCaptionPrev("");
        setState("listening");
        break;
      case "input_audio_buffer.speech_stopped":
        setState("thinking");
        break;
      case "response.output_audio_transcript.delta": {
        const delta = readString(event, "delta");
        if (!delta) break;
        textBufferRef.current += delta;
        captionRef.current = textBufferRef.current;
        setCaption(textBufferRef.current);
        break;
      }
      case "response.output_audio_transcript.done": {
        const transcript = readString(event, "transcript").trim();
        if (transcript) {
          captionRef.current = transcript;
          setCaption(transcript);
          pushTurn(transcriptRef, "tutor", transcript);
        }
        textBufferRef.current = "";
        break;
      }
      case "response.output_audio.delta":
        if (stateRef.current !== "speaking") setState("speaking");
        break;
      case "response.created":
        textBufferRef.current = "";
        setCaptionPrev(captionRef.current);
        setCaption("");
        break;
      case "conversation.item.input_audio_transcription.completed": {
        const transcript = readString(event, "transcript").trim();
        if (!transcript) break;
        setUserSaid(transcript);
        pushTurn(transcriptRef, "user", transcript);
        break;
      }
      case "response.done":
        setState("listening");
        break;
      case "error": {
        const realtimeError = asRecord(event?.error);
        setError(readString(realtimeError, "message") || "REALTIME_ERROR");
        break;
      }
      default:
        break;
    }
  }, []);

  const start = useCallback(
    async (
      mode: TutorMode,
      options: { topicId?: string; teacherId?: string } = {},
    ) => {
      if (connectionRef.current || endingRef.current) return;
      const runId = runIdRef.current + 1;
      runIdRef.current = runId;
      setError(null);
      setSummary(null);
      setCaption("");
      setCaptionPrev("");
      setUserSaid("");
      transcriptRef.current = [];
      textBufferRef.current = "";
      greetedRef.current = false;
      setState("connecting");

      try {
        const grant = await createTutorSession(request, mode, options);
        if (runIdRef.current !== runId) {
          void endTutorSession(request, grant.sessionId, 0);
          return;
        }
        sessionIdRef.current = grant.sessionId;
        maxSecRef.current = grant.maxDurationSec;
        setMaxSec(grant.maxDurationSec);
        setTargets(grant.targetExpressions ?? []);
        setQuota(grant.quota);

        const connection = await connectRealtime(
          grant.clientSecret,
          grant.model,
          {
            onConnectionState: (nextState) => {
              if (nextState !== "failed") return;
              setError("CONNECTION_LOST");
              void finishSession(true);
            },
            onDataChannelOpen: (send) => {
              if (greetedRef.current || runIdRef.current !== runId) return;
              greetedRef.current = true;
              send({ type: "response.create" });
            },
            onError: () => {
              setError("CONNECTION_ERROR");
              void finishSession(true);
            },
            onEvent: (event) => {
              if (runIdRef.current === runId) handleServerEvent(event);
            },
          },
        );
        if (runIdRef.current !== runId) {
          connection.close();
          return;
        }
        connectionRef.current = connection;
        startedAtRef.current = Date.now();
        setState("listening");
      } catch (reason) {
        if (runIdRef.current !== runId) return;
        setError(errorCode(reason));
        await finishSession(true);
      }
    },
    [finishSession, handleServerEvent, request],
  );

  const withMicMuted = useCallback(async (play: () => Promise<void>) => {
    const connection = connectionRef.current;
    try {
      connection?.setMicEnabled(false);
      await play();
    } finally {
      connection?.setMicEnabled(true);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!startedAtRef.current) return;
      const seconds = Math.round(
        (Date.now() - startedAtRef.current) / 1000,
      );
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
    busy: state === "connecting",
    caption,
    captionPrev,
    clearSummary: () => setSummary(null),
    elapsedSec,
    error,
    examples: extractTutorExamples(caption),
    maxSec,
    quota,
    refreshQuota,
    start,
    state,
    stop,
    summary,
    targets,
    userSaid,
    withMicMuted,
  };
}
